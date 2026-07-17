from dotenv import load_dotenv
from pathlib import Path

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

import os
import logging
import uuid
import asyncio
from datetime import datetime, timezone, timedelta
from typing import List, Optional

import bcrypt
import jwt
import httpx
from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, EmailStr, ConfigDict

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# --- DB ---
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# --- Config ---
JWT_SECRET = os.environ['JWT_SECRET']
JWT_ALGORITHM = "HS256"
ADMIN_EMAIL = os.environ['ADMIN_EMAIL']
ADMIN_PASSWORD = os.environ['ADMIN_PASSWORD']
NOTIFY_EMAIL = os.environ['NOTIFY_EMAIL']
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ['EMERGENT_EMAIL_KEY']
EMAIL_FROM_NAME = os.environ['EMAIL_FROM_NAME']

app = FastAPI(title="Sportily Tourism API")
api_router = APIRouter(prefix="/api")


# --- Models ---
class InquiryCreate(BaseModel):
    name: str = Field(..., max_length=120)
    email: EmailStr
    phone: Optional[str] = Field(None, max_length=40)
    event: Optional[str] = Field(None, max_length=120)
    travelers: Optional[str] = Field(None, max_length=60)
    message: str = Field(..., max_length=4000)


class Inquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: Optional[str] = None
    event: Optional[str] = None
    travelers: Optional[str] = None
    message: str
    created_at: str = Field(default_factory=lambda: datetime.now(timezone.utc).isoformat())


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


# --- Auth helpers ---
def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    return bcrypt.checkpw(plain.encode("utf-8"), hashed.encode("utf-8"))


def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "type": "access",
        "exp": datetime.now(timezone.utc) + timedelta(hours=12),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


async def get_current_user(request: Request) -> dict:
    auth_header = request.headers.get("Authorization", "")
    token = auth_header[7:] if auth_header.startswith("Bearer ") else request.cookies.get("access_token")
    if not token:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(status_code=401, detail="Invalid token type")
        user = await db.users.find_one({"id": payload["sub"]}, {"_id": 0, "password_hash": 0})
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")


# --- Email notification ---
async def send_inquiry_notification(inquiry: Inquiry):
    html = f"""
    <table width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;background:#faf9f7;padding:24px">
      <tr><td>
        <table width="600" align="center" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #e7e5e4;border-radius:12px;overflow:hidden">
          <tr><td style="background:#B45309;padding:20px 28px;color:#fff;font-size:18px;font-weight:bold">New inquiry — Sportily Tourism</td></tr>
          <tr><td style="padding:28px">
            <p style="margin:0 0 16px;color:#57534e">You've received a new trip inquiry.</p>
            <table width="100%" cellpadding="6" cellspacing="0" style="font-size:14px;color:#1c1917">
              <tr><td style="width:120px;color:#78716c">Name</td><td><b>{inquiry.name}</b></td></tr>
              <tr><td style="color:#78716c">Email</td><td>{inquiry.email}</td></tr>
              <tr><td style="color:#78716c">Phone</td><td>{inquiry.phone or '—'}</td></tr>
              <tr><td style="color:#78716c">Event</td><td>{inquiry.event or '—'}</td></tr>
              <tr><td style="color:#78716c">Travelers</td><td>{inquiry.travelers or '—'}</td></tr>
              <tr><td style="color:#78716c;vertical-align:top">Message</td><td>{inquiry.message}</td></tr>
            </table>
            <p style="margin:20px 0 0;color:#a8a29e;font-size:12px">Received {inquiry.created_at}</p>
          </td></tr>
        </table>
      </td></tr>
    </table>
    """
    payload = {
        "to": [NOTIFY_EMAIL],
        "subject": f"New inquiry from {inquiry.name}" + (f" — {inquiry.event}" if inquiry.event else ""),
        "html": html,
        "from_name": EMAIL_FROM_NAME,
        "contact_email": inquiry.email,
    }
    try:
        async with httpx.AsyncClient(timeout=30) as hc:
            resp = await hc.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        logger.info(f"Inquiry notification sent for {inquiry.email}")
    except Exception as e:
        logger.error(f"Inquiry notification failed: {e}")


# --- Routes ---
@api_router.get("/")
async def root():
    return {"message": "Sportily Tourism API is live"}


@api_router.post("/inquiries", response_model=Inquiry)
async def create_inquiry(payload: InquiryCreate):
    inquiry = Inquiry(**payload.model_dump())
    await db.inquiries.insert_one(inquiry.model_dump())
    logger.info(f"New inquiry from {inquiry.email} for event={inquiry.event}")
    asyncio.create_task(send_inquiry_notification(inquiry))
    return inquiry


@api_router.post("/auth/login")
async def login(payload: LoginRequest):
    email = payload.email.lower()
    user = await db.users.find_one({"email": email})
    if not user or not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token(user["id"], user["email"])
    return {"token": token, "user": {"email": user["email"], "name": user.get("name", "Admin"), "role": user.get("role", "admin")}}


@api_router.get("/auth/me")
async def me(current=Depends(get_current_user)):
    return current


@api_router.get("/inquiries", response_model=List[Inquiry])
async def list_inquiries(current=Depends(get_current_user)):
    docs = await db.inquiries.find({}, {"_id": 0}).sort("created_at", -1).to_list(2000)
    return [Inquiry(**d) for d in docs]


@api_router.get("/inquiries/stats")
async def inquiry_stats(current=Depends(get_current_user)):
    total = await db.inquiries.count_documents({})
    pipeline = [{"$group": {"_id": "$event", "count": {"$sum": 1}}}, {"$sort": {"count": -1}}]
    by_event = await db.inquiries.aggregate(pipeline).to_list(100)
    return {"total": total, "by_event": [{"event": b["_id"] or "Unspecified", "count": b["count"]} for b in by_event]}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup():
    await db.users.create_index("email", unique=True)
    await db.users.create_index("id")
    existing = await db.users.find_one({"email": ADMIN_EMAIL.lower()})
    if existing is None:
        await db.users.insert_one({
            "id": str(uuid.uuid4()),
            "email": ADMIN_EMAIL.lower(),
            "password_hash": hash_password(ADMIN_PASSWORD),
            "name": "Admin",
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        logger.info("Seeded admin user")
    elif not verify_password(ADMIN_PASSWORD, existing["password_hash"]):
        await db.users.update_one({"email": ADMIN_EMAIL.lower()}, {"$set": {"password_hash": hash_password(ADMIN_PASSWORD)}})
        logger.info("Updated admin password")


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

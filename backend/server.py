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
from collections import defaultdict

import bcrypt
import boto3
import jwt
import httpx
from fastapi import FastAPI, APIRouter, HTTPException, Depends, Request
from starlette.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, EmailStr, ConfigDict

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# --- DynamoDB ---
dynamodb = boto3.resource(
    "dynamodb",
    region_name=os.environ.get("AWS_REGION", "us-east-1"),
)
users_table = dynamodb.Table("sportily_users")
inquiries_table = dynamodb.Table("sportily_inquiries")

# --- Config ---
JWT_SECRET = os.environ['JWT_SECRET']
JWT_ALGORITHM = "HS256"
ADMIN_EMAIL = os.environ['ADMIN_EMAIL']
ADMIN_PASSWORD = os.environ['ADMIN_PASSWORD']
NOTIFY_EMAIL = os.environ['NOTIFY_EMAIL']
WHATSAPP_NUMBER = os.environ.get('WHATSAPP_NUMBER', '917572997755')
COMPANY_NAME = "Sportily Tourism Pvt. Ltd."
COMPANY_TAGLINE = "We believe that travel brings knowledge, knowledge brings opportunity, and opportunity brings success."
OFFICES = [
    {
        "label": "Head Office",
        "city": "Ahmedabad, India",
        "address": "202, Shivalik-9, opp. Vishnu Niwas Society, towards Passport Office, Off C G Road, Gulbai Tekra, Ahmedabad - 380006, Gujarat, India",
        "phone": "+91 75729 97755",
    },
    {
        "label": "USA Office",
        "city": "Bloomfield, NJ",
        "address": "676 Bloomfield Ave, Bloomfield, NJ - 07003, U.S.A.",
        "phone": "+1 570 877 5929",
    },
    {
        "label": "New Zealand Office",
        "city": "Auckland",
        "address": "4 Choice Avenue, Henderson, Auckland - 0612, New Zealand",
        "phone": "+64 21 0270 1293",
    },
    {
        "label": "Canada Office",
        "city": "Toronto",
        "address": "4 Wingreen Court, Toronto, Ontario M3B 1B9, Canada",
        "phone": "+1 647-510-9183",
    },
]
EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ['EMERGENT_EMAIL_KEY']
EMAIL_FROM_NAME = os.environ['EMAIL_FROM_NAME']

app = FastAPI(title="Sportily Tourism API")

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

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
        resp = users_table.get_item(Key={"email": payload["email"]})
        user = resp.get("Item")
        if not user:
            raise HTTPException(status_code=401, detail="User not found")
        user.pop("password_hash", None)
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


@api_router.get("/config")
async def get_config():
    return {
        "company": COMPANY_NAME,
        "tagline": COMPANY_TAGLINE,
        "whatsapp_number": WHATSAPP_NUMBER,
        "whatsapp_link": f"https://wa.me/{WHATSAPP_NUMBER}",
        "email": "info@sportilytourism.com",
        "offices": OFFICES,
    }


@api_router.post("/inquiries", response_model=Inquiry)
async def create_inquiry(payload: InquiryCreate):
    inquiry = Inquiry(**payload.model_dump())
    inquiries_table.put_item(Item=inquiry.model_dump())
    logger.info(f"New inquiry from {inquiry.email} for event={inquiry.event}")
    asyncio.create_task(send_inquiry_notification(inquiry))
    return inquiry


@api_router.post("/auth/login")
async def login(payload: LoginRequest):
    email = payload.email.lower()
    resp = users_table.get_item(Key={"email": email})
    user = resp.get("Item")
    if not user or not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    token = create_access_token(user["id"], user["email"])
    return {"token": token, "user": {"email": user["email"], "name": user.get("name", "Admin"), "role": user.get("role", "admin")}}


@api_router.get("/auth/me")
async def me(current=Depends(get_current_user)):
    return current


@api_router.get("/inquiries", response_model=List[Inquiry])
async def list_inquiries(current=Depends(get_current_user)):
    resp = inquiries_table.scan()
    items = resp.get("Items", [])
    items.sort(key=lambda x: x.get("created_at", ""), reverse=True)
    return [Inquiry(**item) for item in items]


@api_router.get("/inquiries/stats")
async def inquiry_stats(current=Depends(get_current_user)):
    resp = inquiries_table.scan()
    items = resp.get("Items", [])
    total = len(items)
    counts: dict = defaultdict(int)
    for item in items:
        counts[item.get("event") or "Unspecified"] += 1
    by_event = sorted([{"event": k, "count": v} for k, v in counts.items()], key=lambda x: -x["count"])
    return {"total": total, "by_event": by_event}


app.include_router(api_router)


@app.on_event("startup")
async def startup():
    email = ADMIN_EMAIL.lower()
    resp = users_table.get_item(Key={"email": email})
    existing = resp.get("Item")
    if existing is None:
        users_table.put_item(Item={
            "id": str(uuid.uuid4()),
            "email": email,
            "password_hash": hash_password(ADMIN_PASSWORD),
            "name": "Admin",
            "role": "admin",
            "created_at": datetime.now(timezone.utc).isoformat(),
        })
        logger.info("Seeded admin user")
    elif not verify_password(ADMIN_PASSWORD, existing["password_hash"]):
        users_table.update_item(
            Key={"email": email},
            UpdateExpression="SET password_hash = :ph",
            ExpressionAttributeValues={":ph": hash_password(ADMIN_PASSWORD)},
        )
        logger.info("Updated admin password")


@app.on_event("shutdown")
async def shutdown():
    pass

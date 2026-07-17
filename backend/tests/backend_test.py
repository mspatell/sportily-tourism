import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL").rstrip("/")
API = f"{BASE_URL}/api"

ADMIN_EMAIL = "admin@sportily.travel"
ADMIN_PASSWORD = "Sportily@2026"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


@pytest.fixture(scope="module")
def token(client):
    r = client.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200, r.text
    data = r.json()
    assert "token" in data
    return data["token"]


@pytest.fixture(scope="module")
def auth_headers(token):
    return {"Authorization": f"Bearer {token}", "Content-Type": "application/json"}


# ---- Health ----
def test_root(client):
    r = client.get(f"{API}/")
    assert r.status_code == 200
    assert "message" in r.json()


# ---- Public: create inquiry ----
def test_create_inquiry_valid(client):
    payload = {
        "name": "TEST_John Doe",
        "email": "test_john@example.com",
        "phone": "+11234567890",
        "event": "Football",
        "travelers": "2",
        "message": "TEST inquiry, please ignore.",
    }
    r = client.post(f"{API}/inquiries", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["id"] and isinstance(data["id"], str)
    assert data["created_at"]
    assert data["name"] == payload["name"]
    assert data["email"] == payload["email"]
    pytest.created_inquiry_id = data["id"]


def test_create_inquiry_invalid_email(client):
    r = client.post(f"{API}/inquiries", json={"name": "TEST_x", "email": "not-an-email", "message": "hi"})
    assert r.status_code == 422


def test_create_inquiry_missing_message(client):
    r = client.post(f"{API}/inquiries", json={"name": "TEST_x", "email": "ok@example.com"})
    assert r.status_code == 422


def test_create_inquiry_minimal(client):
    r = client.post(f"{API}/inquiries", json={"name": "TEST_min", "email": "test_min@example.com", "message": "min body"})
    assert r.status_code == 200
    d = r.json()
    assert d["phone"] is None and d["event"] is None and d["travelers"] is None


# ---- Auth ----
def test_login_wrong_password(client):
    r = client.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": "wrong"})
    assert r.status_code == 401


def test_login_success_returns_user(client):
    r = client.post(f"{API}/auth/login", json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD})
    assert r.status_code == 200
    d = r.json()
    assert "token" in d and "user" in d
    assert d["user"]["email"] == ADMIN_EMAIL.lower()
    assert d["user"]["role"] == "admin"


def test_me_requires_auth(client):
    r = client.get(f"{API}/auth/me")
    assert r.status_code == 401


def test_me_with_token(client, auth_headers):
    r = requests.get(f"{API}/auth/me", headers=auth_headers)
    assert r.status_code == 200
    assert r.json()["email"] == ADMIN_EMAIL.lower()


# ---- Protected inquiries list ----
def test_list_inquiries_unauth(client):
    r = client.get(f"{API}/inquiries")
    assert r.status_code == 401


def test_list_inquiries_authed(auth_headers):
    r = requests.get(f"{API}/inquiries", headers=auth_headers)
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list) and len(data) >= 1
    assert "_id" not in data[0]
    ids = [d["id"] for d in data]
    assert getattr(pytest, "created_inquiry_id", None) in ids
    created_ats = [d["created_at"] for d in data]
    assert created_ats == sorted(created_ats, reverse=True)


def test_inquiries_stats(auth_headers):
    r = requests.get(f"{API}/inquiries/stats", headers=auth_headers)
    assert r.status_code == 200
    d = r.json()
    assert "total" in d and isinstance(d["total"], int)
    assert "by_event" in d and isinstance(d["by_event"], list)


def test_stats_unauth():
    r = requests.get(f"{API}/inquiries/stats")
    assert r.status_code == 401

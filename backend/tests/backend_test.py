import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://event-getaway.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def client():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# ---- Health ----
def test_root(client):
    r = client.get(f"{API}/")
    assert r.status_code == 200
    assert "message" in r.json()


# ---- Inquiries: create valid ----
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
    assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
    assert "created_at" in data and isinstance(data["created_at"], str)
    assert data["name"] == payload["name"]
    assert data["email"] == payload["email"]
    assert data["event"] == payload["event"]
    assert data["message"] == payload["message"]
    # store id on module
    pytest.created_inquiry_id = data["id"]
    pytest.created_email = payload["email"]


# ---- Invalid email ----
def test_create_inquiry_invalid_email(client):
    payload = {"name": "TEST_x", "email": "not-an-email", "message": "hello"}
    r = client.post(f"{API}/inquiries", json=payload)
    assert r.status_code == 422


# ---- Missing required field (message) ----
def test_create_inquiry_missing_message(client):
    payload = {"name": "TEST_x", "email": "ok@example.com"}
    r = client.post(f"{API}/inquiries", json=payload)
    assert r.status_code == 422


# ---- List returns created inquiry, newest first ----
def test_list_inquiries(client):
    r = client.get(f"{API}/inquiries")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    assert len(data) >= 1
    # verify no _id leak
    assert "_id" not in data[0]
    # newest first: created inquiry should be in list
    ids = [d.get("id") for d in data]
    assert getattr(pytest, "created_inquiry_id", None) in ids
    # Verify order (created_at descending)
    created_ats = [d["created_at"] for d in data]
    assert created_ats == sorted(created_ats, reverse=True)


# ---- Optional-only fields (phone, event, travelers omitted) ----
def test_create_inquiry_minimal(client):
    payload = {"name": "TEST_min", "email": "test_min@example.com", "message": "min body"}
    r = client.post(f"{API}/inquiries", json=payload)
    assert r.status_code == 200
    data = r.json()
    assert data["phone"] is None
    assert data["event"] is None
    assert data["travelers"] is None

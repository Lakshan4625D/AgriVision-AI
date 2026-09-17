import hashlib
import hmac
import secrets
from datetime import datetime, timedelta, timezone
from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from app.core.config import settings
from app.database.database import get_db
from app.models.user import User

bearer = HTTPBearer(auto_error=False)
# A random process key keeps development usable without accepting a public default key.
SIGNING_KEY = settings.SECRET_KEY if settings.SECRET_KEY != "development-secret-key" else secrets.token_urlsafe(48)

def hash_password(password):
    salt = secrets.token_hex(16)
    digest = hashlib.pbkdf2_hmac("sha256", password.encode(), salt.encode(), 600000).hex()
    return f"pbkdf2_sha256${salt}${digest}"

def verify_password(password, stored):
    if not stored.startswith("pbkdf2_sha256$"):
        return hmac.compare_digest(password.encode(), stored.encode())
    try:
        _, salt, digest = stored.split("$")
        actual = hashlib.pbkdf2_hmac("sha256", password.encode(), salt.encode(), 600000).hex()
        return hmac.compare_digest(actual, digest)
    except ValueError:
        return False

def is_admin(user):
    return bool(user.role and user.role.name.lower() == "admin")

def public_user(user):
    return {"id": user.id, "full_name": user.full_name, "email": user.email,
            "role_id": user.role_id, "is_admin": is_admin(user)}

def token_for(user):
    return jwt.encode({"sub": str(user.id), "exp": datetime.now(timezone.utc) + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)}, SIGNING_KEY, algorithm="HS256")

def current_user(credentials: HTTPAuthorizationCredentials = Depends(bearer), db: Session = Depends(get_db)):
    try:
        if credentials is None:
            raise ValueError()
        payload = jwt.decode(credentials.credentials, SIGNING_KEY, algorithms=["HS256"])
        user = db.get(User, int(payload["sub"]))
        if user is None:
            raise ValueError()
        return user
    except (JWTError, ValueError, KeyError, TypeError):
        raise HTTPException(401, "Please sign in again", headers={"WWW-Authenticate": "Bearer"})

def require_admin(user: User = Depends(current_user)):
    if not is_admin(user):
        raise HTTPException(403, "Bank administrator access required")
    return user

def require_owner(user, user_id):
    if user.id != user_id and not is_admin(user):
        raise HTTPException(403, "Access denied")

from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.models.user import User
from app.models.role import Role
from app.schemas.auth import LoginRequest, RegisterRequest
from app.core.security import hash_password, verify_password, public_user, token_for, is_admin

def register_user(db: Session, data: RegisterRequest):
    if data.role_id != 4:
        raise HTTPException(403, "Administrator accounts must be provisioned by an operator")
    if db.query(User).filter(User.email == data.email).first():
        return {"success": False, "message": "Email already exists"}
    role = db.query(Role).filter(Role.name == "Farmer").first()
    if role is None:
        raise HTTPException(503, "Farmer role is not configured")
    user = User(full_name=data.full_name, email=data.email, password=hash_password(data.password), phone="", role_id=role.id)
    db.add(user)
    db.commit()
    return {"success": True, "message": "User registered successfully"}

def login_user(db: Session, data: LoginRequest, admin_only=False):
    user = db.query(User).filter(User.email == data.email).first()
    if not user or not verify_password(data.password, user.password):
        raise HTTPException(401, "Invalid email or password")
    if admin_only and not is_admin(user):
        raise HTTPException(403, "Bank administrator access required")
    if not user.password.startswith("pbkdf2_sha256$"):
        user.password = hash_password(data.password)
        db.commit()
    return {"success": True, "message": "Login successful", "user": public_user(user), "access_token": token_for(user), "token_type": "bearer"}

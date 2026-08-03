from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.auth import LoginRequest, RegisterRequest


def register_user(db: Session, data: RegisterRequest):
    existing = db.query(User).filter(User.email == data.email).first()

    if existing:
        return {
            "success": False,
            "message": "Email already exists"
        }

    user = User(
        full_name=data.full_name,
        email=data.email,
        password=data.password,   # Temporary (plain text)
        phone="",
        role_id=data.role_id
    )

    db.add(user)
    db.commit()
    db.refresh(user)

    return {
        "success": True,
        "message": "User registered successfully"
    }


def login_user(db: Session, data: LoginRequest):
    user = (
        db.query(User)
        .filter(User.email == data.email)
        .first()
    )

    if not user:
        return {
            "success": False,
            "message": "Invalid email"
        }

    if user.password != data.password:
        return {
            "success": False,
            "message": "Invalid password"
        }

    return {
        "success": True,
        "message": "Login successful",
        "user": {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "role_id": user.role_id,
        },
    }
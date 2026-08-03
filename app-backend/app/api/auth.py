from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.schemas.auth import LoginRequest, RegisterRequest
from app.services.auth_service import login_user, register_user

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"],
)


@router.post("/register")
def register(
    data: RegisterRequest,
    db: Session = Depends(get_db),
):
    return register_user(db, data)


@router.post("/login")
def login(
    data: LoginRequest,
    db: Session = Depends(get_db),
):
    return login_user(db, data)
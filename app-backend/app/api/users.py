from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.models.user import User


router = APIRouter(
    prefix="/users",
    tags=["Users"],
)


@router.get("")
def get_users(
    db: Session = Depends(get_db),
):
    users = (
        db.query(User)
        .order_by(User.created_at.desc())
        .all()
    )

    return [
        {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "phone": user.phone,
            "role_id": user.role_id,
            "role": {
                "id": user.role.id,
                "name": user.role.name,
            } if user.role else None,
            "created_at": user.created_at,
            "updated_at": user.updated_at,
        }
        for user in users
    ]
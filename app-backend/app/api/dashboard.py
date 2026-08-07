from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.services.dashboard_service import get_dashboard

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get("/{user_id}")
def dashboard(
    user_id: int,
    db: Session = Depends(get_db),
):
    return get_dashboard(db, user_id)
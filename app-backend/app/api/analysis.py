from fastapi import APIRouter, Depends, HTTPException
from app.core.security import current_user, require_owner
from sqlalchemy.orm import Session

from app.database.database import get_db

from app.schemas.analysis import (
    AnalysisCreate,
    AnalysisResponse,
)

from app.services.analysis_service import (
    create_analysis,
    get_user_analysis,
    get_analysis,
)

router = APIRouter(
    prefix="/analysis",
    tags=["Analysis"],
)


@router.post(
    "",
    response_model=AnalysisResponse,
)
def save(
    data: AnalysisCreate,
    db: Session = Depends(get_db),
    user = Depends(current_user),
):
    require_owner(user, data.user_id)
    return create_analysis(db, data)


@router.get(
    "/user/{user_id}",
    response_model=list[AnalysisResponse],
)
def history(
    user_id: int,
    db: Session = Depends(get_db),
    user = Depends(current_user),
):
    require_owner(user, user_id)
    return get_user_analysis(db, user_id)


@router.get(
    "/{analysis_id}",
    response_model=AnalysisResponse,
)
def single(
    analysis_id: int,
    db: Session = Depends(get_db),
    user = Depends(current_user),
):
    record = get_analysis(db, analysis_id)
    if record is None:
        raise HTTPException(404, "Scan not found")
    require_owner(user, record.user_id)
    return record
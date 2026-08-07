from fastapi import APIRouter, Depends
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
):
    return create_analysis(db, data)


@router.get(
    "/user/{user_id}",
    response_model=list[AnalysisResponse],
)
def history(
    user_id: int,
    db: Session = Depends(get_db),
):
    return get_user_analysis(db, user_id)


@router.get(
    "/{analysis_id}",
    response_model=AnalysisResponse,
)
def single(
    analysis_id: int,
    db: Session = Depends(get_db),
):
    return get_analysis(db, analysis_id)
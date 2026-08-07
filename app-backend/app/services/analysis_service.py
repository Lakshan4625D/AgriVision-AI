from sqlalchemy.orm import Session

from app.models.analysis import Analysis
from app.schemas.analysis import AnalysisCreate


def create_analysis(
    db: Session,
    data: AnalysisCreate,
):

    analysis = Analysis(**data.model_dump())

    db.add(analysis)

    db.commit()

    db.refresh(analysis)

    return analysis


def get_user_analysis(
    db: Session,
    user_id: int,
):

    return (
        db.query(Analysis)
        .filter(Analysis.user_id == user_id)
        .order_by(Analysis.created_at.desc())
        .all()
    )


def get_analysis(
    db: Session,
    analysis_id: int,
):

    return (
        db.query(Analysis)
        .filter(Analysis.id == analysis_id)
        .first()
    )
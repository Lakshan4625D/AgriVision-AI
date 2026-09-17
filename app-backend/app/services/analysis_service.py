from sqlalchemy.orm import Session

from app.models.analysis import Analysis
from app.models.scan_explanation import ScanExplanation
from app.schemas.analysis import AnalysisCreate
from app.services.severity import severity_label_for_score


def create_analysis(
    db: Session,
    data: AnalysisCreate,
):

    values = data.model_dump(exclude={"ai_explanation"})
    values["severity_label"] = severity_label_for_score(data.severity, data.severity_label)
    analysis = Analysis(**values)

    db.add(analysis)
    db.flush()
    if data.ai_explanation:
        db.add(ScanExplanation(analysis_id=analysis.id, explanation=data.ai_explanation))

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
from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.analysis import Analysis


def get_dashboard(db: Session, user_id: int):

    total = (
        db.query(Analysis)
        .filter(Analysis.user_id == user_id)
        .count()
    )

    healthy = (
        db.query(Analysis)
        .filter(
            Analysis.user_id == user_id,
            Analysis.stress_class == "Healthy",
        )
        .count()
    )

    diseased = total - healthy

    avg = (
        db.query(
            func.avg(
                Analysis.stress_confidence
            )
        )
        .filter(Analysis.user_id == user_id)
        .scalar()
    )

    recent = (
        db.query(Analysis)
        .filter(Analysis.user_id == user_id)
        .order_by(
            Analysis.created_at.desc()
        )
        .limit(5)
        .all()
    )

    return {
        "total_analysis": total,
        "healthy": healthy,
        "diseased": diseased,
        "avg_confidence": round(avg or 0, 2),
        "recent_analysis": recent,
    }
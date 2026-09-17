from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from sqlalchemy import or_, func
from app.core.security import require_admin, public_user
from app.database.database import get_db
from app.models.user import User
from app.models.analysis import Analysis
from app.models.scan_explanation import ScanExplanation
from app.schemas.analysis import AnalysisResponse
from app.services.claim_service import ClaimInputs, estimate_claim, explain_scan, SOURCE

router = APIRouter(prefix="/admin", tags=["Bank administration"], dependencies=[Depends(require_admin)])

@router.get("/users")
def users(search: str = Query("", max_length=100), offset: int = Query(0, ge=0), limit: int = Query(25, ge=1, le=100), db: Session = Depends(get_db)):
    query = db.query(User)
    if search.strip():
        query = query.filter(or_(User.full_name.contains(search.strip(), autoescape=True), User.email.contains(search.strip(), autoescape=True)))
    count = query.count()
    rows = query.order_by(User.id.desc()).offset(offset).limit(limit).all()
    counts = dict(db.query(Analysis.user_id, func.count(Analysis.id)).filter(Analysis.user_id.in_([u.id for u in rows])).group_by(Analysis.user_id).all())
    return {"total": count, "users": [{**public_user(u), "phone": u.phone, "created_at": u.created_at, "scan_count": counts.get(u.id, 0)} for u in rows]}

@router.get("/users/{user_id}/scans")
def scans(user_id: int, offset: int = Query(0, ge=0), limit: int = Query(25, ge=1, le=100), db: Session = Depends(get_db)):
    if db.get(User, user_id) is None:
        raise HTTPException(404, "User not found")
    query = db.query(Analysis).filter(Analysis.user_id == user_id)
    return {"total": query.count(), "scans": [AnalysisResponse.model_validate(s) for s in query.order_by(Analysis.created_at.desc(), Analysis.id.desc()).offset(offset).limit(limit).all()]}

@router.get("/scans/{scan_id}/report")
def report(scan_id: int, db: Session = Depends(get_db)):
    scan = db.get(Analysis, scan_id)
    if scan is None:
        raise HTTPException(404, "Scan not found")
    saved = db.get(ScanExplanation, scan.id)
    explanation = (f"Saved AI explanation: {saved.explanation} "
                   "These image observations are model-generated and need field verification; they do not establish field-wide yield loss or a payable claim.") if saved else explain_scan(scan)
    return {"scan_id": scan.id, "explanation": explanation, "source": SOURCE,
            "claim_note": "Claim amount awaits policy sum insured and official insurance-unit threshold and actual yields. Localized calamity, prevented sowing and post-harvest claims require their own assessment; this calculator covers area-based yield loss only."}

@router.post("/scans/{scan_id}/estimate")
def estimate(scan_id: int, data: ClaimInputs, db: Session = Depends(get_db)):
    result = report(scan_id, db)
    return {**result, "claim": estimate_claim(data)}

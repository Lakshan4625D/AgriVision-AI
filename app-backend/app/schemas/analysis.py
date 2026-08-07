from datetime import datetime

from pydantic import BaseModel


class AnalysisCreate(BaseModel):

    user_id: int

    image_name: str

    crop_type: str

    quality: str

    stage: str
    stage_confidence: float

    stress_class: str
    stress_confidence: float

    severity: float
    severity_label: str

    latitude: float
    longitude: float


class AnalysisResponse(AnalysisCreate):

    id: int

    created_at: datetime

    class Config:
        from_attributes = True
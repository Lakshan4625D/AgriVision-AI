from sqlalchemy import (
    Column,
    Integer,
    String,
    Float,
    ForeignKey,
    DateTime,
)

from sqlalchemy.sql import func

from app.database.database import Base


class Analysis(Base):
    __tablename__ = "analysis_history"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
    )

    image_name = Column(String(255))

    crop_type = Column(String(100))

    quality = Column(String(50))

    stage = Column(String(100))
    stage_confidence = Column(Float)

    stress_class = Column(String(100))
    stress_confidence = Column(Float)

    severity = Column(Float)
    severity_label = Column(String(50))

    latitude = Column(Float)
    longitude = Column(Float)

    created_at = Column(
        DateTime,
        server_default=func.now(),
    )
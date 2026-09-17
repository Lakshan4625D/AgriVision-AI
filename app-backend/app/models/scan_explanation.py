from sqlalchemy import Column, Integer, ForeignKey, Text
from app.database.database import Base

class ScanExplanation(Base):
    __tablename__ = "scan_explanations"
    analysis_id = Column(Integer, ForeignKey("analysis_history.id"), primary_key=True)
    explanation = Column(Text, nullable=False)

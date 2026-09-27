from sqlalchemy import Column, String, DateTime, Integer, Float, ForeignKey
from datetime import datetime
import uuid
from app.core.database import Base

class AnalyticsRecord(Base):
    __tablename__ = "analytics_records"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    institution_id = Column(String, ForeignKey("institutions.id"), nullable=False, index=True)
    service_id = Column(String, ForeignKey("services.id"), nullable=True, index=True)
    date = Column(String, nullable=False, index=True)  # YYYY-MM-DD
    total_bookings = Column(Integer, default=0)
    avg_wait_mins = Column(Float, default=0.0)
    peak_hour = Column(String, nullable=True)
    completion_rate = Column(Float, default=100.0)
    no_show_rate = Column(Float, default=0.0)
    created_at = Column(DateTime, default=datetime.utcnow)

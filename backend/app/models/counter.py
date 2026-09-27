from sqlalchemy import Column, String, DateTime, Integer, ForeignKey
from datetime import datetime
import uuid
from app.core.database import Base

class Counter(Base):
    __tablename__ = "counters"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    institution_id = Column(String, ForeignKey("institutions.id"), nullable=False, index=True)
    service_id = Column(String, ForeignKey("services.id"), nullable=True, index=True)
    counter_number = Column(Integer, nullable=False)
    name = Column(String, nullable=False)
    staff_id = Column(String, nullable=True)
    status = Column(String, default="OPEN")  # OPEN, CLOSED, PAUSED
    created_at = Column(DateTime, default=datetime.utcnow)

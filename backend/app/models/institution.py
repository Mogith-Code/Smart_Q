from sqlalchemy import Column, String, Boolean, DateTime, Integer, Text
from datetime import datetime
import uuid
from app.core.database import Base

class Institution(Base):
    __tablename__ = "institutions"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    name = Column(String, nullable=False, index=True)
    type = Column(String, nullable=False, index=True)  # Hospital, Bank, Clinic, Government
    address = Column(String, nullable=False)
    city = Column(String, nullable=False, index=True)
    phone = Column(String, nullable=True)
    image_url = Column(String, nullable=True)
    description = Column(Text, nullable=True)
    is_active = Column(Boolean, default=True)
    active_queues_count = Column(Integer, default=0)
    total_waiting = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

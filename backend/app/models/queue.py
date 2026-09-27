from sqlalchemy import Column, String, DateTime, Integer, ForeignKey
from datetime import datetime
import uuid
from app.core.database import Base

class Queue(Base):
    __tablename__ = "queues"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    service_id = Column(String, ForeignKey("services.id"), nullable=False, index=True)
    institution_id = Column(String, ForeignKey("institutions.id"), nullable=False, index=True)
    date = Column(String, nullable=False, index=True)  # YYYY-MM-DD
    status = Column(String, default="ACTIVE")  # ACTIVE, PAUSED, CLOSED
    total_tokens = Column(Integer, default=0)
    waiting_count = Column(Integer, default=0)
    served_count = Column(Integer, default=0)
    cancelled_count = Column(Integer, default=0)
    current_serving_token_id = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

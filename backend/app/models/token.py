from sqlalchemy import Column, String, DateTime, Integer, ForeignKey
from datetime import datetime
import uuid
from app.core.database import Base

class Token(Base):
    __tablename__ = "tokens"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    token_number = Column(String, nullable=False, index=True)
    queue_id = Column(String, ForeignKey("queues.id"), nullable=False, index=True)
    service_id = Column(String, ForeignKey("services.id"), nullable=False, index=True)
    institution_id = Column(String, ForeignKey("institutions.id"), nullable=False, index=True)
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    user_name = Column(String, nullable=False)
    user_phone = Column(String, nullable=True)
    status = Column(String, default="BOOKED", index=True)  # BOOKED, WAITING, APPROACHING, ARRIVAL_WINDOW, ARRIVED, SERVING, SERVED, EXPIRED, CANCELLED
    position = Column(Integer, default=1)
    estimated_wait_mins = Column(Integer, default=15)
    counter_id = Column(String, ForeignKey("counters.id"), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    called_at = Column(DateTime, nullable=True)
    served_at = Column(DateTime, nullable=True)
    completed_at = Column(DateTime, nullable=True)
    cancelled_at = Column(DateTime, nullable=True)

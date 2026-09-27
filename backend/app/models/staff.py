from sqlalchemy import Column, String, DateTime, ForeignKey
from datetime import datetime
import uuid
from app.core.database import Base

class Staff(Base):
    __tablename__ = "staff"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False, unique=True)
    institution_id = Column(String, ForeignKey("institutions.id"), nullable=False)
    counter_id = Column(String, ForeignKey("counters.id"), nullable=True)
    status = Column(String, default="ACTIVE")  # ACTIVE, ON_BREAK, OFFLINE
    created_at = Column(DateTime, default=datetime.utcnow)

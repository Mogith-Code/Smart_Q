from sqlalchemy import Column, String, DateTime, Text, ForeignKey
from datetime import datetime
import uuid
from app.core.database import Base

class ChatSession(Base):
    __tablename__ = "chat_sessions"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, nullable=True, index=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class ChatMessage(Base):
    __tablename__ = "chat_messages"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    session_id = Column(String, ForeignKey("chat_sessions.id"), nullable=False, index=True)
    sender = Column(String, nullable=False)  # "user" or "bot"
    text = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

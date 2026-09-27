from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class TokenJoinRequest(BaseModel):
    service_id: str
    user_name: str
    user_phone: Optional[str] = None
    notes: Optional[str] = None

class TokenStatusUpdate(BaseModel):
    status: str
    counter_id: Optional[str] = None

class TokenVerifyRequest(BaseModel):
    token_number: str
    security_code: Optional[str] = None

class TokenOut(BaseModel):
    id: str
    token_number: str
    queue_id: str
    service_id: str
    institution_id: str
    user_id: str
    user_name: str
    user_phone: Optional[str] = None
    status: str
    position: int
    estimated_wait_mins: int
    counter_id: Optional[str] = None
    created_at: datetime
    called_at: Optional[datetime] = None
    served_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None

    class Config:
        from_attributes = True

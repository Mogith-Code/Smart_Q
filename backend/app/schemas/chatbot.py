from pydantic import BaseModel
from typing import Optional, List, Dict, Any

class ChatMessageRequest(BaseModel):
    message: str
    session_id: Optional[str] = None
    user_id: Optional[str] = None
    context: Optional[Dict[str, Any]] = None

class ChatMessageResponse(BaseModel):
    response: str
    session_id: str
    intent: Optional[str] = None
    quick_replies: Optional[List[str]] = []
    actions: Optional[List[Dict[str, Any]]] = []

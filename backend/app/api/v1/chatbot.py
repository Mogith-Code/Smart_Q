from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.schemas.chatbot import ChatMessageRequest, ChatMessageResponse
from app.services.chatbot_service import ChatbotService
from app.api.deps import get_current_user_optional
from app.models.user import User

router = APIRouter()

@router.post("/message", response_model=ChatMessageResponse)
async def process_chat_message(
    req: ChatMessageRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user_optional)
):
    user_id = current_user.id if current_user else req.user_id
    return await ChatbotService.process_message(
        db,
        user_message=req.message,
        session_id=req.session_id,
        user_id=user_id
    )

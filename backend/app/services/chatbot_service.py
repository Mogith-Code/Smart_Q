import httpx
import uuid
from typing import Dict, Any, List
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.core.config import settings
from app.models.institution import Institution
from app.models.token import Token
from app.models.chat_session import ChatSession, ChatMessage
from app.schemas.chatbot import ChatMessageResponse

class ChatbotService:
    @staticmethod
    async def process_message(
        db: AsyncSession,
        user_message: str,
        session_id: str = None,
        user_id: str = None
    ) -> ChatMessageResponse:
        if not session_id:
            session_id = str(uuid.uuid4())
            new_sess = ChatSession(id=session_id, user_id=user_id)
            db.add(new_sess)
            await db.flush()

        # Save user message
        u_msg = ChatMessage(session_id=session_id, sender="user", text=user_message)
        db.add(u_msg)
        await db.commit()

        # Call chatbot service if available
        try:
            async with httpx.AsyncClient(timeout=3.0) as client:
                res = await client.post(
                    f"{settings.CHATBOT_SERVICE_URL}/api/chat",
                    json={"message": user_message, "session_id": session_id}
                )
                if res.status_code == 200:
                    data = res.json()
                    b_msg = ChatMessage(session_id=session_id, sender="bot", text=data.get("response", ""))
                    db.add(b_msg)
                    await db.commit()
                    return ChatMessageResponse(
                        response=data.get("response", ""),
                        session_id=session_id,
                        intent=data.get("intent", "general"),
                        quick_replies=data.get("quick_replies", ["Check Status", "Book Token", "View Institutions"])
                    )
        except Exception:
            pass

        # Intelligent fallback NLP rule-engine
        msg_lower = user_message.lower()
        response_text = ""
        intent = "general"
        quick_replies = ["Join Queue", "Check Token Status", "Find Nearby Clinics"]

        if "status" in msg_lower or "token" in msg_lower or "position" in msg_lower:
            intent = "check_status"
            if user_id:
                tok_res = await db.execute(
                    select(Token).where(Token.user_id == user_id, Token.status.in_(["BOOKED", "WAITING", "SERVING"]))
                )
                active_token = tok_res.scalars().first()
                if active_token:
                    response_text = f"🎫 Your token **{active_token.token_number}** is currently in **{active_token.status}** status. Position in queue: #{active_token.position}. Estimated wait: ~{active_token.estimated_wait_mins} mins."
                else:
                    response_text = "You do not have any active queue tokens at the moment. Would you like to join a queue?"
            else:
                response_text = "To check your active token status, please share your Token Number (e.g., A-102) or login to your account."
            quick_replies = ["Join Queue", "Find Institutions", "Speak to Support"]

        elif "hospital" in msg_lower or "clinic" in msg_lower or "bank" in msg_lower or "find" in msg_lower:
            intent = "find_institution"
            inst_res = await db.execute(select(Institution).where(Institution.is_active == True).limit(3))
            insts = inst_res.scalars().all()
            if insts:
                inst_names = ", ".join([i.name for i in insts])
                response_text = f"🏥 Here are available institutions on SmartQ: **{inst_names}**. You can view live queues and book a token remotely!"
            else:
                response_text = "We have top hospitals, clinics, and bank branches available for online queue booking."
            quick_replies = ["Book OPD Token", "Check Wait Times", "Location Map"]

        elif "wait" in msg_lower or "time" in msg_lower or "long" in msg_lower:
            intent = "wait_time_query"
            response_text = "⏱️ Current average wait time across OPD counters is ~18 minutes. SmartQ AI predicts lowest crowd density between 01:00 PM and 03:00 PM."
            quick_replies = ["Book Token Now", "View Live Queue", "Set Reminder"]

        else:
            response_text = "👋 Welcome to SmartQ AI Assistant! How can I help you today? You can check live queue status, estimate wait times, or join a virtual queue remotely."

        # Save bot response
        bot_msg = ChatMessage(session_id=session_id, sender="bot", text=response_text)
        db.add(bot_msg)
        await db.commit()

        return ChatMessageResponse(
            response=response_text,
            session_id=session_id,
            intent=intent,
            quick_replies=quick_replies
        )

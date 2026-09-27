from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(
    title="SmartQ Conversational Chatbot API",
    version="1.0.0"
)

class ChatRequest(BaseModel):
    message: str
    session_id: Optional[str] = None
    user_id: Optional[str] = None
    context: Optional[dict] = None

class ChatResponse(BaseModel):
    response: str
    session_id: str
    intent: str = "general"
    quick_replies: List[str] = []
    actions: Optional[List[dict]] = None

@app.get("/health")
async def health():
    return {"status": "ok", "service": "SmartQ Chatbot"}

@app.post("/api/chat", response_model=ChatResponse)
async def process_chat(request: ChatRequest):
    sess_id = request.session_id or "sess-default"
    msg = request.message.lower()

    if "queue" in msg or "join" in msg:
        reply = "You can join a queue remotely by selecting your desired institution and service from the home screen."
        intent = "join_queue"
        quick_replies = ["City General Hospital", "Metro Bank", "Check Wait Times"]
    elif "status" in msg or "token" in msg:
        reply = "To track your position in real-time, navigate to your Token screen or enter your token reference."
        intent = "check_status"
        quick_replies = ["View My Tokens", "Find Nearby Clinics", "Contact Support"]
    else:
        reply = f"Hello! I am your SmartQ virtual assistant. How can I help you manage your queue or bookings today?"
        intent = "general"
        quick_replies = ["Find Nearby Hospital", "Check Active Token", "Cancel Booking"]

    return ChatResponse(
        response=reply,
        session_id=sess_id,
        intent=intent,
        quick_replies=quick_replies
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8002, reload=True)

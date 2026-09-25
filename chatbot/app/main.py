from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(
    title="SmartQ Conversational Chatbot API",
    version="1.0.0"
)

class ChatRequest(BaseModel):
    user_id: str
    session_id: str
    message: str
    context: Optional[dict] = None

class ChatResponse(BaseModel):
    reply: str
    suggested_actions: List[str] = []
    queue_card: Optional[dict] = None

@app.get("/health")
async def health():
    return {"status": "ok", "service": "SmartQ Chatbot"}

@app.post("/api/v1/chat", response_model=ChatResponse)
async def process_chat(request: ChatRequest):
    # Chatbot agent response generator
    return ChatResponse(
        reply=f"Hello! I am your SmartQ Assistant. How can I help you manage your queue or bookings today?",
        suggested_actions=["Find nearby hospital", "Check active token status", "Cancel my booking"],
        queue_card=None
    )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8002, reload=True)

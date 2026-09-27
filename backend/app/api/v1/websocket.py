from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from app.core.websocket_manager import ws_manager

router = APIRouter()

@router.websocket("/ws/queue/{queue_id}")
async def websocket_queue_endpoint(websocket: WebSocket, queue_id: str):
    channel = f"queue_{queue_id}"
    await ws_manager.connect(websocket, channel)
    try:
        while True:
            # Keep connection alive
            data = await websocket.receive_text()
    except WebSocketDisconnect:
        ws_manager.disconnect(websocket, channel)

@router.websocket("/ws/token/{token_id}")
async def websocket_token_endpoint(websocket: WebSocket, token_id: str):
    channel = f"token_{token_id}"
    await ws_manager.connect(websocket, channel)
    try:
        while True:
            data = await websocket.receive_text()
    except WebSocketDisconnect:
        ws_manager.disconnect(websocket, channel)

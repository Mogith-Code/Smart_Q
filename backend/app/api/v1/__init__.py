from fastapi import APIRouter
from app.api.v1.auth import router as auth_router
from app.api.v1.institutions import router as institutions_router
from app.api.v1.services import router as services_router
from app.api.v1.queues import router as queues_router
from app.api.v1.tokens import router as tokens_router
from app.api.v1.counters import router as counters_router
from app.api.v1.staff import router as staff_router
from app.api.v1.prediction import router as prediction_router
from app.api.v1.analytics import router as analytics_router
from app.api.v1.chatbot import router as chatbot_router
from app.api.v1.websocket import router as websocket_router

api_router = APIRouter()

api_router.include_router(auth_router, prefix="/auth", tags=["auth"])
api_router.include_router(institutions_router, prefix="/institutions", tags=["institutions"])
api_router.include_router(services_router, prefix="/services", tags=["services"])
api_router.include_router(queues_router, prefix="/queues", tags=["queues"])
api_router.include_router(tokens_router, prefix="/tokens", tags=["tokens"])
api_router.include_router(counters_router, prefix="/counters", tags=["counters"])
api_router.include_router(staff_router, prefix="/staff", tags=["staff"])
api_router.include_router(prediction_router, prefix="/prediction", tags=["prediction"])
api_router.include_router(analytics_router, prefix="/analytics", tags=["analytics"])
api_router.include_router(chatbot_router, prefix="/chatbot", tags=["chatbot"])
api_router.include_router(websocket_router, tags=["websocket"])

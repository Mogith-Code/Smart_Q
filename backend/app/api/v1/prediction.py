from fastapi import APIRouter
from app.services.prediction_service import PredictionService

router = APIRouter()

@router.get("/wait-time")
async def get_wait_time(
    service_id: str,
    position: int = 5,
    active_counters: int = 3,
    avg_service_time: float = 12.0
):
    return await PredictionService.predict_wait_time(service_id, position, active_counters, avg_service_time)

from fastapi import FastAPI
from pydantic import BaseModel
from typing import Optional
from prediction.predict import predictor

app = FastAPI(title="SmartQ AI Wait-Time Prediction Microservice", version="1.0.0")

class PredictRequest(BaseModel):
    service_id: str
    queue_position: int
    active_counters: Optional[int] = 2
    avg_service_time: Optional[float] = 12.0
    time_of_day_hour: Optional[int] = 10

@app.post("/predict")
async def predict_endpoint(req: PredictRequest):
    res = predictor.predict(
        people_ahead=req.queue_position,
        active_counters=req.active_counters or 2,
        avg_service_time_min=req.avg_service_time or 12.0,
        time_of_day_hour=req.time_of_day_hour or 10
    )
    return res

@app.get("/health")
async def health():
    return {"status": "ok", "service": "SmartQ AI Prediction Service"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8001, reload=True)

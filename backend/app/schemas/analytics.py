from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class KPISummaryOut(BaseModel):
    today_bookings: int
    currently_waiting: int
    completed: int
    no_shows: int
    avg_wait_mins: float
    completion_rate: float
    ai_accuracy: float

class HourlyFootfallOut(BaseModel):
    hour: str
    count: int

class MISReportOut(BaseModel):
    institution_id: str
    date_range: str
    total_footfall: int
    peak_hours: List[str]
    staff_efficiency_score: float
    recommendations: List[str]

from pydantic import BaseModel
from typing import Optional, List

class QueueOut(BaseModel):
    id: str
    service_id: str
    institution_id: str
    date: str
    status: str
    total_tokens: int
    waiting_count: int
    served_count: int
    cancelled_count: int
    current_serving_token_id: Optional[str] = None

    class Config:
        from_attributes = True

class QueueLiveStatsOut(BaseModel):
    queue_id: str
    service_name: str
    institution_name: str
    status: str
    now_serving: Optional[str] = None
    waiting_count: int
    avg_wait_mins: int
    active_counters: int

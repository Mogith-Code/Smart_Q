from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class ServiceOut(BaseModel):
    id: str
    institution_id: str
    name: str
    category: str
    description: Optional[str] = None
    avg_service_time_mins: int
    is_active: bool

    class Config:
        from_attributes = True

class CounterOut(BaseModel):
    id: str
    institution_id: str
    service_id: Optional[str] = None
    counter_number: int
    name: str
    staff_id: Optional[str] = None
    status: str

    class Config:
        from_attributes = True

class InstitutionOut(BaseModel):
    id: str
    name: str
    type: str
    address: str
    city: str
    phone: Optional[str] = None
    image_url: Optional[str] = None
    description: Optional[str] = None
    is_active: bool
    active_queues_count: int
    total_waiting: int
    services: Optional[List[ServiceOut]] = []
    counters: Optional[List[CounterOut]] = []

    class Config:
        from_attributes = True

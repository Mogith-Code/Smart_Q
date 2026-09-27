from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.api.deps import get_current_staff
from app.models.user import User

router = APIRouter()

@router.get("/dashboard")
async def get_staff_dashboard(
    db: AsyncSession = Depends(get_db),
    current_staff: User = Depends(get_current_staff)
):
    return {
        "staff_name": current_staff.full_name,
        "assigned_counter": "Counter 02 — OPD",
        "active_queue": "General OPD Queue",
        "now_serving": "#32",
        "waiting_count": 18,
        "completed_count": 142,
        "no_shows_count": 7
    }

@router.get("/profile")
async def get_staff_profile(current_staff: User = Depends(get_current_staff)):
    return {
        "id": current_staff.id,
        "email": current_staff.email,
        "full_name": current_staff.full_name,
        "role": current_staff.role,
        "phone_number": current_staff.phone_number
    }

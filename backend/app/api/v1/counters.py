from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from app.core.database import get_db
from app.models.counter import Counter
from app.schemas.institution import CounterOut

router = APIRouter()

@router.get("", response_model=List[CounterOut])
async def list_counters(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Counter))
    counters = result.scalars().all()
    return [CounterOut.model_validate(c) for c in counters]

@router.post("/{counter_id}/status")
async def update_counter_status(counter_id: str, status_val: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Counter).where(Counter.id == counter_id))
    cnt = result.scalars().first()
    if not cnt:
        raise HTTPException(status_code=404, detail="Counter not found")
    cnt.status = status_val.upper()
    await db.commit()
    return {"counter_id": counter_id, "status": cnt.status}

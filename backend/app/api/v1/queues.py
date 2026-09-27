from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from app.core.database import get_db
from app.models.queue import Queue
from app.schemas.queue import QueueOut, QueueLiveStatsOut

router = APIRouter()

@router.get("", response_model=List[QueueOut])
async def list_queues(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Queue))
    queues = result.scalars().all()
    return [QueueOut.model_validate(q) for q in queues]

@router.get("/{queue_id}/live", response_model=QueueLiveStatsOut)
async def get_queue_live_stats(queue_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Queue).where(Queue.id == queue_id))
    q = result.scalars().first()
    if not q:
        raise HTTPException(status_code=404, detail="Queue not found")

    return QueueLiveStatsOut(
        queue_id=q.id,
        service_name="Outpatient Department (OPD)",
        institution_name="City General Hospital",
        status=q.status,
        now_serving="#32",
        waiting_count=q.waiting_count,
        avg_wait_mins=18,
        active_counters=4
    )

@router.post("/{queue_id}/pause")
async def pause_queue(queue_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Queue).where(Queue.id == queue_id))
    q = result.scalars().first()
    if not q:
        raise HTTPException(status_code=404, detail="Queue not found")
    q.status = "PAUSED"
    await db.commit()
    return {"message": "Queue paused successfully", "status": "PAUSED"}

@router.post("/{queue_id}/resume")
async def resume_queue(queue_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Queue).where(Queue.id == queue_id))
    q = result.scalars().first()
    if not q:
        raise HTTPException(status_code=404, detail="Queue not found")
    q.status = "ACTIVE"
    await db.commit()
    return {"message": "Queue resumed successfully", "status": "ACTIVE"}

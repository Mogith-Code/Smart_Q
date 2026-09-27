from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List
from app.core.database import get_db
from app.models.service import Service
from app.schemas.institution import ServiceOut

router = APIRouter()

@router.get("", response_model=List[ServiceOut])
async def list_services(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Service).where(Service.is_active == True))
    services = result.scalars().all()
    return [ServiceOut.model_validate(s) for s in services]

@router.get("/{service_id}", response_model=ServiceOut)
async def get_service(service_id: str, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Service).where(Service.id == service_id))
    service = result.scalars().first()
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    return ServiceOut.model_validate(service)

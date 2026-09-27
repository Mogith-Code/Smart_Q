from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from app.core.database import get_db
from app.schemas.institution import InstitutionOut, ServiceOut
from app.services.institution_service import InstitutionService

router = APIRouter()

@router.get("", response_model=List[InstitutionOut])
async def list_institutions(
    q: Optional[str] = Query(None, description="Search query"),
    city: Optional[str] = Query(None, description="City filter"),
    type: Optional[str] = Query(None, description="Institution type"),
    db: AsyncSession = Depends(get_db)
):
    return await InstitutionService.get_all_institutions(db, query=q, city=city, type_filter=type)

@router.get("/{institution_id}", response_model=InstitutionOut)
async def get_institution(institution_id: str, db: AsyncSession = Depends(get_db)):
    inst = await InstitutionService.get_institution_by_id(db, institution_id)
    if not inst:
        raise HTTPException(status_code=404, detail="Institution not found")
    return inst

@router.get("/{institution_id}/services", response_model=List[ServiceOut])
async def get_institution_services(institution_id: str, db: AsyncSession = Depends(get_db)):
    inst = await InstitutionService.get_institution_by_id(db, institution_id)
    if not inst:
        raise HTTPException(status_code=404, detail="Institution not found")
    return inst.services or []

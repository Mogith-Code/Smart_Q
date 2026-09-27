from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
from app.core.database import get_db
from app.schemas.analytics import KPISummaryOut, HourlyFootfallOut, MISReportOut
from app.services.analytics_service import AnalyticsService

router = APIRouter()

@router.get("/kpis", response_model=KPISummaryOut)
async def get_kpis(
    institution_id: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db)
):
    return await AnalyticsService.get_kpis(db, institution_id)

@router.get("/hourly-footfall", response_model=list[HourlyFootfallOut])
async def get_hourly_footfall(
    institution_id: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db)
):
    return await AnalyticsService.get_hourly_footfall(db, institution_id)

@router.get("/mis-report", response_model=MISReportOut)
async def get_mis_report(
    institution_id: str = Query("inst-city-hospital"),
    db: AsyncSession = Depends(get_db)
):
    return await AnalyticsService.get_mis_report(db, institution_id)

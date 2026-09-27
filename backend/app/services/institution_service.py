from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Optional

from app.models.institution import Institution
from app.models.service import Service
from app.models.counter import Counter
from app.schemas.institution import InstitutionOut, ServiceOut, CounterOut

class InstitutionService:
    @staticmethod
    async def get_all_institutions(
        db: AsyncSession,
        query: Optional[str] = None,
        city: Optional[str] = None,
        type_filter: Optional[str] = None
    ) -> List[InstitutionOut]:
        stmt = select(Institution).where(Institution.is_active == True)
        if query:
            stmt = stmt.where(Institution.name.ilike(f"%{query}%"))
        if city:
            stmt = stmt.where(Institution.city.ilike(f"%{city}%"))
        if type_filter:
            stmt = stmt.where(Institution.type.ilike(f"%{type_filter}%"))

        result = await db.execute(stmt)
        institutions = result.scalars().all()

        output = []
        for inst in institutions:
            inst_out = InstitutionOut.model_validate(inst)
            
            # Fetch services
            serv_result = await db.execute(
                select(Service).where(Service.institution_id == inst.id, Service.is_active == True)
            )
            services = serv_result.scalars().all()
            inst_out.services = [ServiceOut.model_validate(s) for s in services]
            
            # Fetch counters
            cnt_result = await db.execute(
                select(Counter).where(Counter.institution_id == inst.id)
            )
            counters = cnt_result.scalars().all()
            inst_out.counters = [CounterOut.model_validate(c) for c in counters]
            
            output.append(inst_out)

        return output

    @staticmethod
    async def get_institution_by_id(db: AsyncSession, institution_id: str) -> Optional[InstitutionOut]:
        result = await db.execute(select(Institution).where(Institution.id == institution_id))
        inst = result.scalars().first()
        if not inst:
            return None

        inst_out = InstitutionOut.model_validate(inst)
        
        serv_result = await db.execute(
            select(Service).where(Service.institution_id == inst.id, Service.is_active == True)
        )
        services = serv_result.scalars().all()
        inst_out.services = [ServiceOut.model_validate(s) for s in services]

        cnt_result = await db.execute(
            select(Counter).where(Counter.institution_id == inst.id)
        )
        counters = cnt_result.scalars().all()
        inst_out.counters = [CounterOut.model_validate(c) for c in counters]

        return inst_out

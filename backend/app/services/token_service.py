from datetime import datetime
from typing import List, Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException, status

from app.models.queue import Queue
from app.models.service import Service
from app.models.token import Token
from app.models.counter import Counter
from app.models.institution import Institution
from app.schemas.token import TokenOut
from app.services.state_machine import TokenState, TokenStateMachine
from app.core.websocket_manager import ws_manager

class TokenService:
    @staticmethod
    async def join_queue(
        db: AsyncSession,
        service_id: str,
        user_id: str,
        user_name: str,
        user_phone: Optional[str] = None
    ) -> TokenOut:
        # Check service
        serv_result = await db.execute(select(Service).where(Service.id == service_id))
        service = serv_result.scalars().first()
        if not service:
            raise HTTPException(status_code=404, detail="Service not found")

        today_str = datetime.utcnow().strftime("%Y-%m-%d")

        # Find or create today's active queue
        q_result = await db.execute(
            select(Queue).where(Queue.service_id == service_id, Queue.date == today_str)
        )
        queue = q_result.scalars().first()
        if not queue:
            queue = Queue(
                service_id=service_id,
                institution_id=service.institution_id,
                date=today_str,
                status="ACTIVE",
                total_tokens=0,
                waiting_count=0,
                served_count=0,
                cancelled_count=0
            )
            db.add(queue)
            await db.flush()

        if queue.status != "ACTIVE":
            raise HTTPException(status_code=400, detail="Queue is currently paused or closed")

        queue.total_tokens += 1
        queue.waiting_count += 1
        token_num_seq = queue.total_tokens
        token_code = f"{service.name[0].upper() if service.name else 'T'}-{token_num_seq:03d}"

        # Estimate wait time
        active_counters_res = await db.execute(
            select(Counter).where(
                Counter.institution_id == service.institution_id,
                Counter.status == "OPEN"
            )
        )
        active_counters = len(active_counters_res.scalars().all()) or 1
        est_wait = max(5, int((queue.waiting_count - 1) * service.avg_service_time_mins / active_counters))

        token = Token(
            token_number=token_code,
            queue_id=queue.id,
            service_id=service_id,
            institution_id=service.institution_id,
            user_id=user_id,
            user_name=user_name,
            user_phone=user_phone,
            status=TokenState.WAITING,
            position=queue.waiting_count,
            estimated_wait_mins=est_wait
        )

        db.add(token)

        # Update institution waiting count
        inst_res = await db.execute(select(Institution).where(Institution.id == service.institution_id))
        inst = inst_res.scalars().first()
        if inst:
            inst.total_waiting += 1

        await db.commit()
        await db.refresh(token)

        # Broadcast WebSocket event
        await ws_manager.broadcast(
            f"queue_{queue.id}",
            {
                "event": "TOKEN_JOINED",
                "token_number": token.token_number,
                "waiting_count": queue.waiting_count,
                "total_tokens": queue.total_tokens
            }
        )

        return TokenOut.model_validate(token)

    @staticmethod
    async def call_next_token(db: AsyncSession, queue_id: str, counter_id: Optional[str] = None) -> TokenOut:
        # Find next waiting token
        result = await db.execute(
            select(Token)
            .where(Token.queue_id == queue_id, Token.status.in_([TokenState.WAITING, TokenState.APPROACHING, TokenState.ARRIVED]))
            .order_by(Token.position.asc())
        )
        token = result.scalars().first()
        if not token:
            raise HTTPException(status_code=404, detail="No waiting tokens in this queue")

        # State transition
        token.status = TokenState.SERVING
        token.called_at = datetime.utcnow()
        token.counter_id = counter_id

        # Update queue
        q_result = await db.execute(select(Queue).where(Queue.id == queue_id))
        queue = q_result.scalars().first()
        if queue:
            queue.current_serving_token_id = token.id

        await db.commit()
        await db.refresh(token)

        # Broadcast WS event
        await ws_manager.broadcast(
            f"queue_{queue_id}",
            {
                "event": "TOKEN_CALLED",
                "token_id": token.id,
                "token_number": token.token_number,
                "counter_id": counter_id,
                "status": "SERVING"
            }
        )

        return TokenOut.model_validate(token)

    @staticmethod
    async def complete_token(db: AsyncSession, token_id: str) -> TokenOut:
        result = await db.execute(select(Token).where(Token.id == token_id))
        token = result.scalars().first()
        if not token:
            raise HTTPException(status_code=404, detail="Token not found")

        token.status = TokenState.SERVED
        token.completed_at = datetime.utcnow()

        q_result = await db.execute(select(Queue).where(Queue.id == token.queue_id))
        queue = q_result.scalars().first()
        if queue:
            if queue.waiting_count > 0:
                queue.waiting_count -= 1
            queue.served_count += 1
            if queue.current_serving_token_id == token.id:
                queue.current_serving_token_id = None

        inst_res = await db.execute(select(Institution).where(Institution.id == token.institution_id))
        inst = inst_res.scalars().first()
        if inst and inst.total_waiting > 0:
            inst.total_waiting -= 1

        await db.commit()
        await db.refresh(token)

        # Re-index remaining tokens in queue
        await TokenService._reindex_positions(db, token.queue_id)

        await ws_manager.broadcast(
            f"queue_{token.queue_id}",
            {
                "event": "TOKEN_COMPLETED",
                "token_id": token.id,
                "token_number": token.token_number
            }
        )

        return TokenOut.model_validate(token)

    @staticmethod
    async def cancel_token(db: AsyncSession, token_id: str) -> TokenOut:
        result = await db.execute(select(Token).where(Token.id == token_id))
        token = result.scalars().first()
        if not token:
            raise HTTPException(status_code=404, detail="Token not found")

        token.status = TokenState.CANCELLED
        token.cancelled_at = datetime.utcnow()

        q_result = await db.execute(select(Queue).where(Queue.id == token.queue_id))
        queue = q_result.scalars().first()
        if queue:
            if queue.waiting_count > 0:
                queue.waiting_count -= 1
            queue.cancelled_count += 1

        inst_res = await db.execute(select(Institution).where(Institution.id == token.institution_id))
        inst = inst_res.scalars().first()
        if inst and inst.total_waiting > 0:
            inst.total_waiting -= 1

        await db.commit()
        await db.refresh(token)

        await TokenService._reindex_positions(db, token.queue_id)

        return TokenOut.model_validate(token)

    @staticmethod
    async def get_user_tokens(db: AsyncSession, user_id: str) -> List[TokenOut]:
        result = await db.execute(
            select(Token).where(Token.user_id == user_id).order_by(Token.created_at.desc())
        )
        tokens = result.scalars().all()
        return [TokenOut.model_validate(t) for t in tokens]

    @staticmethod
    async def _reindex_positions(db: AsyncSession, queue_id: str):
        result = await db.execute(
            select(Token)
            .where(Token.queue_id == queue_id, Token.status.in_([TokenState.WAITING, TokenState.APPROACHING, TokenState.ARRIVED]))
            .order_by(Token.created_at.asc())
        )
        tokens = result.scalars().all()
        for idx, t in enumerate(tokens, start=1):
            t.position = idx
            t.estimated_wait_mins = max(2, idx * 10)
        await db.commit()

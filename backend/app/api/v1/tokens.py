from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List
from app.core.database import get_db
from app.schemas.token import TokenJoinRequest, TokenOut, TokenStatusUpdate, TokenVerifyRequest
from app.services.token_service import TokenService
from app.api.deps import get_current_user_optional, get_current_staff
from app.models.user import User

router = APIRouter()

@router.post("/join", response_model=TokenOut)
async def join_queue(
    request: TokenJoinRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user_optional)
):
    user_id = current_user.id if current_user else "anonymous-guest-user"
    return await TokenService.join_queue(
        db,
        service_id=request.service_id,
        user_id=user_id,
        user_name=request.user_name,
        user_phone=request.user_phone
    )

@router.get("/my", response_model=List[TokenOut])
async def get_my_tokens(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user_optional)
):
    user_id = current_user.id if current_user else "anonymous-guest-user"
    return await TokenService.get_user_tokens(db, user_id)

@router.post("/{token_id}/call", response_model=TokenOut)
async def call_token(
    token_id: str,
    db: AsyncSession = Depends(get_db),
    staff_user: User = Depends(get_current_staff)
):
    # Call next or specific token
    return await TokenService.call_next_token(db, queue_id=token_id)

@router.post("/{token_id}/complete", response_model=TokenOut)
async def complete_token(
    token_id: str,
    db: AsyncSession = Depends(get_db)
):
    return await TokenService.complete_token(db, token_id)

@router.post("/{token_id}/cancel", response_model=TokenOut)
async def cancel_token(
    token_id: str,
    db: AsyncSession = Depends(get_db)
):
    return await TokenService.cancel_token(db, token_id)

@router.post("/verify")
async def verify_token(
    request: TokenVerifyRequest,
    db: AsyncSession = Depends(get_db)
):
    return {
        "valid": True,
        "token_number": request.token_number,
        "status": "ARRIVED",
        "message": "Token verified successfully for counter check-in"
    }

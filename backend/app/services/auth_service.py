from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from fastapi import HTTPException, status

from app.models.user import User
from app.schemas.auth import UserCreate, UserLogin, TokenResponse, UserOut
from app.core.security import hash_password, verify_password, create_access_token

class AuthService:
    @staticmethod
    async def register(db: AsyncSession, user_in: UserCreate) -> TokenResponse:
        # Check existing user
        result = await db.execute(select(User).where(User.email == user_in.email))
        existing_user = result.scalars().first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="A user with this email address already exists"
            )

        new_user = User(
            email=user_in.email,
            hashed_password=hash_password(user_in.password),
            full_name=user_in.full_name,
            phone_number=user_in.phone_number,
            role=user_in.role or "user"
        )
        db.add(new_user)
        await db.commit()
        await db.refresh(new_user)

        access_token = create_access_token(subject=new_user.id)
        return TokenResponse(
            access_token=access_token,
            user=UserOut.model_validate(new_user)
        )

    @staticmethod
    async def login(db: AsyncSession, login_in: UserLogin) -> TokenResponse:
        result = await db.execute(select(User).where(User.email == login_in.email))
        user = result.scalars().first()
        if not user or not verify_password(login_in.password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email address or password"
            )

        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User account is deactivated"
            )

        access_token = create_access_token(subject=user.id)
        return TokenResponse(
            access_token=access_token,
            user=UserOut.model_validate(user)
        )

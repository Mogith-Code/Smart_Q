import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base
from app.core.config import settings

# Flexible DB URI logic: fallback to SQLite if asyncpg database connection is not local PostgreSQL
db_url = settings.DATABASE_URL
if "postgresql" in db_url:
    # If using postgresql, ensure asyncpg driver
    db_url = db_url.replace("postgresql://", "postgresql+asyncpg://")

# Default to SQLite for local standalone development if needed
if os.getenv("USE_SQLITE", "true").lower() == "true" and "sqlite" not in db_url:
    db_url = "sqlite+aiosqlite:///./smartq.db"

engine = create_async_engine(
    db_url,
    echo=False,
    connect_args={"check_same_thread": False} if "sqlite" in db_url else {}
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False
)

Base = declarative_base()

async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

async def init_db():
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

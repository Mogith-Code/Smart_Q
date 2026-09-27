from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.core.database import init_db
from app.api.v1 import api_router
from seeds.seed_all import seed_data

import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..")))
try:
    from copy_assets import copy_logo_assets
    copy_logo_assets()
except Exception as e:
    print(f"Asset copy warning: {e}")

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Copy logo assets
    try:
        copy_logo_assets()
    except Exception:
        pass
    # Initialize database tables
    await init_db()
    # Seed default sample data if tables are empty
    await seed_data()
    yield

app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    description="SmartQ AI-Powered Virtual Queue Management API",
    lifespan=lifespan
)

# CORS Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/healthcheck")
async def healthcheck():
    return {
        "status": "ok",
        "service": settings.PROJECT_NAME,
        "environment": settings.ENVIRONMENT
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)

from typing import List
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "SmartQ"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = "development"
    
    # Database
    DATABASE_URL: str = "postgresql+asyncpg://smartq_admin:smartq_secret_password@localhost:5432/smartq_db"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379/0"
    
    # Security
    SECRET_KEY: str = "super_secret_jwt_key_change_in_production_32chars"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24
    
    # CORS
    CORS_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:3000", "*"]
    
    # AI & Services
    AI_SERVICE_URL: str = "http://localhost:8001"
    CHATBOT_SERVICE_URL: str = "http://localhost:8002"

    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()

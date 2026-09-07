from __future__ import annotations

import os
from dataclasses import dataclass


@dataclass(frozen=True)
class Settings:
    app_name: str = "AdaptIQ AI API"
    environment: str = os.getenv("ENVIRONMENT", "development")
    allowed_origins: tuple[str, ...] = tuple(
        origin.strip()
        for origin in os.getenv("ALLOWED_ORIGINS", "http://localhost:3000").split(",")
        if origin.strip()
    )
    dashscope_api_key: str | None = os.getenv("DASHSCOPE_API_KEY")
    qwen_model: str = os.getenv("QWEN_MODEL", "qwen-plus")
    qwen_base_url: str = os.getenv(
        "QWEN_BASE_URL",
        "https://dashscope-intl.aliyuncs.com/compatible-mode/v1",
    )
    ai_timeout_seconds: float = float(os.getenv("AI_TIMEOUT_SECONDS", "45"))
    supabase_url: str | None = os.getenv("SUPABASE_URL")
    supabase_service_role_key: str | None = os.getenv("SUPABASE_SERVICE_ROLE_KEY")


settings = Settings()

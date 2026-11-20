"""Health Check Endpoints"""

from datetime import datetime, timezone
from fastapi import APIRouter
from backend.app.core.config import settings

router = APIRouter(prefix="/health", tags=["Health"])


@router.get("")
def check_health():
    """Health check endpoint to verify backend status and AI mode."""
    is_ai_live = bool(settings.gemini_api_key.strip())

    return {
        "status": "healthy",
        "service": settings.app_name,
        "version": settings.app_version,
        "ai_configured": is_ai_live,
        "ai_mode": "live_gemini" if is_ai_live else "autonomous_chaos",
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "message": "StuPDT backend is live, operating at 100% bureaucracy and 0% helpfulness."
    }

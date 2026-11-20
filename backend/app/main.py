"""StuPDT FastAPI Application Main Entry Point"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.core.config import settings
from backend.app.routes import health

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="StuPDT — Stupid. Fast. Wrong. Satirical multi-department AI bureaucracy simulator."
)

# CORS 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routes under sa /api
app.include_router(health.router, prefix="/api")


@app.get("/")
def root():
    return {
        "name": settings.app_name,
        "version": settings.app_version,
        "docs": "/docs",
        "health": "/api/health"
    }

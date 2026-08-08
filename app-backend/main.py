from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

from app.api.auth import router as auth_router
from app.api.analysis import router as analysis_router
from app.api.dashboard import router as dashboard_router

from app.database.database import Base, engine
from app.models import User, Role


app = FastAPI(
    title="AgriVision AI App Backend",
)

# Create database tables
Base.metadata.create_all(bind=engine)


# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# API routers
app.include_router(auth_router)
app.include_router(analysis_router)
app.include_router(dashboard_router)


@app.get("/")
def home():
    return {
        "message": "AgriVision AI Backend Running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


# Run with: python main.py
if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8001,
        reload=True
    )
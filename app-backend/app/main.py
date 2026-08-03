from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.auth import router as auth_router

from app.database.database import Base, engine

from app.models import User, Role

app = FastAPI(
    title="AgriVision AI App Backend",
)

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)


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
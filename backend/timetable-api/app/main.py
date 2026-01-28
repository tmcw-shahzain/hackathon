from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.foundry import call_model
from app.routes import timetable
from app.routes import students
from app.db import mongodb_client, mongodb_db, get_db
import app.db as db_module

app = FastAPI(
    title="Timetable API",
    description="A FastAPI-based timetable management system",
    version="0.1.0",
)


# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Startup and shutdown events for MongoDB
@app.on_event("startup")
async def startup_db_client():
    db_module.mongodb_client = db_module.AsyncIOMotorClient(db_module.MONGODB_URL)
    db_module.mongodb_db = db_module.mongodb_client["main"]


@app.on_event("shutdown")
async def shutdown_db_client():
    if db_module.mongodb_client:
        db_module.mongodb_client.close()


# Include timetable routes
app.include_router(timetable.router)
app.include_router(students.router)


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": call_model("timetable", "timetable-generator-agent", "Hello, world!")
    }

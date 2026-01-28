from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.routes import health, items

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="FastAPI Boilerplate",
    version="1.0.0"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, prefix="/api", tags=["health"])
app.include_router(items.router, prefix="/api", tags=["items"])

@app.get("/")
async def root():
    return {"message": "Welcome to FastAPI Boilerplate"}

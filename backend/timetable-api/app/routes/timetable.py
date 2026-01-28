
from fastapi import APIRouter, Query, HTTPException, Depends
from motor.motor_asyncio import AsyncIOMotorDatabase
from app.db import get_db

router = APIRouter()


@router.get("/timetable")
async def get_timetable(
    academyId: str = Query(..., description="Academy ID"),
    db=Depends(get_db),
):
    if db is None:
        raise HTTPException(status_code=500, detail="Database not initialized")
    timetable = await db["academy"].find_one({"academyId": academyId})
    if not timetable:
        raise HTTPException(status_code=404, detail="Timetable not found")
    timetable["_id"] = str(timetable["_id"])
    return timetable

from fastapi import APIRouter, Query, HTTPException, Depends, Body
from app.db import get_db


router = APIRouter()


@router.get("/timetable")
async def get_timetable(
    academyId: str = Query(..., description="Academy ID"),
    db=Depends(get_db),
):
    if db is None:
        raise HTTPException(status_code=500, detail="Database not initialized")
    timetable = await db["timetable"].find_one({"academyId": academyId})
    if not timetable:
        raise HTTPException(status_code=404, detail="Timetable not found")
    timetable["_id"] = str(timetable["_id"])
    return timetable


@router.post("/timetable")
async def upsert_timetable(
    academyId: str = Query(..., description="Academy ID"),
    timetable: dict = Body(...),
    db=Depends(get_db),
):
    if db is None:
        raise HTTPException(status_code=500, detail="Database not initialized")
    timetable["academyId"] = academyId
    result = await db["timetable"].replace_one(
        {"academyId": academyId}, timetable, upsert=True
    )
    return {"upserted": result.upserted_id is not None, "matched": result.matched_count}

@router.get("/timetable/generate")
async def generate_timetable(
    academyId: str = Query(..., description="Academy ID")
):
    # Example: generate a default timetable structure
    timetable = {
        "academyId": academyId,
        "schedule": [
            {"day": "Monday", "subjects": ["Math", "English"]},
            {"day": "Tuesday", "subjects": ["Science", "History"]},
            {"day": "Wednesday", "subjects": ["Art", "PE"]},
            {"day": "Thursday", "subjects": ["Math", "Science"]},
            {"day": "Friday", "subjects": ["English", "History"]},
        ]
    }
    return timetable

from fastapi import APIRouter, Query, HTTPException, Depends, status
from app.db import get_db

from pydantic import BaseModel
from typing import List

router = APIRouter()

@router.get("/student")
async def get_student_by_id(
    studentId: str = Query(..., description="Student ID"),
    db=Depends(get_db),
):
    if db is None:
        raise HTTPException(status_code=500, detail="Database not initialized")

    # adjust collection name if yours is different ("student" / "students" / "academyStudents", etc.)
    student = await db["student"].find_one({"studentId": studentId})

    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    # convert ObjectId to str so it can be JSON-serialized like in your timetable example
    student["_id"] = str(student["_id"])
    return student

@router.delete("/student/delete")
async def delete_student_by_id(
    studentId: str = Query(..., description="Student ID to delete"),
    db=Depends(get_db),
):
    """
    Delete a student by studentId and return the deleted document
    (with `_id` converted to string). Returns 404 if not found.
    """
    if db is None:
        raise HTTPException(status_code=500, detail="Database not initialized")

    # find_one_and_delete returns the deleted document (or None)
    deleted = await db["student"].find_one_and_delete({"studentId": studentId})
    if not deleted:
        raise HTTPException(status_code=404, detail="Student not found")

    deleted["_id"] = str(deleted["_id"])
    return deleted


class ILP(BaseModel):
    skills: List[int] = []
    challenges: List[int] = []

class Student(BaseModel):
    name: str
    studentId: str
    ilp: ILP
    alumni: bool = False

@router.post("/student", status_code=status.HTTP_201_CREATED)
async def create_student(student: Student, db=Depends(get_db)):
    """
    Create a student document with this shape:
    {
      "name": "mhp",
      "studentId": "1",
      "ilp": { "skills": [1,2,3], "challenges": [1,2] },
      "alumni": false
    }
    Returns the inserted document with `_id` as a string.
    """
    if db is None:
        raise HTTPException(status_code=500, detail="Database not initialized")

    existing = await db["student"].find_one({"studentId": student.studentId})
    if existing:
        raise HTTPException(status_code=400, detail="Student with this studentId already exists")

    student_doc = student.dict()
    result = await db["student"].insert_one(student_doc)
    student_doc["_id"] = str(result.inserted_id)
    return student_doc

from fastapi import APIRouter, Query

from models.schemas import ProgressResponse
from services.repository import repository

router = APIRouter(prefix="/api", tags=["progress"])


@router.get("/progress", response_model=ProgressResponse)
async def get_progress(
    student_id: str = Query(default="development-student", min_length=1, max_length=120),
) -> ProgressResponse:
    return repository.get_progress(student_id)

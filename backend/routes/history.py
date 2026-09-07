from fastapi import APIRouter, Query

from models.schemas import HistoryResponse
from services.repository import repository

router = APIRouter(prefix="/api", tags=["history"])


@router.get("/history", response_model=HistoryResponse)
async def get_history(
    student_id: str = Query(default="development-student", min_length=1, max_length=120),
    limit: int = Query(default=50, ge=1, le=100),
) -> HistoryResponse:
    return HistoryResponse(entries=repository.get_history(student_id, limit))

from fastapi import APIRouter, Query

from models.schemas import LearningTwin, LearningTwinUpdate
from services.repository import repository

router = APIRouter(prefix="/api/learning-twin", tags=["learning-twin"])


@router.get("", response_model=LearningTwin)
async def get_learning_twin(
    student_id: str = Query(default="development-student", min_length=1, max_length=120),
) -> LearningTwin:
    return repository.get_twin(student_id)


@router.put("", response_model=LearningTwin)
async def update_learning_twin(
    updates: LearningTwinUpdate,
    student_id: str = Query(default="development-student", min_length=1, max_length=120),
) -> LearningTwin:
    return repository.update_twin(student_id, updates.model_dump(exclude_unset=True))

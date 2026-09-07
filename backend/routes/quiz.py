from fastapi import APIRouter

from models.schemas import QuizGenerateRequest, QuizResponse, QuizSubmitRequest, QuizSubmitResponse
from services.ai_service import ai_service
from services.repository import repository

router = APIRouter(prefix="/api/quiz", tags=["quiz"])


@router.post("/generate", response_model=QuizResponse)
async def generate_quiz(request: QuizGenerateRequest) -> QuizResponse:
    twin = repository.get_twin(request.student_id)
    return await ai_service.generate_quiz(request, twin)


@router.post("/submit", response_model=QuizSubmitResponse)
async def submit_quiz(request: QuizSubmitRequest) -> QuizSubmitResponse:
    result_id, score, twin = repository.submit_quiz(request)
    return QuizSubmitResponse(
        result_id=result_id,
        score=score,
        total_questions=request.total_questions,
        learning_twin=twin,
    )

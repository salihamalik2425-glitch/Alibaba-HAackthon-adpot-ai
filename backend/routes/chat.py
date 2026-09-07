from fastapi import APIRouter

from models.schemas import ChatRequest, ChatResponse
from services.ai_service import ai_service
from services.repository import repository

router = APIRouter(prefix="/api", tags=["chat"])


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest) -> ChatResponse:
    twin = repository.get_twin(request.student_id)
    answer = await ai_service.answer_question(request, twin)
    return ChatResponse(answer=answer, source="ai", student_id=request.student_id)

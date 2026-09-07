from fastapi import APIRouter, File, UploadFile

from errors import ValidationError
from models.schemas import LectureUploadResponse
from services.file_service import AUDIO_CONTENT_TYPES, validate_upload

router = APIRouter(prefix="/api/lecture", tags=["lecture"])


@router.post("/upload", response_model=LectureUploadResponse)
async def upload_lecture(file: UploadFile = File(...)) -> LectureUploadResponse:
    lecture_id = validate_upload(file.filename, file.content_type, AUDIO_CONTENT_TYPES)
    first_byte = await file.read(1)
    if not first_byte:
        raise ValidationError("The uploaded lecture recording is empty")
    return LectureUploadResponse(
        lecture_id=lecture_id,
        filename=file.filename or "unnamed-recording",
        status="received_not_transcribed",
        message="Lecture received. Speech-to-text is not configured yet, so no transcript was generated.",
    )

from fastapi import APIRouter, File, UploadFile

from errors import ValidationError
from models.schemas import UploadResponse
from services.file_service import PDF_CONTENT_TYPES, validate_upload

router = APIRouter(prefix="/api", tags=["documents"])


@router.post("/upload", response_model=UploadResponse)
async def upload_document(file: UploadFile = File(...)) -> UploadResponse:
    document_id = validate_upload(file.filename, file.content_type, PDF_CONTENT_TYPES)
    first_byte = await file.read(1)
    if not first_byte:
        raise ValidationError("The uploaded PDF is empty")
    return UploadResponse(
        document_id=document_id,
        filename=file.filename or "unnamed.pdf",
        status="received_not_processed",
        message="PDF received. Text extraction and persistence will be connected in a later phase.",
    )

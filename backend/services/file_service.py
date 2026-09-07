from __future__ import annotations

from uuid import uuid4

from errors import UnsupportedFileError, ValidationError

PDF_CONTENT_TYPES = {"application/pdf"}
AUDIO_CONTENT_TYPES = {
    "audio/mpeg",
    "audio/mp3",
    "audio/wav",
    "audio/x-wav",
    "audio/mp4",
    "audio/webm",
}


def validate_upload(filename: str | None, content_type: str | None, allowed_types: set[str]) -> str:
    if not filename or not filename.strip():
        raise ValidationError("A filename is required")
    normalized_type = (content_type or "").lower()
    if normalized_type not in allowed_types:
        allowed = ", ".join(sorted(allowed_types))
        raise UnsupportedFileError(f"Unsupported file type. Accepted types: {allowed}")
    return str(uuid4())

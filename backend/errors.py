from __future__ import annotations


class AppError(Exception):
    """Base exception for expected API failures."""

    status_code = 500
    code = "internal_error"

    def __init__(self, message: str) -> None:
        super().__init__(message)
        self.message = message


class ValidationError(AppError):
    status_code = 400
    code = "validation_error"


class IntegrationNotConfiguredError(AppError):
    status_code = 503
    code = "integration_not_configured"


class AIServiceError(AppError):
    status_code = 502
    code = "ai_service_error"


class UnsupportedFileError(AppError):
    status_code = 415
    code = "unsupported_file"


class ResourceNotFoundError(AppError):
    status_code = 404
    code = "not_found"

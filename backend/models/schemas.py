from __future__ import annotations

from datetime import datetime
from typing import Literal

from pydantic import BaseModel, Field, field_validator


class ErrorResponse(BaseModel):
    code: str
    message: str


class LearningTwin(BaseModel):
    student_id: str
    learning_style: str = "not_set"
    explanation_style: str = "not_set"
    confidence_score: int = Field(default=50, ge=0, le=100)
    strong_topics: list[str] = Field(default_factory=list)
    weak_topics: list[str] = Field(default_factory=list)
    recurring_mistakes: list[str] = Field(default_factory=list)
    updated_at: datetime


class LearningTwinUpdate(BaseModel):
    learning_style: str | None = Field(default=None, min_length=1, max_length=80)
    explanation_style: str | None = Field(default=None, min_length=1, max_length=120)
    confidence_score: int | None = Field(default=None, ge=0, le=100)
    strong_topics: list[str] | None = None
    weak_topics: list[str] | None = None
    recurring_mistakes: list[str] | None = None


class ChatRequest(BaseModel):
    question: str = Field(min_length=1, max_length=4000)
    student_id: str = Field(default="development-student", min_length=1, max_length=120)
    document_id: str | None = None

    @field_validator("question")
    @classmethod
    def question_must_not_be_blank(cls, value: str) -> str:
        if not value.strip():
            raise ValueError("Question must not be blank")
        return value.strip()


class ChatResponse(BaseModel):
    answer: str
    source: Literal["ai"]
    student_id: str


class UploadResponse(BaseModel):
    document_id: str
    filename: str
    status: Literal["received_not_processed"]
    message: str


class QuizGenerateRequest(BaseModel):
    topic: str = Field(min_length=1, max_length=200)
    difficulty: Literal["easy", "medium", "hard"] = "medium"
    number_of_questions: Literal[5, 10] = 5
    student_id: str = Field(default="development-student", min_length=1, max_length=120)


class QuizQuestion(BaseModel):
    question: str
    options: list[str] = Field(min_length=2)
    correct_answer: str
    explanation: str


class QuizResponse(BaseModel):
    topic: str
    questions: list[QuizQuestion]


class QuizSubmitRequest(BaseModel):
    student_id: str = Field(default="development-student", min_length=1, max_length=120)
    topic: str = Field(min_length=1, max_length=200)
    total_questions: int = Field(ge=1, le=100)
    correct_answers: int = Field(ge=0)
    mistakes: list[str] = Field(default_factory=list, max_length=50)

    @field_validator("correct_answers")
    @classmethod
    def correct_answers_cannot_exceed_total(cls, value: int, info):
        total = info.data.get("total_questions")
        if total is not None and value > total:
            raise ValueError("correct_answers cannot exceed total_questions")
        return value


class QuizSubmitResponse(BaseModel):
    result_id: str
    score: int
    total_questions: int
    learning_twin: LearningTwin


class LectureUploadResponse(BaseModel):
    lecture_id: str
    filename: str
    status: Literal["received_not_transcribed"]
    message: str


class ProgressResponse(BaseModel):
    quizzes_completed: int
    average_score: float
    topics_studied: int
    learning_streak: int


class HistoryEntry(BaseModel):
    id: str
    activity_type: str
    topic: str | None
    performance: float | None
    created_at: datetime


class HistoryResponse(BaseModel):
    entries: list[HistoryEntry]

from datetime import datetime
from typing import Annotated, Optional

from pydantic import BaseModel, ConfigDict, EmailStr, Field, UUID4

from ..core.schemas import PersistentDeletion, TimestampSchema, UUIDSchema


class DoctorBase(BaseModel):
    name: Annotated[str, Field(
        min_length=2, max_length=30, examples=["User"])]
    email: Annotated[EmailStr, Field(
        min_length=2, max_length=30, examples=["user@example.com"])]
    gender: Annotated[str, Field(examples=["Male"])]
    hospital_id: Annotated[str, Field(examples=["Hospital ID"])]


class Doctor(TimestampSchema, DoctorBase, UUIDSchema, PersistentDeletion):
    profile_image_url: Annotated[str, Field(
        default="https://www.profileimageurl.com")]
    hashed_password: str
    is_superuser: bool = False
    role: str = "Doctor"


class DoctorRead(BaseModel):
    id: int
    name: Annotated[str, Field(
        min_length=2, max_length=30, examples=["User"])]
    email: Annotated[EmailStr, Field(
        min_length=2, max_length=30, examples=["user@example.com"])]
    gender: Annotated[str, Field(examples=["Male"])]
    hospital_id: str
    doctor_id: str
    profile_image_url: str
    created_at: datetime
    uuid: UUID4


class DoctorCreate(DoctorBase):
    model_config = ConfigDict(extra="forbid")
    password: Annotated[str, Field(
        pattern=r"^.{8,}|[0-9]+|[A-Z]+|[a-z]+|[^a-zA-Z0-9]+$", examples=["Str1ngst!"])]


class DoctorCreateInternal(DoctorBase):
    hashed_password: str
    doctor_id: str
    profile_image_url: str
    hospital_id: str


class DoctorUpdate(BaseModel):
    model_config = ConfigDict(extra="forbid")
    name: Optional[Annotated[str, Field(
        min_length=2, max_length=30, examples=["User"])]] = None
    profile_image_url: Optional[Annotated[str, Field(
        pattern=r"^(https?|ftp)://[^\s/$.?#].[^\s]*$", examples=["https://www.profileimageurl.com"])]] = None


class DoctorUpdateInternal(DoctorUpdate):
    updated_at: datetime


class DoctorUpdatePassword(BaseModel):
    model_config = ConfigDict(extra="forbid")
    password: Annotated[str, Field(
        pattern=r"^.{8,}|[0-9]+|[A-Z]+|[a-z]+|[^a-zA-Z0-9]+$", examples=["Str1ngst!"])]


class DoctorUpdatePasswordInternal(BaseModel):

    hashed_password: str


class DoctorDelete(BaseModel):
    model_config = ConfigDict(extra="forbid")
    deleted_at: datetime
    is_deleted: bool = True


class DoctorRestoreDeleted(BaseModel):
    is_deleted: bool

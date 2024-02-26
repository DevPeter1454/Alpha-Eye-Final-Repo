from datetime import datetime
from typing import Annotated, Optional

from pydantic import BaseModel, ConfigDict, EmailStr, Field

from ..core.schemas import PersistentDeletion, TimestampSchema, UUIDSchema


class PatientBase(BaseModel):
    firstname: Annotated[str, Field(
        min_length=2, max_length=30, examples=["User"])]
    lastname: Annotated[str, Field(
        min_length=2, max_length=30, examples=["Userson"])]
    age: Annotated[int, Field(examples=[18])]
    gender: Annotated[str, Field(examples=["Male"])]
    address: str
    phone: Annotated[str, Field(examples=["+2347040804981"])]
    city: Annotated[str, Field(examples=["Lagos"])]
    state_of_residence: Annotated[str, Field(examples=["Lagos"])]


class Patient(TimestampSchema, PatientBase, UUIDSchema, PersistentDeletion):
    profile_image_url: Annotated[str, Field(
        default="https://www.profileimageurl.com")]
    is_superuser: bool = False
    role: str = "Patient"


class PatientRead(BaseModel):
    id: int

    firstname: Annotated[str, Field(
        min_length=2, max_length=30, examples=["User"])]
    lastname: Annotated[str, Field(
        min_length=2, max_length=30, examples=["Userson"])]
    age: Annotated[int, Field(examples=[18])]
    gender: Annotated[str, Field(examples=["Male"])]
    address: str
    phone: Annotated[str, Field(examples=["+2347040804981"])]
    # profile_image_url: str
    city: Annotated[str, Field(examples=["Lagos"])]
    state_of_residence: Annotated[str, Field(examples=["Lagos"])]
    special_id: str
    hospital_id: str
    created_at: datetime

class PatientCreate(PatientBase):
    model_config = ConfigDict(extra="forbid")


class PatientCreateInternal(PatientBase):
    special_id: str
    hospital_id: str


class PatientUpdate(BaseModel):
    model_config = ConfigDict(extra="forbid")
    firstname: Optional[Annotated[str, Field(
        min_length=2, max_length=30, examples=["User"])]] = None
    lastname: Optional[Annotated[str, Field(
        min_length=2, max_length=30, examples=["Userson"])]] = None
    age: Optional[Annotated[int, Field(examples=[18])]] = None
    gender: Optional[Annotated[str, Field(examples=["Male"])]] = None
    address: Optional[str] = None
    phone: Optional[Annotated[str, Field(examples=["+2347040804981"])]] = None
    profile_image_url: Optional[Annotated[str, Field(
        pattern=r"^(https?|ftp)://[^\s/$.?#].[^\s]*$", examples=["https://www.profileimageurl.com"])]] = None
    city: Optional[Annotated[str, Field(examples=["Lagos"])]] = None
    state_of_residence: Optional[Annotated[str,
                                           Field(examples=["Lagos"])]] = None


class PatientUpdateInternal(PatientUpdate):
    updated_at: datetime


class PatientDelete(BaseModel):
    model_config = ConfigDict(extra="forbid")

    is_deleted: bool
    deleted_at: datetime


class PatientRestoreDeleted(BaseModel):
    is_deleted: bool

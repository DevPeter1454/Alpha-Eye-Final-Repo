from datetime import datetime
from typing import Annotated, Optional

from pydantic import BaseModel, ConfigDict, EmailStr, Field

from ..core.schemas import PersistentDeletion, TimestampSchema, UUIDSchema


class HospitalBase(BaseModel):
    hospital_name: Annotated[str, Field(min_length=2, max_length=50, examples=[
                                        "Bowen University Teaching Hospital"])]
    address: str
    city: Annotated[str, Field(examples=["Lagos"])]
    state: Annotated[str, Field(examples=["Lagos"])]
    license_number: Annotated[str, Field(examples=["xxxxxxxx"])]
    logo_url: Annotated[str, Field(
        default="https://www.profileimageurl.com")]
    lga: Annotated[str, Field(examples=["Lagos"])]
    admin_email: Annotated[EmailStr, Field(
        examples=["user.userson@example.com"])]
    phone: Annotated[str, Field(examples=["+2347040804981"])]
    is_approved: bool = True


class Hospital(TimestampSchema, HospitalBase, UUIDSchema, PersistentDeletion):
    hashed_password: str
    is_superuser: bool = True
    role: str = "Hospital"


class HospitalRead(BaseModel):
    id: int

    hospital_name: Annotated[str, Field(min_length=2, max_length=50, examples=[
                                        "Bowen University Teaching Hospital"])]
    address: str
    city: Annotated[str, Field(examples=["Lagos"])]
    state: Annotated[str, Field(examples=["Lagos"])]
    license_number: Annotated[str, Field(examples=["xxxxxxxx"])]
    logo_url: Annotated[str, Field(
        default="https://www.profileimageurl.com")]
    lga: Annotated[str, Field(examples=["Lagos"])]
    admin_email: Annotated[EmailStr, Field(
        examples=["user.userson@example.com"])]
    phone: Annotated[str, Field(examples=["+2347040804981"])]
    is_approved: bool
    hospital_id: str


class HospitalCreate(HospitalBase):
    model_config = ConfigDict(extra="forbid")

    password: Annotated[str, Field(
        pattern=r"^.{8,}|[0-9]+|[A-Z]+|[a-z]+|[^a-zA-Z0-9]+$", examples=["Str1ngst!"])]


class HospitalCreateInternal(HospitalBase):
    hashed_password: str
    hospital_id: str


class HospitalUpdate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    hospital_name: Optional[Annotated[str, Field(min_length=2, max_length=50, examples=[
        "Bowen University Teaching Hospital"])]]
    address: Optional[str]
    city: Optional[Annotated[str, Field(examples=["Lagos"])]]
    state: Optional[Annotated[str, Field(examples=["Lagos"])]]
    license_number: Optional[Annotated[str, Field(examples=["xxxxxxxx"])]]
    logo_url: Optional[Annotated[str, Field(
        default="https://www.profileimageurl.com")]]
    lga: Optional[Annotated[str, Field(examples=["Lagos"])]]
    admin_email: Optional[Annotated[EmailStr, Field(
        examples=["user.userson@example.com"])]]
    phone: Optional[Annotated[str, Field(examples=["+2347040804981"])]]


class HospitalUpdateInternal(HospitalUpdate):
    updated_at: datetime


class HospitalDelete(BaseModel):
    model_config = ConfigDict(extra="forbid")

    is_deleted: bool
    deleted_at: datetime


class HospitalRestoreDeleted(BaseModel):
    is_deleted: bool

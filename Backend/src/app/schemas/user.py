from datetime import datetime
from typing import Annotated, Optional

from pydantic import BaseModel, ConfigDict, EmailStr, Field

from ..core.schemas import PersistentDeletion, TimestampSchema, UUIDSchema


class UserBase(BaseModel):
    firstname: Annotated[str, Field(
        min_length=2, max_length=30, examples=["User"])]
    lastname: Annotated[str, Field(
        min_length=2, max_length=30, examples=["Userson"])]
    age: Annotated[int, Field(examples=[18])]
    gender: Annotated[str, Field(examples=["Male"])]
    address: str
    phone: Annotated[str, Field(examples=["+2347040804981"])]
    email: Annotated[EmailStr, Field(examples=["user.userson@example.com"])]
    city: Annotated[str, Field(examples=["Lagos"])]
    state_of_residence: Annotated[str, Field(examples=["Lagos"])]


class User(TimestampSchema, UserBase, UUIDSchema, PersistentDeletion):
    profile_image_url: Annotated[str, Field(
        default="https://www.profileimageurl.com")]
    hashed_password: str
    is_superuser: bool = False
    role: str = "User"


class UserRead(BaseModel):
    id: int

    firstname: Annotated[str, Field(
        min_length=2, max_length=30, examples=["User"])]
    lastname: Annotated[str, Field(
        min_length=2, max_length=30, examples=["Userson"])]
    age: Annotated[int, Field(examples=[18])]
    gender: Annotated[str, Field(examples=["Male"])]
    address: str
    phone: Annotated[str, Field(examples=["+2347040804981"])]
    email: Annotated[EmailStr, Field(examples=["user.userson@example.com"])]
    profile_image_url: str
    city: Annotated[str, Field(examples=["Lagos"])]
    state_of_residence: Annotated[str, Field(examples=["Lagos"])]
    special_id: str


class UserCreate(UserBase):
    model_config = ConfigDict(extra="forbid")

    password: Annotated[str, Field(
        pattern=r"^.{8,}|[0-9]+|[A-Z]+|[a-z]+|[^a-zA-Z0-9]+$", examples=["Str1ngst!"])]

    # special_id: str


class UserCreateInternal(UserBase):
    hashed_password: str
    special_id: str


class UserUpdate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    firstname: Optional[Annotated[str, Field(
        min_length=2, max_length=30, examples=["User"])]] = None
    lastname: Optional[Annotated[str, Field(
        min_length=2, max_length=30, examples=["Userson"])]] = None
    age: Optional[Annotated[int, Field(examples=[18])]] = None
    gender: Optional[Annotated[str, Field(examples=["Male"])]] = None
    address: Optional[str] = None
    phone: Optional[Annotated[str, Field(examples=["+2347040804981"])]] = None
    email: Optional[Annotated[EmailStr, Field(
        examples=["user.userson@example.com"])]] = None
    profile_image_url: Optional[Annotated[str, Field(
        pattern=r"^(https?|ftp)://[^\s/$.?#].[^\s]*$", examples=["https://www.profileimageurl.com"])]] = None
    city: Optional[Annotated[str, Field(examples=["Lagos"])]] = None
    state_of_residence: Optional[Annotated[str,
                                           Field(examples=["Lagos"])]] = None


class UserUpdateInternal(UserUpdate):
    updated_at: datetime


class UserTierUpdate(BaseModel):
    tier_id: int


class UserDelete(BaseModel):
    model_config = ConfigDict(extra="forbid")

    is_deleted: bool
    deleted_at: datetime


class UserRestoreDeleted(BaseModel):
    is_deleted: bool

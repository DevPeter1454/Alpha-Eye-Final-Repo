from datetime import datetime
from typing import Annotated, Optional

from pydantic import BaseModel, ConfigDict, EmailStr, Field, UUID4

from ..core.schemas import PersistentDeletion, TimestampSchema, UUIDSchema

class PrescriptionBase(BaseModel):
    medication_name:Annotated[str, Field(
        min_length=2, max_length=30, examples=["User"])]
    dosage: Annotated[str, Field(
        min_length=2, max_length=30, examples=["User"])]
    prescription: Annotated[str, Field(
        min_length=2, max_length=30, examples=["User"])]
    
    doctor_id: str

    patient_id: str

    created_at: datetime
    
    
class PrescriptionCreate(PrescriptionBase):
    model_config = ConfigDict(extra="forbid")
    
class PrescriptionRead(BaseModel):
    id: int
    medication_name:Annotated[str, Field(
        min_length=2, max_length=30, examples=["User"])]
    dosage: Annotated[str, Field(
        min_length=2, max_length=30, examples=["User"])]
    prescription: Annotated[str, Field(
        min_length=2, max_length=30, examples=["User"])]
    
    doctor_id: str

    patient_id: str

    created_at: datetime
    is_deleted: bool = False
    

class PrescriptionUpdate(BaseModel):
    pass

class Prescription(PrescriptionBase, TimestampSchema, UUIDSchema, PersistentDeletion):
    pass

class PrescriptionDelete(BaseModel):
    model_config = ConfigDict(extra="forbid")
    deleted_at: datetime
    is_deleted: bool = True

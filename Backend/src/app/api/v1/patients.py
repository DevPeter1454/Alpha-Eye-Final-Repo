from typing import Annotated, Any

import fastapi
from fastapi import Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession

from ...api.dependencies import get_current_superuser, get_current_user, generate_special_id, get_current_doctor_or_hospital
from ...api.paginated import PaginatedListResponse, compute_offset, paginated_response
from ...core.db.database import async_get_db
from ...core.exceptions.http_exceptions import DuplicateValueException, ForbiddenException, NotFoundException
from ...core.security import blacklist_token, get_password_hash, oauth2_scheme
from ...crud.crud_rate_limit import crud_rate_limits

from ...crud.crud_patients import crud_patients
from ...crud.crud_users import crud_users
from ...schemas.patient import PatientCreate, PatientRead, PatientUpdate, PatientCreateInternal


router = fastapi.APIRouter(tags=["patients"])


@router.post("/patient", response_model=PatientRead, status_code=201)
async def write_patient(request: Request, current_user: Annotated[dict, Depends(get_current_doctor_or_hospital)], patient: PatientCreate, db: Annotated[AsyncSession, Depends(async_get_db)]) -> PatientRead:
    # print(current_user[])
    exists = await crud_users.exists(db=db, phone=patient.phone)
    if exists:
        raise ForbiddenException(
            "User with this phone number already exists create Patient with special ID")

    patient_row = await crud_patients.get(db=db, phone=patient.phone)
    if patient_row is not None:
        raise DuplicateValueException("Patient is already registered")
    patient_internal_dict = patient.model_dump()
    patient_internal_dict["special_id"] = generate_special_id()
    patient_internal_dict["hospital_id"] = current_user["hospital_id"]

    patient_internal = PatientCreateInternal(**patient_internal_dict)
    created_patient: PatientRead = await crud_patients.create(db=db, object=patient_internal)
    return created_patient


@router.get("/patients", response_model=PaginatedListResponse[PatientRead], status_code=200)
async def read_all_patients(request: Request, current_user: Annotated[dict, Depends(get_current_doctor_or_hospital)], db: Annotated[AsyncSession, Depends(async_get_db)], page: int = 1, items_per_page: int = 10) -> dict:
    patients_data = await crud_patients.get_multi(
        db=db,
        offset=compute_offset(page, items_per_page),
        limit=items_per_page,
        schema_to_select=PatientRead,
        hospital_id=current_user["hospital_id"],
        is_deleted=False
    )

    return paginated_response(crud_data=patients_data, page=page, items_per_page=items_per_page)


@router.post("/patients/create/{special_id}", status_code=201)
async def create_patient_with_special_id(request: Request, current_user: Annotated[dict, Depends(get_current_doctor_or_hospital)], special_id: str, db: Annotated[AsyncSession, Depends(async_get_db)]) -> PatientRead:
    patient_row = await crud_patients.get(db=db, special_id=special_id)
    if patient_row is not None:
        raise DuplicateValueException("Patient is already registered")
    patient_details = await crud_users.get(db=db, special_id=special_id)
    if patient_details is None:
        raise NotFoundException("User not found")

    patient_details["role"] = "Patient"
    patient_details["hospital_id"] = current_user["hospital_id"]
    del [patient_details['hashed_password']]
    del [patient_details['email']]
    del [patient_details['id']]
    del [patient_details['profile_image_url']]

    patient_internal = PatientCreateInternal(**patient_details)
    created_patient: PatientRead = await crud_patients.create(db=db, object=patient_internal)
    return created_patient

@router.get("/patient/{special_id}")
async def read_patient_details(
    request:Request,
    special_id: str,
    db: Annotated[AsyncSession, Depends(async_get_db)],
    current_user: Annotated[dict, Depends(get_current_doctor_or_hospital)]
):
    patient_row = await crud_patients.get(db=db, special_id=special_id, schema_to_select=PatientRead)
    if patient_row is None:
        raise NotFoundException("Patient not found")
    if patient_row["hospital_id"] != current_user["hospital_id"]:
        raise ForbiddenException("You are not allowed to access this patient")
    return patient_row
    

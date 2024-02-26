from typing import Annotated, Any

import fastapi
from fastapi import Depends, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import func
from ...api.dependencies import get_current_superuser, get_current_user, generate_hospital_id, get_current_doctor_or_hospital
from ...api.paginated import PaginatedListResponse, compute_offset, paginated_response
from ...core.db.database import async_get_db
from ...core.exceptions.http_exceptions import DuplicateValueException, ForbiddenException, NotFoundException
from ...core.security import blacklist_token, get_password_hash, oauth2_scheme
from ...crud.crud_rate_limit import crud_rate_limits
from ...crud.crud_tier import crud_tiers
from ...crud.crud_hospitals import crud_hospitals
from ...crud.crud_doctors import crud_doctors
from ...crud.crud_patients import crud_patients
from ...models.tier import Tier
from ...schemas.tier import TierRead
from ...schemas.hospital import HospitalCreate, HospitalCreateInternal, HospitalRead, HospitalUpdate
from ...schemas.doctor import DoctorRead
from ...schemas.patient import PatientRead
from pydantic import EmailStr
from ...core.utils.cache import cache
from functools import wraps

router = fastapi.APIRouter(tags=["hospitals"])


@router.post("/hospital", response_model=HospitalRead, status_code=201)
async def write_hospital(
    request: Request,
    hospital: HospitalCreate,
    db: Annotated[AsyncSession, Depends(async_get_db)]
) -> HospitalRead:

    hospital_row = await crud_hospitals.get(db=db, admin_email=hospital.admin_email, hospital_name=hospital.hospital_name.lower())
    if hospital_row is not None:
        raise DuplicateValueException("Hospital is already registered")
    hospital_internal_dict = hospital.model_dump()
    hospital_internal_dict["is_approved"] = True
    hospital_internal_dict["hashed_password"] = get_password_hash(
        password=hospital_internal_dict["password"])
    hospital_internal_dict["hospital_id"] = generate_hospital_id()
    del hospital_internal_dict["password"]

    hospital_internal = HospitalCreateInternal(**hospital_internal_dict)
    created_hospital: HospitalRead = await crud_hospitals.create(db=db, object=hospital_internal)
    return created_hospital


@router.get("/hospitals", response_model=PaginatedListResponse[HospitalRead], status_code=200)
# define the cache function for this endpoint to get all hospitals
async def get_all_hospitals(
    request: Request,
    current_user: Annotated[dict, Depends(get_current_doctor_or_hospital)],
    db: Annotated[AsyncSession, Depends(async_get_db)],
    page: int = 1,
    items_per_page: int = 10
) -> dict:
    hospitals_data = await crud_hospitals.get_multi(
        db=db,
        offset=compute_offset(page, items_per_page),
        limit=items_per_page,
        schema_to_select=HospitalRead,
        is_deleted=False
    )

    return paginated_response(crud_data=hospitals_data, page=page, items_per_page=items_per_page)


@router.get("/hospitals/city/{city}", response_model=PaginatedListResponse[HospitalRead], status_code=200)
async def filter_by_city(city: str,
                         request: Request,
                         db: Annotated[AsyncSession, Depends(async_get_db)],
                         page: int = 1,
                         items_per_page: int = 10):
    hospitals_data = await crud_hospitals.get_multi(
        db=db,
        offset=compute_offset(page, items_per_page),
        limit=items_per_page,
        schema_to_select=HospitalRead,
        is_deleted=False,
        city=city
    )
    # print(hospitals_data)
    return paginated_response(crud_data=hospitals_data, page=page, items_per_page=items_per_page)


@router.get("/hospitals/state/{state}", response_model=PaginatedListResponse[HospitalRead], status_code=200)
async def filter_by_city(state: str,
                         request: Request,
                         db: Annotated[AsyncSession, Depends(async_get_db)],
                         page: int = 1,
                         items_per_page: int = 10):
    hospitals_data = await crud_hospitals.get_multi(
        db=db,
        offset=compute_offset(page, items_per_page),
        limit=items_per_page,
        schema_to_select=HospitalRead,
        is_deleted=False,
        state=state
    )
    # print(hospitals_data)
    return paginated_response(crud_data=hospitals_data, page=page, items_per_page=items_per_page)


@router.get("/hospital/doctors/{hospital_id}", status_code=200)
@cache(key_prefix="{hospital_id}_doctors_list_cache", resource_id_name="hospital_id", expiration=60, )
async def get_hospital_doctors(
    request: Request,
    hospital_id: str,
    current_user: Annotated[dict, Depends(get_current_doctor_or_hospital)],
    db: Annotated[AsyncSession, Depends(async_get_db)]
) -> dict:
    hospital_id = current_user["hospital_id"]
    hospital_data = await crud_hospitals.get(db=db, hospital_id=hospital_id, )
    if hospital_data is None:
        raise NotFoundException("Hospital not found")
    hospital_doctors = await crud_doctors.get_multi(db=db, hospital_id=hospital_id, schema_to_select=DoctorRead, is_deleted=False)
    return hospital_doctors


@router.get("/hospital/patients/{hospital_id}", status_code=200)
@cache(key_prefix="{hospital_id}_patients_list_cache", resource_id_name="hospital_id")
async def get_hospital_patients(
    request: Request,
    hospital_id: str,
    current_user: Annotated[dict, Depends(get_current_doctor_or_hospital)],
    db: Annotated[AsyncSession, Depends(async_get_db)]
) -> dict:
    hospital_id = current_user["hospital_id"]
    hospital_data = await crud_hospitals.get(db=db, hospital_id=hospital_id)
    if hospital_data is None:
        raise NotFoundException("Hospital not found")
    hospital_patients = await crud_patients.get_multi(db=db, hospital_id=hospital_id, schema_to_select=PatientRead)
    return hospital_patients

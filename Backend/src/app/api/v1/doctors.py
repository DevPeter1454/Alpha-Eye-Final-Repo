from typing import Annotated, Any

import fastapi
from fastapi import Depends, Request, UploadFile, Form, File
from sqlalchemy.ext.asyncio import AsyncSession

from ...api.dependencies import get_current_superuser, get_current_doctor_or_hospital, generate_doctor_id
from ...api.paginated import PaginatedListResponse, compute_offset, paginated_response
from ...core.db.database import async_get_db
from ...core.exceptions.http_exceptions import DuplicateValueException, ForbiddenException, NotFoundException
from ...core.security import blacklist_token, get_password_hash, oauth2_scheme
from ...crud.crud_rate_limit import crud_rate_limits
from ...crud.crud_tier import crud_tiers
from ...crud.crud_doctors import crud_doctors
from ...crud.crud_patients import crud_patients
from ...crud.crud_hospitals import crud_hospitals
from ...crud.crud_prescriptions import crud_prescriptions
from ...models.tier import Tier
from ...models.prescription import Prescriptions
from ...models.patients import Patient
from ...schemas.tier import TierRead
from ...schemas.hospital import HospitalRead
from ...schemas.doctor import DoctorCreate, DoctorCreateInternal, DoctorRead, DoctorUpdate
from ...schemas.prescription import PrescriptionCreate, PrescriptionRead, PrescriptionUpdate
from ...core.utils.cache import cache
from pydantic import EmailStr
from ...core.config import settings
from ...core.firebase_config import firebase_db
from ...core.fcm_manager import send_notification
import cloudinary
import cloudinary.uploader



router = fastapi.APIRouter(tags=["doctors"])

cloudinary.config(
    cloud_name=f"{settings.CLOUDINARY_CLOUD_NAME}",
    api_key=f"{settings.CLOUDINARY_API_KEY}",
    api_secret=f"{settings.CLOUDINARY_API_SECRET}"
)




@router.post("/doctor", status_code=201, response_model=DoctorRead)
async def write_doctor(
    request: Request,
    hospital_id: str,
        db: Annotated[AsyncSession, Depends(async_get_db)],
        current_user: Annotated[HospitalRead, Depends(get_current_doctor_or_hospital)],
        doctor: DoctorCreate = Depends(),
        file: UploadFile = File(...), ) -> DoctorRead:
    doctor_row = await crud_doctors.get(db=db, email=doctor.email)
    if doctor_row is not None:
        raise DuplicateValueException("Doctor is already registered")

    if hospital_id != current_user["hospital_id"]:
        raise ForbiddenException(
            "You are not authorized to perform this action")

    response = cloudinary.uploader.upload(file.file)

    doctor_internal_dict = doctor.model_dump()
    doctor_internal_dict["hashed_password"] = get_password_hash(
        password=doctor_internal_dict["password"])
    doctor_internal_dict["doctor_id"] = generate_doctor_id()
    doctor_internal_dict["profile_image_url"] = response["url"]
    doctor_internal_dict["hospital_id"] = current_user["hospital_id"]
    del doctor_internal_dict["password"]
    doctor_internal = DoctorCreateInternal(
        **doctor_internal_dict)
    created_doctor: DoctorRead = await crud_doctors.create(db=db, object=doctor_internal)
    return


@router.post("/doctor/prescribe", status_code=201, )
async def write_prescription(prescription: PrescriptionCreate, db: Annotated[AsyncSession, Depends(async_get_db)],
                             current_user: Annotated[HospitalRead, Depends(get_current_doctor_or_hospital)], ):

    if prescription.doctor_id != current_user["doctor_id"]:
        raise ForbiddenException(
            "You are not authorized to perform this action")
    
    patient_row = await crud_patients.get(db=db,special_id=prescription.patient_id)

    first_name = patient_row["firstname"]
    last_name = patient_row["lastname"]

    special_id = patient_row["special_id"]

    full_name = f"{first_name} {last_name}"

    if patient_row is None:
        raise NotFoundException("Patient not found")

    user = firebase_db.child("users").child("AE316492").get()

    send_notification("Prescription Alert!", f"Hello {full_name} you have a new prescription from your doctor", user.val()["tokens"])

    prescription_internal_dict = prescription.model_dump()

    prescription_internal = PrescriptionCreate(
        **prescription_internal_dict)
    created_prescription: PrescriptionRead = await crud_prescriptions.create(db=db, object=prescription_internal)
    return created_prescription

@router.get("/doctor/prescriptions", status_code= 200)
async def get_prescriptions_list(
    request: Request,
    db: Annotated[AsyncSession, Depends(async_get_db)],
    current_user: Annotated[HospitalRead, Depends(get_current_doctor_or_hospital)],
    page: int = 1,
    items_per_page: int = 10
):
    

    prescriptions_data = await crud_prescriptions.get_multi(db=db, doctor_id= current_user["doctor_id"], offset=compute_offset(page, items_per_page),
        limit=items_per_page,)
    
    return prescriptions_data

@router.patch("/doctor/prescription/{prescription_id}")
async def update_prescription():
    pass


@router.delete("/doctor/{doctor_id}")
async def erase_doctor(
    request: Request,
    doctor_id: str,
    db: Annotated[AsyncSession, Depends(async_get_db)],
    current_user: Annotated[HospitalRead,
                            Depends(get_current_doctor_or_hospital)]
):
    doctor = await crud_doctors.get(db=db, doctor_id=doctor_id)
    if doctor is None:
        raise NotFoundException("Doctor not found")
    await crud_doctors.delete(db=db, doctor_id=doctor_id)
    return {"detail": "Successfully deleted the doctor"}

from typing import Annotated, Any

import fastapi
from fastapi import Depends, Request, UploadFile, Form, File
from sqlalchemy.ext.asyncio import AsyncSession

from ...api.dependencies import get_current_superuser, get_current_doctor_or_hospital, generate_doctor_id, get_current_user, generate_scan_id
import requests

from ...api.paginated import PaginatedListResponse, compute_offset, paginated_response
from ...core.db.database import async_get_db
from ...core.exceptions.http_exceptions import DuplicateValueException, ForbiddenException, NotFoundException
from ...core.security import blacklist_token, get_password_hash, oauth2_scheme
from ...api.paginated import PaginatedListResponse, compute_offset, paginated_response
from ...core.db.database import async_get_db
from ...core.exceptions.http_exceptions import DuplicateValueException, ForbiddenException, NotFoundException
from ...core.security import blacklist_token, get_password_hash, oauth2_scheme
from ...crud.crud_rate_limit import crud_rate_limits
from ...crud.crud_users import crud_users
from ...crud.crud_tier import crud_tiers
from ...crud.crud_scans import crud_scans
from ...crud.crud_patients import crud_patients
from ...crud.crud_doctors import crud_doctors
from ...schemas.scans import ScanCreate, ScanRead, ScanUpdate
from ...schemas.user import UserRead
from ...models.patients import Patient

from ...models.scans import Scans
from ...models.user import User
from ...core.utils.cache import cache
from pydantic import EmailStr
from ...core.config import settings
import cloudinary
import cloudinary.uploader
import datetime


router = fastapi.APIRouter(prefix="/scans", tags=["scans"])

cloudinary.config(
    cloud_name=f"{settings.CLOUDINARY_CLOUD_NAME}",
    api_key=f"{settings.CLOUDINARY_API_KEY}",
    api_secret=f"{settings.CLOUDINARY_API_SECRET}"
)


@router.post("/upload")
async def upload_scan(
    db: Annotated[AsyncSession, Depends(async_get_db)],
    current_user: Annotated[UserRead, Depends(get_current_user)],
    request: Request,
    file: UploadFile = File(...),
):
    if current_user["role"] in ["Doctor", "Hospital"]:
        raise ForbiddenException("Not authorized")

    user_exists = await crud_users.exists(db=db, id=current_user["id"])

    if not user_exists:
        raise NotFoundException("User not found")

    response = cloudinary.uploader.upload(file.file)

    url = 'https://www.nyckel.com/v1/functions/7hdsc8b5br345bz3/invoke'

    data = {
        "data": response['url']
    }

    response_from_external_api = requests.post(url, json=data)

    label_name = response_from_external_api.json()['labelName']

    label_id = response_from_external_api.json()['labelId']

    label_confidence = response_from_external_api.json()['confidence']

    if label_name == "Normal":
        if label_confidence < 0.8:
            scan_response = {
                "label_name": label_name,
                "label_id": label_id,
                "label_confidence": int(label_confidence * 100),
                "detected_conditions": "None",
                "severity": "None",
                "health_status": "Not Normal",
                "scan_id": generate_scan_id(),
                "title": "None",
                "description": "The scan is not too good for normal. The confidence level is less than 80%.",
                "recommendations": "It is advisable to see a doctor for further diagnosis",
                "special_id": current_user["special_id"],
                "created_at": datetime.datetime.now(),
            }
            scan_internal_create = ScanCreate(**scan_response)

            created_scan = await crud_scans.create(db=db, object=scan_internal_create)
            return {
                "scan": created_scan,
                "detailed_description": {
                    "title": created_scan.title,
                    "description": created_scan.description,
                    "recommendation": created_scan.recommendations
                }
            }
    else:
        scan_response = {
            "label_name": label_name,
            "label_id": label_id,
            "label_confidence": int(label_confidence * 100),
            "detected_conditions": "None",
            "severity": "None",
            "health_status": "Normal",
            "scan_id": generate_scan_id(),
            "title": "None",
            "description": "The scan is good for normal. The confidence level is greater than 80%.",
            "recommendations": "It's good to always do a regular checkup. Please see a doctor for further diagnosis.",
            "special_id": current_user["special_id"],
            "created_at": datetime.datetime.now(),
        }
        scan_internal_create = ScanCreate(**scan_response)

        created_scan = await crud_scans.create(db=db, object=scan_internal_create)

        return {
            "scan": created_scan,
            "detailed_description": {
                "title": created_scan.title,
                "description": created_scan.description,
                "recommendation": created_scan.recommendations
            }
        }

    if label_name == "Cataracts":
        if label_confidence < 0.70:
            scan_response = {
                "label_name": label_name,
                "label_id": label_id,
                "label_confidence": int(label_confidence * 100),
                "detected_conditions": "Cataracts",
                "severity": "Mild",
                "health_status": "Not Normal",
                "scan_id": generate_scan_id(),
                "title": "What are Cataracts?",
                "description": "Cataracts are a common eye condition that often develops with age. They occur when the clear lens in your eye becomes cloudy, leading to blurred or dimmed vision. Cataracts can impact your daily life and well-being, making it essential to understand your specific condition and explore treatment options.",
                "recommendations": "It is strongly recommended to schedule an appointment with an ophthalmologist for a comprehensive eye examination. They will assess the extent of your cataracts and discuss treatment options.",
                "special_id": current_user["special_id"],
                "created_at": datetime.datetime.now(),
            }
            scan_internal_create = ScanCreate(**scan_response)
            created_scan = await crud_scans.create(db=db, object=scan_internal_create)
            return {
                "scan": created_scan,
                "detailed_description": {
                    "title": created_scan.title,
                    "description": created_scan.description,
                    "recommendation": created_scan.recommendations
                }
            }
        else:
            scan_response = {
                "label_name": label_name,
                "label_id": label_id,
                "label_confidence": int(label_confidence * 100),
                "detected_conditions": "Cataracts",
                "severity": "Mild",
                "health_status": "Not Normal",
                "scan_id": generate_scan_id(),
                "title": "What are Cataracts?",
                "description": "Cataracts are a common eye condition that often develops with age. They occur when the clear lens in your eye becomes cloudy, leading to blurred or dimmed vision. Cataracts can impact your daily life and well-being, making it essential to understand your specific condition and explore treatment options.",
                "recommendations": "Your cataracts are in an advanced stage, affecting your vision significantly. This means that you may have trouble reading, driving, or performing other daily activities.Also you may experience blurred or cloudy vision. Difficulty seeing in low light conditions.Colors may appear faded. Glare from bright lights can be bothersome. It is strongly recommended to schedule an appointment with an ophthalmologist for a comprehensive eye examination. They will assess the extent of your cataracts and discuss treatment options.",
                "special_id": current_user["special_id"],
                "created_at": datetime.datetime.now(),
            }
            scan_internal_create = ScanCreate(**scan_response)
            created_scan = await crud_scans.create(db=db, object=scan_internal_create)
            return {
                "scan": created_scan,
                "detailed_description": {
                    "title": created_scan.title,
                    "description": created_scan.description,
                    "recommendation": created_scan.recommendations
                }
            }


@router.get("/history", status_code=200)
async def read_user_scan_history(
    request: Request,
    db: Annotated[AsyncSession, Depends(async_get_db)],
    current_user: Annotated[dict, Depends(get_current_user)],
    page: int = 1,
    items_per_page: int = 10
):
    if current_user["role"] in ["Doctor", "Hospital"]:
        raise ForbiddenException("Not authorized")

    user_exists = await crud_users.exists(db=db, id=current_user["id"])

    if not user_exists:
        raise NotFoundException("User not found")

    scans = await crud_scans.get_multi(
        db=db,
        special_id=current_user["special_id"],
        offset=compute_offset(page, items_per_page),
        limit=items_per_page,
    )

    all_scans = []

    for scan in scans["data"]:
        all_scans.append(
            {
                "scan": {
                    "label_name": scan["label_name"],
                    "label_id": scan["label_id"],
                    "label_confidence": scan["label_confidence"],
                    "detected_conditions": scan["detected_conditions"],
                    "severity": scan["severity"],
                    "health_status": scan["health_status"],
                    "scan_id": scan["scan_id"],
                    "title": scan["title"],
                    "description": scan["description"],
                    "recommendations": scan["recommendations"],
                    "created_at": scan["created_at"],
                    "is_deleted": scan["is_deleted"],
                    "special_id": scan["special_id"]
                },
                "detailed_description": {
                    "title": scan["title"],
                    "description": scan["description"],
                    "recommendation": scan["recommendations"]
                }
            }
        )

    return {
        "scans": all_scans
    }


@router.get("/history/{scan_id}")
@cache(key_prefix="{scan_id}_scan_cache", resource_id_name="scan_id")
async def read_scan_by_id(
    request: Request,
    scan_id: str,
    db: Annotated[AsyncSession, Depends(async_get_db)],
    current_user: Annotated[dict, Depends(get_current_user)],
):
    user_exists = await crud_users.exists(db=db, id=current_user["id"])

    if not user_exists:
        raise NotFoundException("User not found")

    scan = await crud_scans.get(db=db, scan_id=scan_id)

    if not scan:
        raise NotFoundException("Scan not found")

    scan_response = {
        "label_name": scan["label_name"],
        "label_confidence": scan["label_confidence"],
        "label_id": scan["label_id"],
        "detected_conditions": scan["detected_conditions"],
        "severity": scan["severity"],
        "health_status": scan["health_status"],
        "scan_id": scan["scan_id"],
        "title": scan["title"],
        "description": scan["description"],
        "recommendations": scan["recommendations"],
        "created_at": scan["created_at"],
        "is_deleted": scan["is_deleted"],
        "special_id": scan["special_id"],
        "detailed_description": {
            "title": scan["title"],
            "description": scan["description"],
            "recommendation": scan["recommendations"]
        }
    }

    return scan_response


@router.post("/doctor/upload/{patient_id}", status_code=201)
async def write_patient_scan(
    request: Request,
    patient_id: str,
    db: Annotated[AsyncSession, Depends(async_get_db)],
    current_user: Annotated[dict, Depends(get_current_doctor_or_hospital)],
    file: UploadFile = File(...)
):
    patient = await crud_patients.get(db=db, special_id=patient_id)

    if not patient:
        raise NotFoundException("Patient not found")

    if not current_user["doctor_id"]:
        raise UnauthorizedException("You are not allowed to perform a scan")

    response = cloudinary.uploader.upload(file.file)

    url = 'https://www.nyckel.com/v1/functions/1havh70pkqgnqmes/invoke'

    data = {
        "data": response['url']
    }

    response_from_external_api = requests.post(url, json=data)

    label_name = response_from_external_api.json()['labelName']

    label_id = response_from_external_api.json()['labelId']

    label_confidence = response_from_external_api.json()['confidence']

    scan_response = {
        "label_name": label_name,
        "label_id": label_id,
        "label_confidence": int(label_confidence * 100),
        "detected_conditions": "Cataract" if label_name == "Cataract" else "None",
        "severity": "None",
        "health_status": "Not Normal" if label_name == "Cataracts" else "None",
        "scan_id": generate_scan_id(),
        "title": current_user["doctor_id"],
        "description": "None",
        "recommendations": "None",
        "special_id": patient_id,
        "created_at": datetime.datetime.now(),
    }

    scan_internal_create = ScanCreate(**scan_response)
    created_scan = await crud_scans.create(db=db, object=scan_internal_create)
    patient_info = await crud_patients.get(db=db, special_id=patient_id)

    response_json = {
        "patient_name": patient_info["firstname"] + " " + patient_info["lastname"],
        "patient_id": patient_info["special_id"],
        "phone_number": patient_info["phone"],
        "age": patient_info["age"],
        "gender": patient_info["gender"],
        "address": patient_info["address"],
        "scan": created_scan
    }

    return response_json


@router.get("/doctor/history/{doctor_id}", status_code=200)
async def get_doctor_scan_history(
    request: Request,
    db: Annotated[AsyncSession, Depends(async_get_db)],
    current_user: Annotated[dict, Depends(get_current_doctor_or_hospital)],
    doctor_id: str,
    page: int = 1,
    items_per_page: int = 10
):
    if not current_user["doctor_id"]:
        raise ForbiddenException("Not authorized")

    doctor_exists = await crud_doctors.exists(db=db, doctor_id=doctor_id)

    if not doctor_exists:
        raise NotFoundException("Doctor not found")

    scans = await crud_scans.get_multi_joined(
        db=db,
        join_model=Patient,
        join_prefix="patient_",
        join_on=Scans.special_id == Patient.special_id,
        title=doctor_id,
        offset=compute_offset(page, items_per_page),
        limit=items_per_page
    )

    return paginated_response(crud_data=scans, page=page, items_per_page=items_per_page)

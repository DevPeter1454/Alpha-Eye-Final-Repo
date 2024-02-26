from datetime import timedelta
from typing import Annotated, Optional
import fastapi
from fastapi import Depends, Request, Response
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession

from ...core.config import settings
from ...core.db.database import async_get_db
from ...core.exceptions.http_exceptions import UnauthorizedException
from ...core.schemas import Token
from ...schemas.user import UserRead
from ...schemas.hospital import HospitalRead
from ...schemas.doctor import DoctorRead
from ...crud.crud_users import crud_users
from ...core.security import (
    ACCESS_TOKEN_EXPIRE_MINUTES,
    authenticate_user,
    create_access_token,
    create_refresh_token,
    verify_token,
)

router = fastapi.APIRouter(tags=["login"])


@router.post("/login", )
async def login_for_access_token(
    response: Response,
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
    db: Annotated[AsyncSession, Depends(async_get_db)],
    role: str = "User",
):

    user = await authenticate_user(email=form_data.username, password=form_data.password, role=role, db=db)
    if not user:
        raise UnauthorizedException("Wrong email or password.")

    user_read = UserRead(**user) if role == "User" else HospitalRead(**
                                                                     user) if role == "Hospital" else DoctorRead(**user)

    email_to_encode = user["email"] if role == "User" else user["admin_email"] if role == "Hospital" else user["email"]

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = await create_access_token(data={"sub": email_to_encode, "role": role}, expires_delta=access_token_expires)

    refresh_token = await create_refresh_token(data={"sub": email_to_encode})
    max_age = settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60

    print(user_read)
    response.set_cookie(
        key="refresh_token", value=refresh_token, httponly=True, secure=True, samesite="Lax", max_age=max_age
    )

    return {"access_token": access_token, "token_type": "bearer", "user": user_read}


@router.post("/refresh")
async def refresh_access_token(request: Request, db: AsyncSession = Depends(async_get_db)) -> dict[str, str]:
    refresh_token = request.cookies.get("refresh_token")
    if not refresh_token:
        raise UnauthorizedException("Refresh token missing.")

    user_data = await verify_token(refresh_token, db)
    if not user_data:
        raise UnauthorizedException("Invalid refresh token.")

    new_access_token = await create_access_token(data={"sub": user_data.username_or_email})
    return {"access_token": new_access_token, "token_type": "bearer"}

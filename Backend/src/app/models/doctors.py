import uuid as uuid_pkg
from datetime import UTC, datetime

from sqlalchemy import DateTime, ForeignKey, String, Integer, UniqueConstraint, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from ..core.db.database import Base


class Doctor(Base):
    __tablename__ = "doctor"
    id: Mapped[int] = mapped_column(
        "id", autoincrement=True, nullable=False, unique=True, primary_key=True, init=False)
    name:  Mapped[str] = mapped_column(String(50), nullable = False)
    email: Mapped[str] = mapped_column(
        String(50), unique=True, index=True, nullable=False,)
    hashed_password: Mapped[str] = mapped_column(String, nullable=False,)
    gender: Mapped[str] = mapped_column(String, nullable=False)
    doctor_id: Mapped[str] = mapped_column(String, nullable=True, unique=True)
    hospital_id: Mapped[str] = mapped_column(
        String, ForeignKey("hospital.hospital_id"), nullable=False,)
    uuid: Mapped[uuid_pkg.UUID] = mapped_column(
        default_factory=uuid_pkg.uuid4, primary_key=True, unique=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default_factory=lambda: datetime.now(UTC))
    updated_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), default=None)
    deleted_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), default=None)
    is_deleted: Mapped[bool] = mapped_column(default=False, index=True)
    is_superuser: Mapped[bool] = mapped_column(default=False)
    profile_image_url: Mapped[str] = mapped_column(
        String, default="https://res.cloudinary.com/peterojo/image/upload/v1707300272/ypneciuuuv0dsgnyknfe.jpg")
    role: Mapped[str] = mapped_column(String, default="Doctor")
    __table_args__ = (
        UniqueConstraint('doctor_id', name='unique_doctor_id'),
    )

import uuid as uuid_pkg
from datetime import UTC, datetime

from sqlalchemy import DateTime, ForeignKey, String, Integer, UniqueConstraint, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from ..core.db.database import Base


class Hospital(Base):
    __tablename__ = "hospital"

    id: Mapped[int] = mapped_column(
        "id", autoincrement=True, nullable=False, unique=True, primary_key=True, init=False)

    hospital_name: Mapped[str] = mapped_column(
        String(50), nullable=False, unique=True)

    admin_email: Mapped[str] = mapped_column(
        String(50), unique=True, index=True, nullable=False,)

    city: Mapped[str] = mapped_column(String, nullable=False)
    address: Mapped[str] = mapped_column(String, nullable=False)
    phone: Mapped[str] = mapped_column(String, nullable=False)
    hashed_password: Mapped[str] = mapped_column(String, nullable=False,)
    state: Mapped[str] = mapped_column(String, nullable=False)
    lga: Mapped[str] = mapped_column(String, nullable=False)
    hospital_id: Mapped[str] = mapped_column(
        String, nullable=True, unique=True)

    license_number: Mapped[str] = mapped_column(String, nullable=False)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default_factory=lambda: datetime.now(UTC))
    updated_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), default=None)
    deleted_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), default=None)
    is_deleted: Mapped[bool] = mapped_column(default=False, index=True)
    is_superuser: Mapped[bool] = mapped_column(default=False)
    is_approved: Mapped[bool] = mapped_column(
        Boolean, nullable=False, default=True)
    role: Mapped[str] = mapped_column(String, default="Hospital")
    uuid: Mapped[uuid_pkg.UUID] = mapped_column(
        default_factory=uuid_pkg.uuid4, primary_key=True, unique=True)
    logo_url: Mapped[str] = mapped_column(
        String, default="https://res.cloudinary.com/peterojo/image/upload/v1707300272/ypneciuuuv0dsgnyknfe.jpg")
    __table_args__ = (
        UniqueConstraint('hospital_name', name='unique_hospital_name'),
    )

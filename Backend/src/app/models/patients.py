import uuid as uuid_pkg
from datetime import UTC, datetime

from sqlalchemy import DateTime, ForeignKey, String, Integer, UniqueConstraint, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from ..core.db.database import Base


class Patient(Base):
    __tablename__ = 'patient'

    id: Mapped[int] = mapped_column(
        "id", autoincrement=True, nullable=False, unique=True, primary_key=True, init=False)

    firstname: Mapped[str] = mapped_column(String(30), nullable=False,)
    lastname: Mapped[str] = mapped_column(String(30), nullable=False,)
    age: Mapped[int] = mapped_column(Integer, nullable=False)
    gender: Mapped[str] = mapped_column(String, nullable=False)
    address: Mapped[str] = mapped_column(String, nullable=False)

    phone: Mapped[str] = mapped_column(String, nullable=False)

    city: Mapped[str] = mapped_column(String, nullable=False)

    state_of_residence: Mapped[str] = mapped_column(String, nullable=False)

    special_id: Mapped[str] = mapped_column(String, nullable=True, unique=True)

    hospital_id: Mapped[str] = mapped_column(
        String, ForeignKey("hospital.hospital_id"), nullable=False,)

    uuid: Mapped[uuid_pkg.UUID] = mapped_column(
        default_factory=uuid_pkg.uuid4, primary_key=True, unique=True)
    role: Mapped[str] = mapped_column(String, default="Patient")

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default_factory=lambda: datetime.now(UTC))
    updated_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), default=None)
    deleted_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), default=None)
    is_deleted: Mapped[bool] = mapped_column(default=False, index=True)
    is_superuser: Mapped[bool] = mapped_column(default=False)

    __table_args__ = (
        UniqueConstraint('special_id', name='unique_special_id'),
    )

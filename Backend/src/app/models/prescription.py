import uuid as uuid_pkg
from datetime import UTC, datetime

from sqlalchemy import DateTime, ForeignKey, String, Integer, UniqueConstraint, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from ..core.db.database import Base

class Prescriptions(Base):
    __tablename__ = "prescriptions"

    id: Mapped[int] = mapped_column("id", autoincrement=True, nullable=False, unique=True, primary_key=True, init=False)

    medication_name: Mapped[str] = mapped_column(
        String, nullable=False, )
    
    dosage: Mapped[str] = mapped_column(
        String, nullable=False, )
    
    prescription: Mapped[str] = mapped_column(
        String, nullable=False, )
    
    doctor_id: Mapped[str] = mapped_column(
        String, ForeignKey("doctor.doctor_id"), nullable=False,)
    
    patient_id: Mapped[str] = mapped_column(
        String, ForeignKey("patient.special_id"), nullable=False,)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default_factory=lambda: datetime.now(UTC))

    updated_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), default=None)

    deleted_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), default=None)
    is_deleted: Mapped[bool] = mapped_column(default=False, index=True)
    uuid: Mapped[uuid_pkg.UUID] = mapped_column(
        default_factory=uuid_pkg.uuid4, primary_key=True, unique=True)

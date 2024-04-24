import uuid as uuid_pkg
from datetime import UTC, datetime

from sqlalchemy import DateTime, ForeignKey, String, Integer, UniqueConstraint, Boolean
from sqlalchemy.orm import Mapped, mapped_column, relationship
from ..core.db.database import Base


class Scans(Base):
    __tablename__ = "scans"

    id: Mapped[int] = mapped_column(
        "id", autoincrement=True, nullable=False, unique=True, primary_key=True, init=False)

    label_name: Mapped[str] = mapped_column(
        String(50), nullable=False, )

    label_id: Mapped[str] = mapped_column(
        String, nullable=False,)
    
    scan_image_url: Mapped[str] = mapped_column(String,nullable=False)

    scan_id: Mapped[str] = mapped_column(
        String, nullable=False, )

    label_confidence: Mapped[str] = mapped_column(Integer, nullable=False)

    detected_conditions: Mapped[str] = mapped_column(
        String, nullable=False,)

    severity: Mapped[str] = mapped_column(
        String, nullable=False,)

    health_status: Mapped[str] = mapped_column(
        String, nullable=False,)

    title: Mapped[str] = mapped_column(String, nullable=False)

    description: Mapped[str] = mapped_column(String, nullable=False)

    recommendations: Mapped[str] = mapped_column(String, nullable=True)

    special_id: Mapped[str] = mapped_column(String, nullable=False,)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), default_factory=lambda: datetime.now(UTC))

    updated_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), default=None)

    deleted_at: Mapped[datetime | None] = mapped_column(
        DateTime(timezone=True), default=None)
    is_deleted: Mapped[bool] = mapped_column(default=False, index=True)
    uuid: Mapped[uuid_pkg.UUID] = mapped_column(
        default_factory=uuid_pkg.uuid4, primary_key=True, unique=True)

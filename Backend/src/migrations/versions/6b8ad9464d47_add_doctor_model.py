"""Add doctor model

Revision ID: 6b8ad9464d47
Revises: 4bf2a3b8b758
Create Date: 2024-02-17 02:00:42.989200

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql


# revision identifiers, used by Alembic.
revision: str = '6b8ad9464d47'
down_revision: Union[str, None] = '4bf2a3b8b758'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
    op.create_table(
        'doctor',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(length=50), nullable=False),
        sa.Column('email', sa.String(length=50), nullable=False),
        sa.Column('hashed_password', sa.String(), nullable=False),
        sa.Column('gender', sa.String(), nullable=False),
        sa.Column('doctor_id', sa.String(), nullable=True, unique=True),
        sa.Column('hospital_id', sa.String(), sa.ForeignKey("hospital.hospital_id"),
                  nullable=False,),
        sa.Column('uuid', postgresql.UUID(), default=sa.text(
            "uuid_generate_v4()"), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('deleted_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('is_deleted', sa.Boolean(), nullable=False),
        sa.Column('is_superuser', sa.Boolean(), nullable=False),
        sa.Column('profile_image_url', sa.String(), nullable=False,
                  server_default="https://res.cloudinary.com/peterojo/image/upload/v1707300272/ypneciuuuv0dsgnyknfe.jpg"),
        sa.Column('role', sa.String(), nullable=False,
                  server_default="Doctor"),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('email'),
        sa.UniqueConstraint('doctor_id')
    )

def downgrade() -> None:
    op.drop_table('doctor')

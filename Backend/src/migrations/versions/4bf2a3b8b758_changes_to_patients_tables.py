"""changes to patients tables

Revision ID: 4bf2a3b8b758
Revises: 90cfb5542e04
Create Date: 2024-02-10 15:07:43.659530

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID


# revision identifiers, used by Alembic.
revision: str = '4bf2a3b8b758'
down_revision: Union[str, None] = '90cfb5542e04'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")

    op.create_table(
        'patient',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('firstname', sa.String(length=30), nullable=False),
        sa.Column('lastname', sa.String(length=30), nullable=False),
        sa.Column('age', sa.Integer(), nullable=False),
        sa.Column('gender', sa.String(), nullable=False),
        sa.Column('address', sa.String(), nullable=False),
        sa.Column('phone', sa.String(), nullable=False),
        sa.Column('city', sa.String(), nullable=False),
        sa.Column('state_of_residence', sa.String(), nullable=False),
        sa.Column('special_id', sa.String(), nullable=True, unique=True),
        sa.Column('hospital_id', sa.String(), sa.ForeignKey("hospital.hospital_id"),
                  nullable=False,),
        sa.Column('uuid', sa.UUID(), nullable=False),
        sa.Column('role', sa.String(), default='Patient'),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('deleted_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('is_deleted', sa.Boolean(), default=False),
        sa.Column('is_superuser', sa.Boolean(), default=False),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('special_id'),
    )


def downgrade() -> None:
    op.drop_table('patient')

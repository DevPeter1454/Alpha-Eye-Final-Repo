"""create prescription table

Revision ID: 20c438dfa81d
Revises: d9609aa3589b
Create Date: 2024-04-29 16:00:22.689721

"""
from typing import Sequence, Union
from sqlalchemy.dialects.postgresql import UUID
from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = '20c438dfa81d'
down_revision: Union[str, None] = 'd9609aa3589b'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")

    op.create_table(
        'prescriptions',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('medication_name', sa.String(), nullable=False,),
        sa.Column('dosage', sa.String(), nullable=False,),
        sa.Column('prescription', sa.String(), nullable=False,),
        sa.Column('patient_id', sa.String(), sa.ForeignKey("patient.special_id"),
                  nullable=False,),
        sa.Column('doctor_id', sa.String(), sa.ForeignKey("doctor.doctor_id"),
                  nullable=False,),
        sa.Column('uuid', sa.UUID(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('deleted_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('is_deleted', sa.Boolean(), default=False),
        sa.PrimaryKeyConstraint('id'),

        )


def downgrade() -> None:
    op.drop_table('prescriptions')
    
"""create scan tables

Revision ID: d9609aa3589b
Revises: 6b8ad9464d47
Create Date: 2024-02-18 20:30:28.571430

"""
from typing import Sequence, Union
from sqlalchemy.dialects.postgresql import UUID
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'd9609aa3589b'
down_revision: Union[str, None] = '6b8ad9464d47'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'scans',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('label_name', sa.String(length=50),
                  nullable=False, unique=True),
        sa.Column('label_id', sa.String(), nullable=False, unique=True),
        sa.Column('scan_id', sa.String(), nullable=False, unique=True),
        sa.Column('label_confidence', sa.Integer(), nullable=False),
        sa.Column('scan_image_url', sa.String(), nullable=False),
        sa.Column('detected_conditions', sa.String(), nullable=False),
        sa.Column('recommendation', sa.String(), nullable=False),
        sa.Column('severity', sa.String(), nullable=False),
        sa.Column('health_status', sa.String(), nullable=False),
        sa.Column('title', sa.String(), nullable=False),
        sa.Column('description', sa.String(), nullable=False),
        sa.Column('special_id', sa.String(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('deleted_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('is_deleted', sa.Boolean(),
                  nullable=False, server_default='false'),
        sa.Column('uuid', UUID(), nullable=False,
                  server_default=sa.text("uuid_generate_v4()")),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('label_id'),
        sa.UniqueConstraint('scan_id'),
        sa.UniqueConstraint('uuid')
    )


def downgrade() -> None:
    op.drop_table('scans')

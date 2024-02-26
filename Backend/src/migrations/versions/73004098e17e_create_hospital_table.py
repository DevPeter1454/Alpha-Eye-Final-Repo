"""Create hospital table

Revision ID: 73004098e17e
Revises: 4ad704cf5fa9
Create Date: 2024-02-08 02:08:16.317053

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import UUID


# revision identifiers, used by Alembic.
revision: str = '73004098e17e'
down_revision: Union[str, None] = '4ad704cf5fa9'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
    op.create_table(
        'hospital',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('hospital_name', sa.String(
            length=50), nullable=False, unique=True),
        sa.Column('is_approved', sa.Boolean(),
                  nullable=False, server_default='false'),
        sa.Column('admin_email', sa.String(length=50),
                  unique=True, nullable=False),
        sa.Column('city', sa.String(), nullable=False),
        sa.Column('address', sa.String(), nullable=False),
        sa.Column('phone', sa.String(), nullable=False),
        sa.Column('hashed_password', sa.String(), nullable=False),
        sa.Column('state', sa.String(), nullable=False),
        sa.Column('lga', sa.String(), nullable=False),

        sa.Column('hospital_id', sa.String(), unique=True, nullable=True),
        sa.Column('logo_url', sa.String(), nullable=False,
                  server_default="'https://res.cloudinary.com/peterojo/image/upload/v1707300272/ypneciuuuv0dsgnyknfe.jpg'"),
        sa.Column('uuid', UUID(as_uuid=True), nullable=False,
                  server_default=sa.text("uuid_generate_v4()")),
        sa.Column('role', sa.String(), nullable=False,
                  server_default="'Hospital'"),
        sa.Column('license_number', sa.String(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True),
                  nullable=False, server_default=sa.text("now()")),
        sa.Column('updated_at', sa.DateTime(timezone=True)),
        sa.Column('deleted_at', sa.DateTime(timezone=True)),
        sa.Column('is_deleted', sa.Boolean(),
                  nullable=False, server_default='false'),
        sa.Column('is_superuser', sa.Boolean(),
                  nullable=False, server_default='false'),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('hospital_name'),
        sa.UniqueConstraint('uuid')
    )


def downgrade() -> None:
    op.drop_table('hospital')

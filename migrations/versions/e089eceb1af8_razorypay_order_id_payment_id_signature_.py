"""razorypay order_id, payment_id, signature fields are added

Revision ID: e089eceb1af8
Revises: 
Create Date: 2023-04-05 10:25:35.303579

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e089eceb1af8'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('teachers', schema=None) as batch_op:
        batch_op.add_column(sa.Column('razorpay_order_id', sa.String(length=50), nullable=False,server_default='yet to add'))
        batch_op.add_column(sa.Column('razorpay_payment_id', sa.String(length=50), nullable=False,server_default='yet to add'))
        batch_op.add_column(sa.Column('razorpay_signature', sa.String(length=200), nullable=False,server_default='yet to add'))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('teachers', schema=None) as batch_op:
        batch_op.drop_column('razorpay_signature')
        batch_op.drop_column('razorpay_payment_id')
        batch_op.drop_column('razorpay_order_id')

    # ### end Alembic commands ###
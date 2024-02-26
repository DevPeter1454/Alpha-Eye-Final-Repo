from fastcrud import FastCRUD

from ..models.doctors import Doctor
from ..schemas.doctor import DoctorCreateInternal, DoctorUpdate, DoctorUpdateInternal, DoctorDelete

CRUDDoctor = FastCRUD[Doctor, DoctorCreateInternal,
                      DoctorUpdate, DoctorUpdateInternal, DoctorDelete]

crud_doctors = CRUDDoctor(Doctor)

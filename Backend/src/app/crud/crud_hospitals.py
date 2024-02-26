from fastcrud import FastCRUD

from ..models.hospital import Hospital
from ..schemas.hospital import HospitalCreateInternal, HospitalDelete, HospitalUpdate, HospitalUpdateInternal

CRUDHospital = FastCRUD[Hospital, HospitalCreateInternal,
                        HospitalDelete, HospitalUpdate, HospitalUpdateInternal]

crud_hospitals = CRUDHospital(Hospital)

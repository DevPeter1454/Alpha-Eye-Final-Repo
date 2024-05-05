from fastcrud import FastCRUD

from ..models.prescription import Prescriptions

from ..schemas.prescription import PrescriptionCreate, PrescriptionUpdate, PrescriptionRead, PrescriptionDelete

CRUDPrescription = FastCRUD[Prescriptions, PrescriptionCreate, PrescriptionRead, PrescriptionUpdate,
                            PrescriptionDelete]
                        
crud_prescriptions = CRUDPrescription(Prescriptions)

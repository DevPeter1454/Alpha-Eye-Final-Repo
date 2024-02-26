from fastcrud import FastCRUD

from ..models.patients import Patient
from ..schemas.patient import PatientCreateInternal, PatientUpdate, PatientUpdateInternal, PatientDelete

CRUDPatient = FastCRUD[Patient, PatientCreateInternal, PatientUpdate, PatientUpdateInternal, PatientDelete]

crud_patients = CRUDPatient(Patient)
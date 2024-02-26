from fastcrud import FastCRUD

from ..models.scans import Scans
from ..schemas.scans import ScanCreateInternal, ScanUpdate, ScanRead, ScanDelete

CRUDScan = FastCRUD[Scans, ScanCreateInternal, ScanRead,
                    ScanUpdate, ScanDelete]

crud_scans = CRUDScan(Scans)

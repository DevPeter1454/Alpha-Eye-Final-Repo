import React, { useState, useEffect, useRef } from "react";
import { Tab } from "@headlessui/react";
import { baseUrl } from "../utils/endpoints";
import DocDashLayout from "../Layouts/DocDashLayout";
import Sidebar from "../components/DocSidebar";
import Scanning from "../components/Scanning";
import ScanHistory from "../components/ScanHistory";
import PatientManagement from "../components/Management";
// import Prescription from "../components/Prescription";
import AddPatients from "../components/AddPatients";
import NewPatientDefault from "../components/NewPatient";
import { useAppSelector } from "../store/hooks";

function DoctorsDashboard() {
  const [showAddNewPatient, setShowAddNewPatient] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showScanResult, setShowScanResult] = useState<any>(false);
  const [showPrescription, setShowPrescription] = useState(false);
  const [scanResultData, setScanResultData] = useState<any>(null);
  const [scanHistory, setScanHistory] = useState<any>([]);

  const handleShowAddNewDocComponent = () => {
    setShowAddNewPatient(true);
  };

  const handleCloseAddNewDocComponent = () => {
    setShowAddNewPatient(false);
  };

  const token = useAppSelector((state) => state.auth.token);
  const DoctorID = useAppSelector((state) => state?.auth?.user?.doctor_id);

  useEffect(() => {
    fetchScanHistory();
  }, []);

  const fetchScanHistory = () => {
    setLoading(true);
    fetch(
      `${baseUrl}api/v1/scans/doctor/history/${DoctorID}?page=${page}&items_per_page=100`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setScanHistory((prevScanHistory: any) => {
          const newScanHistory = [...prevScanHistory, ...data.data];
          return newScanHistory.sort((a: any, b: any) => {
            return (
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
            );
          });
        });
        setPage((prevPage) => prevPage + 1);
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching scan history:", error);
      });
  };

  return (
    <DocDashLayout>
      <Tab.Group>
        <Sidebar />
        <Tab.Panels className="w-[77%] flex justify-center">
          {showAddNewPatient ? (
            <AddPatients handleCloseComponent={handleCloseAddNewDocComponent} />
          ) : (
            <NewPatientDefault
              handleShowAddNewDocComponent={handleShowAddNewDocComponent}
            />
          )}
          <Scanning
            showScanResult={showScanResult}
            setShowScanResult={setShowScanResult}
            showPrescription={showPrescription}
            setShowPrescription={setShowPrescription}
            setScanResultData={setScanResultData}
            scanHistory={scanHistory}
            setScanHistory={setScanHistory}
            fetchScanHistory={fetchScanHistory}
          />
          <ScanHistory
            showScanResult={showScanResult}
            setShowScanResult={setShowScanResult}
            showPrescription={showPrescription}
            setShowPrescription={setShowPrescription}
            scanResultData={scanResultData}
            scanHistory={scanHistory}
            setScanHistory={setScanHistory}
            fetchScanHistory={fetchScanHistory}
          />
          <PatientManagement scanResultData={scanResultData} />
          {/* <Prescription /> */}
        </Tab.Panels>
      </Tab.Group>
    </DocDashLayout>
  );
}

export default DoctorsDashboard;

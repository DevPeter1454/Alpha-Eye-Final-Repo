import React, { useState, useEffect, useRef } from "react";
import { baseUrl } from "../utils/endpoints";
import { useAppSelector } from "../store/hooks";
import { Tab } from "@headlessui/react";
import { sampData } from "../utils/DoctorData";
import ScanResult from "./ScanResult";
import MakePrescription from "./MakePrescription";
import PatientsInfo from "./PatientInfoModal";
import PatientFullDetails from "./PatientFullDetails";

interface Doctor {
  id: string;
  name: string;
  email: string;
  gender: string;
  date: string;
}

function Management({ scanResultData }: any) {
  const [showScanResult, setShowScanResult] = useState<any>(false);
  const [showPrescription, setShowPrescription] = useState(false);
  const [showPatientInfo, setShowPatientInfo] = useState(false);
  const [showPatientFullInfo, setShowPatientFullInfo] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [patients, setPatients] = useState<any>([]);
  const showScanResultRef = useRef<HTMLDivElement>(null);
  const showPrescriptionRef = useRef<HTMLDivElement>(null);
  const showPatientInfoRef = useRef<HTMLDivElement>(null);
  const showPatientFullInfoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        showScanResultRef.current &&
        !showScanResultRef.current.contains(event.target as Node)
      ) {
        setShowScanResult(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showScanResultRef]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        showPrescriptionRef.current &&
        !showPrescriptionRef.current.contains(event.target as Node)
      ) {
        setShowPrescription(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPrescriptionRef]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        showPatientInfoRef.current &&
        !showPatientInfoRef.current.contains(event.target as Node)
      ) {
        setShowPatientInfo(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPatientInfoRef]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        showPatientFullInfoRef.current &&
        !showPatientFullInfoRef.current.contains(event.target as Node)
      ) {
        setShowPatientFullInfo(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPatientFullInfoRef]);

  const token = useAppSelector((state) => state.auth.token);
  const HospitalID = useAppSelector((state) => state?.auth?.user?.hospital_id);

  useEffect(() => {
    fetch(`${baseUrl}api/v1/hospital/patients/${HospitalID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setPatients(data.data);
      });
  }, []);

  // Function to format the created_at date
  const formatCreatedAt = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = `${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date
      .getDate()
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
    return formattedDate;
  };

  return (
    <Tab.Panel className="w-full h-full not-italic leading-normal">
      <p className="text-[24px] font-medium text-[#4F4F4F]">
        Patient Management
      </p>
      <div className="h-full overflow-y-scroll">
        <table className="w-full table-auto border-collapse table">
          <thead>
            <tr className="grid w-full grid-cols-6 border-b border-[#EAECF0] py-5 text-[#828282]">
              <th className="text-[#333] text-sm text-start font-semibold">
                Patient’s name
              </th>
              <th className="text-sm font-medium text-start">Phone Number</th>
              <th className="text-sm font-medium text-center">Gender</th>
              <th className="text-sm font-medium text-start">Patient ID</th>
              <th className="text-sm font-medium text-start">Date Scanned</th>
              <th className="text-sm font-medium text-start">Action</th>
            </tr>
          </thead>
          <tbody>
            {patients?.map((item: any, index: number) => (
              <tr
                key={index}
                className="grid grid-cols-6 border-b border-[#EAECF0] items-center py-5"
              >
                <td className="text-[#333] text-sm font-semibold">
                  {item?.firstname} {item?.lastname}
                </td>
                <td className="text-[#828282] text-sm font-medium">
                  {item?.phone}
                </td>
                <td className="text-[#828282] text-sm font-medium text-center">
                  {item?.gender}
                </td>
                <td className="text-[#828282] text-sm font-medium">
                  {item?.special_id}
                </td>
                <td className="text-[#828282] text-sm font-medium">
                  {formatCreatedAt(item?.created_at)}
                </td>
                <td className="">
                  <button
                    onClick={() => {
                      setSelectedPatient(item);
                      setShowPatientInfo(true);
                    }}
                    className=" text-[#0693F1] py-2 px-3"
                  >
                    <span className="text-[#333]">&#8942;</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showScanResult && (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 flex justify-center items-center">
          <div ref={showScanResultRef} className="w-1/2">
            <ScanResult
              setShowScanResult={setShowScanResult}
              setShowPrescription={setShowPrescription}
              scanResultData={scanResultData}
            />
          </div>
        </div>
      )}

      {showPrescription && (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 flex justify-center items-center">
          <div ref={showPrescriptionRef} className="w-3/5">
            <MakePrescription
              selectedPatient={selectedPatient}
              setShowPrescription={setShowPrescription}
            />
          </div>
        </div>
      )}

      {showPatientInfo && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
          <div
            ref={showPatientInfoRef}
            className="w-[242px] shadow-xl rounded-lg fixed right-20"
          >
            <PatientsInfo
              setShowPatientInfo={setShowPatientInfo}
              setShowPatientFullInfo={setShowPatientFullInfo}
            />
          </div>
        </div>
      )}

      {showPatientFullInfo && (
        <div className="fixed top-20 left-0 w-full h-full bg-[#fff] bg-opacity-10 flex justify-end items-center">
          <div ref={showPatientFullInfoRef} className="w-4/5">
            <PatientFullDetails
              setShowPatientFullInfo={setShowPatientFullInfo}
              selectedPatient={selectedPatient}
            />
          </div>
        </div>
      )}
    </Tab.Panel>
  );
}

export default Management;

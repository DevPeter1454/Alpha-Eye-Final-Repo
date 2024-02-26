import React, { useState, useEffect, useRef } from "react";
import { Tab } from "@headlessui/react";
import eyeScan from "../assets/svgs/solar_eye-scan-linear.svg";
import LineChart from "../assets/pngs/Line-Chart.png";
import NewScan from "./NewScan";
import ScanEye from "./ScanEye";
import ScanResult from "./ScanResult";
import MakePrescription from "./MakePrescription";

function Scanning({
  scanHistory,
  fetchScanHistory,
  showScanResult,
  setShowScanResult,
  showPrescription,
  setShowPrescription,
}: any) {
  const [showPerformScan, setShowPerformScan] = useState(false);
  const [showScan, setShowScan] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const [showScanResultData, setShowScanResultData] = useState<any>(null);
  const showPerformScanRef = useRef<HTMLDivElement>(null);
  const showScanRef = useRef<HTMLDivElement>(null);
  const showScanResultRef = useRef<HTMLDivElement>(null);
  const showPrescriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        showPerformScanRef.current &&
        !showPerformScanRef.current.contains(event.target as Node)
      ) {
        setShowPerformScan(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPerformScanRef]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        showScanRef.current &&
        !showScanRef.current.contains(event.target as Node)
      ) {
        setShowScan(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showScanRef]);

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
      <div className="w-full h-52 flex justify-between">
        <div
          onClick={() => setShowPerformScan(true)}
          className="w-1/4 h-[200px] auto flex flex-col justify-center items-center cursor-pointer"
        >
          <img src={eyeScan} alt="solar_eye-scan-linear-icon" />
          <p className="text-[20px] font-medium text-[#4F4F4F] mt-6">
            Perform new scan
          </p>
        </div>

        <img src={LineChart} alt="line-chart-icon" className="w-[72%]" />
      </div>
      <p className="text-[24px] font-medium text-[#4F4F4F] mt-2">
        Recent Scans
      </p>

      <div className="bg-slate-9 w-full h-[250px]">
        <div className="h-full overflow-y-scroll">
          <table className="w-full table-auto border-collapse table">
            <thead>
              <tr className="grid w-full grid-cols-5 border-b border-[#EAECF0] py-5 text-[#828282]">
                <th className="text-[#333] text-sm text-start font-semibold">
                  Scan ID
                </th>
                <th className="text-sm font-medium text-start">Patient Name</th>
                <th className="text-sm font-medium text-center">Gender</th>
                <th className="text-sm font-medium text-start">Patient ID</th>
                <th className="text-sm font-medium text-start">Date Scanned</th>
                {/* <th className="text-sm font-medium text-start">Action</th> */}
              </tr>
            </thead>

            <tbody>
              {scanHistory?.map((item: any, index: number) => (
                <tr
                  key={index}
                  className="grid grid-cols-5 border-b border-[#EAECF0] items-center py-5"
                >
                  <td className="text-[#333] text-sm font-semibold">
                    {item?.scan_id}
                  </td>
                  <td className="text-[#828282] text-sm font-medium">
                    {item?.patient_firstname} {item?.patient_lastname}
                  </td>
                  <td className="text-[#828282] text-sm font-medium text-center">
                    {item?.patient_gender}
                  </td>
                  <td className="text-[#828282] text-sm font-medium">
                    {item?.patient_special_id}
                  </td>
                  <td className="text-[#828282] text-sm font-medium">
                    {formatCreatedAt(item?.created_at)}
                  </td>
                  {/* <td className="">
                    <button
                      onClick={() => {
                        setSelectedPatient(item);
                        setShowScanResult(true);
                      }}
                      className="border border-[#0693F1] text-[#0693F1] rounded-lg py-2 px-3"
                    >
                      View Result
                    </button>
                  </td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showPerformScan && (
          <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 flex justify-center items-center">
            <div ref={showPerformScanRef} className="w-2/6">
              <NewScan
                setShowScan={setShowScan}
                fetchScanHistory={fetchScanHistory}
              />
            </div>
          </div>
        )}

        {showScan && (
          <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 flex justify-center items-center">
            <div ref={showScanRef} className="w-2/6">
              <ScanEye
                setShowScan={setShowScan}
                setShowScanResult={setShowScanResult}
                setShowPrescription={setShowPrescription}
                showScanResultData={showScanResultData}
                setShowScanResultData={setShowScanResultData}
                fetchScanHistory={fetchScanHistory}
              />
            </div>
          </div>
        )}

        {showScanResult && (
          <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 flex justify-center items-center">
            <div ref={showScanResultRef} className="w-3/5">
              <ScanResult
                setShowScanResult={setShowScanResult}
                setShowPrescription={setShowPrescription}
                selectedPatient={selectedPatient}
                showScanResultData={showScanResultData}
              />
            </div>
          </div>
        )}

        {showPrescription && (
          <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 flex justify-center items-center">
            <div ref={showPrescriptionRef} className="w-2/5">
              <MakePrescription setShowPrescription={setShowPrescription} />
            </div>
          </div>
        )}
      </div>
    </Tab.Panel>
  );
}

export default Scanning;

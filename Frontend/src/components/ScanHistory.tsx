import React, { useState, useEffect, useRef } from "react";
import { baseUrl } from "../utils/endpoints";
import { useAppSelector } from "../store/hooks";
import { Tab } from "@headlessui/react";
import ScanResult from "./ScanResult";
import MakePrescription from "./MakePrescription";
import Spin from "../components/spinner/spinner.component";

function ScanHistory({
  scanHistory,
  fetchScanHistory,
  setScanHistory,
  showScanResult,
  setShowScanResult,
  showPrescription,
  setShowPrescription,
}: any) {
  const [selectedPatient, setSelectedPatient] = useState<any>(null);
  const showScanResultRef = useRef<HTMLDivElement>(null);
  const showPrescriptionRef = useRef<HTMLDivElement>(null);
  // State to track the page number
  const [loading, setLoading] = useState(false); // State to track loading state

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
      <p className="text-[24px] font-medium text-[#4F4F4F]">Scan History</p>
      <div className="h-full overflow-y-scroll">
        <table className="w-full table-auto border-collapse table">
          <thead>
            <tr className="grid w-full grid-cols-6 border-b border-[#EAECF0] py-5 text-[#828282]">
              <th className="text-[#333] text-sm text-start font-semibold">
                Scan ID
              </th>
              <th className="text-sm font-medium text-start">Patient Name</th>
              <th className="text-sm font-medium text-center">Gender</th>
              <th className="text-sm font-medium text-start">Patient ID</th>
              <th className="text-sm font-medium text-start">Date Scanned</th>
              <th className="text-sm font-medium text-start">Action</th>
            </tr>
          </thead>
          <tbody>
            {scanHistory?.map((item: any, index: number) => (
              <tr
                key={index}
                className="grid grid-cols-6 border-b border-[#EAECF0] items-center py-5"
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
                <td className="">
                  <button
                    onClick={() => {
                      setSelectedPatient(item);
                      setShowScanResult(true);
                    }}
                    className="border border-[#0693F1] text-[#0693F1] rounded-lg py-2 px-3"
                  >
                    View Result
                  </button>
                </td>
              </tr>
            ))}

            <tr>
              <td colSpan={6} className="text-right pr-12">
                <button
                  onClick={fetchScanHistory}
                  className="border border-[#0693F1] text-[#0693F1] rounded-lg py-2 px-3 my-2"
                >
                  {loading ? <Spin /> : "More"}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {showScanResult && (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 flex justify-center items-center">
          <div ref={showScanResultRef} className="w-3/5">
            <ScanResult
              setShowScanResult={setShowScanResult}
              setShowPrescription={setShowPrescription}
              selectedPatient={selectedPatient}
            />
          </div>
        </div>
      )}

      {showPrescription && (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 flex justify-center items-center">
          <div ref={showPrescriptionRef} className="w-3/5">
            <MakePrescription setShowPrescription={setShowPrescription} />
          </div>
        </div>
      )}
    </Tab.Panel>
  );
}

export default ScanHistory;

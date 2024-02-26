import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { baseUrl } from "../utils/endpoints";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import CloseScan from "../assets/svgs/close-circle.svg";
import Spin from "./spinner/spinner.component";

function ScanEye({
  setShowScan,
  fetchScanHistory,
  setShowScanResult,
  setShowPrescription,
  setShowScanResultData,
}: any) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const PatientId = localStorage.getItem("patientId");
  const file = localStorage.getItem("selectedImage");
  const token = useAppSelector((state: RootState) => state.auth.token);

  const HandleScanEye = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      // Ensure file is present and valid
      if (file) {
        // Create a Blob object from the data URL
        const blob = await fetch(file).then((res) => res.blob());
        formData.append("file", blob, "scan_image.png");
      }
      const response = await axios.post(
        `${baseUrl}api/v1/scans/doctor/upload/${PatientId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setLoading(false);
        toast.success("Scan added successfully!");
        navigate("/doctors-dashboard");
        setShowScan(false);
        setShowScanResult(true);
        setShowPrescription(false);
        // Pass scan result data to ScanResult component
        setShowScanResultData(response.data);
        fetchScanHistory();
        // setShowOverlay(true);
      } else {
        setLoading(false);
        toast.error("Failed adding doctor");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed Scanning Image: " + error.response.data.detail);
    }
  };

  return (
    <div className="bg-[#fff] w-full m-auto min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 not-italic leading-normal my-10 rounded-xl shadow-xl">
      <div className="w-full flex justify-end">
        <img
          onClick={() => setShowScan(false)}
          src={CloseScan}
          alt="close-scan-icon"
          className="w-8 h-8 cursor-pointer"
        />
      </div>
      <p className="text-[#828282] w-full text-[28px] font-semibold mt-3">
        New Scan
      </p>

      <img
        src={file ? file : ""}
        alt="default-eye-image"
        className="w-10/12 h-[220px] m-auto my-5 rounded-xl"
      />

      <button
        onClick={HandleScanEye}
        className="w-full text-[#FFFFFF] bg-[#0693F1] rounded-[8px] py-4"
      >
        {loading ? <Spin /> : "Scan Image"}
      </button>
    </div>
  );
}

export default ScanEye;

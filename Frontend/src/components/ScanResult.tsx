import React from "react";
import CloseScan from "../assets/svgs/close-circle.svg";

function ScanResult({
  showScanResultData,
  setShowScanResult,
  setShowPrescription,
  selectedPatient,
}: any) {
  const HandleShowMakePrescription = (e: any) => {
    e.preventDefault();
    setShowPrescription(true);
    setShowScanResult(false);
  };
  localStorage.setItem("scanPatientId", showScanResultData?.patient_id);

  const file = localStorage.getItem("selectedImage");
  const confidencePercentages = showScanResultData?.scan?.label_confidence;
  const confidencePercentage = selectedPatient?.label_confidence;

  return (
    <div className="bg-[#fff] w-full m-auto min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 not-italic leading-normal my-10 rounded-xl shadow-xl">
      <div className="w-full flex justify-end">
        <img
          onClick={() => {
            localStorage.setItem("selectedImage", "");
            setShowScanResult(false);
          }}
          src={CloseScan}
          alt="close-scan-icon"
          className="w-8 h-8 cursor-pointer"
        />
      </div>
      <p className="text-[24px] font-semibold text-[#4F4F4F]">Result Summary</p>

      <div className="w-full h-auto flex justify-between mt-3">
        <div className="w-[46%] h-auto">
          <div className="flex justify-between text-[14px] font-medium mt-1">
            <p className="text-[#333333]">Patient Name:</p>
            <p className="text-[#828282]">
              {showScanResultData?.patient_name}{" "}
              {selectedPatient?.patient_firstname}{" "}
              {selectedPatient?.patient_lastname}
            </p>
          </div>

          <div className="flex justify-between text-[14px] font-medium mt-1">
            <p className="text-[#333333]">Patient ID:</p>
            <p className="text-[#828282]">
              {showScanResultData?.scan?.special_id}
              {selectedPatient?.patient_special_id}
            </p>
          </div>

          <div className="flex justify-between text-[14px] font-medium mt-1">
            <p className="text-[#333333]">Phone Number:</p>
            <p className="text-[#828282]">
              {showScanResultData?.phone_number}
              {selectedPatient?.patient_phone}
            </p>
          </div>

          <div className="flex justify-between text-[14px] font-medium mt-1">
            <p className="text-[#333333]">Age:</p>
            <p className="text-[#828282]">
              {showScanResultData?.age}
              {selectedPatient?.patient_age}
            </p>
          </div>

          <div className="flex justify-between text-[14px] font-medium mt-1">
            <p className="text-[#333333]">Gender:</p>
            <p className="text-[#828282]">
              {showScanResultData?.gender}
              {selectedPatient?.patient_gender}
            </p>
          </div>

          <div className="flex justify-between text-[14px] font-medium mt-1">
            <p className="text-[#333333]">Address:</p>
            <p className="text-[#828282]">
              {showScanResultData?.address}
              {selectedPatient?.patient_address}
            </p>
          </div>

          <img
            src={file ? file : ""}
            alt="scaned-image"
            className={
              file ? "w-full h-[200px] m-auto my-5 rounded-xl" : "hidden"
            }
          />
          <img
            src={selectedPatient ? selectedPatient?.scan_image_url : ""}
            alt="scaned-image"
            className={
              selectedPatient
                ? "w-full h-[200px] m-auto my-5 rounded-xl"
                : "hidden"
            }
          />
        </div>
        <div className="w-[46%] h-auto">
          <p className="text-[#828282] text-[14px] font-medium">
            Overall Eye Health Status:{" "}
          </p>
          <p className="text-[#4F4F4F] text-[24px] font-medium">
            {showScanResultData?.scan?.label_name}
            {selectedPatient?.label_name}
          </p>
          <div className="relative w-full h-12 rounded-full mt-2 mb-[-40px]">
            <div
              className="absolute top-0 left-0 bg-blue-500 h-full rounded-l-full"
              style={{ width: `${confidencePercentages}%` }}
            ></div>
            <div className="text-white text-center w-full h-full absolute flex justify-center items-center">
              {confidencePercentages}%
            </div>
          </div>
          <div className="relative w-full h-12 rounded-full mt-6">
            <div
              className="absolute top-0 left-0 bg-blue-500 h-full rounded-l-full"
              style={{ width: `${confidencePercentage}%` }}
            ></div>
            <div className="text-white text-center w-full h-full absolute flex justify-center items-center">
              {confidencePercentage}%
            </div>
          </div>
          <p className="text-[#828282] text-[14px] font-medium mt-4">
            Detected Conditions:
          </p>
          <p className="text-[#0693F1] text-[16px] font-normal">
            {showScanResultData?.scan?.detected_conditions}
            {selectedPatient?.detected_conditions}
          </p>

          <p className="text-[#4F4F4F] text-[14px] font-medium mt-3">
            <span className="text-[#828282]">Severity:</span>{" "}
            {showScanResultData?.scan?.severity}
            {selectedPatient?.severity}
          </p>
          <p className="text-[#4F4F4F] text-[16px] font-normal">
            <span className="text-[#828282]">Progression:</span> Stable
          </p>

          <button
            onClick={HandleShowMakePrescription}
            className="w-4/5 text-[#0693F1] border-2 border-[#0693F1] rounded-[8px] py-4 mt-5"
          >
            Make Prescription
            {/* Done */}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScanResult;

import React from "react";

interface Props {
  PatientDetails: any;
  setShowPatientDetails: (value: boolean) => void;
}

function PatientsDetails({ PatientDetails, setShowPatientDetails }: Props) {
  return (
    <div className="bg-[#fff] w-full m-auto min-h-full flex flex-col justify-center p-12 sm:px-6 lg:px-8 not-italic leading-normal my-10 rounded-xl shadow-xl">
      <p className="text-[#4F4F4F] w-full text-[28px] font-semibold">
        Patient Details
      </p>

      <div className="flex justify-between text-[14px] font-medium mt-5">
        <p className="text-[#333333]">Patient Name:</p>
        <p className="text-[#828282]">
          {PatientDetails?.firstname} {PatientDetails?.lastname}
        </p>
      </div>
      <div className="flex justify-between text-[14px] font-medium mt-2">
        <p className="text-[#333333]">Patient ID:</p>
        <p className="text-[#828282]">{PatientDetails?.special_id}</p>
      </div>
      <div className="flex justify-between text-[14px] font-medium mt-2">
        <p className="text-[#333333]">State Of Residence</p>
        <p className="text-[#828282]">{PatientDetails?.state_of_residence}</p>
      </div>
      <div className="flex justify-between text-[14px] font-medium mt-2">
        <p className="text-[#333333]">Phone Number:</p>
        <p className="text-[#828282]">{PatientDetails?.phone}</p>
      </div>
      <div className="flex justify-between text-[14px] font-medium mt-2">
        <p className="text-[#333333]">City</p>
        <p className="text-[#828282]">{PatientDetails?.city}</p>
      </div>
      <div className="flex justify-between text-[14px] font-medium mt-2">
        <p className="text-[#333333]">Age</p>
        <p className="text-[#828282]">{PatientDetails?.age}</p>
      </div>
      <div className="flex justify-between text-[14px] font-medium mt-2">
        <p className="text-[#333333]">Gender:</p>
        <p className="text-[#828282]">{PatientDetails?.gender}</p>
      </div>
      <div className="flex justify-between text-[14px] font-medium mt-2">
        <p className="text-[#333333]">Address:</p>
        <p className="text-[#828282]">{PatientDetails?.address}</p>
      </div>
      {/* <div className="flex justify-between text-[14px] font-medium mt-2">
        <p className="text-[#333333]">Last Appointment:</p>
        <p className="text-[#828282]">01-07-04</p>
      </div> */}
      {/* <p className="text-[#333333] text-[14px] font-medium mt-3 list-disc">
        Medical History:
      </p> */}
      {/* <ul className="list-disc text-[12px] font-medium text-[#4F4F4F]">
        <li>Conditions: Cataract </li>
        <li className="my-1">Allergies: Allergic to penicilin</li>
        <li>Medications: Metformin (500 mg)</li>
        <li className="mt-1">Past Surgeries: Appendectomy (2018)</li>
      </ul> */}

      {/* <p className="text-[#333333] text-[14px] font-medium mt-3 list-disc">
        Recent Scan
      </p>
      <ul className="text-[12px] font-medium text-[#4F4F4F]">
        <li className="list-disc"> Scan 1 </li>
        <li className="my-1">Date: October 2, 2023</li>
        <li>Type: Retina</li>
        <li className="mt-1">Result: Good</li>
      </ul> */}

      {/* <div className="w-10/12 m-auto flex justify-between items-center mt-10"> */}
      <button
        onClick={() => {
          setShowPatientDetails(false);
        }}
        className="w-2/5 text-[#0693F1] border-2 border-[#0693F1] rounded-[8px] py-4 mt-5"
      >
        Close
      </button>
      {/* </div> */}
    </div>
  );
}

export default PatientsDetails;

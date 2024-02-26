import React from "react";

import CloseScan from "../assets/svgs/close-circle.svg";

function MakePrescription({ setShowPrescription }) {
  return (
    <div className="bg-[#fff] w-full m-auto min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 not-italic leading-normal my-10 rounded-xl shadow-xl">
      <div className="w-full flex justify-end">
        <img
          onClick={() => setShowPrescription(false)}
          src={CloseScan}
          alt="close-scan-icon"
          className="w-8 h-8 cursor-pointer"
        />
      </div>
      <p className="text-[#828282] text-[28px] font-medium text-center">
        Make Prescription
      </p>
      <label
        htmlFor=""
        className="text-[#4F4F4F] text-[16px] font-semibold mt-2"
      >
        Medication Name
      </label>
      <input
        type="text"
        placeholder="Paracetamol"
        name="medication_name"
        // value={medication_name}
        // onChange={handleChange}
        required
        className="bg-[#fff] border border-[#D0D5DD] rounded-[6px] pl-3 h-10 outline-none text-[14px] font-normal hover:border-2 hover:border-[#59B7F6] input-shadow text-[#4F4F4F]"
      />

      <label
        htmlFor=""
        className="text-[#4F4F4F] text-[16px] font-semibold mt-2"
      >
        Dosage
      </label>
      <input
        type="text"
        placeholder="1 per day"
        name="dosage"
        // value={dosage}
        // onChange={handleChange}
        required
        className="bg-[#fff] border border-[#D0D5DD] rounded-[6px] pl-3 h-10 outline-none text-[14px] font-normal hover:border-2 hover:border-[#59B7F6] input-shadow text-[#4F4F4F]"
      />
      <label
        htmlFor=""
        className="text-[#4F4F4F] text-[16px] font-semibold mt-2"
      >
        Prescription
      </label>
      <textarea
        name=""
        id=""
        cols={30}
        rows={5}
        placeholder="This is where you write the presription by the doctor"
        className="w-full border border-[#D0D5DD] rounded-[6px] p-3 outline-none text-[14px] font-normal hover:border-2 hover:border-[#59B7F6] input-shadow text-[#4F4F4F]"
      ></textarea>
      <button className="w-8/12 m-auto text-[#FFFFFF] bg-[#0693F1] rounded-[8px] py-4 mt-9">
        Send Prescription
      </button>
    </div>
  );
}

export default MakePrescription;

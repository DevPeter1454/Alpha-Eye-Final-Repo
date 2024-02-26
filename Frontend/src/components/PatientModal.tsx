import React, { useState, useEffect, useRef } from "react";
import Delete from "../assets/svgs/delete.svg";
import Lock from "../assets/svgs/lock.svg";

function PatientModal({ setShowPatientDetails }) {
  return (
    <div className="bg-[#FFFFFF] w-full h-auto rounded-lg py-4 px-3 shadow-[#1019280D]">
      <div
        onClick={() => setShowPatientDetails(true)}
        className="px-3 h-10 flex justify-start items-center mt-4 cursor-pointer"
      >
        <p className="ml-4 text-[#828282]">View Patient Details</p>
      </div>
    </div>
  );
}

export default PatientModal;

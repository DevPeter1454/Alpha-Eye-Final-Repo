import React, { useState, useEffect, useRef } from "react";
import Delete from "../assets/svgs/delete.svg";
import Lock from "../assets/svgs/lock.svg";

function DoctorModal({ setShowRemoveDoctor, setShowEditDoctor }) {
  return (
    <div className="bg-[#FFFFFF] w-full h-auto rounded-lg py-4 px-3 shadow-[#1019280D]">
      <div
        onClick={() => setShowRemoveDoctor(true)}
        className="px-3 h-10 flex justify-start items-center mt-4 cursor-pointer"
      >
        <img src={Delete} alt="delete icon" />
        <p className="ml-4 text-[#828282]">Remove Doctor</p>
      </div>

      <div
        onClick={() => setShowEditDoctor(true)}
        className="px-3 h-10 flex justify-start items-center mt-4 cursor-pointer"
      >
        <img src={Lock} alt="lock icon" />
        <p className="ml-4 text-[#828282]">Change Password</p>
      </div>
    </div>
  );
}

export default DoctorModal;

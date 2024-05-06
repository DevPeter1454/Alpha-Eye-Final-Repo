import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/endpoints";
import toast from "react-hot-toast";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import CloseScan from "../assets/svgs/close-circle.svg";

const defaultFormFields = {
  medicationName: "",
  dosage: "",
  prescription: "",
};

function MakePrescription({ setShowPrescription, selectedPatient }) {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [loading, setLoading] = useState(false);
  const { medicationName, dosage, prescription } = formFields;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | any>) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const token = useAppSelector((state: RootState) => state.auth.token);
  const scanPatientId = localStorage.getItem("scanPatientId");

  console.log("scanPatientId", scanPatientId);

  const doctorId = useAppSelector(
    (state: RootState) => state.auth.user?.doctor_id
  );
  const createdAt = useAppSelector(
    (state: RootState) => state.auth.user?.created_at
  );

  const handleSendPrescription = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("Prescription Data", formFields);

    try {
      const payload = {
        medication_name: medicationName,
        dosage: dosage,
        prescription: prescription,
        doctor_id: doctorId,
        patient_id: selectedPatient
          ? selectedPatient?.patient_special_id
          : scanPatientId,
        created_at: createdAt,
      };

      console.log("Payload", "ef tg");
      console.log("Payload", payload);

      const response = await axios.post(
        `${baseUrl}api/v1/doctor/prescribe`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setLoading(false);
        toast.success("Prescription sent successfully");
        setFormFields(defaultFormFields);
        setShowPrescription(false);
      } else {
        setLoading(false);
        toast.error("Failed to send prescription");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed to send prescription");
    }
  };

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
        name="medicationName"
        value={medicationName}
        onChange={handleChange}
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
        value={dosage}
        onChange={handleChange}
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
        name="prescription"
        value={prescription}
        onChange={handleChange}
        cols={30}
        rows={5}
        placeholder="This is where you write the prescription by the doctor"
        className="w-full border border-[#D0D5DD] rounded-[6px] p-3 outline-none text-[14px] font-normal hover:border-2 hover:border-[#59B7F6] input-shadow text-[#4F4F4F]"
      ></textarea>
      <button
        onClick={handleSendPrescription}
        className="w-8/12 m-auto text-[#FFFFFF] bg-[#0693F1] rounded-[8px] py-4 mt-9"
      >
        {loading ? "loading..." : "Send Prescription"}
      </button>
    </div>
  );
}

export default MakePrescription;

import React from "react";
import toast from "react-hot-toast";
import { useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import AddDoctorImage from "../assets/svgs/danger.svg";
import { baseUrl } from "../utils/endpoints";

interface Props {
  doctorId: string | null;
  doctorName: string | null;
  setShowRemoveDoctor: (show: boolean) => void;
  reloadDoctor: () => void;
}

function RemoveDoctor({
  doctorId,
  doctorName,
  setShowRemoveDoctor,
  reloadDoctor,
}: Props) {
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.auth.token);

  const HandleClose = () => {
    setShowRemoveDoctor(false);
  };

  const removeDoctor = async (e: any) => {
    e.preventDefault();
    if (!doctorId) return;

    try {
      const response = await fetch(`${baseUrl}api/v1/doctor/${doctorId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        // Handle successful deletion
        toast.success("Doctor removed successfully.");
        setShowRemoveDoctor(false);
        navigate("/admin-dashboard");
        reloadDoctor();
        //location.reload();
      } else {
        // Handle error
        toast.error(
          "Failed to remove doctor, Please try again." + response.statusText
        );
      }
    } catch (error) {
      // Handle error
      toast.error("Failed to remove doctor, Please try again." + error.message);
    }
  };

  return (
    <div className="bg-[#fff] w-full m-auto min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 not-italic leading-normal my-10 rounded-xl shadow-xl">
      <img
        src={AddDoctorImage}
        alt="add doctor image"
        className="w-[59px] h-[59px] m-auto"
      />
      <p className="text-[#4F4F4F] w-full text-center text-[28px] font-semibold mt-3">
        Remove Doctor
      </p>
      <p className="text-[#828282] w-full text-center text-[18px] font-normal mt-3">
        Are you sure you want to remove
      </p>
      <p className="text-[#828282] w-full text-center text-[18px] font-medium mt-3">
        {doctorName}
      </p>

      <div className="w-10/12 m-auto flex justify-between items-center mt-10">
        <button
          onClick={HandleClose}
          className="w-2/5 text-[#0693F1] border-2 border-[#0693F1] rounded-[8px] py-4"
        >
          Close
        </button>
        <button
          onClick={removeDoctor}
          className="w-2/5 text-[#FFFFFF] bg-[#0693F1] rounded-[8px] py-4"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default RemoveDoctor;

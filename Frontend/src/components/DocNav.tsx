import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../utils/endpoints";
import toast from "react-hot-toast";
import logo from "../assets/svgs/logo.svg";
import logout from "../assets/svgs/logout.svg";
import image6 from "../assets/svgs/image-6.svg";
import { useAppSelector } from "../store/hooks";

function DocNav() {
  const navigate = useNavigate();
  const token = useAppSelector((state) => state?.auth?.token);
  const DoctorName = useAppSelector((state) => state?.auth?.user?.name);

  const handleLogout = async () => {
    try {
      // Send a POST request to the logout endpoint with Authorization header
      const response = await axios.post(
        `${baseUrl}api/v1/logout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Logout successful");
        navigate("/login");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      toast.error("Error occurred during logout: " + error.message);
    }
  };

  return (
    <div className="bg-[#fff] w-full hidden md:flex md:justify-between h-10">
      <div className="flex items-center w-6/12 justify-between">
        <img src={logo} alt="" />

        <div className="w-full ml-14">
          <p className="text-[16px] font-semibold text-[#828282]">
            Good Evening!
          </p>
          <p className="text-[18px] font-medium text-[#4F4F4F]">
            Hello Doctor {DoctorName}
          </p>
        </div>
      </div>

      <div className="w-1/5 flex items-center justify-between">
        <div
          onClick={handleLogout}
          className="py-2 px-3 flex items-center justify-center gap-[10px] border border-[#0693F1] rounded-[8px] cursor-pointer"
        >
          <img src={logout} alt="" />
          <p className="text-[#0693F1] text-[16px] font-semibold mr-7">
            Logout
          </p>
        </div>

        <img src={image6} alt="" />
      </div>
    </div>
  );
}

export default DocNav;

import React, { useState } from "react";
import toast from "react-hot-toast";
import AuthLayout from "../Layouts/AuthLayout";
import logo from "../assets/svgs/logo.svg";
import { baseUrl } from "../utils/endpoints";
import { hospitalLogin, loginSuccess } from "../store/AuthSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import Spin from "../components/spinner/spinner.component";

const defaultFormFields = {
  admin_email: "",
  password: "",
  role: "Hospital",
};

function AdminLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [loading, setLoading] = useState(false);
  const { admin_email, password, role } = formFields;

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new URLSearchParams();
      formData.append("username", admin_email);
      formData.append("password", password);
      const loginUrl = `${baseUrl}api/v1/login?role=${role}`;

      const response = await dispatch<any>(
        hospitalLogin({
          url: loginUrl,
          formData: formData.toString(),
        })
      );

      if (response.meta.requestStatus === "fulfilled") {
        setLoading(false);
        toast.success("Login successful!");
        dispatch(loginSuccess(response.payload));
        role === "Doctor"
          ? navigate("/doctors-dashboard")
          : navigate("/admin-dashboard");
      } else {
        setLoading(false);
        toast.error(
          "Login failed: " + response.payload.response.data.detail ||
            response.payload.error.message
        );
      }
    } catch (error) {
      setLoading(false);
      toast.error("Login failed: " + error.message);
    }
  };

  const isFormValid = () => {
    return admin_email && password;
  };

  return (
    <AuthLayout>
      <div className="w-full md:w-3/5 m-auto bg-[#fff] shad rounded-[16px] not-italic leading-normal pb-5">
        <div className="pt-2 mt-10 pl-3">
          <img src={logo} alt="laploy" className="my-5" />
        </div>

        <p className="text-[#4F4F4F] w-full text-center text-[20px] md:text-[36px] font-bold">
          Welcome to Alpha-Eye!
        </p>
        <p className="w-full text-center text-[#828282] text-[24px] font-medium my-3">
          Login your account
        </p>

        <form
          onSubmit={handleLogin}
          action=""
          className="w-4/5 m-auto flex flex-col"
        >
          {/* Add role selection input */}
          <label
            htmlFor=""
            className="text-[#4F4F4F] text-[16px] font-semibold"
          >
            Role <span className="text-[#EB5757]">*</span>
          </label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={handleChange}
            required
            className="bg-[#fff] border border-[#D0D5DD] rounded-[6px] pl-3 h-10 outline-none text-[14px] font-normal hover:border-2 hover:border-[#59B7F6] input-shadow text-[#4F4F4F]"
          >
            <option value="Hospital" className="h-20">
              Hospital
            </option>
            <option value="Doctor">Doctor</option>
          </select>

          <label
            htmlFor=""
            className="text-[#4F4F4F] text-[16px] font-semibold mt-4"
          >
            Email Address <span className="text-[#EB5757]">*</span>
          </label>
          <input
            type="email"
            placeholder="Enter Email Address"
            name="admin_email"
            value={admin_email}
            onChange={handleChange}
            required
            className="bg-[#fff] border border-[#D0D5DD] rounded-[6px] pl-3 h-10 outline-none text-[14px] font-normal hover:border-2 hover:border-[#59B7F6] input-shadow text-[#4F4F4F]"
          />

          <label
            htmlFor=""
            className="text-[#4F4F4F] text-[16px] font-semibold mt-4 mb-1"
          >
            Password <span className="text-[#EB5757]">*</span>
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Enter Password"
            required
            className="bg-[#fff] border border-[#D0D5DD] rounded-[6px] pl-3 h-10 outline-none text-[14px] font-normal hover:border-2 hover:border-[#59B7F6] input-shadow text-[#4F4F4F]"
          />
          <p className="text-[#4F4F4F] w-full text-end my-2 text-[14px] font-medium">
            Dont't have an account?
            <a
              className="text-[#0693F1] border-b-2 border-[#0693F1] ml-2"
              href="/sign-up"
            >
              Register here
            </a>
          </p>

          <button
            type="submit"
            disabled={!isFormValid()}
            className={`${
              !isFormValid()
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            } w-[30%] bg-[#0693F1] flex justify-center py-3 my-2 m-auto rounded-lg text-[#fff] text-center`}
          >
            {loading ? <Spin /> : "Login"}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}

export default AdminLogin;

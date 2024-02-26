import React, { useState, useEffect, FormEvent } from "react";
import toast from "react-hot-toast";
// import { toast } from "react-toastify";
import { BiChevronDown } from "react-icons/bi";
import AuthLayout from "../Layouts/AuthLayout";
import alphaEye from "../assets/svgs/logo.svg";
import { createHospital } from "../store/AuthSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useNavigate } from "react-router-dom";
import Spin from "../components/spinner/spinner.component";

const defaultFormFields = {
  hospitalName: "",
  license_number: "",
  Address: "",
  State: "",
  City: "",
  LGA: "",
  email: "",
  Phone_Number: "",
  password: "",
  confirmPassword: "",
};

function AdminSignup() {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [states, setStates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lgas, setLgas] = useState([]);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    hospitalName,
    license_number,
    Address,
    State,
    City,
    LGA,
    email,
    Phone_Number,
    password,
    confirmPassword,
  } = formFields;

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch(
          "https://nga-states-lga.onrender.com/fetch"
        );
        const data = await response.json();
        setStates(data);
      } catch (error) {
        toast.error("Error fetching states: " + error.message);
      }
    };

    fetchStates();
  }, []);

  const handleChange = async (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;
    if (name === "State") {
      try {
        const response = await fetch(
          `https://nga-states-lga.onrender.com/?state=${value}`
        );
        const data = await response.json();
        setLgas(data);
      } catch (error) {}
    }
    setFormFields({ ...formFields, [name]: value });
  };

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSignup = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (password !== confirmPassword) {
      setLoading(false);
      toast.error("Passwords do not match");
      return;
    }

    try {
      const hospitalData = {
        hospital_name: hospitalName,
        address: Address,
        city: City,
        state: State,
        license_number: license_number,
        lga: LGA,
        admin_email: email,
        phone: Phone_Number,
        password: password,
      };
      const response = await dispatch(createHospital(hospitalData));
      if (response.meta.requestStatus === "fulfilled") {
        setLoading(false);
        toast.success("Hospital created successfully");
        resetFormFields();
        navigate("/login");
      } else {
        setLoading(false);
        toast.error("Signup failed: " + response.payload);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Signup failed: " + error.message);
    }
  };

  const isFormValid = () => {
    return (
      hospitalName &&
      license_number &&
      Address &&
      State &&
      City &&
      LGA &&
      email &&
      Phone_Number &&
      password &&
      confirmPassword
    );
  };

  return (
    <AuthLayout>
      <div className="w-full m-auto h-auto bg-[#fff] not-italic leading-normal rounded-lg shad">
        <div className="pt-2 mt-5 pl-3">
          <img src={alphaEye} alt="alpha-eye-logo" className="my-5" />
        </div>
        <p className="text-[#4F4F4F] w-full text-center text-[36px] font-bold">
          Welcome to Alpha-Eye!
        </p>
        <p className="w-full text-center text-[#828282] text-[24px] font-medium">
          Register your account
        </p>

        <form
          onSubmit={handleSignup}
          className="w-11/12 m-auto h-auto pb-1 my-8"
        >
          {/* First row start here */}
          <div className="w-full flex justify-between h-auto my-3">
            <div className="w-[45%] flex flex-col h-auto">
              <label htmlFor="" className="my-1 text-[16px] font-medium">
                Hospital name <span className="text-[#EB5757]">*</span>
              </label>
              <input
                type="text"
                id=""
                name="hospitalName"
                value={hospitalName}
                onChange={handleChange}
                placeholder="Enter Hospital name"
                className="bg-[#fff] border border-[#D0D5DD] rounded-[6px] pl-3 h-10 outline-none text-[14px] font-normal hover:border-2 hover:border-[#59B7F6] input-shadow text-[#4F4F4F]"
              />
            </div>

            <div className="w-[45%] flex flex-col h-auto">
              <label htmlFor="" className="my-1 text-[16px] font-medium">
                Nigeria Health Facility Registry (HFR) UID{" "}
                <span className="text-[#EB5757]">*</span>
              </label>
              <input
                type="text"
                id=""
                name="license_number"
                value={license_number}
                onChange={handleChange}
                placeholder="Enter UID here"
                className="bg-[#fff] border border-[#D0D5DD] rounded-[6px] pl-3 h-10 outline-none text-[14px] font-normal hover:border-2 hover:border-[#59B7F6] input-shadow text-[#4F4F4F]"
              />
            </div>
          </div>
          {/* First row ends here */}

          {/* Second row start here */}
          <div className="w-full flex justify-between h-auto my-3">
            <div className="w-[45%] flex flex-col h-auto">
              <label htmlFor="" className="my-1 text-[16px] font-medium">
                Address <span className="text-[#EB5757]">*</span>
              </label>
              <input
                type="text"
                id=""
                name="Address"
                value={Address}
                onChange={handleChange}
                placeholder="Enter address"
                className="bg-[#fff] border border-[#D0D5DD] rounded-[6px] pl-3 h-10 outline-none text-[14px] font-normal hover:border-2 hover:border-[#59B7F6] input-shadow text-[#4F4F4F]"
              />
            </div>

            <div className="w-[45%] flex flex-col h-auto">
              <label htmlFor="" className="my-1 text-[16px] font-medium">
                State <span className="text-[#EB5757]">*</span>
              </label>
              <div className="relative text-[#98A2B3]">
                <span
                  style={{
                    position: "absolute",
                    top: "25%",
                    right: "15px",
                    minWidth: "16px",
                    pointerEvents: "none",
                  }}
                >
                  <BiChevronDown size={20} />
                </span>

                <select
                  name="State"
                  value={State}
                  onChange={handleChange}
                  className="w-full bg-[#fff] border border-[#D0D5DD] rounded-[6px] pl-3 h-10 outline-none text-[14px] font-normal pr-10 appearance-none hover:bg-[#F2F2F2] hover:border hover:border-[#D0D5DD]"
                >
                  <option value="">Select State</option>
                  {states.map((state, index) => (
                    <option value={state} key={index} className="w-full">
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* Second row ends here */}

          {/* Third row start here */}
          <div className="w-full flex justify-between h-auto my-3">
            <div className="w-[45%] flex flex-col h-auto">
              <label htmlFor="" className="my-1 text-[16px] font-medium">
                City <span className="text-[#EB5757]">*</span>
              </label>
              <input
                type="text"
                id=""
                name="City"
                value={City}
                onChange={handleChange}
                placeholder="Enter City"
                className="bg-[#fff] border border-[#D0D5DD] rounded-[6px] pl-3 h-10 outline-none text-[14px] font-normal hover:border-2 hover:border-[#59B7F6] input-shadow text-[#4F4F4F]"
              />
            </div>

            <div className="w-[45%] flex flex-col h-auto relative">
              <label htmlFor="" className="my-1 text-[16px] font-medium">
                Local Government <span className="text-[#EB5757]">*</span>
              </label>
              <div className="relative text-[#98A2B3]">
                <span
                  style={{
                    position: "absolute",
                    top: "25%",
                    right: "15px",
                    minWidth: "16px",
                    pointerEvents: "none",
                  }}
                >
                  <BiChevronDown size={20} />
                </span>
                <select
                  name="LGA"
                  value={LGA}
                  onChange={handleChange}
                  className="w-full bg-[#fff] border border-[#D0D5DD] rounded-[6px] pl-3 h-10 outline-none text-[14px] font-normal pr-10 appearance-none hover:bg-[#F2F2F2] hover:border hover:border-[#D0D5DD]"
                >
                  <option value="">Select Local Government</option>
                  {lgas?.map((lga, index) => (
                    <option value={lga} key={index}>
                      {lga}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* Third row ends here */}

          {/* Fourth row start here */}
          <div className="w-full flex justify-between h-auto my-3">
            <div className="w-[45%] flex flex-col h-auto">
              <label htmlFor="" className="my-1 text-[16px] font-medium">
                Email Address <span className="text-[#EB5757]">*</span>
              </label>
              <input
                type="text"
                id=""
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter Email Address"
                className="bg-[#fff] border border-[#D0D5DD] rounded-[6px] pl-3 h-10 outline-none text-[14px] font-normal hover:border-2 hover:border-[#59B7F6] input-shadow text-[#4F4F4F]"
              />
            </div>

            <div className="w-[45%] flex flex-col h-auto">
              <label htmlFor="" className="my-1 text-[16px] font-medium">
                Phone Number <span className="text-[#EB5757]">*</span>
              </label>
              <input
                type="text"
                id=""
                name="Phone_Number"
                value={Phone_Number}
                onChange={handleChange}
                placeholder="Enter Phone Number"
                className="bg-[#fff] border border-[#D0D5DD] rounded-[6px] pl-3 h-10 outline-none text-[14px] font-normal hover:border-2 hover:border-[#59B7F6] input-shadow text-[#4F4F4F]"
              />
            </div>
          </div>
          {/* Fourth row ends here */}

          {/* Fifth row ends here */}
          <div className="w-full flex justify-between h-auto my-3">
            <div className="w-[45%] flex flex-col h-auto">
              <label htmlFor="" className="my-1 text-[16px] font-medium">
                Set Password <span className="text-[#EB5757]">*</span>
              </label>
              <input
                type="password"
                id=""
                name="password"
                value={password}
                onChange={handleChange}
                required
                placeholder="Enter Password"
                className="bg-[#fff] border border-[#D0D5DD] rounded-[6px] pl-3 h-10 outline-none text-[14px] font-normal hover:border-2 hover:border-[#59B7F6] input-shadow text-[#4F4F4F]"
              />
            </div>

            <div className="w-[45%] flex flex-col h-auto">
              <label htmlFor="" className="my-1 text-[16px] font-medium">
                Confirm Password <span className="text-[#EB5757]">*</span>
              </label>
              <input
                type="password"
                id=""
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                placeholder="Enter Password Again"
                className="bg-[#fff] border border-[#D0D5DD] rounded-[6px] pl-3 h-10 outline-none text-[14px] font-normal hover:border-2 hover:border-[#59B7F6] input-shadow text-[#4F4F4F]"
              />
              {/* Fifth row ends here */}
            </div>
          </div>
          <p className="text-[#4F4F4F] w-full text-end my-1 text-[14px] font-medium">
            Already have an account?{" "}
            <a
              className="text-[#0693F1] border-b-2 border-[#0693F1] ml-1"
              href="/login"
            >
              login here
            </a>
          </p>

          <button
            type="submit"
            disabled={!isFormValid()}
            onClick={handleSignup}
            className={`${
              !isFormValid()
                ? "opacity-50 cursor-not-allowed"
                : "cursor-pointer"
            } w-[30%] bg-[#0693F1] flex justify-center py-3 my-4 m-auto rounded-lg text-[#fff] text-center`}
          >
            {loading ? <Spin /> : "Create Account"}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}

export default AdminSignup;

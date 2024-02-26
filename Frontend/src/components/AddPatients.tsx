import React, { useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Tab } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";
import { PatientGenderOptions } from "../utils/SelectOptions";
import upload from "../assets/svgs/document-upload.svg";
import group7 from "../assets/svgs/Group7.svg";
import { baseUrl } from "../utils/endpoints";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Spin from "./spinner/spinner.component";
import { RootState } from "../store/store";

const defaultFormFields = {
  firstname: "",
  lastname: "",
  age: "",
  gender: "",
  address: "",
  phone: "",
  city: "",
  state_of_residence: "",
};

interface AddNewDocProps {
  handleCloseComponent: () => void;
}

function AddPatients({ handleCloseComponent }: AddNewDocProps) {
  const [showOverlay, setShowOverlay] = useState(false);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [loading, setLoading] = useState(false);
  const {
    firstname,
    lastname,
    age,
    gender,
    address,
    phone,
    city,
    state_of_residence,
  } = formFields;

  const token = useAppSelector((state: RootState) => state.auth.token);
  const dispatch = useAppDispatch();
  const hospitalId = useAppSelector(
    (state: RootState) => state.auth.user?.hospital_id
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleAddPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        `${baseUrl}api/v1/patient`,
        JSON.stringify(formFields),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setLoading(false);
        toast.success("Patient added successfully!");
        setShowOverlay(true);
        setFormFields(defaultFormFields);
      } else {
        setLoading(false);
        toast.error("Failed adding patient");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed adding patient");
    }
  };

  return (
    <Tab.Panel className="w-[95%] m-auto h-auto flex flex-col bg-[#fff] rounded-[6px] not-italic leading-normal shads">
      <p className="w-full text-center text-[#828282] text-[28px] font-medium"></p>
      <div
        className={`w-11/12 m-auto h-auto pb-1 my-8 ${
          showOverlay ? "opacity-40" : "opacity-100"
        }`}
      >
        {/* First row start here */}
        <div className="w-full flex justify-between h-auto my-3">
          <form action="" className="w-[45%] flex flex-col h-auto">
            <label htmlFor="" className="my-1 text-[16px] font-medium">
              Patient’s FirstName <span className="text-[#EB5757]">*</span>
            </label>
            <input
              type="text"
              name="firstname"
              value={firstname}
              onChange={handleChange}
              required
              placeholder="Enter Patient's Firstname"
              className="bg-[#fff] border border-[#D0D5DD] rounded-[6px] pl-3 h-10 outline-none text-[14px] font-normal hover:border-2 hover:border-[#59B7F6] input-shadow text-[#4F4F4F]"
            />
          </form>

          <form action="" className="w-[45%] flex flex-col h-auto">
            <label htmlFor="" className="my-1 text-[16px] font-medium">
              Patient’s LastName <span className="text-[#EB5757]">*</span>
            </label>
            <input
              type="text"
              name="lastname"
              value={lastname}
              onChange={handleChange}
              required
              placeholder="Enter Patient's Lastname"
              className="bg-[#fff] border border-[#D0D5DD] rounded-[6px] pl-3 h-10 outline-none text-[14px] font-normal hover:border-2 hover:border-[#59B7F6] input-shadow text-[#4F4F4F]"
            />
          </form>
        </div>
        {/* First row ends here */}

        {/* second row start here */}
        <div className="w-full flex justify-between h-auto my-3">
          <form action="" className="w-[45%] flex flex-col h-auto">
            <label htmlFor="" className="my-1 text-[16px] font-medium">
              Patient’s Age <span className="text-[#EB5757]">*</span>
            </label>
            <input
              type="text"
              name="age"
              value={age}
              onChange={handleChange}
              required
              placeholder="Enter Patient’s Age"
              className="bg-[#fff] border border-[#D0D5DD] rounded-[6px] pl-3 h-10 outline-none text-[14px] font-normal hover:border-2 hover:border-[#59B7F6] input-shadow text-[#4F4F4F]"
            />
          </form>

          <form action="" className="w-[45%] flex flex-col h-auto">
            <label htmlFor="" className="my-1 text-[16px] font-medium">
              Patient’s Address <span className="text-[#EB5757]">*</span>
            </label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={handleChange}
              required
              placeholder="Enter Patient’s Adress"
              className="bg-[#fff] border border-[#D0D5DD] rounded-[6px] pl-3 h-10 outline-none text-[14px] font-normal hover:border-2 hover:border-[#59B7F6] input-shadow text-[#4F4F4F]"
            />
          </form>
        </div>
        {/* second row ends here */}

        {/* third row start here */}
        <div className="w-full flex justify-between h-auto my-3">
          <form action="" className="w-[45%] flex flex-col h-auto">
            <label htmlFor="" className="my-1 text-[16px] font-medium">
              Patient's Gender <span className="text-[#EB5757]">*</span>
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
                name="gender"
                value={gender}
                onChange={handleChange}
                className="w-full bg-[#fff] border border-[#D0D5DD] rounded-[6px] pl-3 h-10 outline-none text-[14px] font-normal pr-10 appearance-none hover:bg-[#F2F2F2] hover:border hover:border-[#D0D5DD]"
              >
                {PatientGenderOptions?.map((gender) => (
                  <option
                    value={gender.value}
                    key={gender.id}
                    className="w-full"
                  >
                    {gender.label}
                  </option>
                ))}
              </select>
            </div>
          </form>

          <form action="" className="w-[45%] flex flex-col h-auto">
            <label htmlFor="" className="my-1 text-[16px] font-medium">
              Patient's Phone Number <span className="text-[#EB5757]">*</span>
            </label>
            <input
              type="text"
              id=""
              name="phone"
              value={phone}
              onChange={handleChange}
              required
              placeholder="Enter Patient's Phone"
              className="bg-[#fff] border border-[#D0D5DD] rounded-[6px] pl-3 h-10 outline-none text-[14px] font-normal hover:border-2 hover:border-[#59B7F6] input-shadow text-[#4F4F4F]"
            />
          </form>
        </div>
        {/* third row ends here */}

        {/* fourth row start here */}
        <div className="w-full flex justify-between h-auto my-3">
          <form action="" className="w-[45%] flex flex-col h-auto">
            <label htmlFor="" className="my-1 text-[16px] font-medium">
              Patient's City <span className="text-[#EB5757]">*</span>
            </label>
            <input
              type="text"
              id=""
              name="city"
              value={city}
              onChange={handleChange}
              required
              placeholder="Enter Patient's City"
              className="bg-[#fff] border border-[#D0D5DD] rounded-[6px] pl-3 h-10 outline-none text-[14px] font-normal hover:border-2 hover:border-[#59B7F6] input-shadow text-[#4F4F4F]"
            />
          </form>

          <form action="" className="w-[45%] flex flex-col h-auto">
            <label htmlFor="" className="my-1 text-[16px] font-medium">
              Patient's State Of Residence
              <span className="text-[#EB5757]">*</span>
            </label>
            <input
              type="text"
              id=""
              name="state_of_residence"
              value={state_of_residence}
              onChange={handleChange}
              required
              placeholder="Enter Patient's State Of Residence"
              className="bg-[#fff] border border-[#D0D5DD] rounded-[6px] pl-3 h-10 outline-none text-[14px] font-normal hover:border-2 hover:border-[#59B7F6] input-shadow text-[#4F4F4F]"
            />
          </form>
        </div>
        {/* fourth row ends here */}

        <div
          className={`bg-[#0693F1] w-[30%] py-3 mt-4 m-auto rounded-lg text-[#fff] text-center cursor-pointer ${
            showOverlay ? "overlay" : ""
          }`}
          onClick={handleAddPatient}
        >
          {loading ? <Spin /> : "Add Patient"}
        </div>
      </div>
      <div
        className={`w-2/4 h-80 m-auto rounded-[6px] bg-[#fff] overshad ${
          showOverlay ? "absolute top-[28%] left-[35%]" : "hidden"
        }`}
      >
        <img src={group7} alt="" className="m-auto my-5" />
        <p className="text-center text-[#4F4F4F] text-[28px] font-semibold">
          Patient Added
        </p>
        {/* <p className="text-center text-[#828282] text-[18px] font-normal my-5 w-2/4 m-auto">
          Login credentials have been sent to the patient's Email address
        </p> */}
        <div
          className={`bg-[#0693F1] w-[30%] py-3 my-3 m-auto rounded-lg text-[#fff] text-center cursor-pointer ${
            showOverlay ? "overlay" : ""
          }`}
          onClick={handleCloseComponent}
        >
          Close
        </div>
      </div>
    </Tab.Panel>
  );
}

export default AddPatients;

import React, { useState, useRef } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Tab } from "@headlessui/react";
import { BiChevronDown } from "react-icons/bi";
import { DoctorGenderOptions } from "../utils/SelectOptions";
import upload from "../assets/svgs/document-upload.svg";
import group7 from "../assets/svgs/Group7.svg";
import { baseUrl } from "../utils/endpoints";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import Spin from "./spinner/spinner.component";
import { RootState } from "../store/store";

const defaultFormFields = {
  name: "",
  email: "",
  gender: "",
  password: "",
};

interface AddNewDocProps {
  handleCloseComponent: () => void;
}

function AddNewDoc({ handleCloseComponent }: AddNewDocProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [loading, setLoading] = useState(false);
  const { name, email, gender, password } = formFields;

  const token = useAppSelector((state: RootState) => state.auth.token);
  const dispatch = useAppDispatch();
  const hospitalId = useAppSelector(
    (state: RootState) => state.auth.user?.hospital_id
  );

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleAddDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", fileInputRef.current?.files?.[0] ?? "");
      const response = await axios.post(
        `${baseUrl}api/v1/doctor?name=${name}&email=${email}&gender=${gender}&hospital_id=${hospitalId}&password=${password}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setLoading(false);
        toast.success("Doctor added successfully!");
        setShowOverlay(true);
        setFormFields(defaultFormFields);
        location.reload();
      } else {
        setLoading(false);
        toast.error("Failed adding doctor");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Failed adding doctor");
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
              Doctor’s Name <span className="text-[#EB5757]">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              required
              placeholder="Enter Doctor's name"
              className="bg-[#fff] border border-[#D0D5DD] rounded-[6px] pl-3 h-10 outline-none text-[14px] font-normal hover:border-2 hover:border-[#59B7F6] input-shadow text-[#4F4F4F]"
            />
          </form>

          <form action="" className="w-[45%] flex flex-col h-auto">
            <label htmlFor="" className="my-1 text-[16px] font-medium">
              Email Adress <span className="text-[#EB5757]">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
              placeholder="Enter Email Address"
              className="bg-[#fff] border border-[#D0D5DD] rounded-[6px] pl-3 h-10 outline-none text-[14px] font-normal hover:border-2 hover:border-[#59B7F6] input-shadow text-[#4F4F4F]"
            />
          </form>
        </div>
        {/* First row ends here */}

        {/* Second row start here */}
        <div className="w-full flex justify-between h-auto my-3">
          <form action="" className="w-[45%] flex flex-col h-auto">
            <label htmlFor="" className="my-1 text-[16px] font-medium">
              Gender <span className="text-[#EB5757]">*</span>
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
                {DoctorGenderOptions.map((gender) => (
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
              Password <span className="text-[#EB5757]">*</span>
            </label>
            <input
              type="password"
              id=""
              name="password"
              value={password}
              onChange={handleChange}
              required
              placeholder="Enter Doctor's Password"
              className="bg-[#fff] border border-[#D0D5DD] rounded-[6px] pl-3 h-10 outline-none text-[14px] font-normal hover:border-2 hover:border-[#59B7F6] input-shadow text-[#4F4F4F]"
            />
          </form>
        </div>
        {/* Second row ends here */}

        <p className="text-[#EB5757] text-[16px] font-semibold w-[40%] m-auto my-2 pt-3">
          Add Image <span className="text-[#EB5757]">*</span>
        </p>

        <label
          htmlFor="imageUpload"
          className="w-[40%] border border-[#D0D5DD] bg-[#fff] h-[100px] flex justify-center items-center m-auto mb-5 rounded-[6px] cursor-pointer"
        >
          {selectedImage ? (
            <img
              src={selectedImage}
              alt="Selected"
              style={{ maxWidth: "40%", height: "100px" }}
            />
          ) : (
            <>
              <img src={upload} alt="" />
              <p className="text-[#98A2B3] text-[14px] font-medium ml-2">
                Click to upload doctor’s image
              </p>
            </>
          )}
        </label>

        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleImageUpload}
          ref={fileInputRef}
        />

        <div
          className={`bg-[#0693F1] w-[30%] py-3 my-3 m-auto rounded-lg text-[#fff] text-center cursor-pointer ${
            showOverlay ? "overlay" : ""
          }`}
          onClick={handleAddDoctor}
        >
          {loading ? <Spin /> : "Add Doctor"}
        </div>
      </div>
      <div
        className={`w-2/4 h-80 m-auto rounded-[6px] bg-[#fff] overshad ${
          showOverlay ? "absolute top-[28%] left-[35%]" : "hidden"
        }`}
      >
        <img src={group7} alt="" className="m-auto my-5" />
        <p className="text-center text-[#4F4F4F] text-[28px] font-semibold">
          Doctor Added
        </p>
        <p className="text-center text-[#828282] text-[18px] font-normal my-5 w-2/4 m-auto">
          Login credentials have been sent to the doctor's Email address
        </p>
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

export default AddNewDoc;

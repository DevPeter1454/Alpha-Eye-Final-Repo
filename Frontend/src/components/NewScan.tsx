import React, { useState, useRef } from "react";
import upload from "../assets/svgs/document-upload.svg";

function NewScan({ setShowScan, fetchScanHistory }) {
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [patientId, setPatientId] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      // Do something with the selected image (e.g., upload it to a server).
      // For now, we'll just update the state to display the image.
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  // const handleChange = (
  //   event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  // ) => {
  //   const { name, value } = event.target;
  //   setFormFields({ ...formFields, [name]: value });
  // };

  localStorage.setItem("selectedImage", selectedImage);
  localStorage.setItem("patientId", patientId);

  const HandleUploadImage = (e: any) => {
    e.preventDefault();
    setShowScan(true);
  };

  return (
    <div className="bg-[#fff] w-full m-auto min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8 not-italic leading-normal my-10 rounded-xl shadow-xl">
      <p className="text-[#828282] w-full text-center text-[28px] font-semibold mt-3">
        New Scan
      </p>
      <form className="w-4/5 m-auto flex flex-col mt-3">
        <label
          htmlFor=""
          className="text-[#4F4F4F] text-[16px] font-semibold mt-5 mb-1"
        >
          Patient ID
        </label>
        <input
          type="text"
          name="patient_id"
          onChange={(e) => setPatientId(e.target.value)}
          placeholder="Adeyinka Adesla"
          required
          className="bg-[#fff] border border-[#D0D5DD] rounded-[6px] pl-3 h-10 outline-none text-[14px] font-normal hover:border-2 hover:border-[#59B7F6] input-shadow text-[#4F4F4F]"
        />

        <p className="text-[#4F4F4F] text-[14px] font-semibold mt-5 mb-2">
          Add Image
        </p>

        <label
          htmlFor="imageUpload"
          className="w-full border-2 border-dotted border-[#D0D5DD] bg-[#fff] h-[100px] flex justify-center items-center m-auto mb-5 rounded-[6px] cursor-pointer"
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
                Click to upload scan image
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

        <button
          onClick={HandleUploadImage}
          className="w-full text-[#FFFFFF] bg-[#0693F1] rounded-[8px] py-4"
        >
          Upload Image
        </button>
      </form>
    </div>
  );
}

export default NewScan;

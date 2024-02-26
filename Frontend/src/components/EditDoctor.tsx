import React from "react";

function UpdateDoctor({
  setShowEditDoctor,
}: {
  setShowEditDoctor: (value: boolean) => void;
}) {
  return (
    <div className="bg-[#fff] w-full m-auto min-h-full flex flex-col justify-center py-8 sm:px-6 lg:px-8 not-italic leading-normal my-10 rounded-xl shadow-2xl">
      <p className="text-[#4F4F4F] w-full text-center text-[28px] font-semibold">
        Update Password
      </p>

      {/* <form className="w-4/5 m-auto flex flex-col mt-3" onSubmit={handleSubmit}> */}
      <form className="w-4/5 m-auto flex flex-col mt-3">
        <label
          htmlFor=""
          className="text-[#4F4F4F] text-[16px] font-semibold mt-5 mb-1"
        >
          Enter old Password
        </label>
        <input
          type="password"
          name="password"
          //   value={password}
          //   onChange={handleChange}
          placeholder="* * * * * * * * * *"
          required
          className="bg-[#fff] border border-[#D0D5DD] rounded-[6px] pl-3 h-10 outline-none text-[14px] font-normal hover:border-2 hover:border-[#59B7F6] input-shadow text-[#4F4F4F]"
        />

        <label
          htmlFor=""
          className="text-[#4F4F4F] text-[16px] font-semibold mt-5 mb-1"
        >
          Enter New Password
        </label>
        <input
          type="password"
          name="password"
          //   value={password}
          //   onChange={handleChange}
          placeholder="* * * * * * * * * *"
          required
          className="bg-[#fff] border border-[#D0D5DD] rounded-[6px] pl-3 h-10 outline-none text-[14px] font-normal hover:border-2 hover:border-[#59B7F6] input-shadow text-[#4F4F4F]"
        />

        <label
          htmlFor=""
          className="text-[#4F4F4F] text-[16px] font-semibold mt-5 mb-1"
        >
          Confirm Password
        </label>
        <input
          type="password"
          name="password"
          //   value={password}
          //   onChange={handleChange}
          placeholder="* * * * * * * * * *"
          required
          className="bg-[#fff] border border-[#D0D5DD] rounded-[6px] pl-3 h-10 outline-none text-[14px] font-normal hover:border-2 hover:border-[#59B7F6] input-shadow text-[#4F4F4F]"
        />
        <div className="w-10/12 m-auto flex justify-between items-center mt-10">
          <button
            onClick={() => setShowEditDoctor(false)}
            className="w-2/5 text-[#0693F1] border-2 border-[#0693F1] rounded-[8px] py-4"
          >
            Close
          </button>
          <button className="w-2/5 text-[#FFFFFF] bg-[#0693F1] rounded-[8px] py-4">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateDoctor;

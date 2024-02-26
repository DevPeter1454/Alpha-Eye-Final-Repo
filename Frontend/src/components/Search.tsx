import React from "react";

function SearchBox({ placeholder }) {
  return (
    <div className="relative w-[68%]">
      <span className="absolute inset-y-0 left-0 flex items-center w-[5%]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="ml-3 w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="#98A2B3"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </span>
      <input
        type="search"
        name="Search"
        // value={searchField}
        placeholder={placeholder}
        // onChange={onChangeHandler}
        className="h-10 w-full rounded-[6px] pl-10 bg-white outline-none border border-[#D0D5DD] text-[#98A2B3]"
      />
    </div>
  );
}

export default SearchBox;

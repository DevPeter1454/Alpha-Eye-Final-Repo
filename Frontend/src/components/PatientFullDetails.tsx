import React from "react";
import { sampData } from "../utils/DoctorData";
import Right from "../assets/svgs/arrow-right.svg";

function PatientFullDetails({ selectedPatient, setShowPatientFullInfo }: any) {
  // Function to format the created_at date
  const formatCreatedAt = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = `${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${date
      .getDate()
      .toString()
      .padStart(2, "0")}/${date.getFullYear()}`;
    return formattedDate;
  };
  return (
    <div className="bg-[#fff] w-full h[480px] h-screen py-4 px-3">
      <div className="w-11/12 h-[150px] flex justify-between items-center">
        <div className="w-[25%] flex items-center">
          <div className="bg-red-900 h-20 w-20 rounded-full"></div>
          <p className="ml-5 text-[#4F4F4F] font-semibold">
            <span className="text-[18px]">{selectedPatient?.lastname}</span>{" "}
            <br />{" "}
            <span className="text-[16px]">{selectedPatient?.firstname}</span>
          </p>
        </div>
        <div className="w-[20%] text-[14px] text-[#333333]">
          <p className="font-semibold">Phone Number:</p>
          <p className="font-medium">{selectedPatient?.phone}</p>
        </div>
        <div className="w-[10%] text-[14px] text-[#333333]">
          <p className="font-semibold">Gender:</p>
          <p className="font-medium">{selectedPatient?.gender}</p>
        </div>
        <div className="w-[25%] text-[14px] text-[#333333]">
          <p className="font-semibold">Email Address:</p>
          <p className="font-medium">{selectedPatient?.email}</p>
        </div>
        <div className="w-[15%] text-[14px] text-[#333333]">
          <p className="font-semibold">Patient ID:</p>
          <p className="font-medium">{selectedPatient?.special_id}</p>
        </div>
      </div>

      <div className="w-11/12 h-80 flex justify-between">
        <div className="w-[60%] h-full">
          <p className="text-[#333333] text-[16px] font-semibold">
            Recent Scans
          </p>

          <table className="w-full table-auto border-collapse table overflow-y-scroll">
            <thead>
              <tr className="grid w-full grid-cols-3 py-5 text-[#828282]">
                <th className="text-[#333] text-sm text-start font-semibold">
                  Scan ID
                </th>
                <th className="text-sm font-medium text-start">Date Scanned</th>
                <th className="text-sm font-medium text-start">Action</th>
              </tr>
            </thead>
            <tbody>
              {sampData?.map((item: any, index: number) => (
                <tr key={index} className="grid grid-cols-3 items-center py-5">
                  <td className="text-[#333] text-sm font-semibold">
                    {/* {item?.firstname} {item?.lastname} */}
                    {selectedPatient?.special_id}
                  </td>
                  <td className="text-[#828282] text-sm font-medium text-start">
                    {formatCreatedAt(selectedPatient?.created_at)}
                  </td>
                  <td className="">
                    {/* <button
                      // onClick={() => setShowPatientInfo(true)}
                      className=" text-[#0693F1] py-2 px-3"
                    >
                      <span className="text-[#333]">&#8942;</span>
                    </button> */}
                    <button
                      // onClick={() => setShowScanResult(true)}
                      className="border border-[#0693F1] text-[#0693F1] rounded-lg py-2 px-3"
                    >
                      View Result
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-[30%] h-full">
          <p className="text-[#333333] text-[16px] font-semibold">
            Recent Prescriptions
          </p>

          <div className="mt-8 flex justify-between items-center">
            <div className="">
              <p className="text-[14px] font-semibold text-[#4D4D4D]">
                Prescription 5034
              </p>
              <p className="text-[#828282] text-[10px] font-medium">
                Date: 3/2/2024
              </p>
            </div>
            <img src={Right} alt="arrow-right-icon" />
          </div>
          <div className="mt-8 flex justify-between items-center">
            <div className="">
              <p className="text-[14px] font-semibold text-[#4D4D4D]">
                Prescription 5034
              </p>
              <p className="text-[#828282] text-[10px] font-medium">
                Date: 3/2/2024
              </p>
            </div>
            <img src={Right} alt="arrow-right-icon" />
          </div>
          <div className="mt-8 flex justify-between items-center">
            <div className="">
              <p className="text-[14px] font-semibold text-[#4D4D4D]">
                Prescription 5034
              </p>
              <p className="text-[#828282] text-[10px] font-medium">
                Date: 3/2/2024
              </p>
            </div>
            <img src={Right} alt="arrow-right-icon" />
          </div>
          <div className="mt-8 flex justify-between items-center">
            <div className="">
              <p className="text-[14px] font-semibold text-[#4D4D4D]">
                Prescription 5034
              </p>
              <p className="text-[#828282] text-[10px] font-medium">
                Date: 3/2/2024
              </p>
            </div>
            <img src={Right} alt="arrow-right-icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientFullDetails;

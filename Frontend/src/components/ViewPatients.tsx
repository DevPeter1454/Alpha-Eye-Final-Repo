import React, { useState, useEffect, useRef } from "react";
import { Tab } from "@headlessui/react";
import SearchBox from "./Search";
import PatientModal from "./PatientModal";
import PatientsDetails from "./PatientsDetails";
import Avatar from "../assets/svgs/avatar.svg";
import { baseUrl } from "../utils/endpoints";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";

interface Patient {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  special_id: string;
  created_at: string;
  gender: string;
}

function ViewPatients() {
  const [showEdit, setShowEdit] = useState(false);
  const [patients, setPatients] = useState<any>([]);
  const [selectedPatientDetails, setSelectedPatientDetails] =
    useState<any>(null);
  const [showPatientDetails, setShowPatientDetails] = useState(false);
  const showEditRef = useRef<HTMLDivElement>(null);
  const showPatientDetailsRef = useRef<HTMLDivElement>(null);

  const token = useAppSelector((state: any) => state.auth.token);
  const hospitalId = useAppSelector(
    (state: RootState) => state.auth.user?.hospital_id
  );

  useEffect(() => {
    fetch(`${baseUrl}api/v1/hospital/patients/${hospitalId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Map through the doctors array and format the created_at date
        const formattedPatients = data.data.map((patient: Patient) => ({
          ...patient,
          created_at: formatCreatedAt(patient.created_at),
        }));
        setPatients(formattedPatients);
      });
  }, []);

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

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        showEditRef.current &&
        !showEditRef.current.contains(event.target as Node)
      ) {
        setShowEdit(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEditRef]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        showPatientDetailsRef.current &&
        !showPatientDetailsRef.current.contains(event.target as Node)
      ) {
        setShowPatientDetails(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPatientDetailsRef]);

  return (
    <Tab.Panel className="w-full h-full not-italic leading-normal">
      <div className="flex items-center w-full h-12">
        <p className="w-[30%] text-[24px] font-medium text-[#333]">Patients</p>
        <SearchBox placeholder="Search for Patients..." />
      </div>

      <div className="w-full h-[65svh] overflow-y-scroll mt-8">
        <table className="w-full table-auto border-collapse table">
          <thead>
            <tr className="w-[90%] flex justify-between border-b border-[#EAECF0] py-5 text-[#828282]">
              <th className="w-[25%] text-[#333] text-sm font-semibold text-start pl-4">
                Patient's name
              </th>
              <th className="w-[25%] text-sm font-medium text-start">
                Phone Number
              </th>
              <th className="w-[10%] text-sm font-medium text-start">Gender</th>
              <th className="w-[15%] text-sm font-medium text-start">
                Patient ID
              </th>
              <th className="w-[15%] text-sm font-medium text-start">
                Date Created
              </th>
            </tr>
          </thead>
          <tbody>
            {patients?.map((item: Patient, index: number) => (
              <tr
                key={index}
                className="w-full flex justify-between items-center border-b border-[#EAECF0] py-5"
              >
                <td className="flex items-center w-[20%] text-[#333] text-sm font-semibold pl-3">
                  <img src={Avatar} alt="" className="mr-3" />
                  {item?.firstname} {item?.lastname}
                </td>
                <td className="w-[24%] text-[#828282] text-sm font-medium">
                  {item?.phone}
                </td>
                <td className="w-[8%] text-[#828282] text-sm font-medium">
                  {item?.gender}
                </td>
                <td className="w-[13%] text-[#828282] text-sm font-medium">
                  {item?.special_id}
                </td>
                <td className="w-[13%] text-[#828282] text-sm font-medium">
                  {item?.created_at}
                </td>
                <td className="w-[7%] text-center">
                  <button
                    onClick={() => {
                      setShowEdit(true);
                      setSelectedPatientDetails(item);
                    }}
                  >
                    <span className="text-[#333]">&#8942;</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showEdit && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
          <div
            ref={showEditRef}
            className="w-[242px] shadow-xl rounded-lg fixed right-20"
          >
            <PatientModal setShowPatientDetails={setShowPatientDetails} />
          </div>
        </div>
      )}

      {showPatientDetails && (
        <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 flex justify-center items-center">
          <div ref={showPatientDetailsRef} className="w-[415px]">
            <PatientsDetails
              PatientDetails={selectedPatientDetails}
              setShowPatientDetails={setShowPatientDetails}
            />
          </div>
        </div>
      )}
    </Tab.Panel>
  );
}

export default ViewPatients;

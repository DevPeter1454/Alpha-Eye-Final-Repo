import React, { useState, useEffect, useRef } from "react";
import { Tab } from "@headlessui/react";
import SearchBox from "./Search";
import DoctorModal from "./DoctorModal";
import RemoveDoctor from "./RemoveDoctor";
import EditDoctor from "./EditDoctor";
import { baseUrl } from "../utils/endpoints";
import { useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";

interface Doctor {
  id: string;
  name: string;
  email: string;
  gender: string;
  created_at: string;
  profile_image_url: string;
  doctor_id: string;
}

function ManageDoctors() {
  const [showEdit, setShowEdit] = useState(false);
  const [doctors, setDoctors] = useState<any>([]);
  const [showRemoveDoctor, setShowRemoveDoctor] = useState(false);
  const [showEditDoctor, setShowEditDoctor] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState<string | null>(null);
  const [selectedDoctorName, setSelectedDoctorName] = useState<string | null>(
    null
  );
  const showEditRef = useRef<HTMLDivElement>(null);
  const showRemoveDoctorRef = useRef<HTMLDivElement>(null);
  const showEditDoctorRef = useRef<HTMLDivElement>(null);

  const token = useAppSelector((state: RootState) => state.auth.token);
  const hospitalId = useAppSelector(
    (state: RootState) => state.auth.user?.hospital_id
  );

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    fetch(`${baseUrl}api/v1/hospital/doctors/${hospitalId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Map through the doctors array and format the created_at date
        const formattedDoctors = data.data.map((doctor: Doctor) => ({
          ...doctor,
          created_at: formatCreatedAt(doctor.created_at),
        }));
        setDoctors(formattedDoctors);
      });
  };
  console.log(doctors);

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
        showRemoveDoctorRef.current &&
        !showRemoveDoctorRef.current.contains(event.target as Node)
      ) {
        setShowRemoveDoctor(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showRemoveDoctorRef]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        showEditDoctorRef.current &&
        !showEditDoctorRef.current.contains(event.target as Node)
      ) {
        setShowEditDoctor(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEditDoctorRef]);

  console.log(doctors.lenght);

  return (
    <Tab.Panel className="w-full h-full not-italic leading-normal">
      <div className="flex items-center w-full h-12">
        <p className="w-[30%] text-[24px] font-medium text-[#333]">
          Manage Doctors
        </p>
        <SearchBox placeholder="Search for Doctor..." />
      </div>

      <div className="w-full h-[65svh] overflow-y-scroll mt-8">
        <table className="w-full table-auto border-collapse table">
          <thead>
            <tr className="w-[90%] flex justify-between border-b border-[#EAECF0] py-5 text-[#828282]">
              <th className="w-[25%] text-[#333] text-sm font-semibold text-start pl-4">
                Doctor’s name
              </th>
              <th className="w-[25%] text-sm font-medium text-start">
                Email Address
              </th>
              <th className="w-[10%] text-sm font-medium text-start">Gender</th>
              <th className="w-[15%] text-sm font-medium text-start">
                Doctor’s ID
              </th>
              <th className="w-[15%] text-sm font-medium text-start">
                Date Created
              </th>
            </tr>
          </thead>

          <tbody>
            {doctors?.map((item: Doctor, index: number) => (
              <tr
                key={index}
                className="w-full flex justify-between border-b border-[#EAECF0] py-5"
              >
                <td className="flex items-center w-[20%] text-[#333] text-sm font-semibold pl-3">
                  <img
                    src={item?.profile_image_url}
                    alt="doctor-profile-image"
                    className="mr-3 w-10 h-10 rounded-full object-cover"
                  />
                  {item?.name}
                </td>
                <td className="w-[24%] text-[#828282] text-sm font-medium">
                  {item?.email}
                </td>
                <td className="w-[8%] text-[#828282] text-sm font-medium">
                  {item?.gender}
                </td>
                <td className="w-[13%] text-[#828282] text-sm font-medium">
                  {item?.doctor_id}
                </td>
                <td className="w-[13%] text-[#828282] text-sm font-medium">
                  {item?.created_at}
                </td>
                <td className="w-[7%] text-center">
                  <button
                    onClick={() => {
                      setShowEdit(true);
                      setSelectedDoctorId(item.doctor_id);
                      setSelectedDoctorName(item?.name);
                    }}
                  >
                    <span className="text-[#333]">&#8942;</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {showEdit && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center">
            <div
              ref={showEditRef}
              className="w-[242px] shadow-xl rounded-lg fixed right-20"
            >
              <DoctorModal
                setShowRemoveDoctor={setShowRemoveDoctor}
                setShowEditDoctor={setShowEditDoctor}
              />
            </div>
          </div>
        )}

        {showRemoveDoctor && (
          <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 flex justify-center items-center">
            <div ref={showRemoveDoctorRef} className="w-2/5">
              <RemoveDoctor
                reloadDoctor={fetchDoctors}
                doctorId={selectedDoctorId}
                doctorName={selectedDoctorName}
                setShowRemoveDoctor={setShowRemoveDoctor}
              />
            </div>
          </div>
        )}

        {showEditDoctor && (
          <div className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-50 flex justify-center items-center">
            <div ref={showEditDoctorRef} className="w-2/5">
              <EditDoctor setShowEditDoctor={setShowEditDoctor} />
            </div>
          </div>
        )}
      </div>
    </Tab.Panel>
  );
}

export default ManageDoctors;

import React, { useState } from "react";
import AdminDashLayout from "../Layouts/AdminDashLayout";
import { Tab } from "@headlessui/react";
import Sidebar from "../components/AdminSidebar";
import NewDocDefault from "../components/NewDoc";
import AddNewDoc from "../components/AddNewDoc";
import ManageDoctors from "../components/ManageDoc";
import ViewPatients from "../components/ViewPatients";

function adminDashboard() {
  const [showAddNewDoc, setShowAddNewDoc] = useState(false);

  const handleShowAddNewDocComponent = () => {
    setShowAddNewDoc(true);
  };

  const handleCloseAddNewDocComponent = () => {
    setShowAddNewDoc(false);
  };

  return (
    <AdminDashLayout>
      <Tab.Group>
        <Sidebar />
        <Tab.Panels className="w-[77%] flex justify-center">
          {showAddNewDoc ? (
            <AddNewDoc handleCloseComponent={handleCloseAddNewDocComponent} />
          ) : (
            <NewDocDefault
              handleShowAddNewDocComponent={handleShowAddNewDocComponent}
            />
          )}
          <ManageDoctors />
          <ViewPatients />
        </Tab.Panels>
      </Tab.Group>
    </AdminDashLayout>
  );
}

export default adminDashboard;

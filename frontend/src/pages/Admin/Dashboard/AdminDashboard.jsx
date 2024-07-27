import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import Main from "./Main/Main";

const AdminDashboard = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Main />
    </div>
  );
};

export default AdminDashboard;

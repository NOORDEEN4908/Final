import React from "react";
import AdminPanel from "../components/AdminPanel";
import '../App.css'; // Import the CSS file

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <AdminPanel />
    </div>
  );
};

export default AdminDashboard;

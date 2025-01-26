import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import ManageUsers from './ManageUsers';
// Import other admin components as needed

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<AdminDashboard />} />
      <Route path="manage-users" element={<ManageUsers />} />
      {/* Add more admin routes here */}
    </Routes>
  );
};

export default AdminRoutes; 
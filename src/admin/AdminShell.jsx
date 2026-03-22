import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { getToken } from "./adminAuth";
import AdminLogin from "./AdminLogin";
import AdminLayout from "./AdminLayout";
import AdminDashboard from "./AdminDashboard";
import AdminProducts from "./AdminProducts";
import AdminGallery from "./AdminGallery";
import AdminBanner from "./AdminBanner";

function AdminProtected() {
  const token = getToken();
  const location = useLocation();
  if (!token) {
    return <Navigate to="/admin/login" replace state={{ from: location }} />;
  }
  return <AdminLayout />;
}

const AdminShell = () => {
  return (
    <Routes>
      <Route path="login" element={<AdminLogin />} />
      <Route element={<AdminProtected />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="gallery" element={<AdminGallery />} />
        <Route path="banner" element={<AdminBanner />} />
      </Route>
    </Routes>
  );
};

export default AdminShell;

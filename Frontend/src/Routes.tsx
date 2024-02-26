import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AdminSignup from "./pages/AdminSignup";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDash";
import DoctorsDashboard from "./pages/DocDash";
import NotFound from "./pages/Error/NotFound";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/sign-up" replace />} />
        <Route path="/sign-up" element={<AdminSignup />} />
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/doctors-dashboard" element={<DoctorsDashboard />} />
        {/* Broken Link */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

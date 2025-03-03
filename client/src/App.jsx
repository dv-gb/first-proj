import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import ClientDashboard from "./components/ClientDashboard";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ForgotPassword from "./components/ForgotPassword";
import Home from "./components/Home";
import AdminDashboard from "./components/Admin/AdminDashboard";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="client/dashboard" element={<ClientDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/change_password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </>
  );
}

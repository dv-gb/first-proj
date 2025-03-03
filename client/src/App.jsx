import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ForgotPassword from "./components/ForgotPassword";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/change_password" element={<ForgotPassword />} />
        </Routes>
      </Router>
    </>
  );
}

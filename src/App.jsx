import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddCertificate from "./pages/AddCertificate";
import EditCertificates from "./pages/EditCertificates";
import VerifyCertificate from "./pages/VerifyCertificate";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/verify" element={<VerifyCertificate />} />
        <Route path="/add" element={<PrivateRoute><AddCertificate /></PrivateRoute>} />
        <Route path="/edit" element={<PrivateRoute><EditCertificates /></PrivateRoute>} />
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

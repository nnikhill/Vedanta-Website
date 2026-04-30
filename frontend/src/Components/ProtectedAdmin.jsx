import { Navigate } from "react-router-dom";

export default function ProtectedAdmin({ children }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // 🔐 1. Token check (login required)
  if (!token) {
    return <Navigate to="/login" />;
  }

  // 🔐 2. Role check (admin only)
  if (role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}
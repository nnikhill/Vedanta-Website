import { Navigate } from "react-router-dom";

export default function ProtectedAdmin({ children }) {

  // ✅ Session storage use
  const token = sessionStorage.getItem("token");
  const role = sessionStorage.getItem("role");

  // 🔐 Login required
  if (!token) {
    return <Navigate to="/login" />;
  }

  // 🔐 Admin only
  if (role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
}
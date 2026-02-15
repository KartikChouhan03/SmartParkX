import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = sessionStorage.getItem("adminToken");
  return token ? <Outlet /> : <Navigate to="/login" />;
}

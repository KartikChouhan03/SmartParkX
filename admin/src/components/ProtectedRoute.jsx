import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

export default function ProtectedRoute() {
  const { adminToken } = useAdminAuth();
  return adminToken ? <Outlet /> : <Navigate to="/login" replace />;
}

import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login.jsx";
import Dashboard from "../pages/Dashboard/Dashboard.jsx";
import Slots from "../pages/Slots/Slots.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import AdminLayout from "../layout/AdminLayout.jsx";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />

      {/* Protected Admin */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/slots" element={<Slots />} />
          {/* add more pages here */}
        </Route>
      </Route>
    </Routes>
  );
}

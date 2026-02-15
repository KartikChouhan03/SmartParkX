import { createContext, useContext, useState } from "react";

const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const [adminUser, setAdminUser] = useState(
    JSON.parse(localStorage.getItem("adminUser")),
  );
  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("adminToken"),
  );

  const logout = () => {
    setAdminUser(null);
    setAdminToken(null);
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminToken");
  };

  return (
    <AdminAuthContext.Provider value={{ adminUser, adminToken, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => useContext(AdminAuthContext);

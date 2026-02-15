import { createContext, useContext, useState } from "react";

const AdminAuthContext = createContext();

export function AdminAuthProvider({ children }) {
  const [adminUser, setAdminUser] = useState(
    JSON.parse(sessionStorage.getItem("adminUser")),
  );
  const [adminToken, setAdminToken] = useState(
    sessionStorage.getItem("adminToken"),
  );

  const login = (user, token) => {
    setAdminUser(user);
    setAdminToken(token);
    sessionStorage.setItem("adminUser", JSON.stringify(user));
    sessionStorage.setItem("adminToken", token);
  };

  const logout = () => {
    setAdminUser(null);
    setAdminToken(null);
    sessionStorage.removeItem("adminUser");
    sessionStorage.removeItem("adminToken");
  };

  return (
    <AdminAuthContext.Provider value={{ adminUser, adminToken, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export const useAdminAuth = () => useContext(AdminAuthContext);

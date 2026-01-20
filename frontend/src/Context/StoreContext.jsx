import { createContext, useContext, useEffect, useState } from "react";
import { fetchSlots, fetchMyActiveSessions } from "../lib/api";
import { useAuth } from "./AuthContext";

const StoreContext = createContext();

const POLLING_INTERVAL = 5000;

export function StoreProvider({ children }) {
  const { token } = useAuth();

  const [slots, setSlots] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    if (!token) {
      setSlots([]);
      setActiveSession(null);
      return;
    }

    try {
      setLoading(true);
      const [slotsData, sessionData] = await Promise.all([
        fetchSlots(),
        fetchMyActiveSessions(),
      ]);

      setSlots(slotsData);
      setActiveSession(sessionData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, POLLING_INTERVAL);
    return () => clearInterval(interval);
  }, [token]);

  return (
    <StoreContext.Provider value={{ slots, activeSession, loading }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);

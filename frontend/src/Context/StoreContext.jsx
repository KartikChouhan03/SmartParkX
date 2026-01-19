import { createContext, useContext, useEffect, useState } from "react";
import { fetchSlots, fetchActiveSessions } from "../lib/api";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [slots, setSlots] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadSlots() {
    try {
      const data = await fetchSlots();
      setSlots(data);
    } catch (err) {
      console.error("Slots error:", err);
    }
  }

  async function loadSessions() {
    try {
      const data = await fetchActiveSessions();
      setSessions(data);
    } catch (err) {
      console.error("Sessions error:", err);
    }
  }

  useEffect(() => {
    setLoading(true);
    loadSlots();
    loadSessions();
    setLoading(false);

    const interval = setInterval(() => {
      loadSlots();
      loadSessions();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <StoreContext.Provider value={{ slots, sessions, loading }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);

import { createContext, useContext, useEffect, useState } from "react";
import {
  fetchSlots,
  fetchMyActiveSession,
  fetchMyLastSession,
  fetchMyParkingHistory,
  fetchMySummary,
} from "../lib/api";
import { useAuth } from "./AuthContext";

const StoreContext = createContext();

const POLLING_INTERVAL = 5000;

export function StoreProvider({ children }) {
  const { token } = useAuth();

  const [slots, setSlots] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [lastSession, setLastSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [history, setHistory] = useState([]);

  async function loadData() {
    if (!token) {
      setSlots([]);
      setActiveSession(null);
      setLastSession(null);
      setLoading(false);
      setSummary(null);
      return;
    }

    try {
      setLoading(true);
      const [slotsData, sessionData, lastData, historyData, summaryData] =
        await Promise.all([
          fetchSlots(),
          fetchMyActiveSession(),
          fetchMyLastSession(),
          fetchMyParkingHistory(),
          fetchMySummary(),
        ]);

      setSlots(slotsData);
      setActiveSession(sessionData);
      setLastSession(lastData);
      setHistory(historyData);
      setSummary(summaryData);
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
    <StoreContext.Provider
      value={{ slots, activeSession, lastSession, history, loading, summary }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);

import { createContext, useContext, useEffect, useState } from "react";
import { fetchSlots } from "../lib/api";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadSlots() {
    try {
      setLoading(true);
      const data = await fetchSlots();
      setSlots(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadSlots();
    const interval = setInterval(loadSlots, 5000); // auto-refresh
    return () => clearInterval(interval);
  }, []);

  return (
    <StoreContext.Provider value={{ slots, loading }}>
      {children}
    </StoreContext.Provider>
  );
}

export const useStore = () => useContext(StoreContext);

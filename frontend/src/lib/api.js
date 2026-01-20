
export async function loginUser(data) {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const json = await res.json();
  if (!res.ok) throw json;
  return json;
}

export async function signupUser(data) {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  const json = await res.json();
  if (!res.ok) throw json;
  return json;
}



export async function fetchSlots() {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/slots`);
  if (!res.ok) throw new Error("Failed to fetch slots");
  return res.json();
}

export async function parkingEntry(vehicleNumber) {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/parking/entry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ vehicleNumber })
  });
  if (!res.ok) throw new Error("Entry failed");
  return res.json();
}

export async function parkingExit(vehicleNumber) {
  const res = await fetch(`${import.meta.env.VITE_API_BASE}/parking/exit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ vehicleNumber })
  });
  if (!res.ok) throw new Error("Exit failed");
  return res.json();
}

export async function fetchMyActiveSessions() {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${import.meta.env.VITE_API_BASE}/parking/my/active`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.json();
}
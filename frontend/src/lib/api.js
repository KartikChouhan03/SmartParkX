
const API_BASE = `${window.location.protocol}//${window.location.hostname}:5000/api`;

export async function loginUser(data) {
  const res = await fetch(`${API_BASE}/auth/login`, {
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
  const res = await fetch(`${API_BASE}/auth/signup`, {
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
  const res = await fetch(`${API_BASE}/slots`);
  if (!res.ok) throw new Error("Failed to fetch slots");
  return res.json();
}

export async function parkingEntry(vehicleNumber) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}/parking/entry`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ vehicleNumber })
  });
  if (!res.ok) throw new Error("Entry failed");
  return res.json();
}

export async function parkingExit(vehicleNumber) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_BASE}/parking/exit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ vehicleNumber })
  });
  if (!res.ok) throw new Error("Exit failed");
  return res.json();
}

export async function fetchMyActiveSession() {
  const token = localStorage.getItem("token");

  if (!token) return null;

  const res = await fetch(
    `${API_BASE}/parking/my/active`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) return null;
  return res.json();
}

export async function fetchMyLastSession() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const res = await fetch(`${API_BASE}/parking/my/last`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  if (!res.ok) return null;
  return res.json();
}

export async function fetchMyParkingHistory() {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${API_BASE}/parking/my/history`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!res.ok) throw new Error("Failed to fetch history");
  return res.json();
}


export async function downloadReceipt(sessionId) {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${API_BASE}/parking/my/receipt/${sessionId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!res.ok) throw new Error("Failed to download receipt");

  const blob = await res.blob();
  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = `SmartParkX_Receipt_${sessionId}.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
}


export async function fetchMySummary() {
  const token = localStorage.getItem("token");

  const res = await fetch(
    `${API_BASE}/parking/my/summary`,

    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  if (!res.ok) throw new Error("Failed to fetch summary");
  return res.json();
}

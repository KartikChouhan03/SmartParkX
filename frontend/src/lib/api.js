const BASE_URL = "http://localhost:5000/api";

export async function fetchSlots() {
  const res = await fetch(`${BASE_URL}/slots`);
  if (!res.ok) throw new Error("Failed to fetch slots");
  return res.json();
}

export async function parkingEntry(vehicleNumber) {
  const res = await fetch(`${BASE_URL}/parking/entry`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ vehicleNumber })
  });
  if (!res.ok) throw new Error("Entry failed");
  return res.json();
}

export async function parkingExit(vehicleNumber) {
  const res = await fetch(`${BASE_URL}/parking/exit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ vehicleNumber })
  });
  if (!res.ok) throw new Error("Exit failed");
  return res.json();
}

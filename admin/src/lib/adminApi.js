const API_BASE = `${window.location.protocol}//${window.location.hostname}:5000/api`;

export async function adminFetch(endpoint) {
    const token = localStorage.getItem("adminToken");

    const res = await fetch(`${API_BASE}${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!res.ok) {
        throw new Error("Admin API error");
    }

    return res.json();
}

const API_URL = "http://localhost:3000/api";

export async function fetchEmployees() {
  const res = await fetch(`${API_URL}/employees`);
  return res.json();
}

export async function createPayrun(data: any) {
  const res = await fetch(`${API_URL}/payruns`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

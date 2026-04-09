const API_BASE =
  import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") ||
  "http://localhost:5000/api";

type AuthPayload = {
  email: string;
  password: string;
};

const readErrorMessage = async (response: Response) => {
  try {
    const data = await response.json();
    return data.error || data.message || "Request failed";
  } catch {
    return "Request failed";
  }
};

const postAuth = async (path: "login" | "register", payload: AuthPayload) => {
  const response = await fetch(`${API_BASE}/auth/${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }

  return response.json();
};

export const loginRequest = (payload: AuthPayload) => postAuth("login", payload);

export const registerRequest = (payload: AuthPayload) =>
  postAuth("register", payload);

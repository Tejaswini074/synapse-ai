const API_BASE = "http://localhost:5000/api";

const getAuthHeaders = (token: string) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

export const sendMessage = async (messages: any[], token: string) => {
  return fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify({ messages }),
  });
};

export const getWorkspace = async (token: string) => {
  const res = await fetch(`${API_BASE}/workspace`, {
    headers: getAuthHeaders(token),
  });

  return res.json();
};

export const createProject = async (name: string, token: string) => {
  const res = await fetch(`${API_BASE}/workspace/projects`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify({ name }),
  });

  return res.json();
};

export const deleteProject = async (id: string, token: string) => {
  const res = await fetch(`${API_BASE}/workspace/projects/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(token),
  });

  return res.json();
};

export const createChat = async (payload: any, token: string) => {
  const res = await fetch(`${API_BASE}/workspace/chats`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(payload),
  });

  return res.json();
};

export const updateChat = async (id: string, payload: any, token: string) => {
  const res = await fetch(`${API_BASE}/workspace/chats/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(token),
    body: JSON.stringify(payload),
  });

  return res.json();
};

export const createNote = async (payload: any, token: string) => {
  const res = await fetch(`${API_BASE}/workspace/notes`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(payload),
  });

  return res.json();
};

export const updateNote = async (id: string, payload: any, token: string) => {
  const res = await fetch(`${API_BASE}/workspace/notes/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(token),
    body: JSON.stringify(payload),
  });

  return res.json();
};

export const createDoc = async (payload: any, token: string) => {
  const res = await fetch(`${API_BASE}/workspace/docs`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify(payload),
  });

  return res.json();
};

export const updateDoc = async (id: string, payload: any, token: string) => {
  const res = await fetch(`${API_BASE}/workspace/docs/${id}`, {
    method: "PATCH",
    headers: getAuthHeaders(token),
    body: JSON.stringify(payload),
  });

  return res.json();
};

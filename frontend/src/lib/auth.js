import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const KEY = "sportily_token";

export const getToken = () => localStorage.getItem(KEY);
export const setToken = (t) => localStorage.setItem(KEY, t);
export const clearToken = () => localStorage.removeItem(KEY);

export const api = axios.create({ baseURL: API });
api.interceptors.request.use((config) => {
  const t = getToken();
  if (t) config.headers.Authorization = `Bearer ${t}`;
  return config;
});

export async function login(email, password) {
  const { data } = await api.post("/auth/login", { email, password });
  setToken(data.token);
  return data.user;
}

export async function fetchMe() {
  const { data } = await api.get("/auth/me");
  return data;
}

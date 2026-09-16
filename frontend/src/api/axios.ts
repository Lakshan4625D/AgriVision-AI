import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8001",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
api.interceptors.response.use(response => response, error => {
  if (error.response?.status === 401 && !error.config?.url?.includes("login")) {
    localStorage.removeItem("access_token"); localStorage.removeItem("user");
    window.location.assign(window.location.pathname.startsWith("/admin") ? "/admin/login" : "/login");
  }
  return Promise.reject(error);
});
export default api;
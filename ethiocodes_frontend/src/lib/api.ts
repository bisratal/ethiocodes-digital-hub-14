import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      error.message = "Network error. Please check your connection.";
      return Promise.reject(error);
    }
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (window.location.pathname !== "/admin/login") {
        window.location.href = "/admin/login";
      }
    }
    return Promise.reject(error);
  }
);

export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem("token");
  return !!token && token !== "undefined" && token !== "null";
};

export const getCurrentUser = () => {
  const userStr = localStorage.getItem("user");
  if (userStr && userStr !== "undefined" && userStr !== "null") {
    try {
      return JSON.parse(userStr);
    } catch {
      return null;
    }
  }
  return null;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "/admin/login";
};

export const getToken = (): string | null => {
  return localStorage.getItem("token");
};

// Default export for convenience
export default api;

// Named export for flexibility
export { api };

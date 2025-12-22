import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";

const instance = axios.create({
  // baseURL: "https://localhost:7264/api",
  baseURL: "https://api.mondialbusiness.eu/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Safe interceptor
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

    // Ensure headers exist
    config.headers = config.headers ?? {};

    // Attach Authorization safely
    if (token) {
      (config.headers as any).Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;

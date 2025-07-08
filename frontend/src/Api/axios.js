// src/Api/axios.jsx

import axios from "axios";

const axiosClient = axios.create({
  // Ensure your .env has VITE_BACKEND_URL pointing to your Laravel app
  baseURL: import.meta.env.VITE_BACKEND_URL + '/api',
  // --- REMOVED: `withCredentials: true` is for cookies, not tokens. ---
});

// This interceptor correctly adds the token from localStorage to every API request.
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('AUTH_TOKEN');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { axiosClient };
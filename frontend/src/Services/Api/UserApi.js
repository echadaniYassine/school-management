// src/Services/Api/UserApi.js

import { axiosClient } from "../../Api/axios"; // Adjust path if needed

export const UserApi = {
  // --- REMOVED: getCsrfToken is not needed for token APIs ---
  
  // Core auth routes
  register: (data) => axiosClient.post('/register', data),
  login: (email, password) => axiosClient.post('/login', { email, password }),
  logout: () => axiosClient.post('/logout'),
  getUser: () => axiosClient.get('/user'), // Or '/me', must match your backend

  // Password reset routes
  forgotPassword: (email) => axiosClient.post('/forgot-password', { email }),
  resetPassword: (data) => axiosClient.post('/reset-password', data),
};
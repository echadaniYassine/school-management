import { axiosClient } from "../../Api/axios";

export const UserApi = {
  getCsrfToken: () => axiosClient.get('/sanctum/csrf-cookie', {
    baseURL: import.meta.env.VITE_BACKEND_URL,
  }),

  login: (email, password) => axiosClient.post('/login', { email, password }),

  logout: async () => {
    return await axiosClient.post('/logout')
  },

  getUser: () => axiosClient.get('/me'),
};

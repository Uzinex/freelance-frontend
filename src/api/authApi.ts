import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const api = axios.create({ baseURL: '/api/auth' });

api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`,
    };
  }
  return config;
});

export const authApi = {
  register: async ({
    username,
    email,
    phone,
    password,
  }: {
    username: string;
    email: string;
    phone: string;
    password: string;
  }) => {
    const response = await api.post('/register/', {
      username,
      email,
      phone,
      password,
    });
    return response.data;
  },
  login: async ({ identifier, password }: { identifier: string; password: string }) => {
    const response = await api.post('/login/', { identifier, password });
    return response.data;
  },
  logout: async (refreshToken: string) => {
    const response = await api.post('/logout/', { refresh: refreshToken });
    return response.data;
  },
  requestPasswordReset: async (identifier: string) => {
    const response = await api.post('/password-reset/request/', { identifier });
    return response.data;
  },
  confirmPasswordReset: async ({
    identifier,
    code,
    new_password,
  }: {
    identifier: string;
    code: string;
    new_password: string;
  }) => {
    const response = await api.post('/password-reset/confirm/', {
      identifier,
      code,
      new_password,
    });
    return response.data;
  },
};

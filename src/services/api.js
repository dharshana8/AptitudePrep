import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || '/functions';

export const api = axios.create({
  baseURL,
  timeout: 30000,
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

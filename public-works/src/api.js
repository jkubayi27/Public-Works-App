import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  // Do not send cookies in cross-origin requests; we use JWTs stored in localStorage
  withCredentials: false,
});

// Request interceptor - add JWT auth header when available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - handle 401 Unauthorized
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Clear auth state and redirect to login
      localStorage.removeItem('authenticated');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default api;
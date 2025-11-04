import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true // Required for session cookies to be sent/received
});

// Request interceptor - add session cookie
api.interceptors.request.use(
  (config) => {
    // Get session ID from cookie (handled automatically by withCredentials)
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
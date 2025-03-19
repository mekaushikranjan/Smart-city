// src/utils/api.js
import axios from 'axios';

// Get the API base URL from environment variables
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

// Request interceptor
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Enhanced response interceptor
apiClient.interceptors.response.use(
  response => response,
  error => {
    const { response } = error;
    
    // Handle timeout errors
    if (error.code === 'ECONNABORTED') {
      console.error('Request timed out');
      return Promise.reject({ message: 'Request timeout. Please try again.' });
    }

    // Handle session expiration
    if (response?.status === 401) {
      console.warn('Session expired');
      
      // Clear any stored authentication data
      localStorage.removeItem('token');
      sessionStorage.removeItem('user');
      
      // Redirect to login page, but avoid redirect loops
      const currentPath = window.location.pathname;
      if (!currentPath.includes('/auth') && !currentPath.includes('/login')) {
        window.location.href = '/auth';
      }
    }

    // Handle forbidden access
    if (response?.status === 403) {
      console.warn('Forbidden access attempt');
      return Promise.reject({ 
        message: response.data?.message || 'You do not have permission to access this resource' 
      });
    }

    // Generic error handling
    return Promise.reject({
      message: response?.data?.message || 'Network Error',
      status: response?.status || 500,
      data: response?.data || null
    });
  }
);

export default apiClient;
// src/utils/api.js
import axios from 'axios';
import { logout } from '../utils/auth'; // Optional: If you have auth utilities
const API_URL = process.env.REACT_APP_API_URL;
const apiClient = axios.create({
  baseURL: '${API_URL}/api',
  withCredentials: true,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  }
});

// Request interceptor (optional - only needed if using JWT)
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
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
      console.warn('Session expired, logging out');
      logout(); // Implement your logout logic
      window.location.href = '/login';
    }

    // Handle forbidden access
    if (response?.status === 403) {
      console.warn('Forbidden access attempt');
      return Promise.reject({ 
        message: 'You do not have permission to access this resource' 
      });
    }

    // Generic error handling
    return Promise.reject({
      message: response?.data?.message || 'Network Error',
      status: response?.status || 500
    });
  }
);

export default apiClient;
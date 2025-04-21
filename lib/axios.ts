import axios from 'axios';
import { store } from '@/redux/store/store';

// Use environment variable if available, fallback to development URL
export const baseURL = process.env.EXPO_PUBLIC_API_URL || 'http://192.168.31.5:5000';

export const axiosInstance = axios.create({
  baseURL,
  timeout: 10000, // Increased timeout to 10 seconds
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  // Only use withCredentials if dealing with cookies
  withCredentials: false,
});

// Add request interceptor to dynamically get the latest token
axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const currentToken = store.getState().auth.token;

      if (currentToken) {
        config.headers.Authorization = `Bearer ${currentToken}`;
      }

      return config;
    } catch (error) {
      console.error('Error in request interceptor:', error);
      return config;
    }
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout');
    } else if (!error.response) {
      console.error('Network error - server might be down');
    } else {
      console.error('API Error:', error.response?.status, error.response?.data);
    }

    return Promise.reject(error);
  }
);

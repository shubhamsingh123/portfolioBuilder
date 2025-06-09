import axios from 'axios';
import { API_BASE_URL } from '../constants/api';
import { getToken } from './AuthService';

// Maximum number of retries for failed requests
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      console.log('Token sent with request:', token);
    } else {
      console.log('No token available for request');
    }
    return config;
  },
  (error) => {
    console.error('Error in request interceptor:', error);
    return Promise.reject(error);
  }
);

// Helper function to delay execution
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Initialize retry count if it doesn't exist
    if (typeof originalRequest._retry === 'undefined') {
      originalRequest._retry = 0;
    }

    if (error.response) {
      const { status } = error.response;
      
      console.error('Request error details:', {
        status,
        statusText: error.response.statusText,
        data: error.response.data,
        headers: error.response.headers,
        config: {
          url: originalRequest.url,
          method: originalRequest.method,
          headers: originalRequest.headers
        }
      });

      // Handle different status codes
      switch (status) {
        case 401:
          // Clear auth state and redirect to login
          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("refreshToken");
          sessionStorage.removeItem("authenticatedUser");
          sessionStorage.removeItem("user");
          window.location.href = '/login';
          return Promise.reject(new Error('Session expired. Please login again.'));

        case 403:
          // If it's a sections endpoint, return empty response
          if (originalRequest.url.includes('/api/sections')) {
            console.log('Sections not available, returning empty response');
            return Promise.resolve({ data: [] });
          }
          // For other 403 errors, clear auth and reject
          sessionStorage.removeItem("accessToken");
          sessionStorage.removeItem("authenticatedUser");
          return Promise.reject(error);

        case 404:
          // For profile endpoints, let the ProfileContext handle it
          if (originalRequest.url.includes('/api/profiles')) {
            return Promise.reject(error);
          }
          // For other 404s, try to retry the request
          if (originalRequest._retry < MAX_RETRIES) {
            originalRequest._retry++;
            await delay(RETRY_DELAY * originalRequest._retry);
            return axiosInstance(originalRequest);
          }
          break;

        case 429: // Too Many Requests
          if (originalRequest._retry < MAX_RETRIES) {
            originalRequest._retry++;
            const retryAfter = error.response.headers['retry-after'] || RETRY_DELAY;
            await delay(parseInt(retryAfter) * 1000);
            return axiosInstance(originalRequest);
          }
          break;

        case 500:
        case 502:
        case 503:
        case 504:
          // Retry server errors
          if (originalRequest._retry < MAX_RETRIES) {
            originalRequest._retry++;
            await delay(RETRY_DELAY * originalRequest._retry);
            return axiosInstance(originalRequest);
          }
          break;
      }
    }

    // For network errors, try to retry
    if (!error.response && error.request && originalRequest._retry < MAX_RETRIES) {
      originalRequest._retry++;
      await delay(RETRY_DELAY * originalRequest._retry);
      return axiosInstance(originalRequest);
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

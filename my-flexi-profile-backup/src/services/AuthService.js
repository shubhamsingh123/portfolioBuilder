import axios from "axios";
import { API_ENDPOINTS } from '../constants/api';

// Prioritize the environment variable, fallback to API_ENDPOINTS
const AUTH_REST_API_BASE_URL = import.meta.env.VITE_AUTH_API_URL || API_ENDPOINTS.AUTH;

console.log('Using AUTH_REST_API_BASE_URL:', AUTH_REST_API_BASE_URL);

// Configure axios defaults
axios.defaults.headers.post['Content-Type'] = 'application/json';

export const registerAPICall = async (registerObj) => {
  try {
    const [firstName, ...lastNameParts] = registerObj.name.split(' ');
    const lastName = lastNameParts.join(' ');
    const modifiedRegisterObj = {
      email: registerObj.email,
      password: registerObj.password,
      firstName,
      lastName,
    };
    
    console.log('Sending registration request to:', `${AUTH_REST_API_BASE_URL}/register`);
    const response = await axios.post(`${AUTH_REST_API_BASE_URL}/register`, modifiedRegisterObj);
    console.log('Registration response:', response.data);
    
    if (response.data.accessToken) {
      storeToken(response.data.accessToken, response.data.refreshToken);
      console.log('Tokens stored successfully');
    } else {
      console.warn('No access token received in registration response');
    }
    
    return response;
  } catch (error) {
    console.error('Registration error:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error message:', error.message);
    }
    throw error;
  }
};

export const loginAPICall = async (email, password) => {
  try {
    console.log('Sending login request to:', `${AUTH_REST_API_BASE_URL}/login`);
    const response = await axios.post(`${AUTH_REST_API_BASE_URL}/login`, { 
      email, 
      password 
    });
    
    console.log('Login response:', response.data);
    
    if (response.data.accessToken) {
      storeToken(response.data.accessToken, response.data.refreshToken);
      console.log('Tokens stored successfully');
    } else {
      console.warn('No access token received in login response');
    }
    
    return response;
  } catch (error) {
    console.error('Login error:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
      throw new Error(error.response.data.message || 'Login failed. Please check your credentials.');
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw new Error('No response from server. Please try again later.');
    } else {
      console.error('Error message:', error.message);
      throw new Error('An unexpected error occurred. Please try again.');
    }
  }
};

export const storeToken = (accessToken, refreshToken) => {
    sessionStorage.setItem("accessToken", accessToken);
    if (refreshToken) {
        sessionStorage.setItem("refreshToken", refreshToken);
    }
    console.log('Token stored:', accessToken);
};

export const getToken = () => {
    const token = sessionStorage.getItem("accessToken");
    console.log('Token retrieved:', token);
    return token;
};

export const getRefreshToken = () => sessionStorage.getItem("refreshToken");

export const saveLoggedInUser = (user) => {
    sessionStorage.setItem("authenticatedUser", "true");
    sessionStorage.setItem("user", JSON.stringify(user));
};

export const isUserLoggedIn = () => {
    const isAuthenticated = sessionStorage.getItem("authenticatedUser");
    const user = sessionStorage.getItem("user");
    return isAuthenticated === "true" && user !== null;
};

export const getLoggedInUser = () => {
    const user = sessionStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

export const logout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("refreshToken");
    sessionStorage.removeItem("authenticatedUser");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("profile");
};

// src/utils/tokenUtils.ts

const ACCESS_TOKEN_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const getAccessToken = (): string | null => {
  // Try localStorage first
  let token = localStorage.getItem(ACCESS_TOKEN_KEY);
  
  // If not in localStorage, try sessionStorage
  if (!token) {
    token = sessionStorage.getItem(ACCESS_TOKEN_KEY);
    console.log('Token retrieved from sessionStorage:', token ? 'Found' : 'Not found');
  } else {
    console.log('Token retrieved from localStorage:', 'Found');
  }

  if (!token) {
    console.warn('No access token found in either localStorage or sessionStorage');
  }

  return token;
};

export const setAccessToken = (token: string): void => {
  try {
    // Store in both localStorage and sessionStorage for redundancy
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
    sessionStorage.setItem(ACCESS_TOKEN_KEY, token);
    console.log('Access token stored successfully');
  } catch (error) {
    console.error('Error storing access token:', error);
  }
};

export const setRefreshToken = (token: string): void => {
  try {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
    sessionStorage.setItem(REFRESH_TOKEN_KEY, token);
    console.log('Refresh token stored successfully');
  } catch (error) {
    console.error('Error storing refresh token:', error);
  }
};

export const getRefreshToken = (): string | null => {
  let token = localStorage.getItem(REFRESH_TOKEN_KEY);
  if (!token) {
    token = sessionStorage.getItem(REFRESH_TOKEN_KEY);
  }
  return token;
};

export const removeTokens = (): void => {
  try {
    // Remove from both storages
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
    console.log('Tokens removed successfully');
  } catch (error) {
    console.error('Error removing tokens:', error);
  }
};

export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationTime = payload.exp * 1000; // Convert to milliseconds
    return Date.now() >= expirationTime;
  } catch (error) {
    console.error('Error checking token expiration:', error);
    return true; // Assume expired if we can't verify
  }
};

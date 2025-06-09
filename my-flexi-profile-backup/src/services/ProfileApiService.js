// --- Updated ProfileApiService.js (Corrected Section APIs) ---

import axios from 'axios';

import { API_BASE_URL } from '../constants/api';

const API_CONFIG = {
  baseURL: `${API_BASE_URL}/api`,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
};

class ProfileApiService {
  constructor(baseURL = API_CONFIG.baseURL) {
    this.apiClient = axios.create({
      baseURL,
      timeout: API_CONFIG.timeout,
      headers: API_CONFIG.headers
    });

    this.token = null;

    this.apiClient.interceptors.request.use((config) => {
      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }
      return config;
    });

    this.apiClient.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error);
        return Promise.reject(error);
      }
    );
  }

  setAuthToken(token) {
    this.token = token;
  }

  clearAuthToken() {
    this.token = null;
  }

  // Profile endpoints
  async getProfile(profileId) {
    const response = await this.apiClient.get(`/profiles/${profileId}`);
    return response.data;
  }

  async getAllProfiles() {
    const response = await this.apiClient.get('/profiles');
    return response.data;
  }

  async getUserProfiles(userId) {
    const response = await this.apiClient.get(`/users/${userId}/profiles`);
    return response.data;
  }

  async createProfile(profileData) {
    const response = await this.apiClient.post('/profiles', profileData);
    return response.data;
  }

  async updateProfile(profileId, profileData) {
    const response = await this.apiClient.put(`/profiles/${profileId}`, profileData);
    return response.data;
  }

  async deleteProfile(profileId) {
    const response = await this.apiClient.delete(`/profiles/${profileId}`);
    return response.data;
  }

  // --- Fixed Section endpoints ---
  async getSection(sectionId) {
    const response = await this.apiClient.get(`/sections/${sectionId}`);
    return response.data;
  }

  async getSectionsByProfile(profileId) {
    const response = await this.apiClient.get(`/sections/profile/${profileId}`);
    return response.data;
  }

  async createSection(sectionData) {
    const response = await this.apiClient.post('/sections', sectionData);
    return response.data;
  }

  async updateSection(sectionId, sectionData) {
    const response = await this.apiClient.put(`/sections/${sectionId}`, sectionData);
    return response.data;
  }

  async deleteSection(sectionId) {
    const response = await this.apiClient.delete(`/sections/${sectionId}`);
    return response.data;
  }

  async reorderSections(profileId, sectionIds) {
    const response = await this.apiClient.post(`/sections/reorder/${profileId}`, sectionIds);
    return response.data;
  }

  // SubSection endpoints (unchanged)
  async getSubSection(subsectionId) {
    const response = await this.apiClient.get(`/subsections/${subsectionId}`);
    return response.data;
  }

  async getSubSectionsBySection(sectionId) {
    const response = await this.apiClient.get(`/sections/${sectionId}/subsections`);
    return response.data;
  }

  async createSubSection(subsectionData) {
    const response = await this.apiClient.post('/subsections', subsectionData);
    return response.data;
  }

  async updateSubSection(subsectionId, subsectionData) {
    const response = await this.apiClient.put(`/subsections/${subsectionId}`, subsectionData);
    return response.data;
  }

  async deleteSubSection(subsectionId) {
    const response = await this.apiClient.delete(`/subsections/${subsectionId}`);
    return response.data;
  }

  // Batch operations
  async batchCreateSections(profileId, sectionsData) {
    const response = await this.apiClient.post(`/profiles/${profileId}/sections/batch`, {
      sections: sectionsData
    });
    return response.data;
  }

  async batchUpdateSections(profileId, sectionsData) {
    const response = await this.apiClient.put(`/profiles/${profileId}/sections/batch`, {
      sections: sectionsData
    });
    return response.data;
  }

  // Search and filter
  async searchProfiles(searchParams) {
    const response = await this.apiClient.get('/profiles/search', {
      params: searchParams
    });
    return response.data;
  }

  async getPublicProfiles(page = 1, pageSize = 10) {
    const response = await this.apiClient.get('/profiles/public', {
      params: { page, pageSize }
    });
    return response.data;
  }
}

const profileApiService = new ProfileApiService();

export default profileApiService;
export { ProfileApiService };

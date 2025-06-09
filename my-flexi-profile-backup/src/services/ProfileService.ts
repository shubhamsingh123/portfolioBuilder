
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { Profile, Section, SubSection } from '@/types';
import { ProfileServiceInterface } from '@/types/ProfileServiceInterface';
import { 
  CreateProfileRequest, 
  UpdateProfileRequest,
  CreateSectionRequest,
  UpdateSectionRequest,
  CreateSubSectionRequest,
  UpdateSubSectionRequest,
  ReorderSectionsRequest
} from '@/types/dto/ProfileRequest';
import {
  ProfileResponse,
  ProfilesListResponse,
  SectionResponse,
  SectionsListResponse,
  SubSectionResponse,
  SubSectionsListResponse,
  StatusResponse
} from '@/types/dto/ProfileResponse';

/**
 * Service for handling profile-related API operations
 */
export class ProfileService implements ProfileServiceInterface {
  private apiClient: AxiosInstance;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.apiClient = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Add request interceptor to include auth token
    this.apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }
      return config;
    });
  }

  /**
   * Set the authentication token for API requests
   */
  setAuthToken(token: string): void {
    this.token = token;
  }

  /**
   * Get a profile by ID
   */
  async getProfile(profileId: string): Promise<ProfileResponse> {
    const response = await this.apiClient.get(`/profiles/${profileId}`);
    return response.data;
  }

  /**
   * Get all profiles (admin function)
   */
  async getAllProfiles(): Promise<ProfilesListResponse> {
    const response = await this.apiClient.get('/profiles');
    return response.data;
  }
 
  /**
   * Get profiles for a specific user
   */
  async getUserProfiles(userId: string): Promise<ProfilesListResponse> {
    const response = await this.apiClient.get(`/users/${userId}/profiles`);
    return response.data;
  }

  /**
   * Create a new profile
   */
  async createProfile(request: CreateProfileRequest): Promise<ProfileResponse> {
    const response = await this.apiClient.post('/profiles', request);
    return response.data;
  }

  /**
   * Update an existing profile
   */
  async updateProfile(profileId: string, request: UpdateProfileRequest): Promise<ProfileResponse> {
    const response = await this.apiClient.put(`/profiles/${profileId}`, request);
    return response.data;
  }

  /**
   * Delete a profile
   */
  async deleteProfile(profileId: string): Promise<StatusResponse> {
    const response = await this.apiClient.delete(`/profiles/${profileId}`);
    return response.data;
  }

  /**
   * Get a section by ID
   */
  async getSection(sectionId: string): Promise<SectionResponse> {
    const response = await this.apiClient.get(`/sections/${sectionId}`);
    return response.data;
  }

  /**
   * Get all sections for a profile
   */
  async getSectionsByProfile(profileId: string): Promise<SectionsListResponse> {
    const response = await this.apiClient.get(`/profiles/${profileId}/sections`);
    return response.data;
  }

  /**
   * Create a new section
   */
  async createSection(request: CreateSectionRequest): Promise<SectionResponse> {
    const response = await this.apiClient.post('/sections', request);
    return response.data;
  }

  /**
   * Update an existing section
   */
  async updateSection(sectionId: string, request: UpdateSectionRequest): Promise<SectionResponse> {
    const response = await this.apiClient.put(`/sections/${sectionId}`, request);
    return response.data;
  }

  /**
   * Delete a section
   */
  async deleteSection(sectionId: string): Promise<StatusResponse> {
    const response = await this.apiClient.delete(`/sections/${sectionId}`);
    return response.data;
  }

  /**
   * Reorder sections within a profile
   */
  async reorderSections(request: ReorderSectionsRequest): Promise<StatusResponse> {
    const response = await this.apiClient.post('/sections/reorder', request);
    return response.data;
  }

  /**
   * Get a subsection by ID
   */
  async getSubSection(subsectionId: string): Promise<SubSectionResponse> {
    const response = await this.apiClient.get(`/subsections/${subsectionId}`);
    return response.data;
  }

  /**
   * Get all subsections for a section
   */
  async getSubSectionsBySection(sectionId: string): Promise<SubSectionsListResponse> {
    const response = await this.apiClient.get(`/sections/${sectionId}/subsections`);
    return response.data;
  }

  /**
   * Create a new subsection
   */
  async createSubSection(request: CreateSubSectionRequest): Promise<SubSectionResponse> {
    const response = await this.apiClient.post('/subsections', request);
    return response.data;
  }

  /**
   * Update an existing subsection
   */
  async updateSubSection(subsectionId: string, request: UpdateSubSectionRequest): Promise<SubSectionResponse> {
    const response = await this.apiClient.put(`/subsections/${subsectionId}`, request);
    return response.data;
  }

  /**
   * Delete a subsection
   */
  async deleteSubSection(subsectionId: string): Promise<StatusResponse> {
    const response = await this.apiClient.delete(`/subsections/${subsectionId}`);
    return response.data;
  }
}

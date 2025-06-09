import { SectionDTO, SubSectionDTO } from '../types/dto/SectionDTO';
import { API_ENDPOINTS } from '../constants/api';
import axiosInstance from './axiosConfig';

const API_URL = API_ENDPOINTS.SECTIONS;

export const SectionService = {
  // Helper function to handle errors
  handleError: (error: any) => {
    console.error('Section service error:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
    }
    throw error;
  },

  // console.log("Payload being sent to backend:", sectionDTO);


  createSection: async (sectionDTO: SectionDTO): Promise<SectionDTO> => {
  try {
    const response = await axiosInstance.post(API_URL, sectionDTO);
    return response.data;
  } catch (error) {
    SectionService.handleError(error);  // This throws, so no return needed
  }
},


  getSection: async (sectionId: number): Promise<SectionDTO> => {
    try {
      const response = await axiosInstance.get(`${API_URL}/${sectionId}`);
      return response.data;
    } catch (error) {
      return SectionService.handleError(error);
    }
  },

  updateSection: async (sectionId: number, sectionDTO: SectionDTO): Promise<SectionDTO> => {
    try {
      const response = await axiosInstance.put(`${API_URL}/${sectionId}`, sectionDTO);
      return response.data;
    } catch (error) {
      return SectionService.handleError(error);
    }
  },

  deleteSection: async (sectionId: number): Promise<void> => {
    try {
      await axiosInstance.delete(`${API_URL}/${sectionId}`);
    } catch (error) {
      SectionService.handleError(error);
    }
  },

  getSectionsByProfile: async (profileId: number): Promise<SectionDTO[]> => {
    try {
      console.log('Fetching sections for profile:', profileId);
      console.log('Request URL:', `${API_URL}/profile/${profileId}`);
      
      // Log the current auth state
      const token = sessionStorage.getItem("accessToken");
      const isAuthenticated = sessionStorage.getItem("authenticatedUser");
      console.log('Auth state:', {
        hasToken: !!token,
        tokenLength: token?.length,
        isAuthenticated,
        user: sessionStorage.getItem("user")
      });

      if (!token || !isAuthenticated) {
        console.log('No authentication found, returning empty sections');
        return [];
      }

      const response = await axiosInstance.get(`${API_URL}/profile/${profileId}`);
      console.log('Sections response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch sections:', {
        profileId,
        error: error.message,
        status: error.response?.status,
        data: error.response?.data
      });
      
      // Return empty array for 403 or 404
      if (error.response?.status === 403 || error.response?.status === 404) {
        console.log(`${error.response.status} error, returning empty array`);
        return [];
      }
      
      throw error; // Let the component handle other errors
    }
  },

  reorderSections: async (profileId: number, sectionIds: number[]): Promise<void> => {
    try {
      await axiosInstance.post(`${API_URL}/reorder/${profileId}`, sectionIds);
    } catch (error) {
      SectionService.handleError(error);
    }
  },

  createSubSection: async (sectionId: number, subSectionDTO: SubSectionDTO): Promise<SubSectionDTO> => {
    try {
      const response = await axiosInstance.post(`${API_URL}/${sectionId}/subsections`, subSectionDTO);
      return response.data;
    } catch (error) {
      return SectionService.handleError(error);
    }
  },

  getSubSection: async (sectionId: number, subSectionId: number): Promise<SubSectionDTO> => {
    try {
      const response = await axiosInstance.get(`${API_URL}/${sectionId}/subsections/${subSectionId}`);
      return response.data;
    } catch (error) {
      return SectionService.handleError(error);
    }
  },

  updateSubSection: async (sectionId: number, subSectionId: number, subSectionDTO: SubSectionDTO): Promise<SubSectionDTO> => {
    try {
      const response = await axiosInstance.put(`${API_URL}/${sectionId}/subsections/${subSectionId}`, subSectionDTO);
      return response.data;
    } catch (error) {
      return SectionService.handleError(error);
    }
  },

  deleteSubSection: async (sectionId: number, subSectionId: number): Promise<void> => {
    try {
      await axiosInstance.delete(`${API_URL}/${sectionId}/subsections/${subSectionId}`);
    } catch (error) {
      SectionService.handleError(error);
    }
  },
};

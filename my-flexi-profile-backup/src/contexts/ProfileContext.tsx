
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Profile, Section, SubSection, SectionType } from '@/types';
import { useAuth } from './AuthContext';
import { useToast } from '@/hooks/use-toast';
import { getAccessToken } from '../utils/tokenHelper';

interface ProfileContextType {
  profile: Profile | null;
  isLoading: boolean;
  isCreatingProfile: boolean;
  isFetchingProfile: boolean;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
  addSection: (type: SectionType, title: string) => Promise<Section>;
  updateSection: (sectionId: number, data: Partial<Section>) => Promise<void>;
  removeSection: (sectionId: number) => Promise<void>;
  addSubsection: (sectionId: number, subsection: Partial<SubSection>) => Promise<void>;
  updateSubsection: (sectionId: number, subsectionId: number, data: Partial<SubSection>) => Promise<void>;
  removeSubsection: (sectionId: number, subsectionId: number) => Promise<void>;
  reorderSections: (newOrder: number[]) => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};

// Fetch profile by user ID from backend
import { API_ENDPOINTS } from '../constants/api';
import axiosInstance from '../services/axiosConfig';
import { SectionDTO } from '../types/dto/SectionDTO';
import { SectionService } from '../services/SectionService';
import { getToken } from '../services/AuthService';

const fetchProfileByUserId = async (userId: string, profileId: number | null): Promise<Profile | null> => {
  try {
    console.log('Fetching profile for user:', userId, 'with profileId:', profileId);
    
    const token = sessionStorage.getItem("accessToken");
    const isAuthenticated = sessionStorage.getItem("authenticatedUser");
    console.log('Auth state:', {
      hasToken: !!token,
      tokenLength: token?.length,
      isAuthenticated,
      user: sessionStorage.getItem("user")
    });

    if (!token || !isAuthenticated) {
      console.log('No authentication found, returning null');
      return null;
    }

    let url = `${API_ENDPOINTS.PROFILES}/user/${userId}`;
    if (profileId) {
      url = `${API_ENDPOINTS.PROFILES}/${profileId}`;
    }
    console.log('Request URL:', url);

    const response = await axiosInstance.get(url);
    console.log('Profile response:', response.data);
    return response.data;
  } catch (err) {
    console.error('Error fetching profile:', err);
    if (err.response) {
      console.error('Error response:', {
        status: err.response.status,
        data: err.response.data,
        headers: err.response.headers
      });
      if (err.response.status === 403) {
        console.error('Access forbidden. This could be due to an invalid or expired token.');
        // Clear the token and authenticated state
        sessionStorage.removeItem("accessToken");
        sessionStorage.removeItem("authenticatedUser");
      }
    }
    throw err; // Propagate the error to be handled by the caller
  }
};

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreatingProfile, setIsCreatingProfile] = useState(false);
  const [isFetchingProfile, setIsFetchingProfile] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      console.log('Loading profile for user:', user);
      if (!user) {
        setProfile(null);
        setIsLoading(false);
        return;
      }

      setIsFetchingProfile(true);
      try {
        const userData = JSON.parse(sessionStorage.getItem("user") || "{}");
        const profileId = userData.profileId;
        console.log('User data:', userData);
        console.log('Profile ID from user data:', profileId);

        const backendProfile = await fetchProfileByUserId(user.id, profileId);

        if (backendProfile) {
          const safeProfile = {
            ...backendProfile,
            sections: backendProfile.sections || []
          };
          setProfile(safeProfile);
          localStorage.setItem('profile', JSON.stringify(safeProfile));
        } else {
          setIsCreatingProfile(true);
          const newProfile: Profile = {
            id: null,
            userId: user.id,
            name: user.name,
            bio: '',
            isPublic: false,
            sections: [],
            email: user.email || '',
            phone: ''
          };

          const token = getToken();
          if (!token) {
            throw new Error('No authentication token available');
          }

          console.log('Creating new profile with token:', token);
          const response = await axiosInstance.post(`${API_ENDPOINTS.PROFILES}`, newProfile, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (!response.data.id) {
            throw new Error('Created profile is missing ID');
          }
          
          const createdProfile = {
            ...response.data,
            sections: response.data.sections || []
          };
          console.log('Setting profile with ID:', createdProfile.id);
          setProfile(createdProfile);
          localStorage.setItem('profile', JSON.stringify(createdProfile));
          console.log('Created new profile:', createdProfile);
        }
      } catch (error) {
        console.error('Error in profile operations:', error);
        
        // If profile not found (404), create a new one
        if (error.response && error.response.status === 404) {
          try {
            setIsCreatingProfile(true);
            const newProfile: Profile = {
              id: null,
              userId: user.id,
              name: user.name,
              bio: '',
              isPublic: false,
              sections: [],
              email: user.email || '',
              phone: ''
            };

            const token = getToken();
            if (!token) {
              throw new Error('No authentication token available');
            }

            console.log('Creating new profile with token:', token);
            const response = await axiosInstance.post(`${API_ENDPOINTS.PROFILES}`, newProfile, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            
            if (!response.data.id) {
              throw new Error('Created profile is missing ID');
            }
            
            const createdProfile = {
              ...response.data,
              sections: response.data.sections || []
            };
            console.log('Setting profile with ID:', createdProfile.id);
            setProfile(createdProfile);
            localStorage.setItem('profile', JSON.stringify(createdProfile));
            console.log('Created new profile:', createdProfile);
            return;
          } catch (createError) {
            console.error('Failed to create new profile:', createError);
          }
        }

        // Handle other errors
        setProfile(null);
        if (error.response && error.response.status === 403) {
          toast({
            title: "Authentication Error",
            description: "Your session may have expired. Please log in again.",
            variant: "destructive",
          });
          logout();
        } else {
          toast({
            title: "Error",
            description: error.response?.status === 404 
              ? "Profile not found. Creating a new one..."
              : "Failed to load or create profile. Please try again.",
            variant: error.response?.status === 404 ? "default" : "destructive",
          });
        }
      } finally {
        setIsCreatingProfile(false);
        setIsFetchingProfile(false);
        setIsLoading(false);
      }
    };

    loadProfile();
  }, [user]);

  // Helper to save to localStorage + state
  const saveProfile = async (newProfile: Profile) => {
    localStorage.setItem('profile', JSON.stringify(newProfile));
    setProfile(newProfile);
    return Promise.resolve(); // Make it async for consistency
  };

  // Rest of your methods (updateProfile, addSection, updateSection, etc.)
  // unchanged from your code but call saveProfile to keep localStorage in sync

  const updateProfile = async (data: Partial<Profile>) => {
    const updatedProfile = { ...profile, ...data };
    
    if (updatedProfile.id) {
      try {
        // Update in backend
        const response = await axiosInstance.put(
          `${API_ENDPOINTS.PROFILES}/${updatedProfile.id}`,
          updatedProfile
        );
        const savedProfile = response.data;
        saveProfile(savedProfile);
        console.log('Profile updated in backend:', savedProfile);
      } catch (error) {
        console.error('Failed to update profile in backend:', error);
        // Still update locally even if backend fails
        saveProfile(updatedProfile);
      }
    } else {
      // No ID yet, just update locally
      saveProfile(updatedProfile);
    }
  };

  const addSection = async (type: SectionType, title: string) => {
    try {
      console.log('Current profile state:', profile);
      console.log('Adding new section:', { type, title, profileId: profile?.id });
      if (!profile || !profile.id) {
        console.error('Profile or Profile ID is not available');
        throw new Error('Profile must be created before adding sections');
      }
      const newSectionDTO: SectionDTO = {
        title,
        content: '',
        profileId: profile.id,
        orderIndex: profile.sections.length,
        type,
        subSections: []
      };
      console.log('New section DTO:', newSectionDTO);

      const createdSection = await SectionService.createSection(newSectionDTO);
      console.log('Created section response:', createdSection);

      if (!createdSection || !createdSection.id) {
        throw new Error('Failed to create section: Invalid response from server');
      }

      const mappedSection: Section = {
        id: createdSection.id,
        type: (createdSection.type || 'custom') as SectionType,
        title: createdSection.title,
        subsections: [],
        order: createdSection.orderIndex
      };
      console.log('Mapped section:', mappedSection);
      
      const updatedProfile = {
        ...profile,
        sections: [...profile.sections, mappedSection]
      };
      console.log('Updated profile:', updatedProfile);

      await saveProfile(updatedProfile);
      console.log('Profile saved successfully');
      return mappedSection; // Return the created section
    } catch (error) {
      console.error('Failed to create section:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
      }
      throw error; // Propagate the error to be handled by the component
    }
  };

  // const updateSection = async (sectionId: number, data: Partial<Section>) => {
  //   try {
  //     const sectionToUpdate = profile.sections.find(s => s.id === sectionId);
  //     if (!sectionToUpdate) throw new Error('Section not found');

  //     const updatedSectionDTO: SectionDTO = {
  //       id: sectionId,
  //       title: data.title || sectionToUpdate.title,
  //       content: '', // We don't have content in our Section type
  //       profileId: profile.id!,
  //       orderIndex: sectionToUpdate.order,
  //       type: data.type || sectionToUpdate.type,
  //       subSections: [] // We handle subsections separately
  //     };

  //     const updatedSection = await SectionService.updateSection(sectionId, updatedSectionDTO);
      
  //     const updatedSections = profile.sections.map(section =>
  //       section.id === sectionId ? {
  //         ...section,
  //         title: updatedSection.title,
  //         type: updatedSection.type as SectionType,
  //         order: updatedSection.orderIndex
  //       } : section
  //     );

  //     saveProfile({ ...profile, sections: updatedSections });
  //   } catch (error) {
  //     console.error('Failed to update section:', error);
  //     throw error; // Propagate the error to be handled by the component
  //   }
  // };

   // adjust path as needed

const updateSection = async (sectionId: number, updatedSection: Section): Promise<void> => {
  try {
    const accessToken = getAccessToken();
    if (!accessToken) throw new Error('Access token not found');

    const response = await fetch(`http://localhost:8080/api/sections/${sectionId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(updatedSection),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error('Server error response:', errorBody);
      throw new Error(`Failed to update section: ${response.status}`);
    }

    // Optional: Update local state
  } catch (error) {
    console.error('Error updating section:', error);
    throw error;
  }
};

  const removeSection = async (sectionId: number) => {
    try {
      await SectionService.deleteSection(sectionId);
      const filteredSections = profile.sections.filter(s => s.id !== sectionId);
      const reorderedSections = filteredSections.map((section, idx) => ({
        ...section,
        order: idx
      }));
      saveProfile({ ...profile, sections: reorderedSections });
    } catch (error) {
      console.error('Failed to remove section:', error);
      throw error; // Propagate the error to be handled by the component
    }
  };

  const addSubsection = async (sectionId: number, subsection: Partial<SubSection>) => {
    try {
      const newSubsection: SubSection = {
        id: null,
        title: subsection.title || '',
        content: subsection.content || '',
        dateStart: subsection.dateStart,
        dateEnd: subsection.dateEnd,
        link: subsection.link,
        imageUrl: subsection.imageUrl
      };
      const updatedSections = profile.sections.map(section =>
        section.id === sectionId
          ? { ...section, subsections: [...section.subsections, newSubsection] }
          : section
      );
      await saveProfile({ ...profile, sections: updatedSections });
    } catch (error) {
      console.error('Failed to add subsection:', error);
      throw error;
    }
  };

  const updateSubsection = async (sectionId: number, subsectionId: number, data: Partial<SubSection>) => {
    try {
      const updatedSections = profile.sections.map(section => {
        if (section.id === sectionId) {
          const updatedSubsections = section.subsections.map(sub =>
            sub.id === subsectionId ? { ...sub, ...data } : sub
          );
          return { ...section, subsections: updatedSubsections };
        }
        return section;
      });
      await saveProfile({ ...profile, sections: updatedSections });
    } catch (error) {
      console.error('Failed to update subsection:', error);
      throw error;
    }
  };

  const removeSubsection = async (sectionId: number, subsectionId: number) => {
    try {
      const updatedSections = profile.sections.map(section => {
        if (section.id === sectionId) {
          return {
            ...section,
            subsections: section.subsections.filter(sub => sub.id !== subsectionId)
          };
        }
        return section;
      });
      await saveProfile({ ...profile, sections: updatedSections });
    } catch (error) {
      console.error('Failed to remove subsection:', error);
      throw error;
    }
  };

  const reorderSections = async (newOrder: number[]) => {
    try {
      const updatedSections = newOrder
        .map((id, index) => {
          const section = profile.sections.find(s => s.id === id);
          if (section) return { ...section, order: index };
          return null;
        })
        .filter(Boolean) as Section[];
      await saveProfile({ ...profile, sections: updatedSections });
    } catch (error) {
      console.error('Failed to reorder sections:', error);
      throw error;
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        isLoading,
        isCreatingProfile,
        isFetchingProfile,
        updateProfile,
        addSection,
        updateSection,
        removeSection,
        addSubsection,
        updateSubsection,
        removeSubsection,
        reorderSections
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};

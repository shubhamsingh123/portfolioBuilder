
import { 
  CreateProfileRequest, 
  UpdateProfileRequest,
  CreateSectionRequest,
  UpdateSectionRequest,
  CreateSubSectionRequest,
  UpdateSubSectionRequest,
  ReorderSectionsRequest
} from './dto/ProfileRequest';

import {
  ProfileResponse,
  ProfilesListResponse,
  SectionResponse,
  SectionsListResponse,
  SubSectionResponse,
  SubSectionsListResponse,
  StatusResponse,
  ErrorResponse
} from './dto/ProfileResponse';

/**
 * Interface for the ProfileService, ensuring consistent API interaction
 */
export interface ProfileServiceInterface {
  // Authentication
  setAuthToken(token: string): void;
  
  // Profile operations
  getProfile(profileId: string): Promise<ProfileResponse>;
  getAllProfiles(): Promise<ProfilesListResponse>;
  getUserProfiles(userId: string): Promise<ProfilesListResponse>;
  createProfile(request: CreateProfileRequest): Promise<ProfileResponse>;
  updateProfile(profileId: string, request: UpdateProfileRequest): Promise<ProfileResponse>;
  deleteProfile(profileId: string): Promise<StatusResponse>;
  
  // Section operations
  getSection(sectionId: string): Promise<SectionResponse>;
  getSectionsByProfile(profileId: string): Promise<SectionsListResponse>;
  createSection(request: CreateSectionRequest): Promise<SectionResponse>;
  updateSection(sectionId: string, request: UpdateSectionRequest): Promise<SectionResponse>;
  deleteSection(sectionId: string): Promise<StatusResponse>;
  reorderSections(request: ReorderSectionsRequest): Promise<StatusResponse>;
  
  // SubSection operations
  getSubSection(subsectionId: string): Promise<SubSectionResponse>;
  getSubSectionsBySection(sectionId: string): Promise<SubSectionsListResponse>;
  createSubSection(request: CreateSubSectionRequest): Promise<SubSectionResponse>;
  updateSubSection(subsectionId: string, request: UpdateSubSectionRequest): Promise<SubSectionResponse>;
  deleteSubSection(subsectionId: string): Promise<StatusResponse>;
}

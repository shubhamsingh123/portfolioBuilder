
import { Profile, Section, SubSection, User } from '@/types';

// Base response interface
export interface BaseResponse {
  success: boolean;
  message?: string;
  timestamp: string;
  requestId?: string;
}

// Error response
export interface ErrorResponse extends BaseResponse {
  success: false;
  errorCode?: string;
  errors?: { [key: string]: string };
}

// User response
export interface UserResponse extends BaseResponse {
  data: User;
}

// Profile response
export interface ProfileResponse extends BaseResponse {
  data: Profile;
}

// Profiles list response
export interface ProfilesListResponse extends BaseResponse {
  data: Profile[];
  pagination?: {
    total: number;
    page: number;
    pageSize: number;
  };
}

// Section response
export interface SectionResponse extends BaseResponse {
  data: Section;
}

// Sections list response
export interface SectionsListResponse extends BaseResponse {
  data: Section[];
}

// SubSection response
export interface SubSectionResponse extends BaseResponse {
  data: SubSection;
}

// SubSections list response
export interface SubSectionsListResponse extends BaseResponse {
  data: SubSection[];
}

// Status response
export interface StatusResponse extends BaseResponse {
  data: {
    status: 'success' | 'error' | 'pending';
    details?: string;
  };
}


import { SectionType, SubSection } from '@/types';

// Base request interface
export interface BaseRequest {
  requestId?: string;
  timestamp?: string;
}

// Profile creation request
export interface CreateProfileRequest extends BaseRequest {
  userId: string;
  name: string;
  bio: string;
  tagline?: string;
  avatarUrl?: string;
  coverUrl?: string;
  isPublic: boolean;
  email?: string;
  phone?: string;
}

// Profile update request
export interface UpdateProfileRequest extends BaseRequest {
  name?: string;
  bio?: string;
  tagline?: string;
  avatarUrl?: string;
  coverUrl?: string;
  isPublic?: boolean;
  email?: string;
  phone?: string;
}

// Section creation request
export interface CreateSectionRequest extends BaseRequest {
  profileId: string;
  type: SectionType;
  title: string;
  order: number;
  backgroundUrl?: string;
}

// Section update request
export interface UpdateSectionRequest extends BaseRequest {
  title?: string;
  order?: number;
  backgroundUrl?: string;
}

// SubSection creation request
export interface CreateSubSectionRequest extends BaseRequest {
  sectionId: string;
  title: string;
  content: string;
  dateStart?: string;
  dateEnd?: string;
  link?: string;
  imageUrl?: string;
  subtitle?: string;
  level?: number;
}

// SubSection update request
export interface UpdateSubSectionRequest extends BaseRequest {
  title?: string;
  content?: string;
  dateStart?: string;
  dateEnd?: string;
  link?: string;
  imageUrl?: string;
  subtitle?: string;
  level?: number;
}

// Reorder sections request
export interface ReorderSectionsRequest extends BaseRequest {
  profileId: string;
  sectionIds: string[]; // Array of section IDs in the new order
}

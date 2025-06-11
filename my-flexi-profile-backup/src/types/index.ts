
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export type SectionType = 
  | 'portfolio'
  | 'career'
  | 'education'
  | 'certifications'
  | 'skills'
  | 'custom'
  | 'about';

export interface SubSection {
  id: number | null;
  title: string;
  content: string;
  dateStart?: string;
  dateEnd?: string;
  link?: string;
  imageUrl?: string;
  subtitle?: string;
  level?: number;
  displayOrder?: number;
}

export interface Section {
  id: number | null;
  type: SectionType;
  title: string;
  subsections: SubSection[];
  order: number;
  backgroundUrl?: string;
}

export interface Profile {
  id: number | null;
  userId: string;  // Keep this as string since it comes from auth
  name: string;
  bio: string;
  tagline?: string;
  avatarUrl?: string;
  coverUrl?: string;
  isPublic: boolean;
  sections: Section[];
  email?: string;
  phone?: string;
}

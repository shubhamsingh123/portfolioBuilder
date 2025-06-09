
import { Profile, Section, SubSection, SectionType } from './index';

/**
 * ProfileDTO - Data Transfer Object for mapping between frontend and Java backend
 * This represents how data will be structured when communicating with a Java backend
 */
export interface ProfileDTO {
  id: string;
  userId: string;
  name: string;
  bio: string;
  tagline: string | null;
  avatarUrl: string | null;
  coverUrl: string | null;
  isPublic: boolean;
  sections: SectionDTO[];
  email: string | null;
  phone: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface SectionDTO {
  id: string;
  type: string; // Using string instead of SectionType enum for Java compatibility
  title: string;
  subsections: SubSectionDTO[];
  order: number;
  backgroundUrl: string | null;
}

export interface SubSectionDTO {
  id: string;
  title: string;
  content: string;
  dateStart: string | null;
  dateEnd: string | null;
  link: string | null;
  imageUrl: string | null;
  subtitle: string | null;
  level: number | null;
}

/**
 * ProfileService class
 * Sample class that demonstrates CRUD operations for integration with a Java backend
 */
export class ProfileService {
  private baseUrl: string;
  private authToken: string | null;

  constructor(baseUrl: string = 'http://localhost:8080/api', authToken: string | null = null) {
    this.baseUrl = baseUrl;
    this.authToken = authToken;
  }

  /**
   * Set authentication token for authorized requests
   */
  setAuthToken(token: string): void {
    this.authToken = token;
  }

  /**
   * Create request headers with authentication if available
   */
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    return headers;
  }

  /**
   * Convert frontend Profile to ProfileDTO for backend communication
   */
  private toProfileDTO(profile: Profile): ProfileDTO {
    return {
      id: profile.id,
      userId: profile.userId,
      name: profile.name,
      bio: profile.bio,
      tagline: profile.tagline || null,
      avatarUrl: profile.avatarUrl || null,
      coverUrl: profile.coverUrl || null,
      isPublic: profile.isPublic,
      sections: profile.sections.map(this.toSectionDTO),
      email: profile.email || null,
      phone: profile.phone || null,
      createdAt: new Date().toISOString(), // In a real app, this would come from the backend
      updatedAt: new Date().toISOString()
    };
  }

  /**
   * Convert backend ProfileDTO to frontend Profile
   */
  private fromProfileDTO(dto: ProfileDTO): Profile {
    return {
      id: dto.id,
      userId: dto.userId,
      name: dto.name,
      bio: dto.bio,
      tagline: dto.tagline || undefined,
      avatarUrl: dto.avatarUrl || undefined,
      coverUrl: dto.coverUrl || undefined,
      isPublic: dto.isPublic,
      sections: dto.sections.map(this.fromSectionDTO),
      email: dto.email || undefined,
      phone: dto.phone || undefined
    };
  }

  /**
   * Convert frontend Section to SectionDTO
   */
  private toSectionDTO(section: Section): SectionDTO {
    return {
      id: section.id,
      type: section.type,
      title: section.title,
      subsections: section.subsections.map(sub => ({
        id: sub.id,
        title: sub.title,
        content: sub.content,
        dateStart: sub.dateStart || null,
        dateEnd: sub.dateEnd || null,
        link: sub.link || null,
        imageUrl: sub.imageUrl || null,
        subtitle: sub.subtitle || null,
        level: sub.level || null
      })),
      order: section.order,
      backgroundUrl: section.backgroundUrl || null
    };
  }

  /**
   * Convert backend SectionDTO to frontend Section
   */
  private fromSectionDTO(dto: SectionDTO): Section {
    return {
      id: dto.id,
      type: dto.type as SectionType,
      title: dto.title,
      subsections: dto.subsections.map(sub => ({
        id: sub.id,
        title: sub.title,
        content: sub.content,
        dateStart: sub.dateStart || undefined,
        dateEnd: sub.dateEnd || undefined,
        link: sub.link || undefined,
        imageUrl: sub.imageUrl || undefined,
        subtitle: sub.subtitle || undefined,
        level: sub.level || undefined
      })),
      order: dto.order,
      backgroundUrl: dto.backgroundUrl || undefined
    };
  }

  // CRUD Operations

  /**
   * Get all profiles for the current user
   */
  async getAllProfiles(): Promise<Profile[]> {
    try {
      const response = await fetch(`${this.baseUrl}/profiles`, {
        method: 'GET',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data: ProfileDTO[] = await response.json();
      return data.map(dto => this.fromProfileDTO(dto));
    } catch (error) {
      console.error('Error fetching profiles:', error);
      throw error;
    }
  }

  /**
   * Get profile by ID
   */
  async getProfileById(id: string): Promise<Profile> {
    try {
      const response = await fetch(`${this.baseUrl}/profiles/${id}`, {
        method: 'GET',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data: ProfileDTO = await response.json();
      return this.fromProfileDTO(data);
    } catch (error) {
      console.error(`Error fetching profile with ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Create a new profile
   */
  async createProfile(profile: Profile): Promise<Profile> {
    try {
      const dto = this.toProfileDTO(profile);
      const response = await fetch(`${this.baseUrl}/profiles`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(dto)
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data: ProfileDTO = await response.json();
      return this.fromProfileDTO(data);
    } catch (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
  }

  /**
   * Update an existing profile
   */
  async updateProfile(profile: Profile): Promise<Profile> {
    try {
      const dto = this.toProfileDTO(profile);
      const response = await fetch(`${this.baseUrl}/profiles/${profile.id}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(dto)
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data: ProfileDTO = await response.json();
      return this.fromProfileDTO(data);
    } catch (error) {
      console.error(`Error updating profile with ID ${profile.id}:`, error);
      throw error;
    }
  }

  /**
   * Delete a profile
   */
  async deleteProfile(id: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/profiles/${id}`, {
        method: 'DELETE',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error deleting profile with ID ${id}:`, error);
      throw error;
    }
  }

  /**
   * Section-level operations
   */
  
  async addSection(profileId: string, section: Section): Promise<Section> {
    try {
      const sectionDTO = this.toSectionDTO(section);
      const response = await fetch(`${this.baseUrl}/profiles/${profileId}/sections`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(sectionDTO)
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data: SectionDTO = await response.json();
      return this.fromSectionDTO(data);
    } catch (error) {
      console.error('Error adding section:', error);
      throw error;
    }
  }

  async updateSection(profileId: string, section: Section): Promise<Section> {
    try {
      const sectionDTO = this.toSectionDTO(section);
      const response = await fetch(`${this.baseUrl}/profiles/${profileId}/sections/${section.id}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(sectionDTO)
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data: SectionDTO = await response.json();
      return this.fromSectionDTO(data);
    } catch (error) {
      console.error(`Error updating section with ID ${section.id}:`, error);
      throw error;
    }
  }

  async deleteSection(profileId: string, sectionId: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/profiles/${profileId}/sections/${sectionId}`, {
        method: 'DELETE',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error deleting section with ID ${sectionId}:`, error);
      throw error;
    }
  }

  /**
   * Subsection operations
   */
  
  async addSubsection(profileId: string, sectionId: string, subsection: SubSection): Promise<SubSection> {
    try {
      const response = await fetch(`${this.baseUrl}/profiles/${profileId}/sections/${sectionId}/subsections`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(subsection)
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error adding subsection:', error);
      throw error;
    }
  }

  async updateSubsection(profileId: string, sectionId: string, subsection: SubSection): Promise<SubSection> {
    try {
      const response = await fetch(`${this.baseUrl}/profiles/${profileId}/sections/${sectionId}/subsections/${subsection.id}`, {
        method: 'PUT',
        headers: this.getHeaders(),
        body: JSON.stringify(subsection)
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Error updating subsection with ID ${subsection.id}:`, error);
      throw error;
    }
  }

  async deleteSubsection(profileId: string, sectionId: string, subsectionId: string): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/profiles/${profileId}/sections/${sectionId}/subsections/${subsectionId}`, {
        method: 'DELETE',
        headers: this.getHeaders()
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error deleting subsection with ID ${subsectionId}:`, error);
      throw error;
    }
  }
}

/**
 * Example Java equivalent structure:
 * 
 * public class ProfileDTO {
 *     private String id;
 *     private String userId;
 *     private String name;
 *     private String bio;
 *     private String tagline;
 *     private String avatarUrl;
 *     private String coverUrl;
 *     private boolean isPublic;
 *     private List<SectionDTO> sections;
 *     private String email;
 *     private String phone;
 *     private LocalDateTime createdAt;
 *     private LocalDateTime updatedAt;
 *     
 *     // Getters and setters...
 * }
 * 
 * public class SectionDTO {
 *     private String id;
 *     private String type;
 *     private String title;
 *     private List<SubSectionDTO> subsections;
 *     private int order;
 *     private String backgroundUrl;
 *     
 *     // Getters and setters...
 * }
 * 
 * public class SubSectionDTO {
 *     private String id;
 *     private String title;
 *     private String content;
 *     private LocalDate dateStart;
 *     private LocalDate dateEnd;
 *     private String link;
 *     private String imageUrl;
 *     private String subtitle;
 *     private Integer level;
 *     
 *     // Getters and setters...
 * }
 * 
 * // Example Spring Boot Controller:
 * @RestController
 * @RequestMapping("/api/profiles")
 * public class ProfileController {
 *     @Autowired
 *     private ProfileService profileService;
 *     
 *     @GetMapping
 *     public List<ProfileDTO> getAllProfiles() {
 *         return profileService.getAllProfiles();
 *     }
 *     
 *     @GetMapping("/{id}")
 *     public ProfileDTO getProfileById(@PathVariable String id) {
 *         return profileService.getProfileById(id);
 *     }
 *     
 *     @PostMapping
 *     public ProfileDTO createProfile(@RequestBody ProfileDTO profileDTO) {
 *         return profileService.createProfile(profileDTO);
 *     }
 *     
 *     @PutMapping("/{id}")
 *     public ProfileDTO updateProfile(@PathVariable String id, @RequestBody ProfileDTO profileDTO) {
 *         return profileService.updateProfile(id, profileDTO);
 *     }
 *     
 *     @DeleteMapping("/{id}")
 *     public void deleteProfile(@PathVariable String id) {
 *         profileService.deleteProfile(id);
 *     }
 *     
 *     // Section endpoints...
 *     @PostMapping("/{profileId}/sections")
 *     public SectionDTO addSection(@PathVariable String profileId, @RequestBody SectionDTO sectionDTO) {
 *         return profileService.addSection(profileId, sectionDTO);
 *     }
 *     
 *     @PutMapping("/{profileId}/sections/{sectionId}")
 *     public SectionDTO updateSection(
 *         @PathVariable String profileId, 
 *         @PathVariable String sectionId,
 *         @RequestBody SectionDTO sectionDTO
 *     ) {
 *         return profileService.updateSection(profileId, sectionId, sectionDTO);
 *     }
 *     
 *     @DeleteMapping("/{profileId}/sections/{sectionId}")
 *     public void deleteSection(@PathVariable String profileId, @PathVariable String sectionId) {
 *         profileService.deleteSection(profileId, sectionId);
 *     }
 *     
 *     // Subsection endpoints...
 *     // Similar to sections above
 * }
 */


// This is a sample Java interface that matches the TypeScript service interface
// You can use this as a reference when implementing your Java backend

package com.yourcompany.portfolio.service;

import com.yourcompany.portfolio.dto.request.*;
import com.yourcompany.portfolio.dto.response.*;
import org.springframework.stereotype.Service;

public interface ProfileService {
    // Authentication not typically handled at this level in Java backends
    
    // Profile operations
    ProfileResponse getProfile(String profileId);
    ProfilesListResponse getAllProfiles();
    ProfilesListResponse getUserProfiles(String userId);
    ProfileResponse createProfile(CreateProfileRequest request);
    ProfileResponse updateProfile(String profileId, UpdateProfileRequest request);
    StatusResponse deleteProfile(String profileId);
    
    // Section operations
    SectionResponse getSection(String sectionId);
    SectionsListResponse getSectionsByProfile(String profileId);
    SectionResponse createSection(CreateSectionRequest request);
    SectionResponse updateSection(String sectionId, UpdateSectionRequest request);
    StatusResponse deleteSection(String sectionId);
    StatusResponse reorderSections(ReorderSectionsRequest request);
    
    // SubSection operations
    SubSectionResponse getSubSection(String subsectionId);
    SubSectionsListResponse getSubSectionsBySection(String sectionId);
    SubSectionResponse createSubSection(CreateSubSectionRequest request);
    SubSectionResponse updateSubSection(String subsectionId, UpdateSubSectionRequest request);
    StatusResponse deleteSubSection(String subsectionId);
}
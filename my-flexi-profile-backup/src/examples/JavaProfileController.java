
// This is a sample Spring Boot REST controller that would implement endpoints
// matching the TypeScript service interface

package com.yourcompany.portfolio.controller;

import com.yourcompany.portfolio.dto.request.*;
import com.yourcompany.portfolio.dto.response.*;
import com.yourcompany.portfolio.service.ProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ProfileController {

    @Autowired
    private ProfileService profileService;

    // Profile operations
    @GetMapping("/profiles/{profileId}")
    public ResponseEntity<ProfileResponse> getProfile(@PathVariable String profileId) {
        return ResponseEntity.ok(profileService.getProfile(profileId));
    }

    @GetMapping("/profiles")
    public ResponseEntity<ProfilesListResponse> getAllProfiles() {
        return ResponseEntity.ok(profileService.getAllProfiles());
    }

    @GetMapping("/users/{userId}/profiles")
    public ResponseEntity<ProfilesListResponse> getUserProfiles(@PathVariable String userId) {
        return ResponseEntity.ok(profileService.getUserProfiles(userId));
    }

    @PostMapping("/profiles")
    public ResponseEntity<ProfileResponse> createProfile(@RequestBody CreateProfileRequest request) {
        return ResponseEntity.ok(profileService.createProfile(request));
    }

    @PutMapping("/profiles/{profileId}")
    public ResponseEntity<ProfileResponse> updateProfile(
            @PathVariable String profileId,
            @RequestBody UpdateProfileRequest request) {
        return ResponseEntity.ok(profileService.updateProfile(profileId, request));
    }

    @DeleteMapping("/profiles/{profileId}")
    public ResponseEntity<StatusResponse> deleteProfile(@PathVariable String profileId) {
        return ResponseEntity.ok(profileService.deleteProfile(profileId));
    }

    // Section operations
    @GetMapping("/sections/{sectionId}")
    public ResponseEntity<SectionResponse> getSection(@PathVariable String sectionId) {
        return ResponseEntity.ok(profileService.getSection(sectionId));
    }

    @GetMapping("/profiles/{profileId}/sections")
    public ResponseEntity<SectionsListResponse> getSectionsByProfile(@PathVariable String profileId) {
        return ResponseEntity.ok(profileService.getSectionsByProfile(profileId));
    }

    @PostMapping("/sections")
    public ResponseEntity<SectionResponse> createSection(@RequestBody CreateSectionRequest request) {
        return ResponseEntity.ok(profileService.createSection(request));
    }

    @PutMapping("/sections/{sectionId}")
    public ResponseEntity<SectionResponse> updateSection(
            @PathVariable String sectionId,
            @RequestBody UpdateSectionRequest request) {
        return ResponseEntity.ok(profileService.updateSection(sectionId, request));
    }

    @DeleteMapping("/sections/{sectionId}")
    public ResponseEntity<StatusResponse> deleteSection(@PathVariable String sectionId) {
        return ResponseEntity.ok(profileService.deleteSection(sectionId));
    }

    @PostMapping("/sections/reorder")
    public ResponseEntity<StatusResponse> reorderSections(@RequestBody ReorderSectionsRequest request) {
        return ResponseEntity.ok(profileService.reorderSections(request));
    }

    // SubSection operations
    @GetMapping("/subsections/{subsectionId}")
    public ResponseEntity<SubSectionResponse> getSubSection(@PathVariable String subsectionId) {
        return ResponseEntity.ok(profileService.getSubSection(subsectionId));
    }

    @GetMapping("/sections/{sectionId}/subsections")
    public ResponseEntity<SubSectionsListResponse> getSubSectionsBySection(@PathVariable String sectionId) {
        return ResponseEntity.ok(profileService.getSubSectionsBySection(sectionId));
    }

    @PostMapping("/subsections")
    public ResponseEntity<SubSectionResponse> createSubSection(@RequestBody CreateSubSectionRequest request) {
        return ResponseEntity.ok(profileService.createSubSection(request));
    }

    @PutMapping("/subsections/{subsectionId}")
    public ResponseEntity<SubSectionResponse> updateSubSection(
            @PathVariable String subsectionId,
            @RequestBody UpdateSubSectionRequest request) {
        return ResponseEntity.ok(profileService.updateSubSection(subsectionId, request));
    }

    @DeleteMapping("/subsections/{subsectionId}")
    public ResponseEntity<StatusResponse> deleteSubSection(@PathVariable String subsectionId) {
        return ResponseEntity.ok(profileService.deleteSubSection(subsectionId));
    }
}


// This file shows how the Java model classes would be structured
// to match the TypeScript types

package com.yourcompany.portfolio.model;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

// User entity
@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    private String id;
    private String email;
    private String name;
    private LocalDateTime createdAt;
}

// Profile entity
@Entity
@Table(name = "profiles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Profile {
    @Id
    private String id;
    private String userId;
    private String name;
    private String bio;
    private String tagline;
    private String avatarUrl;
    private String coverUrl;
    private boolean isPublic;
    private String email;
    private String phone;
    
    @OneToMany(mappedBy = "profile", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Section> sections;
}

// Section entity
@Entity
@Table(name = "sections")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Section {
    @Id
    private String id;
    
    @Enumerated(EnumType.STRING)
    private SectionType type;
    
    private String title;
    private int order;
    private String backgroundUrl;
    
    @ManyToOne
    @JoinColumn(name = "profile_id")
    private Profile profile;
    
    @OneToMany(mappedBy = "section", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SubSection> subsections;
}

// SubSection entity
@Entity
@Table(name = "subsections")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubSection {
    @Id
    private String id;
    private String title;
    private String content;
    private String dateStart;
    private String dateEnd;
    private String link;
    private String imageUrl;
    private String subtitle;
    private Integer level;
    
    @ManyToOne
    @JoinColumn(name = "section_id")
    private Section section;
}

// SectionType enum
public enum SectionType {
    PORTFOLIO,
    CAREER,
    EDUCATION,
    CERTIFICATIONS,
    SKILLS,
    CUSTOM,
    ABOUT
}

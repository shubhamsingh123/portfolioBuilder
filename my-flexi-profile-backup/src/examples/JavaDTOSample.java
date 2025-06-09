
// This file shows how the Java DTO classes would be structured
// to match the TypeScript request and response types

package com.yourcompany.portfolio.dto;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import com.yourcompany.portfolio.model.SectionType;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

// Request DTOs
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BaseRequest {
    private String requestId;
    private LocalDateTime timestamp;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateProfileRequest extends BaseRequest {
    private String userId;
    private String name;
    private String bio;
    private String tagline;
    private String avatarUrl;
    private String coverUrl;
    private boolean isPublic;
    private String email;
    private String phone;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProfileRequest extends BaseRequest {
    private String name;
    private String bio;
    private String tagline;
    private String avatarUrl;
    private String coverUrl;
    private Boolean isPublic;
    private String email;
    private String phone;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateSectionRequest extends BaseRequest {
    private String profileId;
    private SectionType type;
    private String title;
    private int order;
    private String backgroundUrl;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateSectionRequest extends BaseRequest {
    private String title;
    private Integer order;
    private String backgroundUrl;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateSubSectionRequest extends BaseRequest {
    private String sectionId;
    private String title;
    private String content;
    private String dateStart;
    private String dateEnd;
    private String link;
    private String imageUrl;
    private String subtitle;
    private Integer level;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UpdateSubSectionRequest extends BaseRequest {
    private String title;
    private String content;
    private String dateStart;
    private String dateEnd;
    private String link;
    private String imageUrl;
    private String subtitle;
    private Integer level;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReorderSectionsRequest extends BaseRequest {
    private String profileId;
    private List<String> sectionIds;
}

// Response DTOs
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BaseResponse {
    private boolean success;
    private String message;
    private LocalDateTime timestamp;
    private String requestId;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse extends BaseResponse {
    private String errorCode;
    private Map<String, String> errors;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponse extends BaseResponse {
    private User data;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileResponse extends BaseResponse {
    private Profile data;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfilesListResponse extends BaseResponse {
    private List<Profile> data;
    private Pagination pagination;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pagination {
    private int total;
    private int page;
    private int pageSize;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SectionResponse extends BaseResponse {
    private Section data;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SectionsListResponse extends BaseResponse {
    private List<Section> data;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubSectionResponse extends BaseResponse {
    private SubSection data;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubSectionsListResponse extends BaseResponse {
    private List<SubSection> data;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StatusResponse extends BaseResponse {
    private StatusData data;
}

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StatusData {
    private String status;
    private String details;
}

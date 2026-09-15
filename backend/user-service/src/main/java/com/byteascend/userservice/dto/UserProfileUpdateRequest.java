package com.byteascend.userservice.dto;

import lombok.Data;

@Data
public class UserProfileUpdateRequest {
    private String fullName;
    private String nickname;
    private String bio;
    private String githubUrl;
    private String linkedinUrl;
    private String twitterUrl;
    private String websiteUrl;
}

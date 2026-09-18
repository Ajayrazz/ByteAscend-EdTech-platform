package com.byteascend.userservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class LeaderboardUserDto {
    private UUID id;
    private String fullName;
    private String nickname;
    private String profilePictureUrl;
    private Integer totalScore;
    private Integer streakCount;
}

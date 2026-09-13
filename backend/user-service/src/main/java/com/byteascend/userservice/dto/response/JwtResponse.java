package com.byteascend.userservice.dto.response;

import lombok.Data;
import java.util.List;
import java.util.UUID;

@Data
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private UUID id;
    private String email;
    private String fullName;
    private String nickname;
    private List<String> roles;

    public JwtResponse(String accessToken, UUID id, String email, String fullName, String nickname, List<String> roles) {
        this.token = accessToken;
        this.id = id;
        this.email = email;
        this.fullName = fullName;
        this.nickname = nickname;
        this.roles = roles;
    }
}

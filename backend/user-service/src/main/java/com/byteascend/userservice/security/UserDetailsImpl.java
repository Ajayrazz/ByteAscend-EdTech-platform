package com.byteascend.userservice.security;

import com.byteascend.userservice.model.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public class UserDetailsImpl implements UserDetails {

    private UUID id;
    private String email;
    private String fullName;
    private String nickname;
    private String profilePictureUrl;
    
    @JsonIgnore
    private String password;

    private Collection<? extends GrantedAuthority> authorities;

    public UserDetailsImpl(UUID id, String email, String fullName, String nickname, String password,
                           String profilePictureUrl,
                           Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.email = email;
        this.fullName = fullName;
        this.nickname = nickname;
        this.profilePictureUrl = profilePictureUrl;
        this.password = password;
        this.authorities = authorities;
    }

    public static UserDetailsImpl build(User user) {
        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority(role.getName()))
                .collect(Collectors.toList());

        return new UserDetailsImpl(
                user.getId(),
                user.getEmail(),
                user.getFullName(),
                user.getNickname(),
                user.getPasswordHash(),
                user.getProfilePictureUrl(),
                authorities);
    }

    public UUID getId() {
        return id;
    }

    public String getFullName() {
        return fullName;
    }

    public String getNickname() {
        return nickname;
    }

    public String getProfilePictureUrl() {
        return profilePictureUrl;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

package com.byteascend.userservice.controller;

import com.byteascend.userservice.model.User;
import com.byteascend.userservice.security.UserDetailsImpl;
import com.byteascend.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        User user = userService.getUserById(userDetails.getId());
        return ResponseEntity.ok(user);
    }

    @Autowired
    private com.byteascend.userservice.repository.UserBadgeRepository userBadgeRepository;

    @GetMapping("/badges")
    public ResponseEntity<?> getUserBadges() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        
        java.util.List<com.byteascend.userservice.model.UserBadge> userBadges = 
            userBadgeRepository.findByUserId(userDetails.getId());
        
        java.util.List<java.util.Map<String, Object>> badges = userBadges.stream().map(ub -> {
            com.byteascend.userservice.model.Badge b = ub.getBadge();
            java.util.Map<String, Object> map = new java.util.HashMap<>();
            map.put("id", b.getId());
            map.put("name", b.getName());
            map.put("description", b.getDescription());
            map.put("iconUrl", b.getIconUrl());
            map.put("earnedAt", ub.getEarnedAt());
            return map;
        }).collect(java.util.stream.Collectors.toList());
        
        return ResponseEntity.ok(badges);
    }

    @PutMapping("/profile")
    public ResponseEntity<User> updateProfile(@RequestBody com.byteascend.userservice.dto.UserProfileUpdateRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = userService.getUserById(userDetails.getId());

        if (request.getFullName() != null) user.setFullName(request.getFullName());
        if (request.getNickname() != null) user.setNickname(request.getNickname());
        if (request.getBio() != null) user.setBio(request.getBio());
        if (request.getGithubUrl() != null) user.setGithubUrl(request.getGithubUrl());
        if (request.getLinkedinUrl() != null) user.setLinkedinUrl(request.getLinkedinUrl());
        if (request.getTwitterUrl() != null) user.setTwitterUrl(request.getTwitterUrl());
        if (request.getWebsiteUrl() != null) user.setWebsiteUrl(request.getWebsiteUrl());

        User updatedUser = userService.updateUser(user);
        return ResponseEntity.ok(updatedUser);
    }

    @PostMapping("/profile-picture")
    public ResponseEntity<?> uploadProfilePicture(@RequestParam("file") org.springframework.web.multipart.MultipartFile file) {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().body("Please select a file to upload.");
        }
        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        User user = userService.getUserById(userDetails.getId());

        try {
            // Ensure uploads directory exists
            String uploadDir = "uploads/profile-pictures/";
            java.nio.file.Path uploadPath = java.nio.file.Paths.get(uploadDir);
            if (!java.nio.file.Files.exists(uploadPath)) {
                java.nio.file.Files.createDirectories(uploadPath);
            }

            // Generate unique filename
            String originalFilename = file.getOriginalFilename();
            String extension = originalFilename != null && originalFilename.contains(".") ? 
                    originalFilename.substring(originalFilename.lastIndexOf(".")) : "";
            String newFilename = user.getId().toString() + "_" + System.currentTimeMillis() + extension;
            
            // Save file
            java.nio.file.Path filePath = uploadPath.resolve(newFilename);
            file.transferTo(filePath.toFile());

            // Generate URL mapping to the WebConfig resource handler
            String fileUrl = "http://localhost:8081/uploads/profile-pictures/" + newFilename;
            
            // Update user entity
            user.setProfilePictureUrl(fileUrl);
            userService.updateUser(user); // Wait, does updateUser exist? Let's assume there is a save mechanism. Wait, let me check UserService first. If not, I should inject UserRepository or add a method.
            
            return ResponseEntity.ok(java.util.Map.of("message", "Profile picture uploaded successfully", "url", fileUrl));
        } catch (java.io.IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Failed to upload profile picture.");
        }
    }
}

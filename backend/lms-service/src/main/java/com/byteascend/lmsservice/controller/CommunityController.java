package com.byteascend.lmsservice.controller;

import com.byteascend.lmsservice.model.InterviewExperience;
import com.byteascend.lmsservice.model.MockTest;
import com.byteascend.lmsservice.model.UserMockAttempt;
import com.byteascend.lmsservice.security.AuthenticatedUser;
import com.byteascend.lmsservice.service.CommunityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/community")
public class CommunityController {

    @Autowired
    private CommunityService communityService;

    @GetMapping("/experiences")
    public ResponseEntity<List<InterviewExperience>> getAllExperiences() {
        return ResponseEntity.ok(communityService.getAllExperiences());
    }

    @PostMapping("/experiences")
    public ResponseEntity<InterviewExperience> addExperience(@RequestBody InterviewExperience experience) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AuthenticatedUser user = (AuthenticatedUser) authentication.getPrincipal();

        experience.setUserId(user.getId());
        return ResponseEntity.ok(communityService.addExperience(experience));
    }

    @GetMapping("/mock-tests")
    public ResponseEntity<List<MockTest>> getAllMockTests() {
        return ResponseEntity.ok(communityService.getAllMockTests());
    }

    @GetMapping("/mock-tests/attempts")
    public ResponseEntity<List<UserMockAttempt>> getMyMockAttempts() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AuthenticatedUser user = (AuthenticatedUser) authentication.getPrincipal();

        return ResponseEntity.ok(communityService.getUserMockAttempts(user.getId()));
    }

    @PostMapping("/mock-tests/{testId}/attempts")
    public ResponseEntity<UserMockAttempt> recordMockAttempt(
            @PathVariable UUID testId,
            @RequestBody Map<String, Integer> payload) {
        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AuthenticatedUser user = (AuthenticatedUser) authentication.getPrincipal();

        Integer score = payload.get("score");
        return ResponseEntity.ok(communityService.recordMockAttempt(user.getId(), testId, score));
    }
}

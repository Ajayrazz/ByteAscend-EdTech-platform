package com.byteascend.lmsservice.controller;

import com.byteascend.lmsservice.model.UserLessonProgress;
import com.byteascend.lmsservice.security.AuthenticatedUser;
import com.byteascend.lmsservice.service.ProgressService;
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
@RequestMapping("/api/v1/progress")
public class ProgressController {

    @Autowired
    private ProgressService progressService;

    @GetMapping("/courses/{courseId}")
    public ResponseEntity<List<UserLessonProgress>> getProgressForCourse(@PathVariable UUID courseId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AuthenticatedUser user = (AuthenticatedUser) authentication.getPrincipal();

        return ResponseEntity.ok(progressService.getProgressForCourse(user.getId(), courseId));
    }

    @PostMapping("/lessons/{lessonId}")
    public ResponseEntity<UserLessonProgress> updateProgress(
            @PathVariable UUID lessonId,
            @RequestBody Map<String, Object> payload) {
        
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        AuthenticatedUser user = (AuthenticatedUser) authentication.getPrincipal();

        String status = (String) payload.get("status");
        Integer watchTime = payload.containsKey("watchTimeSeconds") ? (Integer) payload.get("watchTimeSeconds") : null;

        return ResponseEntity.ok(progressService.updateProgress(user.getId(), lessonId, status, watchTime));
    }
}

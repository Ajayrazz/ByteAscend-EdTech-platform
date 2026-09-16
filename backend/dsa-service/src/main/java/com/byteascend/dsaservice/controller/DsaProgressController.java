package com.byteascend.dsaservice.controller;

import com.byteascend.dsaservice.model.DsaUserProgress;
import com.byteascend.dsaservice.repository.DsaUserProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/dsa/progress")
@CrossOrigin(origins = "*", maxAge = 3600)
public class DsaProgressController {

    @Autowired
    private DsaUserProgressRepository progressRepository;

    private UUID getCurrentUserId() {
        String userIdStr = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return UUID.fromString(userIdStr);
    }

    @GetMapping
    public ResponseEntity<List<DsaUserProgress>> getUserProgress() {
        UUID userId = getCurrentUserId();
        List<DsaUserProgress> progressList = progressRepository.findByUserId(userId);
        return ResponseEntity.ok(progressList);
    }

    @Autowired
    private org.springframework.amqp.rabbit.core.RabbitTemplate rabbitTemplate;

    @PostMapping("/toggle-complete/{problemId}")
    public ResponseEntity<?> toggleComplete(@PathVariable String problemId) {
        UUID userId = getCurrentUserId();
        DsaUserProgress progress = progressRepository.findByUserIdAndProblemId(userId, problemId)
                .orElse(new DsaUserProgress());
        
        if (progress.getId() == null) {
            progress.setUserId(userId);
            progress.setProblemId(problemId);
        }
        
        boolean wasCompleted = progress.isCompleted();
        progress.setCompleted(!wasCompleted);
        progressRepository.save(progress);
        
        // Publish event if the problem was just marked as completed
        if (!wasCompleted) {
            com.byteascend.dsaservice.event.ProblemSolvedEvent event = 
                new com.byteascend.dsaservice.event.ProblemSolvedEvent(userId, problemId, System.currentTimeMillis());
            rabbitTemplate.convertAndSend("byteascend.dsa.exchange", "problem.solved", event);
        }
        
        return ResponseEntity.ok(Map.of("message", "Toggled completion status", "isCompleted", progress.isCompleted()));
    }

    @PostMapping("/toggle-bookmark/{problemId}")
    public ResponseEntity<?> toggleBookmark(@PathVariable String problemId) {
        UUID userId = getCurrentUserId();
        DsaUserProgress progress = progressRepository.findByUserIdAndProblemId(userId, problemId)
                .orElse(new DsaUserProgress());
        
        if (progress.getId() == null) {
            progress.setUserId(userId);
            progress.setProblemId(problemId);
        }
        
        progress.setBookmarked(!progress.isBookmarked());
        progressRepository.save(progress);
        
        return ResponseEntity.ok(Map.of("message", "Toggled bookmark status", "isBookmarked", progress.isBookmarked()));
    }
}

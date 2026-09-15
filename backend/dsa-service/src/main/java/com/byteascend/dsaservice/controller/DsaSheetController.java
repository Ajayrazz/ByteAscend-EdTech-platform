package com.byteascend.dsaservice.controller;

import com.byteascend.dsaservice.model.DsaSheetDay;
import com.byteascend.dsaservice.repository.DsaSheetDayRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dsa/sheet")
@org.springframework.web.bind.annotation.CrossOrigin(origins = "*")
public class DsaSheetController {

    private final DsaSheetDayRepository dsaSheetDayRepository;
    private final com.byteascend.dsaservice.repository.DsaSheetProblemRepository dsaSheetProblemRepository;

    @Autowired
    public DsaSheetController(DsaSheetDayRepository dsaSheetDayRepository, com.byteascend.dsaservice.repository.DsaSheetProblemRepository dsaSheetProblemRepository) {
        this.dsaSheetDayRepository = dsaSheetDayRepository;
        this.dsaSheetProblemRepository = dsaSheetProblemRepository;
    }

    @GetMapping("/days")
    public ResponseEntity<List<DsaSheetDay>> getAllDays() {
        List<DsaSheetDay> days = dsaSheetDayRepository.findAllByOrderByOrderNumAsc();
        return ResponseEntity.ok(days);
    }

    @GetMapping("/problems/{id}")
    public ResponseEntity<com.byteascend.dsaservice.model.DsaSheetProblem> getProblemById(@org.springframework.web.bind.annotation.PathVariable java.util.UUID id) {
        return dsaSheetProblemRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/problems/{id}/details")
    public ResponseEntity<java.util.Map<String, Object>> getProblemDetails(@org.springframework.web.bind.annotation.PathVariable java.util.UUID id) {
        return dsaSheetProblemRepository.findById(id).map(problem -> {
            String url = problem.getPracticeUrl();
            if (url == null || !url.contains("leetcode.com/problems/")) {
                return ResponseEntity.badRequest().body(java.util.Collections.<String, Object>singletonMap("error", "Not a valid LeetCode URL"));
            }
            
            // Extract title slug
            String[] parts = url.split("leetcode\\.com/problems/");
            String titleSlug = parts[1].replace("/", "");
            
            // Call LeetCode GraphQL
            org.springframework.web.client.RestTemplate restTemplate = new org.springframework.web.client.RestTemplate();
            org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
            headers.setContentType(org.springframework.http.MediaType.APPLICATION_JSON);
            headers.set("User-Agent", "Mozilla/5.0");
            
            String query = "query questionData($titleSlug: String!) { question(titleSlug: $titleSlug) { content difficulty likes dislikes } }";
            java.util.Map<String, Object> requestBody = new java.util.HashMap<>();
            requestBody.put("query", query);
            requestBody.put("variables", java.util.Collections.singletonMap("titleSlug", titleSlug));
            
            org.springframework.http.HttpEntity<java.util.Map<String, Object>> entity = new org.springframework.http.HttpEntity<>(requestBody, headers);
            
            try {
                ResponseEntity<java.util.Map> response = restTemplate.postForEntity("https://leetcode.com/graphql", entity, java.util.Map.class);
                java.util.Map<String, Object> body = response.getBody();
                if (body != null && body.containsKey("data")) {
                    java.util.Map<String, Object> data = (java.util.Map<String, Object>) body.get("data");
                    java.util.Map<String, Object> question = (java.util.Map<String, Object>) data.get("question");
                    if (question != null) {
                        java.util.Map<String, Object> result = new java.util.HashMap<>();
                        result.put("content", question.get("content"));
                        result.put("likes", question.get("likes"));
                        result.put("dislikes", question.get("dislikes"));
                        return ResponseEntity.ok(result);
                    }
                }
                return ResponseEntity.status(500).body(java.util.Collections.<String, Object>singletonMap("error", "Failed to parse LeetCode response"));
            } catch (Exception e) {
                return ResponseEntity.status(500).body(java.util.Collections.<String, Object>singletonMap("error", "Failed to fetch from LeetCode: " + e.getMessage()));
            }
        }).orElse(ResponseEntity.notFound().build());
    }
}

package com.byteascend.dsaservice.controller;

import com.byteascend.dsaservice.service.DsaStatsService;
import com.byteascend.dsaservice.security.JwtUtils;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/dsa/stats")
@CrossOrigin(origins = "*", maxAge = 3600)
public class DsaStatsController {

    private final DsaStatsService statsService;
    private final JwtUtils jwtUtils;

    public DsaStatsController(DsaStatsService statsService, JwtUtils jwtUtils) {
        this.statsService = statsService;
        this.jwtUtils = jwtUtils;
    }

    @GetMapping("/me")
    public ResponseEntity<?> getMyStats(HttpServletRequest request) {
        String jwt = parseJwt(request);
        if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
            String userIdStr = jwtUtils.getUserIdFromJwtToken(jwt);
            Map<String, Object> stats = statsService.getUserStats(UUID.fromString(userIdStr));
            return ResponseEntity.ok(stats);
        }
        return ResponseEntity.status(401).body("Unauthorized");
    }

    @GetMapping("/recent")
    public ResponseEntity<?> getRecentActivities(HttpServletRequest request) {
        String jwt = parseJwt(request);
        if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
            String userIdStr = jwtUtils.getUserIdFromJwtToken(jwt);
            List<Map<String, Object>> recent = statsService.getRecentActivities(UUID.fromString(userIdStr));
            return ResponseEntity.ok(recent);
        }
        return ResponseEntity.status(401).body("Unauthorized");
    }

    @GetMapping("/leaderboard")
    public ResponseEntity<?> getLeaderboard(HttpServletRequest request) {
        // Anyone can view the leaderboard, or require auth. We'll require auth for now.
        String jwt = parseJwt(request);
        if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
            List<Map<String, Object>> leaderboard = statsService.getLeaderboard();
            return ResponseEntity.ok(leaderboard);
        }
        return ResponseEntity.status(401).body("Unauthorized");
    }

    private String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");
        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7);
        }
        return null;
    }
}

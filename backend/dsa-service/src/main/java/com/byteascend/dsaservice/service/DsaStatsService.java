package com.byteascend.dsaservice.service;

import com.byteascend.dsaservice.model.DsaSheetProblem;
import com.byteascend.dsaservice.model.DsaUserProgress;
import com.byteascend.dsaservice.repository.DsaSheetProblemRepository;
import com.byteascend.dsaservice.repository.DsaUserProgressRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DsaStatsService {

    private final DsaUserProgressRepository progressRepository;
    private final DsaSheetProblemRepository problemRepository;

    public DsaStatsService(DsaUserProgressRepository progressRepository, DsaSheetProblemRepository problemRepository) {
        this.progressRepository = progressRepository;
        this.problemRepository = problemRepository;
    }

    public Map<String, Object> getUserStats(UUID userId) {
        List<DsaUserProgress> userProgress = progressRepository.findByUserId(userId)
                .stream().filter(DsaUserProgress::isCompleted).collect(Collectors.toList());

        List<DsaSheetProblem> allProblems = problemRepository.findAll();
        Map<String, DsaSheetProblem> problemMap = new HashMap<>();
        for (DsaSheetProblem p : allProblems) {
            problemMap.put(p.getId().toString(), p);
        }

        int easyCount = 0;
        int mediumCount = 0;
        int hardCount = 0;

        List<LocalDate> completedDates = new ArrayList<>();
        List<String> submissionDates = new ArrayList<>();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

        int dataStructuresCount = 0;
        int algorithmsCount = 0;
        int dpCount = 0;

        for (DsaUserProgress progress : userProgress) {
            DsaSheetProblem p = problemMap.get(progress.getProblemId());
            if (p != null) {
                if ("Easy".equalsIgnoreCase(p.getDifficulty())) easyCount++;
                else if ("Medium".equalsIgnoreCase(p.getDifficulty())) mediumCount++;
                else if ("Hard".equalsIgnoreCase(p.getDifficulty())) hardCount++;

                String title = p.getTitle().toLowerCase();
                if (title.contains("dp") || title.contains("dynamic")) {
                    dpCount++;
                } else if (title.contains("sort") || title.contains("search") || title.contains("greedy") || title.contains("pointer")) {
                    algorithmsCount++;
                } else {
                    dataStructuresCount++;
                }
            }
            if (progress.getUpdatedAt() != null) {
                LocalDate date = progress.getUpdatedAt().toLocalDate();
                completedDates.add(date);
                submissionDates.add(date.format(formatter));
            }
        }

        int totalEasy = 0;
        int totalMedium = 0;
        int totalHard = 0;
        for (DsaSheetProblem p : allProblems) {
            if ("Easy".equalsIgnoreCase(p.getDifficulty())) totalEasy++;
            else if ("Medium".equalsIgnoreCase(p.getDifficulty())) totalMedium++;
            else if ("Hard".equalsIgnoreCase(p.getDifficulty())) totalHard++;
        }

        int totalPoints = (easyCount * 10) + (mediumCount * 20) + (hardCount * 30);
        int currentStreak = calculateStreak(completedDates);
        int globalRank = calculateGlobalRank(totalPoints);

        Map<String, Object> stats = new HashMap<>();
        stats.put("totalSolved", userProgress.size());
        stats.put("totalProblems", allProblems.size());
        stats.put("easySolved", easyCount);
        stats.put("mediumSolved", mediumCount);
        stats.put("hardSolved", hardCount);
        stats.put("totalEasy", totalEasy);
        stats.put("totalMedium", totalMedium);
        stats.put("totalHard", totalHard);
        stats.put("totalPoints", totalPoints);
        stats.put("currentStreak", currentStreak);
        stats.put("globalRank", globalRank);
        stats.put("submissionDates", submissionDates);

        // Community Stats (Mocked as real features are not built yet, but wired to 0)
        Map<String, Integer> communityStats = new HashMap<>();
        communityStats.put("solutions", 0);
        communityStats.put("discussions", 0);
        communityStats.put("submissions", userProgress.size()); // Use total solved as proxy for submissions
        communityStats.put("reputation", 0);
        stats.put("communityStats", communityStats);

        // Skills (Derived from solved problem titles)
        Map<String, Integer> skills = new HashMap<>();
        skills.put("Data Structures", dataStructuresCount);
        skills.put("Algorithms", algorithmsCount);
        skills.put("Dynamic Programming", dpCount);
        stats.put("skills", skills);

        // Contest Ranking (Empty for now)
        stats.put("contestRanking", new ArrayList<>());

        return stats;
    }

    public List<Map<String, Object>> getRecentActivities(UUID userId) {
        List<DsaUserProgress> userProgress = progressRepository.findByUserId(userId)
                .stream().filter(DsaUserProgress::isCompleted)
                .sorted((a, b) -> {
                    if (a.getUpdatedAt() == null && b.getUpdatedAt() == null) return 0;
                    if (a.getUpdatedAt() == null) return 1;
                    if (b.getUpdatedAt() == null) return -1;
                    return b.getUpdatedAt().compareTo(a.getUpdatedAt());
                })
                .limit(5)
                .collect(Collectors.toList());

        List<DsaSheetProblem> allProblems = problemRepository.findAll();
        Map<String, DsaSheetProblem> problemMap = new HashMap<>();
        for (DsaSheetProblem p : allProblems) {
            problemMap.put(p.getId().toString(), p);
        }

        List<Map<String, Object>> activities = new ArrayList<>();
        for (DsaUserProgress progress : userProgress) {
            DsaSheetProblem p = problemMap.get(progress.getProblemId());
            if (p != null) {
                Map<String, Object> activity = new HashMap<>();
                activity.put("problemId", p.getId());
                activity.put("title", p.getTitle());
                activity.put("difficulty", p.getDifficulty());
                activity.put("completedAt", progress.getUpdatedAt());
                activities.add(activity);
            }
        }
        return activities;
    }

    public List<Map<String, Object>> getLeaderboard() {
        List<DsaUserProgress> allProgress = progressRepository.findAll().stream().filter(DsaUserProgress::isCompleted).collect(Collectors.toList());
        List<DsaSheetProblem> allProblems = problemRepository.findAll();
        Map<String, String> diffMap = new HashMap<>();
        for (DsaSheetProblem p : allProblems) {
            diffMap.put(p.getId().toString(), p.getDifficulty());
        }

        Map<UUID, Integer> userPointsMap = new HashMap<>();
        for (DsaUserProgress prog : allProgress) {
            String diff = diffMap.get(prog.getProblemId());
            int pts = 0;
            if ("Easy".equalsIgnoreCase(diff)) pts = 10;
            else if ("Medium".equalsIgnoreCase(diff)) pts = 20;
            else if ("Hard".equalsIgnoreCase(diff)) pts = 30;
            
            userPointsMap.put(prog.getUserId(), userPointsMap.getOrDefault(prog.getUserId(), 0) + pts);
        }

        List<Map.Entry<UUID, Integer>> sortedUsers = new ArrayList<>(userPointsMap.entrySet());
        sortedUsers.sort((a, b) -> b.getValue().compareTo(a.getValue()));

        List<Map<String, Object>> leaderboard = new ArrayList<>();
        int rank = 1;
        for (int i = 0; i < Math.min(10, sortedUsers.size()); i++) {
            Map.Entry<UUID, Integer> entry = sortedUsers.get(i);
            Map<String, Object> userStat = new HashMap<>();
            userStat.put("rank", rank++);
            userStat.put("userId", entry.getKey());
            // Since we don't have user profiles here, mock the name using ID slice
            String shortId = entry.getKey().toString().substring(0, 5);
            userStat.put("name", "Student " + shortId.toUpperCase());
            userStat.put("points", entry.getValue());
            leaderboard.add(userStat);
        }
        return leaderboard;
    }

    private int calculateGlobalRank(int userPoints) {
        List<DsaUserProgress> allProgress = progressRepository.findAll().stream().filter(DsaUserProgress::isCompleted).collect(Collectors.toList());
        List<DsaSheetProblem> allProblems = problemRepository.findAll();
        Map<String, String> diffMap = new HashMap<>();
        for (DsaSheetProblem p : allProblems) {
            diffMap.put(p.getId().toString(), p.getDifficulty());
        }

        Map<UUID, Integer> userPointsMap = new HashMap<>();
        for (DsaUserProgress prog : allProgress) {
            String diff = diffMap.get(prog.getProblemId());
            int pts = 0;
            if ("Easy".equalsIgnoreCase(diff)) pts = 10;
            else if ("Medium".equalsIgnoreCase(diff)) pts = 20;
            else if ("Hard".equalsIgnoreCase(diff)) pts = 30;
            
            userPointsMap.put(prog.getUserId(), userPointsMap.getOrDefault(prog.getUserId(), 0) + pts);
        }

        int rank = 1;
        for (int pts : userPointsMap.values()) {
            if (pts > userPoints) {
                rank++;
            }
        }
        return rank;
    }

    private int calculateStreak(List<LocalDate> dates) {
        if (dates.isEmpty()) return 0;
        
        List<LocalDate> uniqueSortedDates = dates.stream()
                .distinct()
                .sorted(Comparator.reverseOrder())
                .collect(Collectors.toList());

        LocalDate today = LocalDate.now();
        LocalDate yesterday = today.minusDays(1);

        if (!uniqueSortedDates.contains(today) && !uniqueSortedDates.contains(yesterday)) {
            return 0; // Streak broken
        }

        int streak = 0;
        LocalDate currentDate = uniqueSortedDates.contains(today) ? today : yesterday;

        for (LocalDate date : uniqueSortedDates) {
            if (date.equals(currentDate)) {
                streak++;
                currentDate = currentDate.minusDays(1);
            } else if (date.isBefore(currentDate)) {
                break;
            }
        }
        return streak;
    }
}

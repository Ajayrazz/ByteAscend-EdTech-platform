package com.byteascend.lmsservice.service;

import com.byteascend.lmsservice.model.InterviewExperience;
import com.byteascend.lmsservice.model.MockTest;
import com.byteascend.lmsservice.model.UserMockAttempt;
import com.byteascend.lmsservice.repository.InterviewExperienceRepository;
import com.byteascend.lmsservice.repository.MockTestRepository;
import com.byteascend.lmsservice.repository.UserMockAttemptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CommunityService {

    @Autowired
    private InterviewExperienceRepository experienceRepository;

    @Autowired
    private MockTestRepository mockTestRepository;

    @Autowired
    private UserMockAttemptRepository mockAttemptRepository;

    public List<InterviewExperience> getAllExperiences() {
        return experienceRepository.findAll();
    }

    public List<InterviewExperience> getUserExperiences(UUID userId) {
        return experienceRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public InterviewExperience addExperience(InterviewExperience experience) {
        return experienceRepository.save(experience);
    }

    public List<MockTest> getAllMockTests() {
        return mockTestRepository.findAll();
    }

    public List<UserMockAttempt> getUserMockAttempts(UUID userId) {
        return mockAttemptRepository.findByUserIdOrderByCompletedAtDesc(userId);
    }

    public UserMockAttempt recordMockAttempt(UUID userId, UUID mockTestId, Integer score) {
        MockTest test = mockTestRepository.findById(mockTestId)
                .orElseThrow(() -> new RuntimeException("Mock test not found"));

        UserMockAttempt attempt = UserMockAttempt.builder()
                .userId(userId)
                .mockTest(test)
                .score(score)
                .build();

        return mockAttemptRepository.save(attempt);
    }
}

package com.byteascend.lmsservice.repository;

import com.byteascend.lmsservice.model.InterviewExperience;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface InterviewExperienceRepository extends JpaRepository<InterviewExperience, UUID> {
    List<InterviewExperience> findByUserIdOrderByCreatedAtDesc(UUID userId);
}

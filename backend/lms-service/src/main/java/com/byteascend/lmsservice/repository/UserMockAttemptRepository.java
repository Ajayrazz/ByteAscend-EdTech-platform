package com.byteascend.lmsservice.repository;

import com.byteascend.lmsservice.model.UserMockAttempt;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface UserMockAttemptRepository extends JpaRepository<UserMockAttempt, UUID> {
    List<UserMockAttempt> findByUserIdOrderByCompletedAtDesc(UUID userId);
}

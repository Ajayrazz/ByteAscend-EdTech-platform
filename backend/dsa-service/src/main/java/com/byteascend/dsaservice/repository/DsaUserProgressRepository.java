package com.byteascend.dsaservice.repository;

import com.byteascend.dsaservice.model.DsaUserProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface DsaUserProgressRepository extends JpaRepository<DsaUserProgress, UUID> {
    List<DsaUserProgress> findByUserId(UUID userId);
    Optional<DsaUserProgress> findByUserIdAndProblemId(UUID userId, String problemId);
}

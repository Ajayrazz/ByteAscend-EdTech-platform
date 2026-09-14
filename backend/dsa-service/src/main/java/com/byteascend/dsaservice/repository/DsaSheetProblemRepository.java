package com.byteascend.dsaservice.repository;

import com.byteascend.dsaservice.model.DsaSheetProblem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface DsaSheetProblemRepository extends JpaRepository<DsaSheetProblem, UUID> {
}

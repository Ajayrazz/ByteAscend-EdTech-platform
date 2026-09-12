package com.byteascend.lmsservice.repository;

import com.byteascend.lmsservice.model.MockTest;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface MockTestRepository extends JpaRepository<MockTest, UUID> {
}

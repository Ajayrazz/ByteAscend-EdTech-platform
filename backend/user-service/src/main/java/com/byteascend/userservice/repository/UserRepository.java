package com.byteascend.userservice.repository;

import com.byteascend.userservice.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);
    boolean existsByEmail(String email);
    
    java.util.List<User> findTop100ByOrderByTotalScoreDesc();
}

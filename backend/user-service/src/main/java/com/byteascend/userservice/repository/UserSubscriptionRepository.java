package com.byteascend.userservice.repository;

import com.byteascend.userservice.model.UserSubscription;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface UserSubscriptionRepository extends JpaRepository<UserSubscription, UUID> {
    
    List<UserSubscription> findByUserId(UUID userId);
    
    @Query("SELECT us FROM UserSubscription us WHERE us.user.id = :userId AND us.status = 'ACTIVE'")
    Optional<UserSubscription> findActiveSubscriptionByUserId(@Param("userId") UUID userId);
}

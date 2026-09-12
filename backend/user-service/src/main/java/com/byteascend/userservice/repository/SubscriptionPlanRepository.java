package com.byteascend.userservice.repository;

import com.byteascend.userservice.model.SubscriptionPlan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SubscriptionPlanRepository extends JpaRepository<SubscriptionPlan, Integer> {
    Optional<SubscriptionPlan> findByName(String name);
}

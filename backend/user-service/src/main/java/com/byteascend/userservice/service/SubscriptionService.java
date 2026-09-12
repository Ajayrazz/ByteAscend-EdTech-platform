package com.byteascend.userservice.service;

import com.byteascend.userservice.model.SubscriptionPlan;
import com.byteascend.userservice.model.UserSubscription;
import com.byteascend.userservice.repository.SubscriptionPlanRepository;
import com.byteascend.userservice.repository.UserSubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class SubscriptionService {

    @Autowired
    private SubscriptionPlanRepository planRepository;

    @Autowired
    private UserSubscriptionRepository userSubscriptionRepository;

    public List<SubscriptionPlan> getAllPlans() {
        return planRepository.findAll();
    }

    public Optional<UserSubscription> getActiveSubscription(UUID userId) {
        return userSubscriptionRepository.findActiveSubscriptionByUserId(userId);
    }
}

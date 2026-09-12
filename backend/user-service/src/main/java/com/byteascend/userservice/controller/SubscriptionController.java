package com.byteascend.userservice.controller;

import com.byteascend.userservice.model.SubscriptionPlan;
import com.byteascend.userservice.model.UserSubscription;
import com.byteascend.userservice.security.UserDetailsImpl;
import com.byteascend.userservice.service.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/subscriptions")
public class SubscriptionController {

    @Autowired
    private SubscriptionService subscriptionService;

    @GetMapping("/plans")
    public ResponseEntity<List<SubscriptionPlan>> getAllPlans() {
        return ResponseEntity.ok(subscriptionService.getAllPlans());
    }

    @GetMapping("/me/active")
    public ResponseEntity<?> getMyActiveSubscription() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        return subscriptionService.getActiveSubscription(userDetails.getId())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.noContent().build());
    }
}

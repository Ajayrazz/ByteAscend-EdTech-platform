package com.byteascend.userservice.event;

import com.byteascend.userservice.config.RabbitMQConfig;
import com.byteascend.userservice.model.Badge;
import com.byteascend.userservice.model.User;
import com.byteascend.userservice.model.UserBadge;
import com.byteascend.userservice.repository.BadgeRepository;
import com.byteascend.userservice.repository.UserBadgeRepository;
import com.byteascend.userservice.repository.UserRepository;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class ProblemSolvedConsumer {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BadgeRepository badgeRepository;

    @Autowired
    private UserBadgeRepository userBadgeRepository;

    @RabbitListener(queues = RabbitMQConfig.QUEUE_NAME)
    @Transactional
    public void handleProblemSolvedEvent(ProblemSolvedEvent event) {
        System.out.println("Received ProblemSolvedEvent for User: " + event.getUserId());

        Optional<User> userOpt = userRepository.findById(event.getUserId());
        if (userOpt.isEmpty())
            return;

        User user = userOpt.get();

        // 1. Update score
        int points = event.isPotd() ? 50 : 10;
        user.setTotalScore(user.getTotalScore() + points);
        System.out.println("Awarded " + points + " points. Is POTD: " + event.isPotd());

        // 2. Evaluate Badges
        // Badge 1: First Blood
        evaluateBadge(user, "First Blood");

        // Badge 2: Array Master (simplified condition: if score >= 100)
        if (user.getTotalScore() >= 100) {
            evaluateBadge(user, "Array Master");
        }

        userRepository.save(user);
    }

    private void evaluateBadge(User user, String badgeName) {
        badgeRepository.findByName(badgeName).ifPresent(badge -> {
            boolean alreadyEarned = userBadgeRepository.existsByUserIdAndBadgeId(user.getId(), badge.getId());
            if (!alreadyEarned) {
                UserBadge userBadge = new UserBadge();
                userBadge.setUser(user);
                userBadge.setBadge(badge);
                userBadgeRepository.save(userBadge);
                System.out.println("Awarded Badge: " + badgeName + " to User: " + user.getId());
            }
        });
    }
}

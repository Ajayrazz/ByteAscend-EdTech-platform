package com.byteascend.lmsservice.model;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "user_mock_attempts")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserMockAttempt {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "mock_test_id", nullable = false)
    private MockTest mockTest;

    @Column(nullable = false)
    private Integer score;

    @CreationTimestamp
    @Column(name = "completed_at", updatable = false)
    private LocalDateTime completedAt;
}

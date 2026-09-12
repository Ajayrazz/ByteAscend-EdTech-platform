package com.byteascend.lmsservice.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Entity
@Table(name = "mock_tests")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MockTest {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Column(name = "duration_minutes", nullable = false)
    private Integer durationMinutes;

    @Column(name = "is_premium")
    @Builder.Default
    private Boolean isPremium = false;
}

package com.byteascend.lmsservice.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "user_lesson_progress")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserLessonProgress {

    @EmbeddedId
    private UserLessonProgressId id;

    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("lessonId")
    @JoinColumn(name = "lesson_id")
    private Lesson lesson;

    @Column(nullable = false, length = 20)
    private String status; // UNSTARTED, IN_PROGRESS, COMPLETED

    @Column(name = "watch_time_seconds")
    @Builder.Default
    private Integer watchTimeSeconds = 0;
}

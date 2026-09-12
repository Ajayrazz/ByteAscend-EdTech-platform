package com.byteascend.lmsservice.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserLessonProgressId implements Serializable {

    @Column(name = "user_id")
    private UUID userId;

    @Column(name = "lesson_id")
    private UUID lessonId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserLessonProgressId that = (UserLessonProgressId) o;
        return Objects.equals(userId, that.userId) &&
               Objects.equals(lessonId, that.lessonId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, lessonId);
    }
}

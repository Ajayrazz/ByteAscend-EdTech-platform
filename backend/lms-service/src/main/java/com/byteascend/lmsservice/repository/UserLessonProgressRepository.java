package com.byteascend.lmsservice.repository;

import com.byteascend.lmsservice.model.UserLessonProgress;
import com.byteascend.lmsservice.model.UserLessonProgressId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.UUID;

public interface UserLessonProgressRepository extends JpaRepository<UserLessonProgress, UserLessonProgressId> {
    
    @Query("SELECT ulp FROM UserLessonProgress ulp WHERE ulp.id.userId = :userId AND ulp.lesson.module.course.id = :courseId")
    List<UserLessonProgress> findByUserIdAndCourseId(@Param("userId") UUID userId, @Param("courseId") UUID courseId);
}

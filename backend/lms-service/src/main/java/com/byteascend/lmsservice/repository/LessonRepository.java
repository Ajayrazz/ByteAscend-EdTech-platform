package com.byteascend.lmsservice.repository;

import com.byteascend.lmsservice.model.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface LessonRepository extends JpaRepository<Lesson, UUID> {
    List<Lesson> findByModuleIdOrderByOrderIndexAsc(UUID moduleId);
}

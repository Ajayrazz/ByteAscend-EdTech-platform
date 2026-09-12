package com.byteascend.lmsservice.service;

import com.byteascend.lmsservice.model.Lesson;
import com.byteascend.lmsservice.model.UserLessonProgress;
import com.byteascend.lmsservice.model.UserLessonProgressId;
import com.byteascend.lmsservice.repository.LessonRepository;
import com.byteascend.lmsservice.repository.UserLessonProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ProgressService {

    @Autowired
    private UserLessonProgressRepository progressRepository;

    @Autowired
    private LessonRepository lessonRepository;

    public List<UserLessonProgress> getProgressForCourse(UUID userId, UUID courseId) {
        return progressRepository.findByUserIdAndCourseId(userId, courseId);
    }

    public UserLessonProgress updateProgress(UUID userId, UUID lessonId, String status, Integer watchTime) {
        UserLessonProgressId id = new UserLessonProgressId(userId, lessonId);
        
        UserLessonProgress progress = progressRepository.findById(id).orElseGet(() -> {
            Lesson lesson = lessonRepository.findById(lessonId)
                    .orElseThrow(() -> new RuntimeException("Lesson not found"));
            
            return UserLessonProgress.builder()
                    .id(id)
                    .lesson(lesson)
                    .build();
        });

        progress.setStatus(status);
        if (watchTime != null) {
            progress.setWatchTimeSeconds(watchTime);
        }

        return progressRepository.save(progress);
    }
}

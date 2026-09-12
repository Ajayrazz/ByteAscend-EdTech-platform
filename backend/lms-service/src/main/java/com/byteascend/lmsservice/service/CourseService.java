package com.byteascend.lmsservice.service;

import com.byteascend.lmsservice.model.Course;
import com.byteascend.lmsservice.model.Lesson;
import com.byteascend.lmsservice.model.Module;
import com.byteascend.lmsservice.repository.CourseRepository;
import com.byteascend.lmsservice.repository.LessonRepository;
import com.byteascend.lmsservice.repository.ModuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private ModuleRepository moduleRepository;

    @Autowired
    private LessonRepository lessonRepository;

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Course getCourseById(UUID id) {
        return courseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Course not found"));
    }

    public List<Module> getModulesForCourse(UUID courseId) {
        return moduleRepository.findByCourseIdOrderByOrderIndexAsc(courseId);
    }

    public List<Lesson> getLessonsForModule(UUID moduleId) {
        return lessonRepository.findByModuleIdOrderByOrderIndexAsc(moduleId);
    }

    public Lesson getLessonById(UUID id) {
        return lessonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lesson not found"));
    }
}

package com.byteascend.lmsservice.controller;

import com.byteascend.lmsservice.model.Course;
import com.byteascend.lmsservice.model.Lesson;
import com.byteascend.lmsservice.model.Module;
import com.byteascend.lmsservice.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/v1/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @GetMapping("/public")
    public ResponseEntity<List<Course>> getAllCourses() {
        return ResponseEntity.ok(courseService.getAllCourses());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Course> getCourseById(@PathVariable UUID id) {
        return ResponseEntity.ok(courseService.getCourseById(id));
    }

    @GetMapping("/{courseId}/modules")
    public ResponseEntity<List<Module>> getModulesForCourse(@PathVariable UUID courseId) {
        return ResponseEntity.ok(courseService.getModulesForCourse(courseId));
    }

    @GetMapping("/modules/{moduleId}/lessons")
    public ResponseEntity<List<Lesson>> getLessonsForModule(@PathVariable UUID moduleId) {
        return ResponseEntity.ok(courseService.getLessonsForModule(moduleId));
    }

    @GetMapping("/lessons/{lessonId}")
    public ResponseEntity<Lesson> getLessonById(@PathVariable UUID lessonId) {
        return ResponseEntity.ok(courseService.getLessonById(lessonId));
    }
}

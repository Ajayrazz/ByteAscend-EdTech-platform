package com.byteascend.lmsservice.repository;

import com.byteascend.lmsservice.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface CourseRepository extends JpaRepository<Course, UUID> {
}

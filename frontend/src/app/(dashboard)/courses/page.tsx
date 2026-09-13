import React from "react";
import CourseCard from "@/components/courses/CourseCard";
import { mockCourses } from "@/lib/data/courses";

export default function CoursesPage() {
  return (
    <div className="p-6 md:p-8 max-w-[1600px] mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Courses</h1>
        <p className="text-slate-400">Explore our courses and find the perfect one for you.</p>
      </div>

      <div className="flex items-center gap-4 mb-8">
        <button className="px-4 py-2 rounded-full text-sm font-medium text-slate-400 hover:text-white transition-colors">
          Continue Watching
        </button>
        <button className="px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium border border-white/10">
          Buy Courses
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {mockCourses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

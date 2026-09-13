import React from "react";
import { mockCourses, defaultSyllabus } from "@/lib/data/courses";
import { notFound } from "next/navigation";
import { Clock, Layers, ArrowLeft, Star, Users, Code2 } from "lucide-react";
import Link from "next/link";
import CourseSyllabus from "@/components/courses/CourseSyllabus";
import { cn } from "@/lib/utils";

export default function CourseDetailsPage({ params }: { params: { id: string } }) {
  const course = mockCourses.find(c => c.id === params.id);
  
  if (!course) {
    notFound();
  }

  const syllabus = course.modules || defaultSyllabus;

  // Map gradients to ensure Tailwind JIT compilation
  const gradientMap: Record<string, string> = {
    "1": "from-red-500 to-rose-600",
    "2": "from-blue-500 to-indigo-600",
    "3": "from-emerald-400 to-teal-500",
    "4": "from-blue-400 to-cyan-500",
    "5": "from-orange-400 to-red-500",
    "6": "from-violet-600 to-purple-800",
    "7": "from-violet-600 to-purple-800",
    "8": "from-violet-600 to-purple-800",
    "9": "from-violet-600 to-purple-800",
    "10": "from-violet-600 to-purple-800",
  };

  const bgClass = gradientMap[course.id] || "from-slate-600 to-slate-800";

  return (
    <div className="flex-1 overflow-y-auto bg-[#0A1220] min-h-screen">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-10 relative">
        <Link href="/courses" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 font-medium text-sm">
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </Link>
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          
          {/* Main Left Content */}
          <div className="flex-1">
            {/* Hero Headers */}
            <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
              {course.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1">
                4.9 <Star className="w-3 h-3 fill-amber-400" /> (2,140 Ratings)
              </span>
              <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1">
                <Users className="w-3 h-3" /> 14,500+ students
              </span>
              <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1">
                <Clock className="w-3 h-3" /> {course.durationHours} Hours
              </span>
              <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-xs font-semibold flex items-center gap-1">
                <Layers className="w-3 h-3" /> {course.sectionsCount} Sections
              </span>
            </div>

            <p className="text-[15px] text-slate-300 leading-relaxed mb-12">
              {course.description}
            </p>

            {/* What you'll learn */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-white mb-3">What you'll learn</h2>
              <p className="text-slate-400 text-sm mb-6">
                Discover the key skills and concepts you'll master in this course to advance your programming expertise.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "Master problem-solving techniques for top tech companies",
                  "Build a strong foundation in core programming concepts",
                  "Crack coding interviews with optimized solutions",
                  "Understand complex data structures inside out",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 w-5 h-5 rounded-full bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                    </div>
                    <span className="text-sm text-slate-300 leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Course Content */}
            <div className="mb-16">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Course Content</h2>
              </div>
              <CourseSyllabus modules={syllabus} />
            </div>

            {/* Instructors */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-6">Our Instructors</h2>
              <div className="glass border border-white/10 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-start">
                <div className="w-24 h-24 rounded-2xl bg-slate-800 flex-shrink-0 overflow-hidden relative border border-white/10">
                  <img 
                    src="/mentor.jpg" 
                    alt="Ajay Razz" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-white">Ajay Razz</h3>
                    <span className="bg-indigo-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                      Founder
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 mb-4">
                    Previously worked at <span className="text-white font-semibold">Amazon</span> and <span className="text-white font-semibold">Microsoft</span>.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-1 flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-cyan-400" /> Software Engineer
                      </h4>
                      <p className="text-xs text-slate-400">Known for expertise in coding and software engineering.</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-1 flex items-center gap-2">
                        <Star className="w-4 h-4 text-amber-400" /> Proven Impact
                      </h4>
                      <p className="text-xs text-slate-400">Mentored thousands of students in tech career growth.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Enrollment Card - Right Side */}
          <div className="w-full lg:w-[380px] flex-shrink-0">
            <div className="glass bg-[#0F172A] border border-white/10 rounded-2xl overflow-hidden sticky top-24 shadow-2xl">
              {/* Course Thumbnail Image Area */}
              <div className={cn("w-full h-56 relative flex items-center justify-center bg-gradient-to-br", bgClass)}>
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                <course.icon className="w-16 h-16 text-white drop-shadow-md relative z-10" />
                
                {/* Live Badge overlay */}
                <div className="absolute top-4 left-4 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg uppercase tracking-wider flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                  LIVE
                </div>
              </div>

              {/* Pricing & Actions */}
              <div className="p-6">
                {course.isSubscriptionOnly ? (
                  <div className="text-center mb-6">
                    <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                      Subscription Only
                    </span>
                    <p className="text-xs text-slate-400 mt-2">Requires active ByteAscend Pro</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center mb-6">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl font-extrabold text-white">
                        ₹{course.discountedPrice?.toLocaleString() ?? course.originalPrice?.toLocaleString()}
                      </span>
                      {course.originalPrice && course.discountedPrice && course.originalPrice !== course.discountedPrice && (
                        <div className="flex flex-col items-start">
                          <span className="text-sm text-slate-400 line-through font-medium leading-none">
                            ₹{course.originalPrice.toLocaleString()}
                          </span>
                          <span className="text-[10px] text-emerald-400 font-bold mt-1 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                            {Math.round(((course.originalPrice - course.discountedPrice) / course.originalPrice) * 100)}% OFF
                          </span>
                        </div>
                      )}
                    </div>
                    {course.originalPrice && course.discountedPrice && course.originalPrice !== course.discountedPrice && (
                      <span className="text-[11px] text-slate-500 mt-2 font-medium">
                        (Included in subscription)
                      </span>
                    )}
                  </div>
                )}

                <button className="w-full py-3.5 rounded-xl text-[15px] font-bold bg-indigo-500 hover:bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 transition-all">
                  {course.isSubscriptionOnly ? "Unlock with Pro" : "Buy Course"}
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

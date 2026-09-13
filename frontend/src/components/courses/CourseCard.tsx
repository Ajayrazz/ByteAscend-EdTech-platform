import React from "react";
import Link from "next/link";
import { Course } from "@/lib/data/courses";
import { Clock, Layers } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CourseCard({ course }: { course: Course }) {
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
    <div className="glass rounded-2xl overflow-hidden flex flex-col group hover:-translate-y-1.5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300 border border-white/10 relative">
      
      {/* Course Image / Banner placeholder */}
      <div className={cn("h-44 w-full relative flex items-center justify-center bg-gradient-to-br overflow-hidden", bgClass)}>
        {/* Decorative pattern overlay */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-white/20 blur-2xl rounded-full"></div>
        
        <course.icon className="w-16 h-16 text-white relative z-10 group-hover:scale-110 drop-shadow-lg transition-transform duration-500" strokeWidth={1.5} />
      </div>

      {/* Course Details */}
      <div className="p-5 flex flex-col flex-1 bg-[#0A1220]/95 backdrop-blur-md">
        <h3 className="text-white font-bold text-[17px] leading-snug line-clamp-2 mb-2 group-hover:text-cyan-400 transition-colors">
          {course.title}
        </h3>
        <p className="text-slate-400 text-[13px] leading-relaxed line-clamp-2 mb-5 flex-1">
          {course.description}
        </p>

        {/* Stats */}
        <div className="flex items-center gap-2 mb-5">
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/5 px-2.5 py-1 rounded-md text-[11px] font-medium text-slate-300">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            {course.durationHours} Hours
          </div>
          <div className="flex items-center gap-1.5 bg-white/5 border border-white/5 px-2.5 py-1 rounded-md text-[11px] font-medium text-slate-300">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            {course.sectionsCount} Sections
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-5"></div>

        {/* Price & Actions */}
        <div className="flex flex-col gap-4 mt-auto">
          {/* Price */}
          <div className="flex items-baseline gap-2">
            {course.isSubscriptionOnly ? (
              <span className="text-[15px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">
                Subscription Only
              </span>
            ) : (
              <>
                <span className="text-2xl font-extrabold text-white tracking-tight">
                  ₹{course.discountedPrice?.toLocaleString() ?? course.originalPrice?.toLocaleString()}
                </span>
                {course.originalPrice && course.discountedPrice && course.originalPrice !== course.discountedPrice && (
                  <span className="text-sm text-slate-500 font-medium line-through">
                    ₹{course.originalPrice.toLocaleString()}
                  </span>
                )}
              </>
            )}
          </div>
          
          {/* Buttons */}
          <div className="flex items-center gap-3">
            <Link href={`/courses/${course.id}`} className="flex-1 text-center px-4 py-2.5 rounded-xl text-sm font-semibold border border-white/10 bg-white/5 text-white hover:bg-white/10 hover:border-white/20 transition-all">
              Preview
            </Link>
            {!course.isSubscriptionOnly && (
              <button className="flex-1 px-4 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)] hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] hover:-translate-y-0.5 transition-all">
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

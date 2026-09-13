"use client";

import React, { useState } from "react";
import { CourseModule } from "@/lib/data/courses";
import { PlayCircle, FileText, HelpCircle, Lock, ChevronDown, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CourseSyllabus({ modules }: { modules: CourseModule[] }) {
  const [openModuleId, setOpenModuleId] = useState<string | null>(null);

  const toggleModule = (id: string) => {
    setOpenModuleId(openModuleId === id ? null : id);
  };

  const getIcon = (type: string, isLocked?: boolean) => {
    if (isLocked) return <Lock className="w-4 h-4 text-slate-500" />;
    switch (type) {
      case "video": return <PlayCircle className="w-4 h-4 text-cyan-400" />;
      case "note": return <FileText className="w-4 h-4 text-emerald-400" />;
      case "quiz": return <HelpCircle className="w-4 h-4 text-violet-400" />;
      default: return <PlayCircle className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="space-y-4">
      {modules.map((module) => (
        <div key={module.id} className="glass border border-white/10 rounded-xl overflow-hidden">
          <button
            onClick={() => toggleModule(module.id)}
            className="w-full flex items-center justify-between p-5 bg-white/5 hover:bg-white/10 transition-colors text-left"
          >
            <div>
              <h3 className="font-bold text-white text-lg">{module.title}</h3>
              <p className="text-slate-400 text-sm mt-1">{module.lessons.length} Lessons</p>
            </div>
            <ChevronDown
              className={cn("w-5 h-5 text-slate-400 transition-transform duration-300", 
                openModuleId === module.id ? "rotate-180" : ""
              )}
            />
          </button>
          
          <div
            className={cn(
              "overflow-hidden transition-all duration-300 ease-in-out",
              openModuleId === module.id ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <div className="p-3 space-y-1">
              {module.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  className={cn(
                    "flex items-center justify-between p-3 rounded-lg transition-colors",
                    lesson.isLocked ? "bg-transparent opacity-70" : "hover:bg-white/5 cursor-pointer group"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-white/5">
                      {getIcon(lesson.type, lesson.isLocked)}
                    </div>
                    <span className={cn(
                      "font-medium text-sm",
                      lesson.isLocked ? "text-slate-400" : "text-slate-200 group-hover:text-white"
                    )}>
                      {lesson.title}
                    </span>
                  </div>
                  {lesson.duration && (
                    <span className="text-xs font-medium text-slate-500">
                      {lesson.duration}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

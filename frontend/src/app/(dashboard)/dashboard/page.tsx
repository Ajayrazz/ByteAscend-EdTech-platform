import React from "react";
import { PlayCircle, Trophy, Target, ArrowRight } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl glass-card p-8 border-cyan-500/20">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="relative z-10">
          <h2 className="text-2xl sm:text-3xl font-outfit font-bold text-white mb-2">
            Ready to crush your next interview? 🚀
          </h2>
          <p className="text-slate-400 max-w-2xl">
            Pick up where you left off in your DSA course and keep your streak alive. Consistency is key!
          </p>
          <button className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold transition-all hover:shadow-[0_0_20px_rgba(0,204,204,0.4)]">
            <PlayCircle className="w-5 h-5" />
            Resume Learning
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Course Progress Card */}
        <div className="md:col-span-2 glass-card p-6 border-white/10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-cyan-400" />
              Current Course Focus
            </h3>
            <button className="text-sm text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition-colors">
              View all <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex flex-col sm:flex-row gap-4 sm:items-center">
            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-cyan-500/20 to-emerald-500/20 flex items-center justify-center border border-white/10 shrink-0">
              <CodeIcon />
            </div>
            <div className="flex-1">
              <h4 className="text-white font-medium">Advanced Data Structures & Algorithms</h4>
              <p className="text-sm text-slate-400 mt-1">Module 4: Dynamic Programming • 3/10 Lessons</p>
              
              <div className="mt-3 flex items-center gap-3">
                <div className="flex-1 h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 w-[30%]" />
                </div>
                <span className="text-xs font-medium text-cyan-400">30%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Card */}
        <div className="glass-card p-6 border-white/10">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2 mb-6">
            <Trophy className="w-5 h-5 text-yellow-400" />
            Your Performance
          </h3>
          
          <div className="space-y-4">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex justify-between items-center">
              <span className="text-slate-400 text-sm">Problems Solved</span>
              <span className="text-white font-semibold">142</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex justify-between items-center">
              <span className="text-slate-400 text-sm">Mock Test Avg</span>
              <span className="text-white font-semibold">86%</span>
            </div>
            <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex justify-between items-center">
              <span className="text-slate-400 text-sm">Global Rank</span>
              <span className="text-emerald-400 font-semibold">#1,204</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CodeIcon() {
  return (
    <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  );
}

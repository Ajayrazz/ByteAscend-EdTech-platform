"use client";
import { useStatsStore } from "@/lib/store/useStatsStore";

export default function CircularProgressWidget() {
  const { totalSolved, easySolved, mediumSolved, hardSolved } = useStatsStore();
  const totalProblems = 193; // Hardcoded for now based on current sheet
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const percent = totalSolved / totalProblems;
  const offset = circumference - percent * circumference;

  return (
    <div className="glass-card p-6 border-white/5 rounded-2xl flex flex-col items-center justify-between h-full hover:border-white/10 transition-colors">
      <div className="relative w-40 h-40 flex items-center justify-center mb-6 mt-2">
        {/* Background Circle */}
        <svg className="absolute w-full h-full transform -rotate-90">
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-slate-800"
          />
          {/* Progress Circle */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute flex flex-col items-center justify-center text-center">
          <span className="text-3xl font-outfit font-bold text-white leading-none">{totalSolved}</span>
          <span className="text-[10px] text-slate-400 border-t border-white/10 pt-1 mt-1 w-12">/{totalProblems}</span>
          <span className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-semibold">Solved</span>
        </div>
      </div>

      <div className="flex w-full justify-between gap-2 px-2 mt-auto">
        <div className="flex flex-col items-center bg-emerald-500/5 border border-emerald-500/10 rounded-xl py-2 px-3 flex-1 hover:bg-emerald-500/10 transition-colors cursor-default">
          <span className="text-[10px] text-emerald-400 uppercase tracking-wider font-semibold mb-1">Easy</span>
          <span className="text-sm font-bold text-white">{easySolved}</span>
        </div>
        <div className="flex flex-col items-center bg-yellow-500/5 border border-yellow-500/10 rounded-xl py-2 px-3 flex-1 hover:bg-yellow-500/10 transition-colors cursor-default">
          <span className="text-[10px] text-yellow-400 uppercase tracking-wider font-semibold mb-1">Med</span>
          <span className="text-sm font-bold text-white">{mediumSolved}</span>
        </div>
        <div className="flex flex-col items-center bg-red-500/5 border border-red-500/10 rounded-xl py-2 px-3 flex-1 hover:bg-red-500/10 transition-colors cursor-default">
          <span className="text-[10px] text-red-400 uppercase tracking-wider font-semibold mb-1">Hard</span>
          <span className="text-sm font-bold text-white">{hardSolved}</span>
        </div>
      </div>
    </div>
  );
}

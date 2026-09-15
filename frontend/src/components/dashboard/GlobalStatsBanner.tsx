"use client";
import { useStatsStore } from "@/lib/store/useStatsStore";
import { Trophy, Coins, Flame, Star } from "lucide-react";

export default function GlobalStatsBanner() {
  const { globalRank, totalPoints, currentStreak } = useStatsStore();

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {/* Rank */}
      <div className="glass-card p-5 border-white/5 rounded-2xl flex flex-col justify-between h-32 hover:border-cyan-500/30 transition-colors group">
        <div className="flex items-center gap-2 text-slate-400">
          <Trophy className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium">Platform Rank</span>
        </div>
        <div className="text-3xl font-outfit font-bold text-white">
          #{globalRank || '-'}
        </div>
        <div className="text-xs text-emerald-500/70">Keep climbing!</div>
      </div>

      {/* Score */}
      <div className="glass-card p-5 border-white/5 rounded-2xl flex flex-col justify-between h-32 hover:border-yellow-500/30 transition-colors group">
        <div className="flex items-center gap-2 text-slate-400">
          <Coins className="w-4 h-4 text-yellow-400 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium">Platform Score</span>
        </div>
        <div className="text-3xl font-outfit font-bold text-white">
          {totalPoints}
        </div>
        <div className="text-xs text-yellow-500/70">Total coins earned</div>
      </div>

      {/* Streak */}
      <div className="glass-card p-5 border-white/5 rounded-2xl flex flex-col justify-between h-32 hover:border-orange-500/30 transition-colors group">
        <div className="flex items-center gap-2 text-slate-400">
          <Flame className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium">Platform Streak</span>
        </div>
        <div className="text-3xl font-outfit font-bold text-white">
          {currentStreak}
        </div>
        <div className="text-xs text-orange-500/70">days</div>
      </div>

      {/* Daily Challenge */}
      <div className="glass-card p-5 border-white/5 rounded-2xl flex flex-col justify-between h-32 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/5 opacity-50"></div>
        <div className="flex items-center gap-2 text-slate-400 z-10">
          <Star className="w-4 h-4 text-indigo-400 group-hover:scale-110 transition-transform" />
          <span className="text-sm font-medium">Daily Challenge</span>
        </div>
        <div className="text-2xl font-outfit font-bold text-indigo-300 z-10 opacity-70">
          Coming Soon
        </div>
        <div className="text-xs text-indigo-400/50 z-10">Stay tuned</div>
      </div>
    </div>
  );
}

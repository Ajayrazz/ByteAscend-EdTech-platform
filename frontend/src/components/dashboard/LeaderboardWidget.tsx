"use client";
import { useStatsStore } from "@/lib/store/useStatsStore";
import { useEffect } from "react";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { Trophy } from "lucide-react";

export default function LeaderboardWidget() {
  const { leaderboard, fetchLeaderboard } = useStatsStore();
  const { user } = useAuthStore();

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  return (
    <div className="glass-card p-6 border-white/5 rounded-2xl h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Top Rankers</h3>
          <p className="text-xs text-slate-400 mt-1">Global Leaderboard</p>
        </div>
        <button className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
          See All
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar -mr-2 pr-2 space-y-2">
        {leaderboard.map((u, i) => {
          const isCurrentUser = user?.id === u.userId;
          return (
            <div 
              key={u.userId} 
              className={`flex items-center justify-between p-3 rounded-xl border ${
                isCurrentUser 
                  ? "bg-cyan-500/10 border-cyan-500/30" 
                  : "bg-white/5 border-transparent hover:bg-white/10"
              } transition-colors`}
            >
              <div className="flex items-center gap-4">
                <div className={`w-6 flex items-center justify-center text-center font-bold font-outfit ${
                  i === 0 ? "text-yellow-400" : 
                  i === 1 ? "text-slate-300" : 
                  i === 2 ? "text-orange-400" : "text-slate-500"
                }`}>
                  {i < 3 ? <Trophy className="w-5 h-5" /> : `#${u.rank}`}
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white uppercase shadow-inner">
                    {u.name.substring(u.name.length - 2)}
                  </div>
                  <span className={`text-sm font-medium ${isCurrentUser ? "text-cyan-400" : "text-slate-200"}`}>
                    {isCurrentUser ? "You" : u.name}
                  </span>
                </div>
              </div>
              
              <div className="text-sm font-bold text-white font-outfit">
                {u.points}
              </div>
            </div>
          );
        })}
        {leaderboard.length === 0 && (
          <div className="text-center text-slate-500 py-8 text-sm">
            No rankings yet. Start solving!
          </div>
        )}
      </div>
    </div>
  );
}

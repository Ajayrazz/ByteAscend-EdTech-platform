"use client";
import { useStatsStore } from "@/lib/store/useStatsStore";
import { useEffect } from "react";
import { CheckCircle2, Clock } from "lucide-react";
import Link from "next/link";

export default function RecentActivityWidget() {
  const { recentActivities, fetchRecentActivities } = useStatsStore();

  useEffect(() => {
    fetchRecentActivities();
  }, [fetchRecentActivities]);

  return (
    <div className="glass-card p-6 border-white/5 rounded-2xl h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Recent Activities</h3>
          <p className="text-xs text-slate-400 mt-1">Your latest submissions</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar -mr-2 pr-2 space-y-4">
        {recentActivities.map((act) => {
          const date = new Date(act.completedAt);
          const timeString = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
          
          return (
            <Link 
              key={act.problemId} 
              href={`/dsa/practice/${act.problemId}`}
              className="flex items-start gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-transparent hover:border-white/5 group"
            >
              <div className="mt-1 bg-emerald-500/20 p-1.5 rounded-full text-emerald-400 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-medium text-slate-200 group-hover:text-cyan-400 transition-colors line-clamp-1">{act.title}</h4>
                </div>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md ${
                    act.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-400' :
                    act.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-400' :
                    'bg-red-500/10 text-red-400'
                  }`}>
                    {act.difficulty}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] text-slate-500">
                    <Clock className="w-3 h-3" />
                    <span>{timeString}</span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
        {recentActivities.length === 0 && (
          <div className="text-center text-slate-500 py-8 text-sm h-full flex flex-col items-center justify-center">
            <Clock className="w-8 h-8 opacity-20 mb-3" />
            No recent activity.<br/>Start learning to see history here!
          </div>
        )}
      </div>
    </div>
  );
}

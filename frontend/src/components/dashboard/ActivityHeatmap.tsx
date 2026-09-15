"use client";
import { useStatsStore } from "@/lib/store/useStatsStore";
import { useMemo } from "react";

export default function ActivityHeatmap() {
  const { submissionDates } = useStatsStore();

  const heatmap = useMemo(() => {
    const today = new Date();
    today.setHours(0,0,0,0);
    const cells = [];
    
    // We generate a 25 week layout (25 * 7 = 175 days approx) to fit perfectly
    for (let i = 175; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const count = submissionDates.filter(s => s === dateStr).length;
      
      let colorClass = "bg-white/5";
      if (count === 1) colorClass = "bg-emerald-500/20";
      else if (count === 2) colorClass = "bg-emerald-500/50";
      else if (count === 3) colorClass = "bg-emerald-500/80";
      else if (count > 3) colorClass = "bg-emerald-400";

      cells.push(
        <div 
          key={dateStr} 
          className={`w-[10px] h-[10px] rounded-[2px] ${colorClass} hover:ring-1 hover:ring-white transition-all cursor-pointer`}
          title={`${count} submissions on ${dateStr}`}
        />
      );
    }
    return cells;
  }, [submissionDates]);

  return (
    <div className="glass-card p-6 border-white/5 rounded-2xl h-full flex flex-col">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">Activity</h3>
          <p className="text-xs text-slate-400 mt-1">Past 175 days</p>
        </div>
        <div className="text-2xl font-outfit font-bold text-white">
          {submissionDates.length} <span className="text-sm font-normal text-slate-400">submissions</span>
        </div>
      </div>
      
      <div className="flex-1 flex flex-col justify-end overflow-hidden">
        {/* Force flex column layout with 7 rows wrapping to columns */}
        <div className="flex flex-col flex-wrap content-end gap-[3px] h-[95px] overflow-x-hidden">
          {heatmap}
        </div>
      </div>
      
      <div className="flex items-center justify-end gap-1.5 text-[10px] text-slate-400 mt-4">
        <span>Less</span>
        <div className="w-[10px] h-[10px] rounded-[2px] bg-white/5"></div>
        <div className="w-[10px] h-[10px] rounded-[2px] bg-emerald-500/20"></div>
        <div className="w-[10px] h-[10px] rounded-[2px] bg-emerald-500/50"></div>
        <div className="w-[10px] h-[10px] rounded-[2px] bg-emerald-500/80"></div>
        <div className="w-[10px] h-[10px] rounded-[2px] bg-emerald-400"></div>
        <span>More</span>
      </div>
    </div>
  );
}

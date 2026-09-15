"use client";

import React from "react";
import GlobalStatsBanner from "@/components/dashboard/GlobalStatsBanner";
import CircularProgressWidget from "@/components/dashboard/CircularProgressWidget";
import ActivityHeatmap from "@/components/dashboard/ActivityHeatmap";
import LeaderboardWidget from "@/components/dashboard/LeaderboardWidget";
import RecentActivityWidget from "@/components/dashboard/RecentActivityWidget";

export default function DashboardPage() {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* Top Banner Stats */}
      <GlobalStatsBanner />

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* Left Column (Main Content) */}
        <div className="xl:col-span-8 space-y-6">
          
          {/* Progress & Heatmap Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:h-[280px]">
            <CircularProgressWidget />
            <ActivityHeatmap />
          </div>

          {/* Leaderboard Row */}
          <div className="h-[400px]">
            <LeaderboardWidget />
          </div>

        </div>

        {/* Right Column (Sidebar) */}
        <div className="xl:col-span-4 space-y-6 flex flex-col">
          <div className="md:h-[280px] xl:h-[280px]">
             {/* Small Promo Widget */}
             <div className="glass-card p-6 border-white/5 rounded-2xl h-full flex flex-col justify-center items-center text-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent"></div>
               <div className="w-16 h-16 bg-cyan-500/20 rounded-full flex items-center justify-center mb-4 text-cyan-400 group-hover:scale-110 transition-transform">
                 <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
               </div>
               <h3 className="text-lg font-bold text-white mb-2 z-10">ByteAscend Pro</h3>
               <p className="text-sm text-slate-400 z-10 mb-4 px-4">Unlock premium mock tests and company-specific sheets.</p>
               <button className="px-5 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-semibold text-white transition-colors z-10">
                 Upgrade Now
               </button>
             </div>
          </div>
          
          <div className="h-[400px]">
            <RecentActivityWidget />
          </div>
        </div>

      </div>
    </div>
  );
}


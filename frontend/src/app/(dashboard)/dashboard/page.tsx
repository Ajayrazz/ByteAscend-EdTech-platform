"use client";

import React from "react";
import GlobalStatsBanner from "@/components/dashboard/GlobalStatsBanner";
import CircularProgressWidget from "@/components/dashboard/CircularProgressWidget";
import ActivityHeatmap from "@/components/dashboard/ActivityHeatmap";
import LeaderboardWidget from "@/components/dashboard/LeaderboardWidget";
import RecentActivityWidget from "@/components/dashboard/RecentActivityWidget";
import PotdWidget from "@/components/dashboard/PotdWidget";

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
             {/* POTD Widget */}
             <PotdWidget />
          </div>
          
          <div className="h-[400px]">
            <RecentActivityWidget />
          </div>
        </div>

      </div>
    </div>
  );
}


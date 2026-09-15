"use client";

import React, { useEffect } from "react";
import { Bell, Flame, Coins, Menu } from "lucide-react";
import Link from 'next/link';
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useUIStore } from "@/lib/store/useUIStore";
import { useStatsStore } from "@/lib/store/useStatsStore";

export default function TopBar() {
  const user = useAuthStore(state => state.user);
  const isAuthenticated = useAuthStore(state => !!state.token);
  const toggleMobileMenu = useUIStore((state) => state.toggleMobileMenu);
  const { currentStreak, totalPoints, fetchStats } = useStatsStore();

  useEffect(() => {
    if (isAuthenticated) {
      fetchStats();
    }
  }, [isAuthenticated, fetchStats]);

  return (
    <header className="h-16 border-b border-white/5 glass sticky top-0 z-10 flex items-center justify-between px-4 sm:px-8">
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden text-slate-400 hover:text-white transition-colors p-1 -ml-1 rounded-md hover:bg-white/5"
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-semibold text-white hidden sm:block">
          Welcome back, {user?.nickname || user?.fullName?.split(" ")[0] || "Student"}! 🚀
        </h1>
      </div>

      <div className="flex items-center gap-4 sm:gap-6">
        <div className="hidden sm:flex items-center gap-4">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium">
            <Flame className="w-4 h-4" />
            <span>{currentStreak} Day Streak</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium">
            <Coins className="w-4 h-4" />
            <span>{totalPoints} Points</span>
          </div>
        </div>

        <button className="relative p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/5">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[#070B14]"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <Link href="/profile" className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
            <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold border border-indigo-500/30 overflow-hidden">
              {user?.profilePictureUrl ? (
                <img src={user.profilePictureUrl} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                (user?.fullName || user?.nickname || "U").substring(0, 2).toUpperCase()
              )}
            </div>
            <span className="font-medium hidden sm:block">{user?.fullName?.split(" ")[0] || user?.nickname || "User"}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

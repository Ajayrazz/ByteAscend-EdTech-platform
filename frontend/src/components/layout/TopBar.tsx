"use client";

import React from "react";
import { Bell, Flame, Coins, Menu } from "lucide-react";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useUIStore } from "@/lib/store/useUIStore";

export default function TopBar() {
  const user = useAuthStore((state) => state.user);
  const toggleMobileMenu = useUIStore((state) => state.toggleMobileMenu);

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
            <span>0 Day Streak</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium">
            <Coins className="w-4 h-4" />
            <span>0 Points</span>
          </div>
        </div>

        <button className="relative p-2 text-slate-400 hover:text-white transition-colors rounded-full hover:bg-white/5">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-[#070B14]"></span>
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-500 p-[2px]">
            <div className="w-full h-full rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-sm font-bold text-white uppercase">
              {(user?.nickname || user?.fullName || "U").charAt(0)}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

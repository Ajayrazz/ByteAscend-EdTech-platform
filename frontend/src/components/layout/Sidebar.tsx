"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { 
  LayoutDashboard, 
  BookOpen, 
  Code2, 
  FileCheck2, 
  Users, 
  Trophy,
  Settings,
  LogOut
} from "lucide-react";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useUIStore } from "@/lib/store/useUIStore";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "Courses", href: "/courses", icon: BookOpen },
  { name: "DSA Practice", href: "/dsa", icon: Code2 },
  { name: "Mock Tests", href: "/mock-tests", icon: FileCheck2 },
  { name: "Community", href: "/community", icon: Users },
  { name: "Leaderboard", href: "/leaderboard", icon: Trophy },
];

export default function Sidebar() {
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);
  const isMobileMenuOpen = useUIStore((state) => state.isMobileMenuOpen);
  const closeMobileMenu = useUIStore((state) => state.closeMobileMenu);

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "w-64 h-screen fixed left-0 top-0 glass border-r border-white/5 flex flex-col pt-2 z-40 transition-transform duration-300 ease-in-out md:translate-x-0 bg-[#0A1220]",
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-20 flex items-center px-6 border-b border-white/5 py-4">
          <Link href="/" onClick={closeMobileMenu} className="flex items-center group relative w-[140px] h-[40px]">
            <Image 
              src="/logo.png" 
              alt="ByteAscend Logo" 
              fill
              sizes="140px"
              className="object-contain object-left group-hover:scale-105 transition-transform mix-blend-screen"
            />
          </Link>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeMobileMenu}
                className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group",
                isActive 
                  ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/20 shadow-[0_0_15px_rgba(0,204,204,0.1)]" 
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn("w-5 h-5", isActive ? "text-cyan-400" : "text-slate-500 group-hover:text-slate-300")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/5 space-y-1">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all group"
        >
          <Settings className="w-5 h-5 text-slate-500 group-hover:text-slate-300" />
          Settings
        </Link>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all group"
        >
          <LogOut className="w-5 h-5 text-slate-500 group-hover:text-red-400" />
          Sign out
        </button>
      </div>
    </div>
    </>
  );
}

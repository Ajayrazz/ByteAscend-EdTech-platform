"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Code2, Sun } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, token } = useAuthStore();
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b-0 border-white/5"
    >
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-cyan-500 to-emerald-500 p-2 rounded-xl text-white shadow-lg group-hover:scale-105 transition-transform">
            <Code2 size={24} strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-outfit font-bold tracking-tight text-white">
            Byte<span className="text-cyan-400">Ascend</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link href="#courses" className="hover:text-cyan-400 transition-colors">
            Courses
          </Link>
          <Link href="#explore" className="hover:text-cyan-400 transition-colors">
            Explore
          </Link>
          <Link href="#practice" className="hover:text-cyan-400 transition-colors">
            Practice
          </Link>
          <Link href="#pricing" className="hover:text-cyan-400 transition-colors">
            Pricing
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <button className="text-slate-400 hover:text-white transition-colors p-2">
            <Sun size={20} />
          </button>
          
          {isMounted ? (
            token && user ? (
              <Button variant="primary" onClick={() => router.push("/dashboard")}>
                Dashboard
              </Button>
            ) : (
              <>
                <Button variant="ghost" className="hidden md:inline-flex" onClick={() => router.push("/login")}>
                  Log In
                </Button>
                <Button variant="primary" onClick={() => router.push("/register")}>
                  Get Started
                </Button>
              </>
            )
          ) : (
            // Placeholder while mounting to avoid hydration mismatch
            <div className="w-24 h-10"></div>
          )}
        </div>
      </div>
    </motion.header>
  );
}

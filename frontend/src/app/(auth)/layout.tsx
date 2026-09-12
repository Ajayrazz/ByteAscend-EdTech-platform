import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Code2, Target, TrendingUp, Zap } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[#070B14]">
      {/* Left side - Auth Form */}
      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="w-full max-w-md space-y-8 relative z-10">
          <div className="text-center">
            <Link href="/" className="inline-block group relative w-[180px] h-[50px]">
              <Image 
                src="/logo.png" 
                alt="ByteAscend Logo" 
                fill
                sizes="180px"
                className="object-contain object-center group-hover:scale-105 transition-transform mix-blend-screen"
              />
            </Link>
          </div>
          {children}
        </div>
      </div>

      {/* Right side - Showcase */}
      <div className="hidden lg:flex flex-1 relative bg-slate-900 border-l border-white/5 overflow-hidden items-center justify-center">
        {/* Abstract shapes */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-emerald-500/5 mix-blend-screen" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none transform -translate-x-1/3 translate-y-1/3" />
        
        <div className="relative z-10 w-full max-w-lg p-8 xl:p-12 flex flex-col items-center">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-outfit font-bold text-white mb-4">Welcome to ByteAscend</h1>
            <p className="text-slate-400">Your journey to mastering coding starts here. Pick your preferred login method.</p>
          </div>

          <div className="relative mb-16 group">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500 to-emerald-500 blur-2xl opacity-40 group-hover:opacity-60 transition-opacity duration-500 rounded-full" />
            <div className="relative bg-slate-800/80 border border-white/10 p-8 rounded-full shadow-2xl transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12 group-hover:border-cyan-500/30">
              <Zap size={64} className="text-cyan-400 fill-cyan-400/20 drop-shadow-[0_0_15px_rgba(0,204,204,0.5)]" />
            </div>
          </div>

          <div className="w-full space-y-4">
            <FeatureCard 
              icon={<Code2 size={24} className="text-cyan-400" />}
              title="Learn: Access 100+ Courses"
              desc="Comprehensive courses covering DSA, core subjects, and system design to build a strong foundation."
            />
            <FeatureCard 
              icon={<Target size={24} className="text-emerald-400" />}
              title="Practice: Interactive Coding"
              desc="Sharpen your skills with hands-on challenges and real-world exercises designed to reinforce learning."
            />
            <FeatureCard 
              icon={<TrendingUp size={24} className="text-blue-400" />}
              title="Progress: Track Your Journey"
              desc="Monitor your learning with detailed analytics, achievement badges, and personalized recommendations."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-start gap-4 p-5 rounded-2xl glass border border-white/5 hover:border-cyan-500/20 transition-colors">
      <div className="p-3 bg-slate-800/80 rounded-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] border border-white/5 flex-shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="text-white font-medium mb-1">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

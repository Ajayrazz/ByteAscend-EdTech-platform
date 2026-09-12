"use client";

import { useState } from "react";
import Image from "next/image";
import { Grid, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const tabs = ["DSA Sheets", "Core Subjects", "Interview Experience", "Articles"];

const accordionData = [
  {
    title: "Theory Simplified",
    desc: "Understand fundamentals without confusion & application. This approach fosters deeper comprehension and practical skills.",
  },
  {
    title: "Exam Focused",
    desc: "Understand fundamentals without confusion & application. This approach fosters deeper comprehension and practical skills.",
  },
  {
    title: "Practical Usage",
    desc: "See direct real-world applications of each concept in projects.",
  },
];

export default function LearningTabs() {
  const [activeTab, setActiveTab] = useState("DSA Sheets");

  return (
    <section className="py-24 border-t border-white/5 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-white mb-2">A Simpler Way for You to Learn</h2>
          <p className="text-slate-400 text-sm">Everything you need in one place - from beginner-friendly courses to in-depth subject articles.</p>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-8 border-b border-white/10 mb-12 overflow-x-auto hide-scrollbar pb-px">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors",
                activeTab === tab ? "border-cyan-400 text-cyan-400" : "border-transparent text-slate-500 hover:text-slate-300"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Accordion Side */}
          <div className="space-y-8">
            {accordionData.map((item, i) => (
              <div key={i} className="group cursor-pointer">
                <h3 className="flex items-center gap-2 text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  <Grid size={20} className="text-cyan-500/50 group-hover:text-cyan-400" />
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-3 pl-7">
                  {item.desc}
                </p>
                <div className="pl-7 flex items-center gap-1 text-sm font-semibold text-cyan-500 group-hover:text-cyan-300 transition-colors">
                  Learn more <ChevronRight size={16} />
                </div>
              </div>
            ))}
          </div>

          {/* Image Side */}
          <div className="glass-card p-4 border border-white/10 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-950/50 z-10 pointer-events-none" />
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-white/5 bg-slate-900 shadow-inner">
              <Image
                src="/hero-mockup.jpg"
                alt="Learning Platform Interface"
                fill
                className="object-cover object-left opacity-80"
              />
              <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-slate-900 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

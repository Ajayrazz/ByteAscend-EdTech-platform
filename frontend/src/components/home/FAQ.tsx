"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  "What programming languages do you cover?",
  "How is the course structured?",
  "Do you provide coding exercises and projects?",
];

const categories = [
  "Course Content & Curriculum",
  "Career Guidance",
  "Help Center FAQ",
  "Payment & Refunds",
  "Certification & Completion",
  "Community Support",
  "Course Access & Technical Support",
  "Account Management"
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("Course Content & Curriculum");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="py-24 relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-outfit font-bold text-white mb-2">Frequently Asked Questions</h2>
            <p className="text-slate-400 text-sm">Got questions? We&apos;ve gathered the most common ones and answered them clearly so you can move forward</p>
          </div>
          <button className="hidden md:inline-flex bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/20 transition-colors border border-white/10">
            Get Help
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Categories Sidebar */}
          <div className="md:col-span-4 space-y-2 border-r border-white/10 pr-4">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "w-full flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl transition-colors text-left",
                  activeCategory === cat ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20" : "text-slate-400 hover:bg-white/5 hover:text-slate-200 border border-transparent"
                )}
              >
                {cat}
                {activeCategory === cat && <span className="text-cyan-400">›</span>}
              </button>
            ))}
          </div>

          {/* FAQ Accordion */}
          <div className="md:col-span-8">
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-white/10 last:border-0 pb-4">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between py-4 text-left font-medium text-slate-200 hover:text-cyan-400 transition-colors"
                  >
                    {faq}
                    <ChevronDown 
                      size={20} 
                      className={cn("text-slate-500 transition-transform duration-200", openFaq === i ? "rotate-180 text-cyan-400" : "")} 
                    />
                  </button>
                  
                  {/* Accordion Content */}
                  <div 
                    className={cn(
                      "overflow-hidden transition-all duration-300 ease-in-out",
                      openFaq === i ? "max-h-40 opacity-100 mt-2" : "max-h-0 opacity-0"
                    )}
                  >
                    <p className="text-slate-400 text-sm leading-relaxed pb-4">
                      Yes! Our curriculum covers C++, Java, Python, and full-stack web development (React/Node). We focus on building strong foundational skills that apply across any language.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

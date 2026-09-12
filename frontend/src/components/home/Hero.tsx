"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/20 rounded-full blur-[120px] pointer-events-none opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border-cyan-500/30 text-cyan-300 text-sm font-medium mb-8 shadow-sm"
          >
            <span>India&apos;s #1 Coding Community</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-outfit font-extrabold tracking-tight text-white mb-6 leading-tight"
          >
            Get Your First Job <br />
            with <span className="text-gradient">ByteAscend ONE</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-400 mb-10 max-w-2xl"
          >
            ByteAscend ONE gives you a fully integrated path to placements - DSA, development, projects, contests, core CS subjects and interview prep in one system.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
          >
            <Button variant="outline" size="lg" className="w-full sm:w-auto rounded-full px-8">
              Free Resources
            </Button>
            <Button variant="primary" size="lg" className="w-full sm:w-auto rounded-full px-8">
              ByteAscend ONE
            </Button>
          </motion.div>
        </div>

        {/* Dashboard Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 relative w-full max-w-6xl mx-auto"
        >
          <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,204,204,0.15)] border border-white/10 glass-card p-2 md:p-4 bg-transparent">
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-slate-900 border border-white/5">
                <Image
                src="/hero-mockup.jpg"
                alt="ByteAscend Dashboard"
                fill
                className="object-cover object-top opacity-90"
                priority
                />
                {/* Soft fade out at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

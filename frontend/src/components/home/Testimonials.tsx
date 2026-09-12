"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Rohan Kumar Sah",
    role: "Software Engineer at Bosch",
    content: "ByteAscend helped me from being a beginner in DSA to a proficient level in which I was able to sit in various coding competitions as well as my campus placements.",
    avatar: "RK",
    color: "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30",
  },
  {
    name: "Avi Juneja",
    role: "SDE at Top MNC - 10+ LPA",
    content: "I have been following ByteAscend from my first year of College. I belong to ECE branch and had no one to guide me for my future. It helped me a lot.",
    avatar: "AJ",
    color: "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  },
  {
    name: "Anuj Thakur",
    role: "Data Analyst at Scaler",
    content: "The comprehensive curriculum, engaging teaching style, practical approach, and supportive community make ByteAscend an outstanding platform.",
    avatar: "AT",
    color: "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30",
  },
  {
    name: "Abhishek Khanna",
    role: "Samsung Research Institute",
    content: "Love the dedication to DSA. Every concept from basics to advanced like DP and Graphs feel like a cakewalk while learning.",
    avatar: "AK",
    color: "bg-orange-500/20 text-orange-400 border border-orange-500/30",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Side text */}
          <div className="lg:col-span-5">
            <h2 className="text-3xl md:text-4xl font-outfit font-bold text-white mb-2">
              Trusted by Learners.
            </h2>
            <h2 className="text-3xl md:text-4xl font-outfit font-bold text-slate-400 mb-8">
              Built for Future.
            </h2>

            <div className="space-y-8">
              <div>
                <h4 className="flex items-center gap-2 font-semibold text-white mb-1">
                  <span className="text-cyan-400">✓</span> Proven Results
                </h4>
                <p className="text-slate-400 text-sm">
                  Thousands have cracked placements using ByteAscend&apos;s study sheets & playlists.
                </p>
              </div>
              <div>
                <h4 className="flex items-center gap-2 font-semibold text-white mb-1">
                  <span className="text-cyan-400">✓</span> Mentor-Led Resources
                </h4>
                <p className="text-slate-400 text-sm">
                  Crafted by trusted voices in tech education.
                </p>
              </div>
              <div>
                <h4 className="flex items-center gap-2 font-semibold text-white mb-1">
                  <span className="text-cyan-400">✓</span> Confidence Beyond Exams
                </h4>
                <p className="text-slate-400 text-sm">
                  Skills that translate directly into interviews and real-world projects.
                </p>
              </div>
            </div>
          </div>

          {/* Right side cards */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-card p-6 flex items-start gap-4 hover:border-cyan-500/50 transition-colors"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold shrink-0 ${t.color}`}>
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-white font-semibold">{t.name}</h4>
                  <p className="text-cyan-400 text-xs mb-2">{t.role}</p>
                  <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">
                    &quot;{t.content}&quot;
                  </p>
                  <button className="text-slate-500 text-xs font-semibold mt-2 hover:text-cyan-400 transition-colors">
                    Read more
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { PlaySquare, Briefcase, MessageSquare, Plus } from "lucide-react";

export default function Stats() {
  return (
    <section className="py-16 border-t border-white/5 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-2xl font-outfit font-bold text-white mb-2">Welcome to Our Coding Family</h2>
          <p className="text-slate-400 text-sm max-w-2xl">Join a supportive community of passionate coders, where learning, collaboration, and innovation come together. Embark on your coding journey with us.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-card p-6 flex flex-col md:flex-row items-center md:justify-between gap-4 text-center md:text-left hover:border-cyan-500/30 transition-colors">
            <div>
              <div className="flex items-center justify-center md:justify-start text-3xl font-bold text-white mb-1">
                800<span className="text-xl font-normal text-slate-400">k+</span>
              </div>
              <p className="text-xs text-slate-400">user and counting</p>
            </div>
            <div className="w-12 h-12 bg-red-500/10 text-red-400 border border-red-500/20 rounded-xl flex items-center justify-center shrink-0">
              <PlaySquare size={24} />
            </div>
          </div>

          <div className="glass-card p-6 flex flex-col md:flex-row items-center md:justify-between gap-4 text-center md:text-left hover:border-cyan-500/30 transition-colors">
            <div>
              <div className="flex items-center justify-center md:justify-start text-3xl font-bold text-white mb-1">
                100<span className="text-xl font-normal text-slate-400">k+</span>
              </div>
              <p className="text-xs text-slate-400">user and counting</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-xl flex items-center justify-center shrink-0">
              <Briefcase size={24} />
            </div>
          </div>

          <div className="glass-card p-6 flex flex-col md:flex-row items-center md:justify-between gap-4 text-center md:text-left hover:border-cyan-500/30 transition-colors">
            <div>
              <div className="flex items-center justify-center md:justify-start text-3xl font-bold text-white mb-1">
                10<span className="text-xl font-normal text-slate-400">k+</span>
              </div>
              <p className="text-xs text-slate-400">user and counting</p>
            </div>
            <div className="w-12 h-12 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-xl flex items-center justify-center shrink-0">
              <MessageSquare size={24} />
            </div>
          </div>

          <div className="glass-card p-6 flex flex-col md:flex-row items-center md:justify-between gap-4 text-center md:text-left hover:border-cyan-500/30 transition-colors">
            <div>
              <div className="flex items-center justify-center md:justify-start text-3xl font-bold text-white mb-1">
                1<span className="text-xl font-normal text-slate-400">k+</span>
              </div>
              <p className="text-xs text-slate-400">user and counting</p>
            </div>
            <div className="w-12 h-12 bg-slate-500/10 text-slate-400 border border-slate-500/20 rounded-xl flex items-center justify-center shrink-0">
              <Plus size={24} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

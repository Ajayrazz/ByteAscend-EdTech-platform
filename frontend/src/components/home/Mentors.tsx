import Image from "next/image";

export default function Mentors() {
  return (
    <section className="py-24 border-t border-white/5 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-outfit font-bold text-white mb-2">Meet Your Mentors</h2>
          <p className="text-slate-400 text-sm max-w-2xl">Guided by top educators and ex-Amazon & Microsoft engineers, who have mentored millions of students in mastering coding.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative w-full max-w-md mx-auto aspect-square group">
            {/* Glowing background blob */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-emerald-500/10 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] blur-2xl group-hover:blur-3xl group-hover:from-cyan-500/30 transition-all duration-700" />
            
            {/* Image container with blob shape */}
            <div className="absolute inset-4 overflow-hidden rounded-[40%_60%_70%_30%/40%_50%_60%_50%] border border-cyan-500/20 bg-slate-900 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
              <Image 
                src="/mentor.jpg" 
                alt="Lead Instructor" 
                fill 
                className="object-cover object-[center_10%] transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Overlay gradient to blend with the dark theme */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#070B14]/60 via-transparent to-cyan-500/10 pointer-events-none mix-blend-hard-light opacity-80" />
            </div>
          </div>

          <div className="border-l-2 border-cyan-500/30 pl-8 py-4">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Transforming <span className="text-cyan-400 font-medium">Learners</span> into Industry Leaders.
            </h3>
            <p className="text-slate-400 text-lg leading-relaxed mb-6">
              From startups to tech giants. <strong className="text-white">&quot;We bridge the gap between learning and doing&quot;</strong>. Through real-world challenges, personalized mentorship, and a thriving community, we empower developers to ship products that matter. Excellence is the only standard.
            </p>
            <p className="text-slate-500 italic font-medium">
              - Lead Instructor
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

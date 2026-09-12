import { BookOpen, Monitor, FileText, Zap, Shield, PlayCircle, Users, Trophy } from "lucide-react";
import { Button } from "@/components/ui/Button";

const features = [
  {
    icon: <BookOpen size={20} />,
    title: "Core CS Subjects",
    desc: "Essential computer science foundations simplified."
  },
  {
    icon: <Monitor size={20} />,
    title: "Free Web Dev",
    desc: "Learn to build real-world web projects from scratch."
  },
  {
    icon: <FileText size={20} />,
    title: "Article",
    desc: "Deep dives into computer science & industry insight."
  },
  {
    icon: <Zap size={20} />,
    title: "Quick Compiler",
    desc: "Run and test code instantly, without setup."
  },
  {
    icon: <Shield size={20} />,
    title: "Mock Test",
    desc: "Practice with test simulations to boost placement."
  },
  {
    icon: <PlayCircle size={20} />,
    title: "Tutorials",
    desc: "Step-by-step guides to master concepts with ease."
  },
  {
    icon: <Users size={20} />,
    title: "Interview Experiences",
    desc: "Get insights from real interview journeys."
  },
  {
    icon: <Trophy size={20} />,
    title: "Dev Challenges",
    desc: "Sharpen your skills with hands-on coding challenges."
  }
];

export default function FeaturesGrid() {
  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-outfit font-bold text-white mb-2">Free Resources</h2>
            <p className="text-slate-400 text-sm max-w-xl">Start learning with our free resources - no subscription required.</p>
          </div>
          <Button variant="outline" className="hidden md:inline-flex">
            Explore All Resources
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <div key={i} className="glass-card p-6 hover:border-cyan-500/50 hover:bg-white/10 transition-all duration-300 cursor-pointer group">
              <div className="text-slate-400 mb-4 group-hover:text-cyan-400 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-white font-semibold mb-2">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

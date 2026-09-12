import Link from "next/link";
import { Code2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-950/50 border-t border-white/5 py-12 relative z-10">
      <div className="container mx-auto px-6 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Code2 size={24} className="text-cyan-400" />
              <span className="text-2xl font-outfit font-bold tracking-tight text-white">
                Byte<span className="text-cyan-400">Ascend</span>
              </span>
            </Link>
            <p className="text-slate-400 text-sm max-w-xs mb-6">
              Empowering developers to build the future. Master DSA, development, and system design with us.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="#about" className="hover:text-cyan-400 transition-colors">About Us</Link></li>
              <li><Link href="#courses" className="hover:text-cyan-400 transition-colors">Courses</Link></li>
              <li><Link href="#contact" className="hover:text-cyan-400 transition-colors">Contact</Link></li>
              <li><Link href="#privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="#blog" className="hover:text-cyan-400 transition-colors">Blog</Link></li>
              <li><Link href="#cheatsheets" className="hover:text-cyan-400 transition-colors">Cheatsheets</Link></li>
              <li><Link href="#community" className="hover:text-cyan-400 transition-colors">Community</Link></li>
              <li><Link href="#events" className="hover:text-cyan-400 transition-colors">Events</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/5 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} ByteAscend. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

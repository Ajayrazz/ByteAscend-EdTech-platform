import React, { useEffect, useState } from 'react';
import { dsaApi } from '@/lib/api';
import Link from 'next/link';

export default function PotdWidget() {
  const [potd, setPotd] = useState<any>(null);

  useEffect(() => {
    dsaApi.get('/dsa/potd')
      .then(res => setPotd(res.data))
      .catch(err => console.error("Failed to fetch POTD", err));
  }, []);

  if (!potd) return null;

  return (
    <div className="glass-card p-6 border-white/5 rounded-2xl h-full flex flex-col justify-center items-center text-center relative overflow-hidden group">
      <div className="absolute inset-0 bg-gradient-to-t from-orange-500/10 to-transparent"></div>
      <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mb-4 text-orange-400 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(249,115,22,0.3)]">
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
      </div>
      <div className="bg-orange-500/20 text-orange-400 text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full mb-3 z-10 border border-orange-500/30">
        Problem of the Day
      </div>
      <h3 className="text-lg font-bold text-white mb-2 z-10 line-clamp-1 px-2" title={potd.title}>{potd.title}</h3>
      <p className="text-sm text-slate-400 z-10 mb-5 px-2">Solve today's challenge to earn a <strong className="text-orange-400">+50 points</strong> bonus!</p>
      
      <div className="flex gap-3 z-10 w-full px-2">
        <Link 
          href={potd.practiceUrl} 
          target="_blank" 
          className="flex-1 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs font-semibold text-white transition-colors flex items-center justify-center gap-1"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg> Practice
        </Link>
        <Link 
          href="/dsa" 
          className="flex-1 py-2 bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 rounded-full text-xs font-bold text-white shadow-lg transition-colors flex items-center justify-center shadow-orange-500/20"
        >
          Mark Done
        </Link>
      </div>
    </div>
  );
}

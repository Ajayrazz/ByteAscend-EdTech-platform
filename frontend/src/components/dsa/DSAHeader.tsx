import React from 'react';
import { Search, Lock, Users, Calendar, Bookmark } from 'lucide-react';

interface DSAHeaderProps {
  total: number;
  completed: number;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  diffCounts: { easy: number; medium: number; hard: number };
  showSavedOnly: boolean;
  setShowSavedOnly: (val: boolean) => void;
}

export default function DSAHeader({ 
  total, completed, searchQuery, setSearchQuery, 
  diffCounts, showSavedOnly, setShowSavedOnly 
}: DSAHeaderProps) {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
  
  // Calculate dash offset for circle progress
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-8 text-white flex flex-col md:flex-row justify-between items-center mb-8 shadow-lg">
      <div className="mb-6 md:mb-0 w-full md:w-2/3">
        <h1 className="text-3xl font-bold mb-2">DSA Sheet - Most Important Interview Questions</h1>
        <p className="text-blue-100 mb-4 text-sm">
          • All DSA topics covered<br />
          • Will this be enough for Placements, is this for me? View More<br />
          • Easy: {diffCounts.easy} | Medium: {diffCounts.medium} | Hard: {diffCounts.hard}
        </p>
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Amazon DSA questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-full text-gray-800 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          
          <div className="flex items-center gap-2 text-sm ml-4">
            <div className="flex -space-x-2">
               <div className="w-8 h-8 rounded-full bg-blue-300 border-2 border-indigo-700 flex items-center justify-center font-bold text-xs">U1</div>
               <div className="w-8 h-8 rounded-full bg-purple-300 border-2 border-indigo-700 flex items-center justify-center font-bold text-xs">U2</div>
               <div className="w-8 h-8 rounded-full bg-green-300 border-2 border-indigo-700 flex items-center justify-center font-bold text-xs">U3</div>
            </div>
            <span className="text-blue-200">1,660+ people solving now</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
          <button className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors border border-white/20">
            <Lock size={14} /> Beginner / Pro Level
          </button>
          <button className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors border border-white/20">
            <Users size={14} /> Group Study
          </button>
          <button className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors border border-white/20">
            <Calendar size={14} /> Calendar
          </button>
          <button 
            onClick={() => setShowSavedOnly(!showSavedOnly)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors border ${
              showSavedOnly 
                ? 'bg-blue-400 border-blue-400 text-white shadow-sm' 
                : 'bg-white/10 hover:bg-white/20 border-white/20'
            }`}
          >
            <Bookmark size={14} fill={showSavedOnly ? 'currentColor' : 'none'} /> Saved Questions
          </button>
        </div>
      </div>
      
      <div className="w-full md:w-1/3 flex justify-center md:justify-end">
        <div className="relative w-32 h-32 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90">
            <circle cx="64" cy="64" r="56" stroke="rgba(255,255,255,0.2)" strokeWidth="8" fill="transparent" />
            <circle 
              cx="64" cy="64" r="56" 
              stroke="white" 
              strokeWidth="8" 
              fill="transparent" 
              strokeDasharray={circumference} 
              strokeDashoffset={strokeDashoffset} 
              strokeLinecap="round" 
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
             <span className="text-2xl font-bold">{percentage}%</span>
             <span className="text-xs text-blue-200">Completed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import { FileText, PlayCircle, Code2, Bookmark, Check } from 'lucide-react';
import { FaAmazon, FaApple, FaFacebook, FaGoogle, FaMicrosoft, FaPaypal, FaSpotify, FaTwitter, FaAtlassian, FaSalesforce } from 'react-icons/fa';
import { SiAdobe, SiCisco, SiGoldmansachs, SiIntel, SiIntuit, SiOracle, SiSamsung, SiVisa, SiWalmart, SiYahoo } from 'react-icons/si';
import { MdBusinessCenter } from 'react-icons/md';

interface Problem {
  id: string;
  title: string;
  articleUrl?: string;
  youtubeUrl?: string;
  practiceUrl?: string;
  difficulty: string;
  timeEstimate?: string;
  companies?: string;
}

interface ProblemRowProps {
  problem: Problem;
  isCompleted: boolean;
  isBookmarked: boolean;
  onToggleCompleted: () => void;
  onToggleBookmark: () => void;
}

const CompanyLogo = ({ name }: { name: string }) => {
  const normalized = name.toLowerCase().trim();
  const iconProps = { className: "w-4 h-4" };
  
  if (normalized.includes('google')) return <FaGoogle {...iconProps} className="w-4 h-4 text-blue-500" />;
  if (normalized.includes('amazon')) return <FaAmazon {...iconProps} className="w-4 h-4 text-orange-500" />;
  if (normalized.includes('apple')) return <FaApple {...iconProps} className="w-4 h-4 text-gray-800" />;
  if (normalized.includes('microsoft')) return <FaMicrosoft {...iconProps} className="w-4 h-4 text-blue-400" />;
  if (normalized.includes('meta') || normalized.includes('facebook')) return <FaFacebook {...iconProps} className="w-4 h-4 text-blue-600" />;
  

  // Fallback for others (Cred, Meesho, Zerodha, Unacademy, etc)
  const colors = ['bg-red-100 text-red-600', 'bg-blue-100 text-blue-600', 'bg-green-100 text-green-600', 'bg-purple-100 text-purple-600', 'bg-yellow-100 text-yellow-600'];
  const colorIndex = name.length % colors.length;
  
  return (
    <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${colors[colorIndex]}`}>
      {name.charAt(0).toUpperCase()}
    </div>
  );
};

export default function ProblemRow({ problem, isCompleted, isBookmarked, onToggleCompleted, onToggleBookmark }: ProblemRowProps) {
  const getDifficultyColor = (diff: string) => {
    switch (diff.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'medium': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const companiesList = problem.companies ? problem.companies.split(',').map(c => c.trim()) : [];
  const displayCompanies = companiesList.slice(0, 3);
  const remainingCompanies = companiesList.length - 3;

  return (
    <div className={`grid grid-cols-12 gap-4 py-4 px-6 border-b border-gray-100 transition-colors items-center ${isCompleted ? 'bg-green-50/30' : 'hover:bg-gray-50'}`}>
      
      <div className="col-span-1 flex justify-center" onClick={onToggleCompleted}>
        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 hover:border-indigo-500'}`}>
           {isCompleted && <Check size={14} strokeWidth={3} />}
        </div>
      </div>

      <div className={`col-span-3 font-medium flex items-center ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
        {problem.title}
      </div>

      <div className="col-span-1 flex justify-center items-center gap-3">
        {problem?.practiceUrl && problem.practiceUrl !== '#' && (
          <a href={problem.practiceUrl} target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform" title="LeetCode">
            <img src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png" className="w-4 h-4 opacity-70 hover:opacity-100" alt="LeetCode" />
          </a>
        )}
        <a 
          href={`https://www.geeksforgeeks.org/problems/${
            (problem?.practiceUrl && problem.practiceUrl !== '#') 
              ? (problem.practiceUrl.split('/problems/')[1]?.split('/')[0] || problem.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))
              : problem.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
          }/1`} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:scale-110 transition-transform" 
          title="GeeksforGeeks"
        >
          <span className="text-[11px] font-extrabold text-green-600 opacity-70 hover:opacity-100">GFG</span>
        </a>
      </div>

      <div className="col-span-1 flex justify-center">
        {problem.articleUrl === '#' ? (
          <div className="flex flex-col items-center">
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter mb-0.5">Coming</span>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Soon</span>
          </div>
        ) : (
          <a href={problem.articleUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-indigo-600 transition-colors">
            <FileText size={20} />
          </a>
        )}
      </div>

      <div className="col-span-1 flex justify-center">
        <a href={problem.youtubeUrl} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-red-500 transition-colors">
          <PlayCircle size={22} />
        </a>
      </div>

      <div className="col-span-1 flex justify-center">
        <Link 
          href={`/dsa/practice/${problem.id}`}
          className="inline-block bg-[#1a73e8] hover:bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded transition-colors"
        >
          Practice
        </Link>
      </div>

      <div className="col-span-1 flex justify-center">
        <span className={`text-xs font-semibold px-2 py-1 rounded border ${getDifficultyColor(problem.difficulty)} ${isCompleted ? 'opacity-50' : ''}`}>
          {problem.difficulty}
        </span>
      </div>

      <div className={`col-span-1 flex justify-center text-xs ${isCompleted ? 'text-gray-400' : 'text-gray-500'}`}>
        {problem.timeEstimate || '30Min'}
      </div>
      
      <div className={`col-span-1 flex justify-center items-center gap-1 ${isCompleted ? 'opacity-50' : ''}`}>
         {displayCompanies.map((c, i) => (
           <CompanyLogo key={i} name={c} />
         ))}
         {remainingCompanies > 0 && (
           <div className="text-[10px] font-bold text-gray-400 bg-gray-100 rounded-full px-1 py-0.5">
             +{remainingCompanies}
           </div>
         )}
      </div>

      <div className="col-span-1 flex justify-center">
        <button onClick={onToggleBookmark} className={`transition-colors ${isBookmarked ? 'text-indigo-600 fill-indigo-600' : 'text-gray-300 hover:text-indigo-500'}`}>
          <Bookmark size={18} fill={isBookmarked ? 'currentColor' : 'none'} />
        </button>
      </div>
      
    </div>
  );
}

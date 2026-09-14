import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import ProblemRow from './ProblemRow';

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

interface Day {
  id: string;
  title: string;
  problems: Problem[];
}

interface DayAccordionProps {
  day: Day;
  isOpen: boolean;
  toggle: () => void;
  completedProblems: Record<string, boolean>;
  bookmarkedProblems: Record<string, boolean>;
  toggleCompleted: (id: string) => void;
  toggleBookmark: (id: string) => void;
}

export default function DayAccordion({ 
  day, isOpen, toggle, 
  completedProblems, bookmarkedProblems, 
  toggleCompleted, toggleBookmark 
}: DayAccordionProps) {
  
  const dayCompletedCount = day.problems.filter(p => completedProblems[p.id]).length;

  return (
    <div className="mb-4 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <button 
        onClick={toggle}
        className="w-full flex items-center justify-between px-6 py-5 bg-white hover:bg-gray-50 transition-colors"
      >
        <h3 className="font-semibold text-lg text-gray-800">{day.title}</h3>
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {dayCompletedCount} / {day.problems.length}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="text-gray-400" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="border-t border-gray-100">
              <div className="grid grid-cols-12 gap-4 py-3 px-6 bg-gray-50 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-100">
                <div className="col-span-1 text-center">Status</div>
                <div className="col-span-4">Problem</div>
                <div className="col-span-1 text-center">Article</div>
                <div className="col-span-1 text-center">Youtube</div>
                <div className="col-span-1 text-center">Practice</div>
                <div className="col-span-1 text-center">Level</div>
                <div className="col-span-1 text-center">Timer</div>
                <div className="col-span-1 text-center">Company</div>
                <div className="col-span-1 text-center">Save</div>
              </div>
              
              <div className="bg-white">
                {day.problems.map((problem) => (
                  <ProblemRow 
                    key={problem.id} 
                    problem={problem} 
                    isCompleted={!!completedProblems[problem.id]}
                    isBookmarked={!!bookmarkedProblems[problem.id]}
                    onToggleCompleted={() => toggleCompleted(problem.id)}
                    onToggleBookmark={() => toggleBookmark(problem.id)}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

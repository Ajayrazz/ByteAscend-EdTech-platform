"use client";

import React, { useState, useEffect } from 'react';
import DayAccordion from '@/components/dsa/DayAccordion';
import DSAHeader from '@/components/dsa/DSAHeader';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { dsaApi } from '@/lib/api';
import { useStatsStore } from '@/lib/store/useStatsStore';

export default function DSASheetClient({ initialDays }: { initialDays: any[] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSavedOnly, setShowSavedOnly] = useState(false);
  const [completedProblems, setCompletedProblems] = useState<Record<string, boolean>>({});
  const [bookmarkedProblems, setBookmarkedProblems] = useState<Record<string, boolean>>({});
  
  const isAuthenticated = useAuthStore(state => !!state.token);
  const { fetchStats, fetchRecentActivities } = useStatsStore();

  // Load initial data
  useEffect(() => {
    if (isAuthenticated) {
      // Load from Backend API
      dsaApi.get('/dsa/progress').then((res) => {
        const completed: Record<string, boolean> = {};
        const bookmarked: Record<string, boolean> = {};
        res.data.forEach((progress: any) => {
          if (progress.completed) completed[progress.problemId] = true;
          if (progress.bookmarked) bookmarked[progress.problemId] = true;
        });
        setCompletedProblems(completed);
        setBookmarkedProblems(bookmarked);
      }).catch(err => console.error("Failed to fetch progress", err));
    } else {
      // Load from LocalStorage for guests
      try {
        const storedCompleted = localStorage.getItem('dsa_completed');
        if (storedCompleted) setCompletedProblems(JSON.parse(storedCompleted));
        
        const storedBookmarks = localStorage.getItem('dsa_bookmarks');
        if (storedBookmarks) setBookmarkedProblems(JSON.parse(storedBookmarks));
      } catch(e) {}
    }
  }, [isAuthenticated]);

  // Save to LocalStorage for guests only
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem('dsa_completed', JSON.stringify(completedProblems));
    }
  }, [completedProblems, isAuthenticated]);
  
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem('dsa_bookmarks', JSON.stringify(bookmarkedProblems));
    }
  }, [bookmarkedProblems, isAuthenticated]);

  const toggleCompleted = async (id: string) => {
    // Optimistic UI update
    setCompletedProblems(prev => ({ ...prev, [id]: !prev[id] }));
    
    if (isAuthenticated) {
      try {
        await dsaApi.post(`/dsa/progress/toggle-complete/${id}`);
        // Refresh global stats and recent activities after updating progress
        fetchStats();
        fetchRecentActivities();
      } catch (err) {
        // Revert on failure
        setCompletedProblems(prev => ({ ...prev, [id]: !prev[id] }));
      }
    }
  };

  const toggleBookmark = async (id: string) => {
    setBookmarkedProblems(prev => ({ ...prev, [id]: !prev[id] }));
    
    if (isAuthenticated) {
      try {
        await dsaApi.post(`/dsa/progress/toggle-bookmark/${id}`);
      } catch (err) {
        setBookmarkedProblems(prev => ({ ...prev, [id]: !prev[id] }));
      }
    }
  };

  const totalProblems = initialDays.reduce((acc, day) => acc + day.problems.length, 0);
  const completedCount = Object.values(completedProblems).filter(Boolean).length;
  
  // Calculate difficulty counts
  const diffCounts = initialDays.reduce((acc, day) => {
    day.problems.forEach((p: any) => {
      const d = p.difficulty.toLowerCase();
      if (d === 'easy') acc.easy++;
      else if (d === 'medium') acc.medium++;
      else if (d === 'hard') acc.hard++;
    });
    return acc;
  }, { easy: 41, medium: 119, hard: 33 });

  // Filter logic
  const filteredDays = initialDays.map(day => {
    let filteredProblems = day.problems.filter((p: any) => {
      const search = searchQuery.toLowerCase();
      return p.title.toLowerCase().includes(search) || 
             (p.companies && p.companies.toLowerCase().includes(search));
    });

    if (showSavedOnly) {
      filteredProblems = filteredProblems.filter((p: any) => bookmarkedProblems[p.id]);
    }

    return { ...day, problems: filteredProblems };
  }).filter(day => day.problems.length > 0 || (day.title.toLowerCase().includes(searchQuery.toLowerCase()) && !showSavedOnly));

  // Expand all days if searching or filtering saved
  const [openDays, setOpenDays] = useState<Record<string, boolean>>({
    [initialDays[0]?.id]: true
  });

  useEffect(() => {
    if (searchQuery || showSavedOnly) {
      const allOpen = filteredDays.reduce((acc, day) => {
        acc[day.id] = true;
        return acc;
      }, {} as Record<string, boolean>);
      setOpenDays(allOpen);
    }
  }, [searchQuery, showSavedOnly]);

  const toggleDay = (id: string) => {
    setOpenDays(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <DSAHeader 
        total={totalProblems || 193}
        completed={completedCount} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        diffCounts={diffCounts}
        showSavedOnly={showSavedOnly}
        setShowSavedOnly={setShowSavedOnly}
      />
      
      <div className="flex flex-col gap-2">
        {filteredDays.length === 0 ? (
           <div className="text-center py-12 text-gray-500">
             No problems found.
           </div>
        ) : (
          filteredDays.map((day) => (
            <DayAccordion 
              key={day.id} 
              day={day} 
              isOpen={!!openDays[day.id]} 
              toggle={() => toggleDay(day.id)} 
              completedProblems={completedProblems}
              bookmarkedProblems={bookmarkedProblems}
              toggleCompleted={toggleCompleted}
              toggleBookmark={toggleBookmark}
            />
          ))
        )}
      </div>
    </>
  );
}

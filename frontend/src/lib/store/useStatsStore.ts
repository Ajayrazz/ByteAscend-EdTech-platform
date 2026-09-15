import { create } from 'zustand';
import { dsaApi } from '../api';

export interface RecentActivity {
  problemId: string;
  title: string;
  difficulty: string;
  completedAt: string;
}

export interface LeaderboardUser {
  rank: number;
  userId: string;
  name: string;
  points: number;
}

interface StatsState {
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  totalPoints: number;
  currentStreak: number;
  globalRank: number;
  submissionDates: string[];
  recentActivities: RecentActivity[];
  leaderboard: LeaderboardUser[];
  isLoading: boolean;
  fetchStats: () => Promise<void>;
  fetchRecentActivities: () => Promise<void>;
  fetchLeaderboard: () => Promise<void>;
}

export const useStatsStore = create<StatsState>((set) => ({
  totalSolved: 0,
  easySolved: 0,
  mediumSolved: 0,
  hardSolved: 0,
  totalPoints: 0,
  currentStreak: 0,
  globalRank: 0,
  submissionDates: [],
  recentActivities: [],
  leaderboard: [],
  isLoading: false,

  fetchStats: async () => {
    set({ isLoading: true });
    try {
      const response = await dsaApi.get('/dsa/stats/me');
      set({
        totalSolved: response.data.totalSolved || 0,
        easySolved: response.data.easySolved || 0,
        mediumSolved: response.data.mediumSolved || 0,
        hardSolved: response.data.hardSolved || 0,
        totalPoints: response.data.totalPoints || 0,
        currentStreak: response.data.currentStreak || 0,
        globalRank: response.data.globalRank || 0,
        submissionDates: response.data.submissionDates || [],
        isLoading: false,
      });
    } catch (error) {
      console.error("Failed to fetch user stats", error);
      set({ isLoading: false });
    }
  },

  fetchRecentActivities: async () => {
    try {
      const response = await dsaApi.get('/dsa/stats/recent');
      set({ recentActivities: response.data });
    } catch (error) {
      console.error("Failed to fetch recent activities", error);
    }
  },

  fetchLeaderboard: async () => {
    try {
      const response = await dsaApi.get('/dsa/stats/leaderboard');
      set({ leaderboard: response.data });
    } catch (error) {
      console.error("Failed to fetch leaderboard", error);
    }
  }
}));


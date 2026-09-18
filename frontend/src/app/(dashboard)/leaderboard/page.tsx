"use client";

import React, { useEffect, useState } from 'react';
import { Trophy, Medal, Flame, Star, Crown } from 'lucide-react';
import { userApi } from '@/lib/api';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface LeaderboardUser {
  id: string;
  fullName: string;
  nickname: string | null;
  profilePictureUrl: string | null;
  totalScore: number;
  streakCount: number;
}

export default function LeaderboardPage() {
  const { user } = useAuthStore();
  const [leaders, setLeaders] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await userApi.get('/users/leaderboard');
        setLeaders(response.data);
      } catch (error) {
        console.error("Failed to fetch leaderboard", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-400 bg-yellow-400/10 border-yellow-400/20";
    if (rank === 2) return "text-slate-300 bg-slate-300/10 border-slate-300/20";
    if (rank === 3) return "text-amber-600 bg-amber-600/10 border-amber-600/20";
    return "text-slate-500 bg-white/5 border-white/5";
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-slate-300" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
    return <span className="font-bold text-slate-500">#{rank}</span>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
      </div>
    );
  }

  const top3 = leaders.slice(0, 3);
  const rest = leaders.slice(3);

  return (
    <div className="max-w-6xl mx-auto pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-white/10 shadow-[0_0_30px_rgba(0,204,204,0.15)]">
          <Trophy className="w-8 h-8 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Global Leaderboard</h1>
          <p className="text-slate-400 text-lg">Rank up by solving problems and maintaining your streak.</p>
        </div>
      </div>

      {/* Podium for Top 3 */}
      {top3.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-end pt-8">
          {/* Rank 2 (Silver) */}
          {top3[1] && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="order-2 md:order-1 glass-card border-slate-300/20 rounded-t-3xl rounded-b-xl p-6 flex flex-col items-center relative overflow-hidden bg-gradient-to-t from-slate-300/5 to-transparent h-[240px]"
            >
              <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-slate-300/50 to-transparent"></div>
              <div className="w-20 h-20 rounded-full border-4 border-slate-300/50 bg-[#0A1220] p-1 mb-4 relative shadow-[0_0_20px_rgba(203,213,225,0.2)]">
                {top3[1].profilePictureUrl ? (
                  <img src={top3[1].profilePictureUrl} alt="" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-2xl font-bold text-slate-400">
                    {(top3[1].nickname || top3[1].fullName)[0]}
                  </div>
                )}
                <div className="absolute -bottom-3 -right-2 bg-slate-800 rounded-full p-1 border border-slate-300/30">
                  <Medal className="w-5 h-5 text-slate-300" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white text-center mb-1 line-clamp-1">{top3[1].nickname || top3[1].fullName}</h3>
              <div className="flex items-center gap-1 text-slate-400 text-sm font-medium">
                <Star className="w-4 h-4 text-cyan-400 fill-cyan-400/20" /> {top3[1].totalScore}
              </div>
            </motion.div>
          )}

          {/* Rank 1 (Gold) */}
          {top3[0] && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="order-1 md:order-2 glass-card border-yellow-400/30 rounded-t-3xl rounded-b-xl p-6 flex flex-col items-center relative overflow-hidden bg-gradient-to-t from-yellow-400/10 to-transparent h-[280px] shadow-[0_0_40px_rgba(250,204,21,0.15)] z-10"
            >
              <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
              <Crown className="w-8 h-8 text-yellow-400 absolute top-4 drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]" />
              <div className="w-24 h-24 rounded-full border-4 border-yellow-400 bg-[#0A1220] p-1 mb-4 mt-8 relative shadow-[0_0_30px_rgba(250,204,21,0.3)]">
                {top3[0].profilePictureUrl ? (
                  <img src={top3[0].profilePictureUrl} alt="" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-3xl font-bold text-yellow-400/50">
                    {(top3[0].nickname || top3[0].fullName)[0]}
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold text-white text-center mb-1 line-clamp-1">{top3[0].nickname || top3[0].fullName}</h3>
              <div className="flex items-center gap-2 text-yellow-400 font-bold bg-yellow-400/10 px-4 py-1.5 rounded-full border border-yellow-400/20">
                <Star className="w-4 h-4 fill-yellow-400" /> {top3[0].totalScore} pts
              </div>
            </motion.div>
          )}

          {/* Rank 3 (Bronze) */}
          {top3[2] && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
              className="order-3 md:order-3 glass-card border-amber-700/30 rounded-t-3xl rounded-b-xl p-6 flex flex-col items-center relative overflow-hidden bg-gradient-to-t from-amber-700/10 to-transparent h-[220px]"
            >
              <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-600/50 to-transparent"></div>
              <div className="w-16 h-16 rounded-full border-4 border-amber-700/50 bg-[#0A1220] p-1 mb-4 relative shadow-[0_0_20px_rgba(180,83,9,0.2)]">
                {top3[2].profilePictureUrl ? (
                  <img src={top3[2].profilePictureUrl} alt="" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-xl font-bold text-amber-600/50">
                    {(top3[2].nickname || top3[2].fullName)[0]}
                  </div>
                )}
                <div className="absolute -bottom-2 -right-2 bg-slate-800 rounded-full p-1 border border-amber-700/30">
                  <Medal className="w-4 h-4 text-amber-600" />
                </div>
              </div>
              <h3 className="text-lg font-bold text-white text-center mb-1 line-clamp-1">{top3[2].nickname || top3[2].fullName}</h3>
              <div className="flex items-center gap-1 text-slate-400 text-sm font-medium">
                <Star className="w-4 h-4 text-cyan-400 fill-cyan-400/20" /> {top3[2].totalScore}
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Leaderboard Table */}
      <div className="glass-card border-white/5 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-6 py-4 text-sm font-semibold text-slate-400">Rank</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-400">Coder</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-400 text-center">Streak</th>
                <th className="px-6 py-4 text-sm font-semibold text-slate-400 text-right">Score</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {rest.map((leader, index) => {
                  const rank = index + 4; // Because top 3 are extracted
                  const isCurrentUser = user?.id === leader.id;
                  
                  return (
                    <motion.tr 
                      key={leader.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className={cn(
                        "border-b border-white/5 last:border-0 transition-colors",
                        isCurrentUser ? "bg-cyan-500/10 hover:bg-cyan-500/20" : "hover:bg-white/[0.02]"
                      )}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 text-slate-400 font-bold font-mono text-sm border border-white/5">
                          {rank}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full border border-white/10 bg-[#0A1220] overflow-hidden flex-shrink-0">
                            {leader.profilePictureUrl ? (
                              <img src={leader.profilePictureUrl} alt="" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-slate-800 flex items-center justify-center text-sm font-bold text-slate-400">
                                {(leader.nickname || leader.fullName)[0]}
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-white flex items-center gap-2">
                              {leader.nickname || leader.fullName}
                              {isCurrentUser && (
                                <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-[10px] font-bold rounded-full border border-cyan-500/30 uppercase tracking-wider">
                                  You
                                </span>
                              )}
                            </div>
                            {leader.nickname && (
                              <div className="text-xs text-slate-500 line-clamp-1">{leader.fullName}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/5">
                          <Flame className={cn("w-4 h-4", leader.streakCount > 0 ? "text-orange-500 fill-orange-500/20" : "text-slate-600")} />
                          <span className={cn("font-bold text-sm", leader.streakCount > 0 ? "text-white" : "text-slate-500")}>
                            {leader.streakCount}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1.5 font-bold text-cyan-400">
                          <Star className="w-4 h-4 fill-cyan-400/20" />
                          {leader.totalScore}
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </AnimatePresence>
            </tbody>
          </table>
          
          {rest.length === 0 && top3.length === 0 && (
            <div className="p-12 text-center text-slate-500">
              No one has scored any points yet. Be the first to rank up!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

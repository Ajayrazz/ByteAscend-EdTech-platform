"use client";

import { useState, useRef, useEffect } from "react";
import { useAuthStore } from "@/lib/store/useAuthStore";
import { useStatsStore } from "@/lib/store/useStatsStore";
import { userApi } from "@/lib/api";
import { motion } from "framer-motion";
import { FiUpload, FiEdit2, FiCheckCircle, FiMessageSquare, FiCode, FiStar, FiShield, FiGithub, FiLinkedin, FiTwitter, FiGlobe } from "react-icons/fi";
import ActivityHeatmap from "@/components/dashboard/ActivityHeatmap";
import EditProfileModal from "@/components/dashboard/EditProfileModal";

function CircularProgress({ easy, medium, hard, total }: { easy: number, medium: number, hard: number, total: number }) {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const solved = easy + medium + hard;
  const percent = total > 0 ? solved / total : 0;
  const offset = circumference - percent * circumference;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <svg className="absolute w-full h-full transform -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={radius} stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
        <circle
          cx="60"
          cy="60"
          r={radius}
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)] transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className="text-3xl font-outfit font-bold text-white leading-none">{solved}</span>
        <span className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-semibold">Solved</span>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const { user, updateProfilePicture } = useAuthStore();
  const stats = useStatsStore();
  const [uploading, setUploading] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [badges, setBadges] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchBadges() {
      if (!user) return;
      try {
        const res = await userApi.get('/users/badges');
        setBadges(res.data);
      } catch (err) {
        console.error("Failed to fetch badges", err);
      }
    }
    fetchBadges();
  }, [user]);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await userApi.post("/users/profile-picture", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      updateProfilePicture(response.data.url);
    } catch (error) {
      console.error("Error uploading profile picture", error);
      alert("Failed to upload profile picture. Make sure the file is an image.");
    } finally {
      setUploading(false);
    }
  };

  if (!user) {
    return <div className="p-8 text-center text-slate-400">Loading profile...</div>;
  }

  // Derive stats or fallbacks
  const communityStats = stats.communityStats || { solutions: 0, discussions: 0, submissions: stats.totalSolved || 0, reputation: 0 };
  const skills = stats.skills || { "Data Structures": 0, "Algorithms": 0, "Dynamic Programming": 0 };
  const rank = stats.globalRank ? `Rank: ${stats.globalRank}` : "Unranked";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* LEFT COLUMN */}
        <div className="space-y-6">
          {/* Profile Card */}
          <motion.div 
            whileHover={{ scale: 1.02, y: -5, rotateX: 2, rotateY: -2, boxShadow: "0 20px 40px -15px rgba(99, 102, 241, 0.2)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-indigo-500/20 transition-colors" />
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4 relative group">
                <div 
                  className="w-20 h-20 rounded-full bg-indigo-500/20 flex items-center justify-center font-bold text-2xl text-indigo-400 overflow-hidden cursor-pointer relative"
                  onClick={() => fileInputRef.current?.click()}
                >
                  {user.profilePictureUrl ? (
                    <img src={user.profilePictureUrl} alt="Avatar" className="w-full h-full object-cover" />
                  ) : (
                    (user.fullName || user.nickname || "U").substring(0, 2).toUpperCase()
                  )}
                  
                  {/* Upload Overlay */}
                  <div className={`absolute inset-0 bg-black/60 flex flex-col items-center justify-center transition-opacity ${uploading ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                    {uploading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <FiUpload className="text-white text-xl mb-1" />
                        <span className="text-[10px] text-white">Upload</span>
                      </>
                    )}
                  </div>
                </div>
                
                <div>
                  <h2 className="text-xl font-bold text-white">{user.fullName}</h2>
                  <p className="text-slate-400 text-sm">{user.nickname || "ByteAscend User"}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsEditModalOpen(true)}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors flex items-center justify-center group"
                title="Edit Profile"
              >
                <FiEdit2 className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
            
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
              accept="image/*" 
              className="hidden" 
            />
            
            <p className="text-slate-400 text-sm mt-6 mb-4 whitespace-pre-wrap">
              {user.bio || "No bio available. Click edit to add a bio!"}
            </p>

            <div className="flex flex-wrap gap-3 mb-6">
              {user.githubUrl && (
                <a href={user.githubUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                  <FiGithub className="text-lg" />
                </a>
              )}
              {user.linkedinUrl && (
                <a href={user.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-blue-400 transition-colors">
                  <FiLinkedin className="text-lg" />
                </a>
              )}
              {user.twitterUrl && (
                <a href={user.twitterUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-sky-400 transition-colors">
                  <FiTwitter className="text-lg" />
                </a>
              )}
              {user.websiteUrl && (
                <a href={user.websiteUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-emerald-400 transition-colors">
                  <FiGlobe className="text-lg" />
                </a>
              )}
            </div>
            
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-medium border border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
              {rank}
            </div>
          </motion.div>

          {/* Community Stats */}
          <motion.div 
            whileHover={{ scale: 1.02, y: -5, rotateX: 2, rotateY: -2, boxShadow: "0 20px 40px -15px rgba(56, 189, 248, 0.2)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden group"
          >
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-sky-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-sky-500/20 transition-colors" />
            <h3 className="text-white font-semibold mb-1">Community Stats</h3>
            <p className="text-slate-400 text-xs mb-6">Your activity and impact within the community.</p>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 text-slate-300">
                  <FiCheckCircle className="text-emerald-400" />
                  <span>Solutions</span>
                </div>
                <span className="text-white font-medium">{communityStats.solutions}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 text-slate-300">
                  <FiMessageSquare className="text-blue-400" />
                  <span>Discussions</span>
                </div>
                <span className="text-white font-medium">{communityStats.discussions}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 text-slate-300">
                  <FiCode className="text-indigo-400" />
                  <span>Submissions</span>
                </div>
                <span className="text-white font-medium">{communityStats.submissions}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-2 text-slate-300">
                  <FiStar className="text-amber-400" />
                  <span>Reputation</span>
                </div>
                <span className="text-white font-medium">{communityStats.reputation}</span>
              </div>
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div 
            whileHover={{ scale: 1.02, y: -5, rotateX: 2, rotateY: -2, boxShadow: "0 20px 40px -15px rgba(245, 158, 11, 0.2)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden group"
          >
            <div className="absolute top-10 left-10 w-32 h-32 bg-amber-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-amber-500/20 transition-colors" />
            <h3 className="text-white font-semibold mb-1">Skills</h3>
            <p className="text-slate-400 text-xs mb-6">Core technologies used to solve problems efficiently.</p>
            
            <div className="space-y-3 text-sm text-slate-300">
              {Object.entries(skills).map(([skill, count], index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{skill}</span>
                  <span className="text-white font-medium">{count as React.ReactNode}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        {/* RIGHT COLUMN */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Achievements */}
          <motion.div 
            whileHover={{ scale: 1.01, y: -5, boxShadow: "0 20px 40px -15px rgba(168, 85, 247, 0.2)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden group"
          >
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-purple-500/20 transition-colors" />
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-white font-semibold mb-1">Achievements</h3>
                <p className="text-slate-400 text-xs">Milestones earned through consistent practice and performance.</p>
              </div>
              <div className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-medium border border-purple-500/20 flex items-center gap-1.5 shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                <span>🏆</span> Total Trophies: {badges.length}
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {badges.length > 0 ? badges.map((badge) => (
                <div 
                  key={badge.id} 
                  title={badge.description}
                  className="aspect-[4/3] bg-gradient-to-br from-white/5 to-white/0 rounded-xl border border-white/10 flex flex-col items-center justify-center p-2 group hover:bg-white/10 hover:border-purple-500/30 transition-all cursor-pointer shadow-lg relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                  <img 
                    src={badge.iconUrl} 
                    alt={badge.name} 
                    className="w-16 h-16 object-cover rounded shadow-[0_0_15px_rgba(0,0,0,0.5)] mb-2 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300" 
                  />
                  <span className="text-white text-[10px] sm:text-xs font-bold tracking-wide uppercase text-center w-full truncate relative z-10 drop-shadow-md">
                    {badge.name}
                  </span>
                </div>
              )) : (
                [1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-[4/3] bg-white/5 rounded-xl border border-white/5 flex items-center justify-center">
                    <FiShield className="text-2xl text-slate-500 opacity-20" />
                  </div>
                ))
              )}
            </div>
          </motion.div>

          {/* Contest Ranking */}
          <motion.div 
            whileHover={{ scale: 1.01, y: -5, boxShadow: "0 20px 40px -15px rgba(236, 72, 153, 0.2)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden group"
          >
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-pink-500/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-pink-500/20 transition-colors" />
            <h3 className="text-white font-semibold mb-1">Contest Ranking</h3>
            <p className="text-slate-400 text-xs mb-6">Your competitive programming performance over time.</p>
            
            <div className="h-48 flex items-center justify-center border-b border-white/5 relative">
              <span className="text-slate-500 text-sm">No contest data available</span>
              {/* Fake X-axis */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[10px] text-slate-500 py-2">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span><span>Dec</span>
              </div>
            </div>
          </motion.div>

          {/* Problem Stats */}
          <motion.div 
            whileHover={{ scale: 1.01, y: -5, boxShadow: "0 20px 40px -15px rgba(16, 185, 129, 0.2)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden group"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-emerald-500/20 transition-colors" />
            <h3 className="text-white font-semibold mb-1">Problem Stats</h3>
            <p className="text-slate-400 text-xs mb-8">Breakdown of solved problems by difficulty level.</p>
            
            <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-8">
              <div className="w-32 h-32 flex-shrink-0">
                <CircularProgress
                  easy={stats.easySolved || 0}
                  medium={stats.mediumSolved || 0}
                  hard={stats.hardSolved || 0}
                  total={stats.totalProblems || 0} 
                />
              </div>
              
              <div className="flex-1 w-full space-y-4 justify-center flex flex-col">
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-emerald-400">Easy</span>
                    <span className="text-slate-400"><span className="text-white">{stats.easySolved || 0}</span>/{stats.totalEasy || 0}</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-emerald-400 h-full rounded-full" style={{ width: `${Math.min(((stats.easySolved || 0) / (stats.totalEasy || 1)) * 100, 100)}%` }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-yellow-400">Medium</span>
                    <span className="text-slate-400"><span className="text-white">{stats.mediumSolved || 0}</span>/{stats.totalMedium || 0}</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-yellow-400 h-full rounded-full" style={{ width: `${Math.min(((stats.mediumSolved || 0) / (stats.totalMedium || 1)) * 100, 100)}%` }} />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-red-400">Hard</span>
                    <span className="text-slate-400"><span className="text-white">{stats.hardSolved || 0}</span>/{stats.totalHard || 0}</span>
                  </div>
                  <div className="w-full bg-white/5 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-red-400 h-full rounded-full" style={{ width: `${Math.min(((stats.hardSolved || 0) / (stats.totalHard || 1)) * 100, 100)}%` }} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Total Submissions (Heatmap) */}
          <motion.div 
            whileHover={{ scale: 1.01, y: -5, boxShadow: "0 20px 40px -15px rgba(99, 102, 241, 0.2)" }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 relative overflow-hidden group"
          >
            <div className="absolute -bottom-20 right-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none group-hover:bg-indigo-500/20 transition-colors" />
            <div className="flex justify-between items-end mb-6">
              <div>
                <h3 className="text-white font-semibold mb-1">Total Submissions</h3>
                <p className="text-slate-400 text-xs">Your consistency and submission history.</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">{stats.totalSolved || 0}</div>
                <div className="text-[10px] text-slate-500">Submissions in 2026</div>
              </div>
            </div>
            
            <div className="mb-2 text-xs text-slate-400 flex justify-between">
              <span className="flex items-center gap-1.5">
                <span className="text-lg">🔥</span> Longest Streak: {stats.currentStreak || 0} days
              </span>
            </div>
            
            <div className="w-full overflow-x-auto pb-2">
              <ActivityHeatmap />
            </div>
          </motion.div>

        </div>
      </div>
      
      <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
    </div>
  );
}

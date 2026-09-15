"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiGithub, FiLinkedin, FiTwitter, FiGlobe, FiUser, FiInfo } from "react-icons/fi";
import { useAuthStore } from "@/lib/store/useAuthStore";

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditProfileModal({ isOpen, onClose }: EditProfileModalProps) {
  const { user, updateProfile } = useAuthStore();
  
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    nickname: user?.nickname || "",
    bio: user?.bio || "",
    githubUrl: user?.githubUrl || "",
    linkedinUrl: user?.linkedinUrl || "",
    twitterUrl: user?.twitterUrl || "",
    websiteUrl: user?.websiteUrl || "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateProfile(formData);
      onClose();
    } catch (error) {
      alert("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, rotateX: 45, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, rotateX: 0, scale: 1, y: 0 }}
            exit={{ opacity: 0, rotateX: -45, scale: 0.9, y: 50 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="relative w-full max-w-2xl bg-[#1C1C1E] border border-white/10 rounded-2xl shadow-2xl shadow-indigo-500/10 overflow-hidden transform-gpu perspective-1000"
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <h2 className="text-xl font-semibold text-white flex items-center gap-2">
                <FiUser className="text-indigo-400" />
                Edit Profile
              </h2>
              <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-full transition-colors">
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                    <FiUser className="text-slate-500" /> Full Name
                  </label>
                  <input 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                    <FiUser className="text-slate-500" /> Nickname
                  </label>
                  <input 
                    name="nickname"
                    value={formData.nickname}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                  <FiInfo className="text-slate-500" /> Bio
                </label>
                <textarea 
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner resize-none"
                  placeholder="Tell us a little bit about yourself..."
                />
              </div>

              <div className="pt-4 border-t border-white/5 space-y-4">
                <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Social Links</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiGithub className="text-slate-500" />
                    </div>
                    <input 
                      name="githubUrl"
                      value={formData.githubUrl}
                      onChange={handleChange}
                      placeholder="GitHub URL"
                      className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-slate-400 focus:ring-1 focus:ring-slate-400 transition-all"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiLinkedin className="text-slate-500" />
                    </div>
                    <input 
                      name="linkedinUrl"
                      value={formData.linkedinUrl}
                      onChange={handleChange}
                      placeholder="LinkedIn URL"
                      className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiTwitter className="text-slate-500" />
                    </div>
                    <input 
                      name="twitterUrl"
                      value={formData.twitterUrl}
                      onChange={handleChange}
                      placeholder="Twitter URL"
                      className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                    />
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiGlobe className="text-slate-500" />
                    </div>
                    <input 
                      name="websiteUrl"
                      value={formData.websiteUrl}
                      onChange={handleChange}
                      placeholder="Personal Website URL"
                      className="w-full bg-black/40 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-6 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-medium shadow-lg shadow-indigo-500/20 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Save Changes"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { userApi } from '@/lib/api';
import { Loader2, CheckCircle2, User, Link as LinkIcon, Globe } from 'lucide-react';

export default function ProfileSettingsTab() {
  const { user, updateProfile } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    fullName: '',
    nickname: '',
    bio: '',
    githubUrl: '',
    linkedinUrl: '',
    twitterUrl: '',
    websiteUrl: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        nickname: user.nickname || '',
        bio: user.bio || '',
        githubUrl: user.githubUrl || '',
        linkedinUrl: user.linkedinUrl || '',
        twitterUrl: user.twitterUrl || '',
        websiteUrl: user.websiteUrl || ''
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateProfile(formData);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error("Failed to update profile", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
          <User className="w-5 h-5 text-cyan-400" />
          Public Profile
        </h2>
        <p className="text-sm text-slate-400">This information will be displayed publicly on your profile page.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Full Name</label>
            <input 
              type="text" 
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full bg-[#0A1220] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
              placeholder="Ajay"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Nickname</label>
            <input 
              type="text" 
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              className="w-full bg-[#0A1220] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all"
              placeholder="CoderPro99"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Bio</label>
          <textarea 
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={4}
            className="w-full bg-[#0A1220] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/50 transition-all resize-none"
            placeholder="Tell us a little bit about yourself..."
          />
        </div>

        <div className="pt-4 border-t border-white/5 space-y-6">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <LinkIcon className="w-5 h-5 text-cyan-400" />
            Social Links
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 relative">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-slate-400" /> GitHub URL
              </label>
              <input 
                type="url" name="githubUrl" value={formData.githubUrl} onChange={handleChange}
                className="w-full bg-[#0A1220] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50"
                placeholder="https://github.com/..."
              />
            </div>
            
            <div className="space-y-2 relative">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-slate-400" /> LinkedIn URL
              </label>
              <input 
                type="url" name="linkedinUrl" value={formData.linkedinUrl} onChange={handleChange}
                className="w-full bg-[#0A1220] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50"
                placeholder="https://linkedin.com/in/..."
              />
            </div>

            <div className="space-y-2 relative">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-slate-400" /> Twitter URL
              </label>
              <input 
                type="url" name="twitterUrl" value={formData.twitterUrl} onChange={handleChange}
                className="w-full bg-[#0A1220] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50"
                placeholder="https://twitter.com/..."
              />
            </div>

            <div className="space-y-2 relative">
              <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                <Globe className="w-4 h-4 text-slate-400" /> Website URL
              </label>
              <input 
                type="url" name="websiteUrl" value={formData.websiteUrl} onChange={handleChange}
                className="w-full bg-[#0A1220] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50"
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>
        </div>

        <div className="pt-6 flex items-center justify-end gap-4">
          {success && (
            <span className="text-emerald-400 text-sm flex items-center gap-1 animate-in fade-in slide-in-from-right-4">
              <CheckCircle2 className="w-4 h-4" /> Profile updated successfully!
            </span>
          )}
          <button 
            type="submit" 
            disabled={loading}
            className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-sm font-semibold text-white shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center min-w-[120px]"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}

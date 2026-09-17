"use client";

import React from 'react';
import { useAuthStore } from '@/lib/store/useAuthStore';
import { Shield, Key, AlertTriangle } from 'lucide-react';

export default function AccountSettingsTab() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
          <Shield className="w-5 h-5 text-purple-400" />
          Account Security
        </h2>
        <p className="text-sm text-slate-400">Manage your password and secure your account.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-300">Email Address</label>
          <div className="flex items-center gap-4">
            <input 
              type="email" 
              value={user?.email || ''}
              disabled
              className="flex-1 bg-[#0A1220]/50 border border-white/5 rounded-xl px-4 py-3 text-slate-400 cursor-not-allowed"
            />
            <button className="px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium text-white transition-colors">
              Change
            </button>
          </div>
          <p className="text-xs text-slate-500">Your email is verified.</p>
        </div>
      </div>

      <div className="pt-6 border-t border-white/5">
        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <Key className="w-5 h-5 text-slate-400" />
          Change Password
        </h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Current Password</label>
            <input 
              type="password" 
              className="w-full bg-[#0A1220] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">New Password</label>
              <input 
                type="password" 
                className="w-full bg-[#0A1220] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-300">Confirm New Password</label>
              <input 
                type="password" 
                className="w-full bg-[#0A1220] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50"
              />
            </div>
          </div>
          <div className="pt-2 flex justify-end">
            <button className="px-6 py-2.5 bg-white hover:bg-slate-200 text-slate-900 rounded-xl text-sm font-semibold transition-all">
              Update Password
            </button>
          </div>
        </div>
      </div>

      <div className="pt-6 border-t border-red-500/20">
        <h3 className="text-lg font-bold text-red-400 mb-2 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Danger Zone
        </h3>
        <p className="text-sm text-slate-400 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
        <button className="px-4 py-2 border border-red-500/50 text-red-400 hover:bg-red-500/10 rounded-xl text-sm font-medium transition-all">
          Delete Account
        </button>
      </div>
    </div>
  );
}

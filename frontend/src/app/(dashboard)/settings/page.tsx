import React from 'react';
import SettingsTabs from '@/components/settings/SettingsTabs';

export default function SettingsPage() {
  return (
    <div className="max-w-6xl mx-auto pb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-slate-400">Manage your account settings, preferences, and profile.</p>
      </div>

      <div className="glass-card border-white/5 rounded-2xl overflow-hidden shadow-2xl relative">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 pointer-events-none"></div>
        <SettingsTabs />
      </div>
    </div>
  );
}

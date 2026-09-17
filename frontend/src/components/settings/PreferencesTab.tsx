"use client";

import React, { useState } from 'react';
import { Bell, Monitor, Mail, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PreferencesTab() {
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [marketingNotifs, setMarketingNotifs] = useState(false);

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
          <Bell className="w-5 h-5 text-amber-400" />
          Preferences
        </h2>
        <p className="text-sm text-slate-400">Customize your ByteAscend experience and notifications.</p>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Monitor className="w-5 h-5 text-slate-400" />
          Appearance
        </h3>
        
        <div className="grid grid-cols-3 gap-4">
          {['Light', 'Dark', 'System'].map((theme, i) => (
            <button 
              key={theme}
              className={cn(
                "p-4 border rounded-xl flex flex-col items-center gap-3 transition-all",
                theme === 'Dark' 
                  ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400"
                  : "bg-white/5 border-white/10 text-slate-400 hover:bg-white/10"
              )}
            >
              <div className={cn(
                "w-12 h-8 rounded-md border",
                theme === 'Light' ? "bg-white border-slate-300" : "bg-slate-900 border-slate-700"
              )}>
                {theme === 'System' && (
                  <div className="w-full h-full flex">
                    <div className="w-1/2 h-full bg-white rounded-l-md"></div>
                    <div className="w-1/2 h-full bg-slate-900 rounded-r-md"></div>
                  </div>
                )}
              </div>
              <span className="text-sm font-medium">{theme}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="pt-6 border-t border-white/5 space-y-6">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Mail className="w-5 h-5 text-slate-400" />
          Notifications
        </h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
            <div>
              <p className="font-medium text-white">Important Updates</p>
              <p className="text-sm text-slate-400">Receive emails about your account activity and security.</p>
            </div>
            <button 
              onClick={() => setEmailNotifs(!emailNotifs)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative",
                emailNotifs ? "bg-cyan-500" : "bg-slate-700"
              )}
            >
              <div className={cn(
                "w-4 h-4 bg-white rounded-full absolute top-1 transition-transform",
                emailNotifs ? "left-7" : "left-1"
              )} />
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
            <div>
              <p className="font-medium text-white">Marketing & Promos</p>
              <p className="text-sm text-slate-400">Receive emails about new courses, mock tests, and features.</p>
            </div>
            <button 
              onClick={() => setMarketingNotifs(!marketingNotifs)}
              className={cn(
                "w-12 h-6 rounded-full transition-colors relative",
                marketingNotifs ? "bg-cyan-500" : "bg-slate-700"
              )}
            >
              <div className={cn(
                "w-4 h-4 bg-white rounded-full absolute top-1 transition-transform",
                marketingNotifs ? "left-7" : "left-1"
              )} />
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

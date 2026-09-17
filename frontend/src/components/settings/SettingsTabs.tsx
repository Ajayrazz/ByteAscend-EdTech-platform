"use client";

import React, { useState } from 'react';
import { User, Shield, Bell, CreditCard } from 'lucide-react';
import { cn } from '@/lib/utils';
import ProfileSettingsTab from './ProfileSettingsTab';
import AccountSettingsTab from './AccountSettingsTab';
import PreferencesTab from './PreferencesTab';
import BillingTab from './BillingTab';
import { AnimatePresence, motion } from 'framer-motion';

const tabs = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'account', label: 'Account Security', icon: Shield },
  { id: 'preferences', label: 'Preferences', icon: Bell },
  { id: 'billing', label: 'Billing & Plans', icon: CreditCard },
];

export default function SettingsTabs() {
  const [activeTab, setActiveTab] = useState('profile');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return <ProfileSettingsTab />;
      case 'account': return <AccountSettingsTab />;
      case 'preferences': return <PreferencesTab />;
      case 'billing': return <BillingTab />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[650px] relative z-10">
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 bg-[#0A1220]/80 backdrop-blur-md border-b md:border-b-0 md:border-r border-white/5 p-4 space-y-1.5">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                isActive 
                  ? "bg-cyan-500/15 text-cyan-300 border border-cyan-500/20 shadow-[0_0_15px_rgba(0,204,204,0.1)]"
                  : "text-slate-400 hover:text-white hover:bg-white/5"
              )}
            >
              <tab.icon className={cn("w-5 h-5", isActive ? "text-cyan-400" : "text-slate-500")} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 md:p-10 relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {renderTabContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

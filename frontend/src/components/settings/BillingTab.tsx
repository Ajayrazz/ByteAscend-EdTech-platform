"use client";

import React from 'react';
import { CreditCard, Zap, CheckCircle2 } from 'lucide-react';
import { useAuthStore } from '@/lib/store/useAuthStore';

export default function BillingTab() {
  const { user } = useAuthStore();

  const isPro = user?.role === 'ROLE_PRO';

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h2 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-emerald-400" />
          Billing & Plans
        </h2>
        <p className="text-sm text-slate-400">Manage your subscription and billing details.</p>
      </div>

      <div className="p-6 bg-gradient-to-br from-slate-900 to-[#0A1220] border border-white/10 rounded-2xl shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-cyan-500/20 blur-2xl rounded-full pointer-events-none"></div>
        
        <div className="flex justify-between items-start mb-6">
          <div>
            <p className="text-slate-400 text-sm font-medium mb-1">Current Plan</p>
            <h3 className="text-3xl font-bold text-white flex items-center gap-2">
              {isPro ? 'Pro Tier' : 'Free Tier'}
              {isPro && <Zap className="w-6 h-6 text-yellow-400 fill-yellow-400" />}
            </h3>
          </div>
          <div className="text-right">
            <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-400 text-xs font-bold rounded-full border border-emerald-500/30">
              Active
            </span>
          </div>
        </div>

        <p className="text-sm text-slate-400 mb-6">
          {isPro 
            ? "You have full access to all premium features, mock tests, and company-specific DSA sheets." 
            : "You are currently on the free plan. Upgrade to unlock mock tests and unlimited AI insights."}
        </p>

        {!isPro && (
          <div className="space-y-3 mb-6">
            {['Unlimited Code Executions', 'Company Specific Mock Tests', 'Advanced AI Problem Hints'].map(feature => (
              <div key={feature} className="flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                {feature}
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-4">
          {!isPro ? (
            <button className="px-6 py-2.5 bg-white text-slate-900 hover:bg-slate-200 rounded-xl text-sm font-bold transition-colors shadow-lg">
              Upgrade to Pro
            </button>
          ) : (
            <button className="px-6 py-2.5 bg-white/10 text-white hover:bg-white/20 border border-white/10 rounded-xl text-sm font-bold transition-colors">
              Manage Subscription
            </button>
          )}
        </div>
      </div>

    </div>
  );
}

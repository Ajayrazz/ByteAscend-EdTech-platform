"use client";

import { motion } from "framer-motion";
import { Code2, PlaySquare, Sword, Bot, MonitorPlay } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Basic Plan",
    billing: "Monthly paid plan.",
    price: "₹499",
    period: "/month access",
    features: [
      { icon: <MonitorPlay size={16}/>, text: "All Course Access (DSA + more)" },
      { icon: <Code2 size={16}/>, text: "Core CS Subjects" },
      { icon: <Code2 size={16}/>, text: "Mock Tests" },
      { icon: <Sword size={16}/>, text: "Coding Contest" },
      { icon: <Bot size={16}/>, text: "AI Support with 25K/day Tokens" },
    ],
    popular: false,
  },
  {
    name: "Plus Plan",
    billing: "1 year paid plan.",
    price: "₹417",
    period: "/month",
    subprice: "₹4,999 for 1 year",
    features: [
      { icon: <MonitorPlay size={16}/>, text: "All Course Access (DSA + more)" },
      { icon: <Code2 size={16}/>, text: "Core CS Subjects" },
      { icon: <Code2 size={16}/>, text: "Mock Tests" },
      { icon: <Sword size={16}/>, text: "Coding Contest" },
      { icon: <Bot size={16}/>, text: "AI Support with 50K/day Tokens" },
    ],
    popular: false,
  },
  {
    name: "Pro Plan",
    billing: "2 year paid plan.",
    price: "₹292",
    period: "/month",
    subprice: "₹6,999 for 2 years",
    features: [
      { icon: <MonitorPlay size={16}/>, text: "All Course Access (DSA + more)" },
      { icon: <Code2 size={16}/>, text: "Core CS Subjects" },
      { icon: <Code2 size={16}/>, text: "Mock Tests" },
      { icon: <Sword size={16}/>, text: "Coding Contest" },
      { icon: <Bot size={16}/>, text: "AI Support with 75K/day Tokens" },
    ],
    popular: true,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-outfit font-bold text-white mb-2">
              Simple, Transparent Pricing
            </h2>
            <p className="text-slate-400 text-sm">
              Choose the plan that fits your goals - no hidden fees, no confusion. Just clear value designed for growth.
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <button className="bg-white/10 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-white/20 transition-colors border border-white/10">
              Comparison
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={cn(
                "glass-card p-8 relative flex flex-col h-full",
                plan.popular ? "border-cyan-500/50 shadow-[0_0_30px_rgba(0,204,204,0.15)] z-10 scale-[1.02]" : "hover:border-white/20"
              )}
            >
              {plan.popular && (
                <div className="absolute top-6 right-6 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-md">
                  Popular
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-lg font-bold text-white">{plan.name}</h3>
                <p className="text-slate-400 text-xs">{plan.billing}</p>
              </div>
              
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-slate-400 text-sm">{plan.period}</span>
                </div>
                {plan.subprice && (
                  <p className="text-slate-500 text-xs mt-1">{plan.subprice}</p>
                )}
              </div>

              <Button 
                variant={plan.popular ? "primary" : "outline"} 
                className={cn("w-full mb-8", plan.popular ? "" : "text-white")}
              >
                Subscribe
              </Button>
              
              <div className="flex-1">
                <p className="text-white text-sm font-semibold mb-4">This plan includes:</p>
                <ul className="space-y-4">
                  {plan.features.map((feature, f) => (
                    <li key={f} className="flex items-start gap-3 text-slate-300 text-sm">
                      <div className="text-cyan-400 mt-0.5">{feature.icon}</div>
                      <span>{feature.text}</span>
                    </li>
                  ))}
                  <li className="flex items-start gap-3 text-slate-300 text-sm">
                    <div className="text-cyan-400 mt-0.5"><PlaySquare size={16}/></div>
                    <span>Quick Compiler <span className="text-slate-500">(50/day)</span></span>
                  </li>
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

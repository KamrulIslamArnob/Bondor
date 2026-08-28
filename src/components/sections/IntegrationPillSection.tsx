"use client";

import React from "react";
import Link from "next/link";
import { CreditCard, Database, Code, ShoppingBag, Send, PhoneCall, CheckCircle2, ArrowRight } from "lucide-react";

export const IntegrationPillSection: React.FC = () => {
  const tools = [
    { name: "Stripe", icon: <CreditCard size={18} className="text-blue-600" /> },
    { name: "Firebase", icon: <Database size={18} className="text-amber-500" /> },
    { name: "bKash / Nagad", icon: <CreditCard size={18} className="text-rose-500" /> },
    { name: "Courier Sync", icon: <Send size={18} className="text-emerald-600" /> },
    { name: "WhatsApp Direct", icon: <PhoneCall size={18} className="text-teal-600" /> },
    { name: "Maker Portal", icon: <ShoppingBag size={18} className="text-indigo-600" /> },
  ];

  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 border border-emerald-200/70 rounded-3xl p-8 text-center space-y-6 shadow-xs">
        <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
          Everything in sync in one place
        </h3>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          {tools.map((tool, idx) => (
            <div
              key={idx}
              className="w-12 h-12 rounded-2xl bg-white shadow-xs border border-slate-200/80 flex items-center justify-center hover:scale-110 hover:shadow-card transition-all cursor-pointer"
              title={tool.name}
            >
              {tool.icon}
            </div>
          ))}
        </div>

        <div>
          <Link
            href="/builder-dashboard"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-full text-xs font-bold text-slate-800 shadow-xs transition-all"
          >
            <span>Explore all system tools</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </section>
  );
};

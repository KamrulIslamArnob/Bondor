"use client";

import React from "react";
import { ShieldCheck, Layers, Flame, Sparkles, Box, Anchor, BookOpen, CreditCard } from "lucide-react";

export const SocialProofBar: React.FC = () => {
  const pillars = [
    { name: "Business Education", desc: "Structured Video Masterclasses", icon: <BookOpen size={15} className="text-sky-600" /> },
    { name: "Wholesale Material Packs", desc: "Verified Raw Ingredients", icon: <Box size={15} className="text-amber-600" /> },
    { name: "Dual-Role Architecture", desc: "Builders & Sellers", icon: <Layers size={15} className="text-slate-700" /> },
    { name: "Batch Cost Economics", desc: "Pre-Calculated Profit Margins", icon: <Sparkles size={15} className="text-purple-600" /> },
    { name: "Stripe Payment Gateway", desc: "100% Secure Checkout", icon: <CreditCard size={15} className="text-emerald-600" /> },
  ];

  return (
    <div className="w-full py-8 border-y border-slate-100 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-4">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          The All-in-One Digital Harbor for Micro-Entrepreneurs in Bangladesh
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {pillars.map((pillar, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center justify-center p-3 rounded-2xl bg-slate-50/80 border border-slate-200/70 text-center hover:bg-white hover:shadow-xs transition-all"
            >
              <div className="w-7 h-7 rounded-lg bg-white shadow-xs border border-slate-200/80 flex items-center justify-center mb-1.5">
                {pillar.icon}
              </div>
              <span className="text-xs font-bold text-slate-900 font-serif">
                {pillar.name}
              </span>
              <span className="text-[10px] text-slate-500 font-medium">
                {pillar.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

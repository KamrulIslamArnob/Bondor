"use client";

import React from "react";
import { ShieldCheck, Layers, Flame, Sparkles, Box, Anchor } from "lucide-react";

export const SocialProofBar: React.FC = () => {
  const partners = [
    { name: "Textile Harbor", icon: <Layers size={15} className="text-slate-700" /> },
    { name: "Candle Studio BD", icon: <Flame size={15} className="text-slate-700" /> },
    { name: "Soapworks Guild", icon: <Sparkles size={15} className="text-slate-700" /> },
    { name: "PrintCraft Blanks", icon: <Box size={15} className="text-slate-700" /> },
    { name: "Escrow Secured", icon: <ShieldCheck size={15} className="text-emerald-600" /> },
  ];

  return (
    <div className="w-full py-10 border-y border-slate-200/80 bg-white/60 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-5">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Trusted by 500+ local makers &amp; verified suppliers across Bangladesh
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 opacity-85 hover:opacity-100 transition-opacity">
          {partners.map((partner, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 text-slate-700 hover:text-slate-900 transition-colors"
            >
              <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center border border-slate-200/80">
                {partner.icon}
              </div>
              <span className="text-xs sm:text-sm font-bold tracking-tight font-serif">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

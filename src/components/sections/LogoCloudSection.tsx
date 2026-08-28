"use client";

import React from "react";
import { Layers, Flame, Sparkles, Box, ShieldCheck, Anchor } from "lucide-react";

export const LogoCloudSection: React.FC = () => {
  const brands = [
    { name: "Textile Harbor", icon: <Layers size={16} /> },
    { name: "Luminate Studio", icon: <Flame size={16} /> },
    { name: "Soapworks BD", icon: <Sparkles size={16} /> },
    { name: "PrintCraft Blanks", icon: <Box size={16} /> },
    { name: "Escrow Pay", icon: <ShieldCheck size={16} /> },
    { name: "Dhaka Merch", icon: <Anchor size={16} /> },
  ];

  return (
    <section className="w-full py-10 border-y border-slate-100 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center space-y-5">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          3,000+ teams and local makers building with Bondor in Bangladesh
        </p>

        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 opacity-75 hover:opacity-100 transition-opacity">
          {brands.map((brand, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-slate-700">
                {brand.icon}
              </div>
              <span className="text-xs sm:text-sm font-bold tracking-tight font-serif">
                {brand.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

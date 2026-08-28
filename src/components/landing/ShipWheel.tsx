import React from "react";
import { Sparkles, Users, Layers, Award } from "lucide-react";

export const ShipWheel: React.FC = () => {
  return (
    <div className="relative w-full max-w-sm aspect-square flex items-center justify-center">
      {/* Decorative Outer Ring */}
      <div className="absolute inset-4 rounded-full border border-dashed border-slate-200 spin-slow" />
      <div className="absolute inset-12 rounded-full border border-slate-200/80 bg-slate-50/50" />

      {/* Center Hub */}
      <div className="relative z-10 w-44 h-44 rounded-full bg-white border border-slate-200/90 shadow-xl flex flex-col items-center justify-center text-center p-4">
        <div className="w-11 h-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center text-xl shadow-sm mb-2">
          ⚓
        </div>
        <span className="text-xl font-black text-slate-900 tracking-tight font-heading">
          20,000+
        </span>
        <span className="text-xs font-medium text-slate-500">Active Builders</span>
      </div>

      {/* Floating Modern Pill Badges */}
      <div className="absolute top-3 right-0 z-20 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-md text-xs font-semibold text-slate-700 animate-bounce duration-1000">
        <span className="text-sm">🕯️</span>
        <span>Candle Business</span>
      </div>

      <div className="absolute bottom-6 left-0 z-20 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-slate-200/80 shadow-md text-xs font-semibold text-slate-700">
        <span className="text-sm">👕</span>
        <span>T-shirt Brand</span>
      </div>

      <div className="absolute top-1/2 -left-3 -translate-y-1/2 z-20 flex items-center gap-1.5 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 shadow-sm text-[11px] font-bold text-emerald-800">
        <Sparkles size={13} className="text-emerald-600" />
        <span>4 Active Docks</span>
      </div>
    </div>
  );
};

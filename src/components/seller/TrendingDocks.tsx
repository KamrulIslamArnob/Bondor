import React from "react";
import { BUSINESS_CATEGORIES } from "@/lib/constants";
import { TrendingUp, ArrowUpRight } from "lucide-react";

export const TrendingDocks: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-base font-bold text-slate-900">
          Category Throughput
        </h3>
        <span className="text-[10px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200/80">
          Live Demand
        </span>
      </div>

      <div className="space-y-2">
        {BUSINESS_CATEGORIES.map((dock) => (
          <div
            key={dock.id}
            className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/60 hover:border-slate-300 transition-colors"
          >
            <div>
              <p className="text-xs font-bold text-slate-900">{dock.title}</p>
              <p className="text-[11px] text-slate-500 font-medium">
                {dock.throughput}
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-800 bg-white px-2 py-0.5 rounded-full border border-slate-200 flex items-center gap-0.5 shadow-xs tabular-nums">
              {dock.growth}
              <ArrowUpRight size={13} className="text-emerald-600" />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

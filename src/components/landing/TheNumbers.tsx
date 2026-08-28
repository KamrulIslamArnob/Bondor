"use client";

import React from "react";

export const TheNumbers: React.FC = () => {
  const metrics = [
    {
      label: "Course Completion & Skill Mastery Rate",
      value: "92%",
      description: "Students complete all modules with hands-on output",
    },
    {
      label: "Average Starter Kit Savings vs Open Market Retail",
      value: "4x",
      description: "Direct-from-supplier pricing with verified ingredient purity",
    },
    {
      label: "Makers Reaching First Batch Break-Even in 30 Days",
      value: "70%",
      description: "Fast payback with our pre-calculated batch profit margins",
    },
    {
      label: "Escrow Protection & Supplier Quality Satisfaction",
      value: "98%",
      description: "Over 1,200 verified orders completed with zero escrow disputes",
    },
  ];

  return (
    <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center space-y-12">
      {/* Editorial Centered Headline */}
      <div className="space-y-2">
        <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-slate-900 tracking-tight">
          The Numbers
        </h2>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Proven Impact Across Bangladesh's Maker Economy
        </p>
      </div>

      {/* Clean Horizontal Metric Rows */}
      <div className="divide-y divide-slate-200 border-y border-slate-200 text-left">
        {metrics.map((m, idx) => (
          <div
            key={idx}
            className="py-5 sm:py-6 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 hover:bg-slate-50/50 px-2 rounded-xl transition-colors"
          >
            <div>
              <span className="text-sm sm:text-base font-semibold text-slate-800 block font-serif">
                {m.label}
              </span>
              <span className="text-xs text-slate-500 font-normal">
                {m.description}
              </span>
            </div>

            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight tabular-nums shrink-0 font-serif">
              {m.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

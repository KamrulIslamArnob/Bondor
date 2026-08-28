"use client";

import React from "react";

export const TheNumbers: React.FC = () => {
  const metrics = [
    {
      label: "Integrated Education & Sourcing Architecture",
      value: "2-in-1",
      description: "Business courses and wholesale material packs united in one system",
    },
    {
      label: "Average Starter Pack Cost Savings vs Retail Middlemen",
      value: "4x",
      description: "Direct wholesale pricing from verified local Bangladeshi suppliers",
    },
    {
      label: "Builders Reaching First Batch Break-Even in 30 Days",
      value: "70%",
      description: "Fast payback with pre-calculated batch profit margins & video guides",
    },
    {
      label: "Stripe Online Payment Security & Instant Confirmation",
      value: "100%",
      description: "Encrypted credit/debit card processing with zero transaction friction",
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
          Empowering Micro-Entrepreneurs &amp; Supporting Economic Growth
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

"use client";

import React from "react";
import Link from "next/link";
import { Settings, Bell, Code2, ShieldCheck, Box, Layers, ArrowRight } from "lucide-react";

export const DarkFeatureGridSection: React.FC = () => {
  const features = [
    {
      icon: <Settings size={22} className="text-blue-400" />,
      title: "20+ Starter Pack Ratios",
      desc: "Order and scale small-batch production with verified ingredient ratios and certified raw supply packs.",
    },
    {
      icon: <Bell size={22} className="text-emerald-400" />,
      title: "Automated Dispatch Alerts",
      desc: "Get notified about package updates, raw material arrivals, and batch completion timelines across Bangladesh.",
    },
    {
      icon: <Code2 size={22} className="text-purple-400" />,
      title: "Stripe Escrow Architecture",
      desc: "Complete purchases securely with Stripe payment gateway. Funds are safeguarded until shipment is verified.",
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <div className="rounded-3xl bg-[#0A0F1D] text-white p-8 sm:p-14 border border-slate-800 shadow-2xl space-y-12 text-center">
        {/* Header */}
        <div className="max-w-2xl mx-auto space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-serif">
            Scale production with an industry-grade supply network
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
            Bondor wholesale supply infrastructure is supported by clear batch specifications and verified vendors for faster, risk-free manufacturing.
          </p>
        </div>

        {/* 3 Column Dark Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {features.map((f, idx) => (
            <div
              key={idx}
              className="bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 hover:border-blue-500/40 rounded-2xl p-6 transition-all duration-200 shadow-xs space-y-4"
            >
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                {f.icon}
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-bold text-white font-serif">
                  {f.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  {f.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Center CTA Button */}
        <div>
          <Link
            href="/materials"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 active:scale-[0.96] text-slate-900 font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md cursor-pointer"
          >
            <span>Browse Wholesale Material Packs</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

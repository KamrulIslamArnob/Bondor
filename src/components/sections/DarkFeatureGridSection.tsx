"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Settings, Bell, Code2, ShieldCheck, Box, Layers, ArrowRight } from "lucide-react";

export const DarkFeatureGridSection: React.FC = () => {
  const features = [
    {
      icon: <Settings size={22} className="text-blue-400" />,
      title: "20+ Starter Pack Ratios",
      bnTitle: "২০+ পাইকারি কাঁচামাল প্যাক",
      desc: "Order and scale small-batch production with verified ingredient ratios and certified raw supply packs.",
    },
    {
      icon: <Bell size={22} className="text-emerald-400" />,
      title: "Automated Dispatch Alerts",
      bnTitle: "রিয়েল-টাইম কুরিয়ার আপডেট",
      desc: "Get notified about package updates, raw material arrivals, and batch completion timelines across Bangladesh.",
    },
    {
      icon: <Code2 size={22} className="text-purple-400" />,
      title: "Stripe Escrow Architecture",
      bnTitle: "১০০% নিরাপদ এসক্রো পেমেন্ট",
      desc: "Complete purchases securely with Stripe payment gateway. Funds are safeguarded until shipment is verified.",
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl bg-[#0A0F1D] text-white p-8 sm:p-14 border border-slate-800 shadow-2xl space-y-12 text-center relative overflow-hidden"
      >
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-950/80 border border-blue-500/30 rounded-full text-xs font-bold text-blue-300">
            <span className="font-hind">শিল্প-মানের পাইকারি সাপ্লাই প্ল্যাটফর্ম</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-serif">
            Scale production with an industry-grade supply network
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
            Bondor wholesale supply infrastructure is supported by clear batch specifications and verified vendors for faster, risk-free manufacturing.
          </p>
        </div>

        {/* 3 Column Dark Feature Cards with Hover Motion */}
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {features.map((f, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
              className="bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-blue-400/50 rounded-2xl p-6 transition-colors duration-200 shadow-xs space-y-4"
            >
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                {f.icon}
              </div>
              <div className="space-y-1.5">
                <h3 className="text-base sm:text-lg font-bold text-white font-serif">
                  {f.title}
                </h3>
                <span className="font-hind text-xs font-semibold text-blue-400 block">
                  {f.bnTitle}
                </span>
                <p className="text-xs text-slate-400 leading-relaxed font-normal pt-1">
                  {f.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Center CTA Button */}
        <div className="relative z-10">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="inline-block">
            <Link
              href="/materials"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl text-xs sm:text-sm transition-colors shadow-md cursor-pointer"
            >
              <span className="font-hind font-bold">পাইকারি কাঁচামাল প্যাক দেখুন</span>
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

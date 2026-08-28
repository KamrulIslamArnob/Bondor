"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Hammer, Store, Sparkles, Layers, ArrowRight, CheckCircle2, Box, BookOpen } from "lucide-react";

export const TeamRoleFeatureSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabs = [
    { name: "All-Round Builder", role: "builder" },
    { name: "Apparel Printer", role: "apparel" },
    { name: "Candle Artisan", role: "candle" },
    { name: "Wholesale Supplier", role: "seller" },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl bg-[#0B132B] text-white p-8 sm:p-14 border border-slate-800 shadow-2xl space-y-10 text-center"
      >
        {/* Title */}
        <div className="space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 border border-white/20 rounded-full text-xs font-bold text-sky-300">
            <span>Role-Based Workspace Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white font-serif">
            A feature set for everyone in your workshop
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-normal">
            Whether you are learning your first craft or supplying wholesale inventory at scale.
          </p>
        </div>

        {/* Persona Tabs Row */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {tabs.map((tab, idx) => (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.96 }}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === idx
                  ? "bg-white text-slate-950 shadow-md font-bold"
                  : "bg-white/10 text-slate-300 hover:bg-white/15"
              }`}
            >
              {tab.name}
            </motion.button>
          ))}
        </div>

        {/* 3 Column Feature Previews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* Card 1 */}
          <motion.div 
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 rounded-2xl p-6 transition-colors duration-200 space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white font-serif">
                Screenprint &amp; Apparel Lab
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Loop tested ink formulas and mesh calibration into your production workflow for seamless apparel runs.
              </p>
            </div>

            {/* Micro Graphic */}
            <div className="bg-white/10 rounded-xl p-3.5 border border-white/10 flex items-center justify-between text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <Layers size={15} className="text-blue-400" />
                <span className="font-bold">Emulsion Calibration</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-bold">180 GSM Ready</span>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 rounded-2xl p-6 transition-colors duration-200 space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white font-serif">
                Starter Packs &amp; Raw Supplies
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Order pre-calibrated material bundles without paying retail middlemen markups or dealing with unverified quality.
              </p>
            </div>

            {/* Micro Graphic */}
            <div className="bg-white/10 rounded-xl p-3.5 border border-white/10 flex items-center justify-between text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <Box size={15} className="text-amber-400" />
                <span className="font-bold">Soy Wax &amp; Wicks Kit</span>
              </div>
              <span className="text-[10px] text-amber-300 font-bold">1kg Pack</span>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 rounded-2xl p-6 transition-colors duration-200 space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white font-serif">
                Vendor &amp; Academy Hub
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Manage product listings, monitor batch orders, and publish comprehensive video masterclasses from one dashboard.
              </p>
            </div>

            {/* Micro Graphic */}
            <div className="bg-white/10 rounded-xl p-3.5 border border-white/10 flex items-center justify-between text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <BookOpen size={15} className="text-purple-400" />
                <span className="font-bold">Course Marketplace</span>
              </div>
              <span className="text-[10px] text-purple-300 font-bold">Live Portal</span>
            </div>
          </motion.div>
        </div>

        {/* Center Button */}
        <div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="inline-block">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-900 font-bold rounded-xl text-xs sm:text-sm transition-colors shadow-md cursor-pointer"
            >
              <span>Start as Builder</span>
              <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

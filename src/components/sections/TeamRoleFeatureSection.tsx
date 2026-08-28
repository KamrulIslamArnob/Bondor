"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Layers, ArrowRight, Box, BookOpen } from "lucide-react";

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
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            A workspace tailored for your production role
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
              <h3 className="text-base font-bold text-white">
                Screenprint &amp; Apparel Lab
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Calibrate inks and screen mesh to ensure consistent results across every print run.
              </p>
            </div>

            {/* Micro Graphic */}
            <div className="bg-white/10 rounded-xl p-3.5 border border-white/10 flex items-center justify-between text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <Layers size={15} className="text-blue-400" />
                <span className="font-bold">Emulsion Calibration</span>
              </div>
              <span className="text-xs text-emerald-400 font-bold">180 GSM Ready</span>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 rounded-2xl p-6 transition-colors duration-200 space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white">
                Starter Packs &amp; Raw Supplies
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Order pre-calibrated material bundles directly from certified regional suppliers.
              </p>
            </div>

            {/* Micro Graphic */}
            <div className="bg-white/10 rounded-xl p-3.5 border border-white/10 flex items-center justify-between text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <Box size={15} className="text-amber-400" />
                <span className="font-bold">Soy Wax &amp; Wicks Kit</span>
              </div>
              <span className="text-xs text-amber-300 font-bold">1kg Pack</span>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div 
            whileHover={{ y: -4, scale: 1.02 }}
            className="bg-white/[0.04] hover:bg-white/[0.07] border border-white/10 rounded-2xl p-6 transition-colors duration-200 space-y-5 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white">
                Vendor &amp; Academy Hub
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                Manage material listings, monitor batch orders, and publish step-by-step masterclasses.
              </p>
            </div>

            {/* Micro Graphic */}
            <div className="bg-white/10 rounded-xl p-3.5 border border-white/10 flex items-center justify-between text-xs text-slate-200">
              <div className="flex items-center gap-2">
                <BookOpen size={15} className="text-purple-400" />
                <span className="font-bold">Course Marketplace</span>
              </div>
              <span className="text-xs text-purple-300 font-bold">Live Portal</span>
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

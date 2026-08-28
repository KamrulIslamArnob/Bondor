"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, GitBranch, GitCommit, GitMerge, User } from "lucide-react";

export const GitForManufacturingSection: React.FC = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left: Text & Bullets (6 cols) */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-6 space-y-6"
        >
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200/80 rounded-full text-xs font-bold text-blue-700">
              <span>Version-Controlled Production</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug font-serif">
              The <span className="text-blue-600">"Git"</span> for micro-manufacturing
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              No more chasing lost formula notes, unverified supplier ratios, or trial-and-error scrap — organize, test, and track batch recipes and production runs in one structured workspace.
            </p>
          </div>

          <div className="space-y-3 text-xs sm:text-sm font-semibold text-slate-800">
            <div className="flex items-center gap-2.5">
              <span className="text-blue-600">►</span>
              <span className="text-blue-600 hover:underline cursor-pointer">Work on multiple craft docks in parallel</span>
              <span className="text-slate-600 font-normal">(Tees, Candles, Soaps)</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-blue-600">►</span>
              <span className="text-slate-900 font-bold">Track ingredient &amp; formula history</span>
              <span className="text-slate-600 font-normal">and revert if needed</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-blue-600">►</span>
              <span className="text-blue-600 hover:underline cursor-pointer">Connect masterclass lessons directly</span>
              <span className="text-slate-600 font-normal">with verified supply kits</span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/builder-dashboard"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              <span>Explore Maker Docks</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </motion.div>

        {/* Right: Branching Visual Diagram Card (6 cols) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-6"
        >
          <div className="relative aspect-[4/3] rounded-3xl bg-gradient-to-br from-slate-50 via-blue-50/40 to-slate-100 border border-slate-200/90 p-6 sm:p-8 shadow-card flex flex-col justify-between">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                <GitBranch size={16} className="text-blue-600" />
                <span>Production Tree: Graphic Apparel Run</span>
              </div>
              <span className="text-[10px] font-bold text-blue-700 bg-blue-100/80 px-2 py-0.5 rounded-full">
                v2.4 Live
              </span>
            </div>

            {/* Tree Nodes Graphic with Hover Animation */}
            <div className="space-y-3.5 py-3">
              {/* Branch 1 */}
              <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs">
                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs">
                  01
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Emulsion Coating &amp; Darkroom Exposure</span>
                    <span className="text-[10px] text-emerald-600 font-semibold">100% Ready</span>
                  </div>
                  <span className="text-[11px] text-slate-500">110-mesh screen calibrated · Dhaka Studio</span>
                </div>
              </motion.div>

              {/* Branch 2 */}
              <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-slate-200/80 shadow-xs ml-4">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center font-bold text-xs">
                  02
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">50 Premium Cotton Blanks</span>
                    <span className="text-[10px] text-blue-600 font-semibold">Received</span>
                  </div>
                  <span className="text-[11px] text-slate-500">180 GSM Pre-shrunk Organic Cotton</span>
                </div>
              </motion.div>

              {/* Branch 3 */}
              <motion.div whileHover={{ scale: 1.02 }} className="flex items-center gap-3 bg-white p-3 rounded-2xl border border-blue-300 shadow-xs">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold text-xs">
                  03
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900">Plastisol Print &amp; Heat Cure</span>
                    <span className="text-[10px] text-emerald-600 font-bold">In Production</span>
                  </div>
                  <span className="text-[11px] text-slate-500">Single-pass squeegee pull · 320°F cure</span>
                </div>
              </motion.div>
            </div>

            {/* Bottom Status */}
            <div className="flex items-center justify-between text-xs text-slate-600 pt-2 border-t border-slate-200/80">
              <span className="font-medium">Unit Batch Margin: 68.4%</span>
              <span className="font-bold text-blue-600">All Nodes Verified</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Clock, ShieldCheck } from "lucide-react";

export const SpotlightCaseStudySection: React.FC = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-blue-50/90 via-sky-50/70 to-indigo-50/60 border border-blue-200/80 rounded-3xl p-8 sm:p-12 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
      >
        {/* Left Side: Headline & Metric Callout Pills (7 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-blue-200 rounded-full text-xs font-bold text-blue-700 shadow-xs">
            <span>Maker Spotlight</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug font-serif">
            Dhaka Streetwear Co. increases the{" "}
            <span className="text-blue-600">speed</span> of rolling out new product lines
          </h3>

          <div className="space-y-3">
            <div className="bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-blue-200/70 flex items-center gap-3 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                <Zap size={16} />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-900 tabular-nums">
                90% faster small-batch turnaround
              </span>
            </div>

            <div className="bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-blue-200/70 flex items-center gap-3 shadow-xs">
              <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                <Clock size={16} />
              </div>
              <span className="text-xs sm:text-sm font-bold text-slate-900 tabular-nums">
                48-hour wholesale material replenishment
              </span>
            </div>
          </div>

          <div className="pt-1">
            <Link
              href="/courses?business=tshirt"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              <span>Read maker story</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Right Side: Quote & Maker Avatar (5 cols) */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="lg:col-span-6 bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-blue-200/80 shadow-card flex flex-col justify-between space-y-6"
        >
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal italic">
            "With Bondor's verified supply packs, I eliminated supply headaches and material inconsistency. We went from guessing chemical ratios to scaling production to 500 orders/month."
          </p>

          <div className="flex items-center justify-between border-t border-slate-100 pt-4">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80"
                alt="Tariqul Islam"
                className="w-10 h-10 rounded-full object-cover border border-blue-200 shrink-0"
              />
              <div>
                <h4 className="text-xs font-bold text-slate-900">Tariqul Islam</h4>
                <p className="text-[11px] text-slate-500">Founder · Dhaka Streetwear Co.</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-extrabold tracking-tight text-blue-600 font-serif block">
                DHAKA STREETWEAR
              </span>
              <span className="text-[10px] text-slate-400 font-medium">Verified Maker</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

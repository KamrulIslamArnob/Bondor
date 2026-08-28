"use client";

import React, { useState } from "react";
import { CheckCircle2, ChevronRight, Package, BookOpen, Calculator, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export const StepByStepFlowSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      number: "১",
      title: "Connect with verified suppliers",
      bnTitle: "যাচাইকৃত পাইকারি সরবরাহকারীদের সাথে যুক্ত হোন",
      desc: "Select your business dock (T-shirts, candles, soaps, or mugs) and source certified raw material starter packs without middlemen.",
    },
    {
      number: "২",
      title: "Automate batch calculations",
      bnTitle: "ব্যাচ লাভ ও খরচের হিসাব স্বয়ংক্রিয় করুন",
      desc: "Use our live batch unit economics calculator to determine exact production costs, packaging overhead, and profit margins.",
    },
    {
      number: "৩",
      title: "Master the craft with video courses",
      bnTitle: "বাংলা ভিডিও কোর্সে প্রতিটি কৌশল শিখুন",
      desc: "Follow modular video masterclasses taught in Bangla by practicing Bangladeshi makers, with step-by-step ratio guidance.",
    },
    {
      number: "৪",
      title: "Review, test, and launch",
      bnTitle: "ট্রায়াল ব্যাচ তৈরি ও ফিনিশিং পরীক্ষা করুন",
      desc: "Conduct small test runs with starter bundles, inspect finish quality, and prepare product batches for retail.",
    },
    {
      number: "৫",
      title: "Analyze production ROI",
      bnTitle: "উৎপাদন মুনাফা বিশ্লেষণ ও ব্যবসা স্কেল করুন",
      desc: "Track completed units, monitor raw inventory replenishment timelines, and scale up batch sizes seamlessly.",
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-12">
      {/* Title */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto space-y-2"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200/80 rounded-full text-xs font-bold text-blue-700">
          <span className="font-hind">পর্যায়ক্রমিক গাইডলাইন</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight text-balance font-serif">
          The production workflow for{" "}
          <span className="text-blue-600">successful</span> product launches
        </h2>
        <p className="text-sm text-slate-600 font-normal">
          From first craft exploration to repeat wholesale batch manufacturing.
        </p>
      </motion.div>

      {/* Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left: 5 Numbered Steps List (6 cols) */}
        <div className="lg:col-span-6 space-y-2">
          {steps.map((s, idx) => {
            const isActive = activeStep === idx;
            return (
              <motion.div
                key={idx}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveStep(idx)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isActive
                    ? "bg-white border-blue-300 shadow-card ring-1 ring-blue-400/30"
                    : "bg-slate-50/60 hover:bg-white border-slate-200/80 hover:border-slate-300"
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-colors font-hind ${
                      isActive
                        ? "bg-blue-600 text-white shadow-xs"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {s.number}
                  </div>
                  <div className="space-y-1 min-w-0">
                    <h3 className={`text-sm sm:text-base font-bold ${isActive ? "text-slate-900 font-serif" : "text-slate-700"}`}>
                      {s.title}
                    </h3>
                    <span className="font-hind text-xs font-semibold text-blue-600 block">
                      {s.bnTitle}
                    </span>
                    {isActive && (
                      <p className="text-xs text-slate-600 leading-relaxed font-normal animate-in fade-in duration-200 pt-1">
                        {s.desc}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right: Dynamic Step Graphic Card (6 cols) */}
        <div className="lg:col-span-6">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeStep}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="aspect-[4/3] rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-8 border border-slate-800 shadow-card flex flex-col justify-between relative overflow-hidden"
            >
              {/* Ambient Glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

              {/* Header */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-blue-400 font-hind">পর্যায় {steps[activeStep].number} (মোট ৫টি)</span>
                </div>
                <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30 font-hind">
                  সক্রিয় ধাপ
                </span>
              </div>

              {/* Step Content Visual */}
              <div className="relative z-10 space-y-3 my-auto">
                <h4 className="text-xl font-bold text-white font-serif">
                  {steps[activeStep].title}
                </h4>
                <p className="text-xs font-semibold text-sky-300 font-hind">
                  {steps[activeStep].bnTitle}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed font-normal">
                  {steps[activeStep].desc}
                </p>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15 flex items-center justify-between text-xs font-hind">
                  <span className="text-sky-200">সার্টিফাইড ওয়ার্কফ্লো</span>
                  <span className="text-white font-bold">বন্দর ভেরিফাইড</span>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="relative z-10 pt-4 border-t border-white/10 flex items-center justify-between">
                <Link
                  href="/builder-dashboard"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-white transition-colors"
                >
                  <span className="font-hind">ড্যাশবোর্ডে দেখুন</span>
                  <ArrowRight size={13} />
                </Link>
                <span className="text-[10px] text-slate-400 font-hind">ধাপ {steps[activeStep].number} নির্বাচিত</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

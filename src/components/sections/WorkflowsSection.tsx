"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Play, CheckCircle2, Package, Sparkles, Layers, ShieldCheck, Code, FileText } from "lucide-react";

export const WorkflowsSection: React.FC = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-20">
      {/* Centered Main Section Title */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight text-balance">
          Your manufacturing{" "}
          <span className="text-blue-600">structure</span> the way you want
        </h2>
        <p className="text-sm text-slate-600">
          Tailor training, raw supply kits, and production pipelines to your workshop's exact needs.
        </p>
      </div>

      {/* Row 1: Left Text & Bullets, Right Interactive Workflow Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left: Text Content (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Create continuous production workflows
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Reduce time-consuming manual tasks and empower local makers to formulate, print, and package at scale.
            </p>
          </div>

          <div className="space-y-3 text-xs sm:text-sm font-semibold text-slate-800">
            <div className="flex items-center gap-2.5">
              <span className="text-blue-600">►</span>
              <span className="text-blue-600 hover:underline cursor-pointer">Auto-calculate unit economics</span>
              <span className="text-slate-600 font-normal">with verified batch margins</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-blue-600">►</span>
              <span className="text-slate-900 font-bold">Set up wholesale starter packs</span>
              <span className="text-slate-600 font-normal">with a few clicks</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-blue-600">►</span>
              <span className="text-blue-600 hover:underline cursor-pointer">Auto-verify material purity</span>
              <span className="text-slate-600 font-normal">from certified local vendors</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-blue-600">►</span>
              <span className="text-slate-900 font-bold">Jump-start production</span>
              <span className="text-slate-600 font-normal">with Bangla video masterclasses</span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/builder-dashboard"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              <span>Explore Builder Dashboard</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>

        {/* Right: Modern Workshop Workflow Card Graphic (6 cols) */}
        <div className="lg:col-span-6">
          <div className="relative aspect-[4/3] rounded-3xl bg-gradient-to-br from-blue-50 via-sky-50 to-emerald-50 border border-slate-200/90 p-6 shadow-card overflow-hidden flex flex-col justify-between">
            {/* Header Mini Status */}
            <div className="flex items-center justify-between bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold text-slate-800">Production Pipeline: Dhaka Hub</span>
              </div>
              <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                JSON Spec
              </span>
            </div>

            {/* Middle Workflow Diagram Graphic */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
              <div className="flex items-center justify-between text-xs border-b border-slate-100 pb-2">
                <span className="font-bold text-slate-900">Batch #BD-2026-04</span>
                <span className="text-emerald-600 font-bold">100% Quality Pass</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-xl bg-blue-50 border border-blue-200/60">
                  <span className="text-[10px] text-slate-500 block">Raw Fabric</span>
                  <span className="font-bold text-blue-900 text-xs">180 GSM Cotton</span>
                </div>
                <div className="p-2 rounded-xl bg-amber-50 border border-amber-200/60">
                  <span className="text-[10px] text-slate-500 block">Plastisol Ink</span>
                  <span className="font-bold text-amber-900 text-xs">1kg Eco Formula</span>
                </div>
                <div className="p-2 rounded-xl bg-emerald-50 border border-emerald-200/60">
                  <span className="text-[10px] text-slate-500 block">Profit Margin</span>
                  <span className="font-bold text-emerald-900 text-xs">68.4% Gross</span>
                </div>
              </div>
            </div>

            {/* Bottom Floating Pill Tag */}
            <div className="flex items-center justify-between text-xs text-slate-600 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-200/60">
              <span className="font-medium">Direct Wholesale Dispatch</span>
              <span className="font-bold text-blue-600">48-Hour Regional Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Left Visual Graphic, Right Text & Bullets */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left: Video Masterclass & Quality Visual (6 cols) */}
        <div className="lg:col-span-6 order-2 lg:order-1">
          <div className="relative aspect-[4/3] rounded-3xl bg-gradient-to-br from-indigo-50 via-blue-50 to-sky-50 border border-slate-200/90 p-6 shadow-card overflow-hidden flex flex-col justify-between">
            {/* Header Video Masterclass Badge */}
            <div className="flex items-center justify-between bg-white/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-slate-200/80 shadow-xs">
              <div className="flex items-center gap-2">
                <Play size={14} className="text-blue-600 fill-blue-600" />
                <span className="text-xs font-bold text-slate-800">Masterclass: Candle &amp; Soap Craft</span>
              </div>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                100% Practical
              </span>
            </div>

            {/* Middle Graphic with Video Snapshot */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs aspect-[16/9]">
              <img
                src="https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=85"
                alt="Artisan candle making"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                <div className="text-white space-y-1">
                  <span className="text-xs font-bold block">Lesson 03: Soy Wax Temperature &amp; Flashpoint</span>
                  <span className="text-[10px] text-sky-200">Bangla commentary + downloadable curing chart</span>
                </div>
              </div>
            </div>

            {/* Bottom Status Bar */}
            <div className="flex items-center justify-between text-xs text-slate-600 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-200/60">
              <span className="font-medium">Curriculum Lifetime Streaming</span>
              <span className="font-bold text-emerald-600">Zero Defect Batches</span>
            </div>
          </div>
        </div>

        {/* Right: Text Content (6 cols) */}
        <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
          <div className="space-y-3">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              Manufacture 8X faster with{" "}
              <span className="text-blue-600">verified material packs</span> and zero waste
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Accelerate the pace of small-batch production with Bondor Starter Packs. Get raw material ratios that are accurate and ready to use the first time around — and save up to 70% in trial costs.
            </p>
          </div>

          <div className="space-y-3 text-xs sm:text-sm font-semibold text-slate-800">
            <div className="flex items-center gap-2.5">
              <span className="text-blue-600">►</span>
              <span className="text-blue-600 hover:underline cursor-pointer">Order tested raw ingredients</span>
              <span className="text-slate-600 font-normal">in calibrated workshop packs</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-blue-600">►</span>
              <span className="text-slate-900 font-bold">Standardize temperature &amp; formulas</span>
              <span className="text-slate-600 font-normal">with downloadable charts</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-blue-600">►</span>
              <span className="text-blue-600 hover:underline cursor-pointer">Distribute finished goods</span>
              <span className="text-slate-600 font-normal">to 100+ local retail outlets</span>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              <span>Explore Masterclasses</span>
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

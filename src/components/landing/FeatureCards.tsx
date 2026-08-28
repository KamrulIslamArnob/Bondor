"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Package, Calculator, ArrowUpRight, Play, CheckCircle2, ShieldCheck } from "lucide-react";

export const FeatureCards: React.FC = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
            <span>How Bondor Works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-slate-900 tracking-tight leading-tight text-balance">
            Learn the Craft,
            <br />
            Order the Starter Kits
          </h2>
        </div>

        <p className="text-sm text-slate-600 max-w-md leading-relaxed text-pretty font-normal">
          Skip months of trial, error, and wasted material. Follow hands-on masterclass video courses taught by local masters, then order verified production-grade raw supply packs delivered to your workshop.
        </p>
      </div>

      {/* 3 Column Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Video Masterclasses */}
        <Link
          href="/courses"
          className="group bg-white border border-slate-200/80 rounded-2xl overflow-hidden p-5 flex flex-col justify-between gap-5 transition-[box-shadow,border-color,transform] duration-200 shadow-xs hover:shadow-card hover:border-sky-300 hover:-translate-y-1"
        >
          {/* Micro Preview Box */}
          <div className="relative aspect-[16/10] w-full rounded-xl bg-gradient-to-br from-emerald-100 via-teal-50 to-sky-100 border border-slate-200/80 overflow-hidden flex flex-col justify-center items-center p-4">
            <div className="w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md shadow-sm border border-white/60 flex items-center justify-center text-sky-600 group-hover:scale-110 transition-transform">
              <Play size={20} className="ml-0.5" />
            </div>
            <div className="absolute bottom-2.5 left-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-slate-200/60 flex items-center justify-between text-[11px] font-medium text-slate-700">
              <span className="flex items-center gap-1">
                <BookOpen size={12} className="text-sky-600" />
                <span>4 Docks · 16 Masterclasses</span>
              </span>
              <span className="text-emerald-600 font-bold">1080p HD</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base group-hover:text-sky-600 transition-colors flex items-center gap-1.5">
                01. Video Masterclasses
              </h3>
              <ArrowUpRight size={15} className="text-slate-400 group-hover:text-sky-600 transition-colors" />
            </div>
            <p className="text-xs text-slate-500 leading-relaxed text-pretty">
              Follow step-by-step modular lessons covering screen preparation, ink mixing, soy wax pouring, and cold-process curing.
            </p>
          </div>
        </Link>

        {/* Card 2: Curated Raw Material Packs */}
        <Link
          href="/materials"
          className="group bg-white border border-slate-200/80 rounded-2xl overflow-hidden p-5 flex flex-col justify-between gap-5 transition-[box-shadow,border-color,transform] duration-200 shadow-xs hover:shadow-card hover:border-sky-300 hover:-translate-y-1"
        >
          {/* Micro Preview Box */}
          <div className="relative aspect-[16/10] w-full rounded-xl bg-gradient-to-br from-amber-100 via-orange-50 to-sky-100 border border-slate-200/80 overflow-hidden flex flex-col justify-center items-center p-4">
            <div className="w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md shadow-sm border border-white/60 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
              <Package size={22} />
            </div>
            <div className="absolute bottom-2.5 left-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-slate-200/60 flex items-center justify-between text-[11px] font-medium text-slate-700">
              <span className="flex items-center gap-1">
                <CheckCircle2 size={12} className="text-emerald-600" />
                <span>Certified Raw Ingredients</span>
              </span>
              <span className="text-slate-900 font-bold tabular-nums">11 Starter Kits</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base group-hover:text-sky-600 transition-colors flex items-center gap-1.5">
                02. Curated Material Kits
              </h3>
              <ArrowUpRight size={15} className="text-slate-400 group-hover:text-sky-600 transition-colors" />
            </div>
            <p className="text-xs text-slate-500 leading-relaxed text-pretty">
              Get tested starter bundles containing exact ratios of waxes, blank tees, botanical oils, and screen mesh delivered from local vendors.
            </p>
          </div>
        </Link>

        {/* Card 3: Batch Economics & Escrow */}
        <Link
          href="/builder-dashboard"
          className="group bg-white border border-slate-200/80 rounded-2xl overflow-hidden p-5 flex flex-col justify-between gap-5 transition-[box-shadow,border-color,transform] duration-200 shadow-xs hover:shadow-card hover:border-sky-300 hover:-translate-y-1"
        >
          {/* Micro Preview Box */}
          <div className="relative aspect-[16/10] w-full rounded-xl bg-gradient-to-br from-sky-100 via-blue-50 to-indigo-100 border border-slate-200/80 overflow-hidden flex flex-col justify-center items-center p-4">
            <div className="w-12 h-12 rounded-2xl bg-white/90 backdrop-blur-md shadow-sm border border-white/60 flex items-center justify-center text-sky-600 group-hover:scale-110 transition-transform">
              <Calculator size={22} />
            </div>
            <div className="absolute bottom-2.5 left-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-slate-200/60 flex items-center justify-between text-[11px] font-medium text-slate-700">
              <span className="flex items-center gap-1">
                <ShieldCheck size={12} className="text-emerald-600" />
                <span>100% Escrow Protected</span>
              </span>
              <span className="text-sky-700 font-bold">Auto Pricing</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base group-hover:text-sky-600 transition-colors flex items-center gap-1.5">
                03. Unit Batch Economics
              </h3>
              <ArrowUpRight size={15} className="text-slate-400 group-hover:text-sky-600 transition-colors" />
            </div>
            <p className="text-xs text-slate-500 leading-relaxed text-pretty">
              Calculate cost-per-unit, profit margins, and packaging overhead before placing batch orders with secure checkout.
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
};

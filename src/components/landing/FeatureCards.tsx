"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Package, Calculator, ArrowUpRight, Play, CheckCircle2, ShieldCheck, ShoppingBag } from "lucide-react";

export const FeatureCards: React.FC = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-12">
      {/* Section Header based on Project Purpose */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
            <span>Integrated Startup System</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-slate-900 tracking-tight leading-tight text-balance">
            Combining Business Education
            <br />
            &amp; Wholesale Sourcing
          </h2>
        </div>

        <p className="text-sm text-slate-600 max-w-md leading-relaxed text-pretty font-normal">
          New entrepreneurs struggle with knowing where to learn essential craft skills and where to find trusted wholesale suppliers. Bondor solves both problems in a single unified harbor.
        </p>
      </div>

      {/* 3 Column Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Course Marketplace */}
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
                <span>Video Masterclasses</span>
              </span>
              <span className="text-emerald-600 font-bold">Bangla Guides</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base group-hover:text-sky-600 transition-colors flex items-center gap-1.5">
                01. Business Education
              </h3>
              <ArrowUpRight size={15} className="text-slate-400 group-hover:text-sky-600 transition-colors" />
            </div>
            <p className="text-xs text-slate-500 leading-relaxed text-pretty font-normal">
              Follow practical, step-by-step modular courses taught by experienced creators covering printing, candle pouring, soap chemistry, and product packaging.
            </p>
          </div>
        </Link>

        {/* Card 2: Wholesale Material Packs */}
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
                <span>Verified Suppliers</span>
              </span>
              <span className="text-slate-900 font-bold tabular-nums">Wholesale Packs</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base group-hover:text-sky-600 transition-colors flex items-center gap-1.5">
                02. Wholesale Starter Packs
              </h3>
              <ArrowUpRight size={15} className="text-slate-400 group-hover:text-sky-600 transition-colors" />
            </div>
            <p className="text-xs text-slate-500 leading-relaxed text-pretty font-normal">
              Order tested small-batch material starter packs directly from local wholesale vendors with certified ingredients and batch pricing.
            </p>
          </div>
        </Link>

        {/* Card 3: Batch Economics & Checkout */}
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
                <span>Stripe Gateway</span>
              </span>
              <span className="text-sky-700 font-bold">Secure Cart</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base group-hover:text-sky-600 transition-colors flex items-center gap-1.5">
                03. Unit Economics &amp; Checkout
              </h3>
              <ArrowUpRight size={15} className="text-slate-400 group-hover:text-sky-600 transition-colors" />
            </div>
            <p className="text-xs text-slate-500 leading-relaxed text-pretty font-normal">
              Calculate cost-per-unit, raw material ratios, and estimated profit margins before placing your order through our Stripe payment gateway.
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
};

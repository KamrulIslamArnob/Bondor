"use client";

import React from "react";
import Link from "next/link";
import { BookOpen, Package, Calculator, ArrowUpRight, Play, CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

export const FeatureCards: React.FC = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-12">
      {/* Section Header */}
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
          New entrepreneurs struggle with knowing where to learn essential craft skills and where to find trusted wholesale suppliers. Bondor solves both problems in a single unified digital harbor.
        </p>
      </div>

      {/* 3 Column Feature Cards with Sharp Photography */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Course Marketplace */}
        <Link
          href="/courses"
          className="group bg-white border border-slate-200/80 rounded-3xl overflow-hidden p-5 flex flex-col justify-between gap-5 transition-[box-shadow,border-color,transform] duration-200 shadow-xs hover:shadow-card hover:border-sky-300 hover:-translate-y-1"
        >
          {/* Sharp Image Preview Box */}
          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-200/80 group-hover:scale-[1.02] transition-transform duration-300">
            <img
              src="https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=85"
              alt="T-shirt screenprinting production course"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-slate-900 flex items-center gap-1 shadow-xs">
              <Play size={11} className="text-sky-600 fill-sky-600" />
              <span>Bangla Masterclasses</span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-semibold text-white">
              <span className="flex items-center gap-1">
                <BookOpen size={12} className="text-sky-400" />
                <span>4 Docks · 16 Video Lessons</span>
              </span>
              <span className="text-emerald-400 font-bold">1080p HD</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base group-hover:text-sky-600 transition-colors flex items-center gap-1.5 font-serif">
                01. Business Education
              </h3>
              <ArrowUpRight size={15} className="text-slate-400 group-hover:text-sky-600 transition-colors" />
            </div>
            <p className="text-xs text-slate-500 leading-relaxed text-pretty font-normal">
              Follow practical, step-by-step modular video courses covering screen preparation, soy wax pouring, soap chemistry, and product packaging.
            </p>
          </div>
        </Link>

        {/* Card 2: Wholesale Material Packs */}
        <Link
          href="/materials"
          className="group bg-white border border-slate-200/80 rounded-3xl overflow-hidden p-5 flex flex-col justify-between gap-5 transition-[box-shadow,border-color,transform] duration-200 shadow-xs hover:shadow-card hover:border-sky-300 hover:-translate-y-1"
        >
          {/* Sharp Image Preview Box */}
          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-200/80 group-hover:scale-[1.02] transition-transform duration-300">
            <img
              src="https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=85"
              alt="Artisan candle making starter pack"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-slate-900 flex items-center gap-1 shadow-xs">
              <Package size={11} className="text-amber-600" />
              <span>Wholesale Starter Packs</span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-semibold text-white">
              <span className="flex items-center gap-1">
                <CheckCircle2 size={12} className="text-emerald-400" />
                <span>Verified Suppliers</span>
              </span>
              <span className="text-amber-300 font-bold tabular-nums">Direct Pricing</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base group-hover:text-sky-600 transition-colors flex items-center gap-1.5 font-serif">
                02. Wholesale Material Packs
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
          className="group bg-white border border-slate-200/80 rounded-3xl overflow-hidden p-5 flex flex-col justify-between gap-5 transition-[box-shadow,border-color,transform] duration-200 shadow-xs hover:shadow-card hover:border-sky-300 hover:-translate-y-1"
        >
          {/* Sharp Image Preview Box */}
          <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-slate-200/80 group-hover:scale-[1.02] transition-transform duration-300">
            <img
              src="https://images.unsplash.com/photo-1607006314633-8a30364d99c4?auto=format&fit=crop&w=800&q=85"
              alt="Handcrafted soap and batch unit economics"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-slate-900 flex items-center gap-1 shadow-xs">
              <Calculator size={11} className="text-sky-600" />
              <span>Unit Batch Economics</span>
            </div>

            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-semibold text-white">
              <span className="flex items-center gap-1">
                <ShieldCheck size={12} className="text-emerald-400" />
                <span>Stripe Gateway</span>
              </span>
              <span className="text-sky-300 font-bold">Secure Cart</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900 text-base group-hover:text-sky-600 transition-colors flex items-center gap-1.5 font-serif">
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

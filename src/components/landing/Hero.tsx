"use client";

import React from "react";
import { AuthWidget } from "./AuthWidget";
import { ShieldCheck, Box, BookOpen, ArrowRight, Layers, Flame, Sparkles, Printer, CheckCircle2, TrendingUp } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { BUSINESS_CATEGORIES } from "@/lib/constants";

export const Hero: React.FC<{ initialMode?: "login" | "signup" }> = ({ initialMode = "login" }) => {
  const getDockIcon = (id: string) => {
    switch (id) {
      case "tshirt":
        return <Layers size={18} className="text-slate-900" />;
      case "candle":
        return <Flame size={18} className="text-slate-900" />;
      case "soap":
        return <Sparkles size={18} className="text-slate-900" />;
      default:
        return <Printer size={18} className="text-slate-900" />;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-10 py-4 sm:py-8">
      {/* Top Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-sky-200/80 bg-gradient-to-br from-sky-600 via-sky-500 to-sky-700 p-7 sm:p-11 shadow-sm text-white">
        {/* Subtle decorative glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-sky-400/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6 max-w-3xl">
          {/* Top Pill Badges */}
          <div className="flex flex-wrap items-center gap-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/15 backdrop-blur-md text-white border border-white/20 rounded-full text-xs font-semibold shadow-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Bondor Platform · Live 2026</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/10 backdrop-blur-md text-sky-100 border border-white/15 rounded-full text-xs font-medium">
              <span>Production &amp; Sourcing Harbor</span>
            </div>
          </div>

          {/* Main Hero Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-balance">
            Launch your next maker business from one harbor.
          </h1>

          <p className="text-base sm:text-lg text-sky-100 max-w-2xl leading-relaxed font-normal text-pretty">
            Learn hands-on production through step-by-step modular video courses, then order curated starter
            material kits from verified suppliers in Bangladesh.
          </p>

          {/* Feature Highlights Pills */}
          <div className="flex flex-wrap items-center gap-2.5 pt-2">
            <div className="flex items-center gap-2 bg-white text-slate-900 px-3.5 py-2 rounded-full text-xs font-semibold shadow-xs hover:bg-sky-50 transition-colors">
              <BookOpen size={14} className="text-sky-600" />
              <span>01. Modular Video Academy</span>
            </div>
            <div className="flex items-center gap-2 bg-white text-slate-900 px-3.5 py-2 rounded-full text-xs font-semibold shadow-xs hover:bg-sky-50 transition-colors">
              <Box size={14} className="text-sky-600" />
              <span>02. Raw Supply Starter Kits</span>
            </div>
            <div className="flex items-center gap-2 bg-white text-slate-900 px-3.5 py-2 rounded-full text-xs font-semibold shadow-xs hover:bg-sky-50 transition-colors">
              <ShieldCheck size={14} className="text-emerald-600" />
              <span>03. Certified Escrow Checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Showcase Grid: Value Cards + Auth Widget */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: How it Works & Platform Highlights */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white border border-slate-200/80 rounded-3xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider block">
                  How Bondor Works
                </span>
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-0.5 text-balance">
                  From learning to small-batch production
                </h3>
              </div>
              <span className="text-xs font-semibold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200/80">
                End-to-End
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/60 space-y-2">
                <div className="w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xs">
                  1
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Watch Lessons</h4>
                <p className="text-xs text-slate-500 leading-relaxed text-pretty">
                  Follow step-by-step masterclasses taught by local verified makers.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/60 space-y-2">
                <div className="w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xs">
                  2
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Order Supplies</h4>
                <p className="text-xs text-slate-500 leading-relaxed text-pretty">
                  Get certified raw materials and equipment packs delivered directly.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/60 space-y-2">
                <div className="w-8 h-8 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xs">
                  3
                </div>
                <h4 className="font-bold text-slate-900 text-sm">Make &amp; Sell</h4>
                <p className="text-xs text-slate-500 leading-relaxed text-pretty">
                  Calculate unit batch economics and distribute your physical items.
                </p>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-100 text-center">
              <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/60">
                <div className="text-lg font-bold text-slate-900 tabular-nums">4 Docks</div>
                <div className="text-[11px] text-slate-500 font-medium">Live Categories</div>
              </div>
              <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/60">
                <div className="text-lg font-bold text-emerald-600 tabular-nums">100%</div>
                <div className="text-[11px] text-slate-500 font-medium">Escrow Protected</div>
              </div>
              <div className="p-3 bg-slate-50/80 rounded-xl border border-slate-200/60">
                <div className="text-lg font-bold text-sky-600">Instant</div>
                <div className="text-[11px] text-slate-500 font-medium">Curriculum Access</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Auth Card */}
        <div className="lg:col-span-5 flex flex-col items-center lg:items-end space-y-4">
          <AuthWidget initialMode={initialMode} />

          {/* Quick Direct Catalog Exploration Button */}
          <div className="w-full max-w-md bg-white border border-slate-200/80 rounded-2xl p-4 flex items-center justify-between gap-3 text-xs shadow-xs">
            <span className="text-slate-600 font-medium">Want to explore available docks first?</span>
            <Link href="/builder-dashboard">
              <Button variant="default" size="sm" rightIcon={<ArrowRight size={13} />}>
                Browse Docks
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Active Harbor Docks Bento Strip */}
      <div className="space-y-5 pt-2">
        <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-900 tracking-tight">
              Featured Business Categories
            </h3>
            <span className="text-xs font-semibold bg-sky-50 text-sky-700 px-2.5 py-0.5 rounded-full border border-sky-200/80 tabular-nums">
              4 Active
            </span>
          </div>
          <span className="text-xs text-slate-500 font-medium">Updated Today</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {BUSINESS_CATEGORIES.map((dock, index) => {
            const numPrefix = `0${index + 1}.`;
            return (
              <Link
                key={dock.id}
                href={`/courses?business=${dock.id}`}
                className="bg-white border border-slate-200/80 rounded-2xl p-5 space-y-4 transition-[box-shadow,border-color,transform] duration-200 block group shadow-xs hover:shadow-card hover:border-sky-300 hover:-translate-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md tabular-nums">
                      {numPrefix}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center font-bold">
                      {getDockIcon(dock.id)}
                    </div>
                  </div>
                  <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200/80 tabular-nums">
                    {dock.growth}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-sky-600 transition-colors text-balance">
                    {dock.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed text-pretty">
                    {dock.subtitle}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600 font-medium tabular-nums">
                  <span className="bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200/60">{dock.coursesCount} Courses</span>
                  <span className="bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200/60">{dock.materialsCount} Kits</span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

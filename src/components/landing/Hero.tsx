"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, Sparkles, Layers, Flame, Box, Anchor } from "lucide-react";
import { BUSINESS_CATEGORIES } from "@/lib/constants";

export const Hero: React.FC<{ initialMode?: "login" | "signup" }> = () => {
  const router = useRouter();
  const [promptQuery, setPromptQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCategory !== "all") {
      router.push(`/courses?business=${selectedCategory}`);
    } else if (promptQuery.trim()) {
      router.push(`/courses?q=${encodeURIComponent(promptQuery.trim())}`);
    } else {
      router.push("/builder-dashboard");
    }
  };

  const handleQuickChip = (categoryKey: string) => {
    setSelectedCategory(categoryKey);
    router.push(`/courses?business=${categoryKey}`);
  };

  return (
    <div className="w-full">
      {/* Scenic Pastoral Hero Canvas */}
      <div className="relative w-full min-h-[540px] sm:min-h-[620px] rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs flex flex-col justify-center items-center text-center p-6 sm:p-12 md:p-16">
        {/* Pastoral Landscape Background Gradient & SVG Artwork */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#8fd3f4]/40 via-[#d4fc79]/20 to-[#FAF8F5] pointer-events-none" />
        
        {/* Subtle landscape rolling hills SVG styling */}
        <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400/20 via-emerald-300/15 to-transparent" />

        {/* Ambient Fog / Glow Orbs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-3/4 h-80 bg-white/50 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6 sm:space-y-8 flex flex-col items-center">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/90 backdrop-blur-md text-slate-800 border border-slate-200/90 rounded-full text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-600 font-medium">✨ Introducing Bondor Platform · Live 2026</span>
          </div>

          {/* Main Hero Headline in Serif / High Contrast */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-slate-900 tracking-tight leading-[1.1] text-balance">
            Your Business Runs Smarter
            <br />
            With a Harbor That Actually Works
          </h1>

          {/* Hero Subtitle */}
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed text-pretty font-normal">
            Learn hands-on small-batch production through modular video masterclasses, then order certified starter material packs directly from verified suppliers in Bangladesh.
          </p>

          {/* Central Interactive Search / Prompt Box Floating Card */}
          <div className="w-full max-w-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-card text-left space-y-3">
            <form onSubmit={handleSearchSubmit} className="space-y-3">
              <div className="relative">
                <textarea
                  rows={2}
                  placeholder="Ask anything about launching a maker business, raw supplies, or courses..."
                  value={promptQuery}
                  onChange={(e) => setPromptQuery(e.target.value)}
                  className="w-full p-2.5 bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200/80 rounded-xl text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all resize-none font-medium"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-100">
                {/* Category Dropdown Filter */}
                <div className="flex items-center gap-2">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 rounded-lg px-2.5 py-1.5 outline-none cursor-pointer transition-colors"
                  >
                    <option value="all">All Maker Docks</option>
                    <option value="tshirt">👕 Apparel &amp; Screenprint</option>
                    <option value="candle">🕯️ Scented Candles</option>
                    <option value="soap">🧼 Organic Soap Craft</option>
                    <option value="mug">☕ Heat-Press Merch</option>
                  </select>

                  <span className="text-[11px] text-slate-400 hidden sm:inline">
                    Instant Curriculum &amp; Kit Finder
                  </span>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 active:scale-[0.96] text-white rounded-xl text-xs font-semibold transition-[transform,background-color] shadow-xs cursor-pointer"
                >
                  <span>Explore Docks</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </form>

            {/* Quick Keyword Suggestion Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
              <span className="text-slate-400 font-medium mr-1">Popular:</span>
              <button
                type="button"
                onClick={() => handleQuickChip("tshirt")}
                className="px-2.5 py-0.5 bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-700 border border-slate-200/80 rounded-full transition-colors font-medium"
              >
                Screenprint Tees
              </button>
              <button
                type="button"
                onClick={() => handleQuickChip("candle")}
                className="px-2.5 py-0.5 bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-700 border border-slate-200/80 rounded-full transition-colors font-medium"
              >
                Soy Wax Candles
              </button>
              <button
                type="button"
                onClick={() => handleQuickChip("soap")}
                className="px-2.5 py-0.5 bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-700 border border-slate-200/80 rounded-full transition-colors font-medium"
              >
                Cold-Process Soap
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

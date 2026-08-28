"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ArrowRight, Hammer, Store, Sparkles, Anchor, Search } from "lucide-react";

export const Hero: React.FC<{ initialMode?: "login" | "signup" }> = () => {
  const router = useRouter();
  const { quickLogin } = useAuth();
  const [promptQuery, setPromptQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAuthenticating, setIsAuthenticating] = useState(false);

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

  const handleQuickEnter = async (role: "builder" | "seller") => {
    setIsAuthenticating(true);
    try {
      await quickLogin(role);
      if (role === "seller") {
        router.push("/seller-dashboard");
      } else {
        router.push("/builder-dashboard");
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleQuickChip = (categoryKey: string) => {
    setSelectedCategory(categoryKey);
    router.push(`/courses?business=${categoryKey}`);
  };

  return (
    <div className="w-full">
      {/* Scenic Pastoral Hero Canvas with Digital Harbor Theme */}
      <div className="relative w-full min-h-[560px] sm:min-h-[640px] rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs flex flex-col justify-center items-center text-center p-6 sm:p-12 md:p-16">
        {/* Pastoral Gradient Backdrop */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#8fd3f4]/35 via-[#d4fc79]/18 to-[#ffffff] pointer-events-none" />
        <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400/20 via-emerald-300/15 to-transparent" />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-3/4 h-80 bg-white/50 blur-3xl rounded-full pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-6 sm:space-y-8 flex flex-col items-center">
          {/* Top Pill Badge with Bengali Name */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/90 backdrop-blur-md text-slate-800 border border-slate-200/90 rounded-full text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-slate-700 font-serif font-bold">Bondor (বন্দর)</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-600 font-medium">Digital Harbor for Micro-Entrepreneurs in Bangladesh</span>
          </div>

          {/* Editorial Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-slate-900 tracking-tight leading-[1.12] text-balance">
            Where Aspiring Entrepreneurs
            <br />
            Learn the Craft &amp; Source the Materials
          </h1>

          {/* Subtitle based on Project Intro */}
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl leading-relaxed text-pretty font-normal">
            Bondor combines <strong>business education</strong> and <strong>wholesale starter packs</strong> in a single platform. Choose your business dock, master the manufacturing process, and order certified supplies with secure Stripe checkout.
          </p>

          {/* Fast Entry Buttons for Builders and Sellers */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => handleQuickEnter("builder")}
              disabled={isAuthenticating}
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 active:scale-[0.96] text-white rounded-full text-xs sm:text-sm font-semibold transition-[transform,background-color] shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Hammer size={15} className="text-sky-400" />
              <span>Enter as Builder (Entrepreneur)</span>
              <ArrowRight size={14} />
            </button>

            <button
              type="button"
              onClick={() => handleQuickEnter("seller")}
              disabled={isAuthenticating}
              className="px-5 py-2.5 bg-white hover:bg-slate-50 active:scale-[0.96] text-slate-900 border border-slate-300 hover:border-slate-400 rounded-full text-xs sm:text-sm font-semibold transition-[transform,background-color] shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <Store size={15} className="text-amber-600" />
              <span>Enter as Seller (Wholesale Supplier)</span>
            </button>
          </div>

          {/* Central Interactive Search / Prompt Box Floating Card */}
          <div className="w-full max-w-2xl bg-white/95 backdrop-blur-md border border-slate-200/90 rounded-2xl p-3 sm:p-4 shadow-card text-left space-y-3 mt-2">
            <form onSubmit={handleSearchSubmit} className="space-y-3">
              <div className="relative">
                <textarea
                  rows={2}
                  placeholder="Ask anything about starting a T-shirt, candle, perfume, or soap business in Bangladesh..."
                  aria-label="Search business dock categories, video masterclasses, or wholesale starter packs"
                  value={promptQuery}
                  onChange={(e) => setPromptQuery(e.target.value)}
                  className="w-full p-2.5 bg-slate-50/70 hover:bg-slate-50 focus:bg-white border border-slate-200/80 rounded-xl text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all resize-none font-medium"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-slate-100">
                {/* Category Dropdown Filter based on Specification */}
                <div className="flex items-center gap-2">
                  <select
                    value={selectedCategory}
                    aria-label="Select business category"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 rounded-lg px-2.5 py-1.5 outline-none cursor-pointer transition-colors"
                  >
                    <option value="all">All Business Categories</option>
                    <option value="tshirt">👕 T-Shirt Screenprinting</option>
                    <option value="candle">🕯️ Scented Candle Making</option>
                    <option value="soap">🧼 Handmade Soap &amp; Cosmetics</option>
                    <option value="mug">☕ Mug Sublimation &amp; Merch</option>
                  </select>

                  <span className="text-[11px] text-slate-400 hidden sm:inline">
                    Courses &amp; Material Packs
                  </span>
                </div>

                {/* Submit Action Button */}
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-sky-600 hover:bg-sky-700 active:scale-[0.96] text-white rounded-xl text-xs font-semibold transition-[transform,background-color] shadow-xs cursor-pointer"
                >
                  <Search size={13} />
                  <span>Explore Catalog</span>
                </button>
              </div>
            </form>

            {/* Quick Keyword Suggestion Chips */}
            <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
              <span className="text-slate-400 font-medium mr-1">Popular Docks:</span>
              <button
                type="button"
                onClick={() => handleQuickChip("tshirt")}
                className="px-2.5 py-0.5 bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-700 border border-slate-200/80 rounded-full transition-colors font-medium"
              >
                T-Shirt Printing
              </button>
              <button
                type="button"
                onClick={() => handleQuickChip("candle")}
                className="px-2.5 py-0.5 bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-700 border border-slate-200/80 rounded-full transition-colors font-medium"
              >
                Candle Making
              </button>
              <button
                type="button"
                onClick={() => handleQuickChip("soap")}
                className="px-2.5 py-0.5 bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-700 border border-slate-200/80 rounded-full transition-colors font-medium"
              >
                Soap Craft
              </button>
              <button
                type="button"
                onClick={() => handleQuickChip("mug")}
                className="px-2.5 py-0.5 bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-700 border border-slate-200/80 rounded-full transition-colors font-medium"
              >
                Mug Sublimation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

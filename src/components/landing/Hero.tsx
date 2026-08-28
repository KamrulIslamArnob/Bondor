"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ArrowRight, Hammer, Store, Search, Sparkles, Anchor, CheckCircle2, ShieldCheck } from "lucide-react";
import Link from "next/link";

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

  return (
    <div className="w-full space-y-6">
      {/* Dynamic Angled Split Hero Banner Matching Reference Image */}
      <div className="relative w-full min-h-[520px] md:min-h-[580px] rounded-3xl overflow-hidden shadow-card border border-slate-200/80 bg-slate-950">
        {/* Right Side Background Image (Modern Cityscape & Dynamic Billboard Scene) */}
        <div className="absolute inset-0 w-full h-full">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=85"
            alt="Modern commerce harbor and cityscape"
            className="w-full h-full object-cover object-right md:object-center"
          />
          {/* Subtle dark tint over image */}
          <div className="absolute inset-0 bg-slate-950/25 pointer-events-none" />
        </div>

        {/* Right Billboard Graphic Overlay (Matching the GoodData / Visa / Nasdaq Curved Billboard) */}
        <div className="hidden lg:block absolute right-8 top-12 bottom-12 w-[340px] rounded-2xl bg-gradient-to-b from-sky-950/85 via-blue-950/80 to-slate-950/90 backdrop-blur-md border border-white/20 p-6 text-white shadow-2xl flex flex-col justify-between">
          <div className="space-y-4">
            <div className="text-[11px] font-bold tracking-widest text-sky-400 uppercase">
              BONDOR · DIGITAL HARBOR
            </div>
            <div className="text-xl font-extrabold tracking-tight text-white leading-snug font-serif">
              EMPOWERING 10,000+ MICRO-MAKERS
            </div>

            <div className="pt-2 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-emerald-400" />
                <span>Verified Raw Material Packs</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-emerald-400" />
                <span>Modular Video Masterclasses</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 size={13} className="text-emerald-400" />
                <span>Stripe Encrypted Payment</span>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-white/15 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-sky-500 text-white flex items-center justify-center font-bold text-sm shadow-xs">
                <Anchor size={16} />
              </div>
              <div>
                <span className="font-bold text-sm block">Bondor (বন্দর)</span>
                <span className="text-[10px] text-sky-300">Bangladesh Maker Hub</span>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
              Live 2026
            </span>
          </div>
        </div>

        {/* Left Side Angled Royal Blue Gradient Overlay */}
        <div
          className="absolute inset-y-0 left-0 w-full lg:w-[68%] bg-gradient-to-r from-blue-700 via-blue-600 to-sky-600/95 lg:[clip-path:polygon(0_0,100%_0,84%_100%,0%_100%)] p-6 sm:p-12 md:p-16 flex flex-col justify-center text-left text-white z-10"
        >
          <div className="max-w-xl space-y-6">
            {/* Top Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 backdrop-blur-md rounded-full text-xs font-semibold text-white border border-white/20 w-fit">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Bondor (বন্দর) · Digital Harbor for Bangladesh</span>
            </div>

            {/* High-Impact Headline matching reference */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-white">
                Manufacturing everywhere.
                <br />
                For everyone.
              </h1>
            </div>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-sky-100 leading-relaxed max-w-lg font-normal text-pretty">
              The digital harbor empowering micro-entrepreneurs across Bangladesh with hands-on business masterclasses and wholesale raw material packs. More cost-efficient, fully accessible, easily scalable.
            </p>

            {/* Action Buttons matching the reference layout */}
            <div className="space-y-2 pt-2">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleQuickEnter("builder")}
                  disabled={isAuthenticating}
                  className="px-6 py-3 bg-white hover:bg-slate-100 active:scale-[0.96] text-slate-900 font-bold rounded-lg text-xs sm:text-sm transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <Hammer size={15} className="text-blue-600" />
                  <span>Get started as Builder</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickEnter("seller")}
                  disabled={isAuthenticating}
                  className="px-6 py-3 bg-white/15 hover:bg-white/25 active:scale-[0.96] text-white border border-white/80 rounded-lg text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer backdrop-blur-md"
                >
                  <Store size={15} className="text-sky-300" />
                  <span>Enter as Seller</span>
                </button>
              </div>

              <p className="text-[11px] text-sky-200/90 pl-1 font-medium">
                Instant 1-Click Access · Verified Suppliers &amp; Video Courses
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Category Quick Search Bar */}
      <div className="w-full bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <form onSubmit={handleSearchSubmit} className="flex-1 w-full flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search T-shirt blanks, soy wax, candle jars, soap oils, or masterclasses..."
              aria-label="Search courses and materials"
              value={promptQuery}
              onChange={(e) => setPromptQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-base sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500 transition-all font-medium"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={selectedCategory}
              aria-label="Select dock category"
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 outline-none cursor-pointer hover:bg-slate-100 transition-colors"
            >
              <option value="all">All Business Categories</option>
              <option value="tshirt">👕 T-Shirt Screenprinting</option>
              <option value="candle">🕯️ Scented Candle Making</option>
              <option value="soap">🧼 Handmade Soap Craft</option>
              <option value="mug">☕ Mug Sublimation Merch</option>
            </select>

            <button
              type="submit"
              className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
            >
              <span>Explore</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

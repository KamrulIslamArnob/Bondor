"use client";

import React, { useState } from "react";
import { ChevronDown, Package, GraduationCap, Calculator, ShieldCheck, Sparkles, Send, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface AccordionItem {
  id: string;
  number: string;
  title: string;
  icon: React.ReactNode;
  tag?: string;
  description: string;
  actionText: string;
  actionHref: string;
  simulatedChat: {
    question: string;
    answer: string;
  };
}

export const InteractiveAccordionSection: React.FC = () => {
  const items: AccordionItem[] = [
    {
      id: "sourcing",
      number: "01",
      title: "Raw Material Starter Supply Packs",
      icon: <Package size={16} className="text-sky-600" />,
      tag: "Verified",
      description: "Direct access to certified cotton blanks, soy wax flakes, fragrance oils, and wooden wicks tested for small-batch maker runs.",
      actionText: "Browse Starter Packs",
      actionHref: "/materials",
      simulatedChat: {
        question: "How many t-shirts can I print with the basic starter kit?",
        answer: "The Standard Screenprint Starter Kit includes 20 combed cotton blanks (180 GSM), 1kg eco-plastisol ink, emulsion, and a 110-mesh wooden frame—enough for 40–50 single-color prints!",
      },
    },
    {
      id: "curriculum",
      number: "02",
      title: "Hands-on Video Masterclasses",
      icon: <GraduationCap size={16} className="text-sky-600" />,
      description: "Step-by-step video courses taught in Bangla by practicing local makers. Includes downloadable cut files, ratios, and temperature charts.",
      actionText: "Explore Courses",
      actionHref: "/courses",
      simulatedChat: {
        question: "Do I get lifetime access to the candle making video lessons?",
        answer: "Yes! Once enrolled, you get lifetime instant streaming access across desktop and mobile, plus future curriculum updates and downloadable curing guides.",
      },
    },
    {
      id: "economics",
      number: "03",
      title: "Live Unit Batch Cost Calculator",
      icon: <Calculator size={16} className="text-sky-600" />,
      tag: "Live Tool",
      description: "Estimate materials per unit, packaging expenses, and suggested retail prices to ensure your maker business is profitable on day one.",
      actionText: "Open Calculator",
      actionHref: "/builder-dashboard",
      simulatedChat: {
        question: "What is the typical profit margin for handmade soy candles in BD?",
        answer: "At ৳320 production cost per 200g jar (wax, wick, oil, and glassware), makers typically retail at ৳850–৳1,200, generating a 62%–73% gross margin.",
      },
    },
    {
      id: "escrow",
      number: "04",
      title: "100% Escrow Protected Ordering",
      icon: <ShieldCheck size={16} className="text-emerald-600" />,
      tag: "Certified",
      description: "Payments are held safely in escrow until you receive and verify raw material quality from suppliers.",
      actionText: "Learn About Escrow",
      actionHref: "/cart",
      simulatedChat: {
        question: "When is payment released to the raw material seller?",
        answer: "Funds are only disbursed after carrier tracking confirms package arrival and you confirm the supplies match verified platform specifications.",
      },
    },
  ];

  const [activeId, setActiveId] = useState<string>("sourcing");
  const currentItem = items.find((it) => it.id === activeId) || items[0];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-12">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
            <span>Everything you need</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-slate-900 tracking-tight leading-tight text-balance">
            Everything Your Workshop
            <br />
            Keeps Putting Off
          </h2>
        </div>

        <p className="text-sm text-slate-600 max-w-md leading-relaxed text-pretty font-normal">
          From sourcing raw supplies in small batches to calculating unit economics and watching lesson guides, Bondor handles the heavy lifting so you can focus on making.
        </p>
      </div>

      {/* Split Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Accordion List (7 cols) */}
        <div className="lg:col-span-6 space-y-3 flex flex-col justify-center">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                onClick={() => setActiveId(item.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveId(item.id);
                  }
                }}
                className={`border rounded-2xl p-5 transition-[background-color,border-color,box-shadow] duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                  isActive
                    ? "bg-white border-sky-300 shadow-card ring-1 ring-sky-400/30"
                    : "bg-slate-50/70 hover:bg-white border-slate-200/80 hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono font-bold text-slate-400">
                      {item.number}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-700">{item.icon}</span>
                      <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {item.tag && (
                      <span className="text-[10px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200/80">
                        {item.tag}
                      </span>
                    )}
                    <ChevronDown
                      size={16}
                      className={`text-slate-400 transition-transform duration-200 ${
                        isActive ? "rotate-180 text-sky-600" : ""
                      }`}
                    />
                  </div>
                </div>

                {isActive && (
                  <div className="pt-3.5 mt-3 border-t border-slate-100 space-y-3 text-xs text-slate-600 leading-relaxed animate-in fade-in duration-200">
                    <p className="text-pretty font-normal">{item.description}</p>
                    <Link
                      href={item.actionHref}
                      className="inline-flex items-center gap-1.5 font-bold text-sky-600 hover:text-sky-700 transition-colors focus-visible:outline-none focus-visible:underline"
                    >
                      <span>{item.actionText}</span>
                      <ArrowRight size={13} />
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right: Live Interactive Workshop Assistant Box (6 cols) */}
        <div className="lg:col-span-6">
          <div className="h-full min-h-[380px] bg-gradient-to-br from-slate-900 via-slate-800 to-sky-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-card border border-slate-700/60 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-sky-500/20 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-teal-500/15 blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-5">
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-400">
                    <Sparkles size={16} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Workshop Intelligence</h4>
                    <p className="text-[10px] text-sky-200/70">Simulated Maker Guidance</p>
                  </div>
                </div>

                <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Simulator
                </span>
              </div>

              {/* Chat Simulation Area */}
              <div className="space-y-3.5">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] bg-sky-600 text-white px-4 py-2.5 rounded-2xl rounded-tr-sm text-xs font-medium shadow-xs leading-relaxed">
                    {currentItem.simulatedChat.question}
                  </div>
                </div>

                {/* Assistant Message */}
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-sky-400/20 border border-sky-300/30 flex items-center justify-center shrink-0 text-sky-300 mt-1">
                    <Sparkles size={12} />
                  </div>
                  <div className="max-w-[90%] bg-white/10 backdrop-blur-md border border-white/15 text-slate-100 px-4 py-3 rounded-2xl rounded-tl-sm text-xs leading-relaxed font-normal">
                    {currentItem.simulatedChat.answer}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Interactive Prompt Input Bar */}
            <div className="relative z-10 pt-4 mt-4 border-t border-white/10">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/15 rounded-full px-4 py-2 text-xs text-slate-300">
                <input
                  type="text"
                  placeholder="Ask a production question..."
                  aria-label="Simulated production question"
                  className="bg-transparent border-none outline-none text-xs text-white placeholder:text-slate-400 flex-1"
                  readOnly
                  value="How do I calculate starter batch economics?"
                />
                <button
                  type="button"
                  aria-label="Submit simulated query"
                  onClick={() => setActiveId("economics")}
                  className="w-7 h-7 rounded-full bg-sky-500 hover:bg-sky-400 text-white flex items-center justify-center shrink-0 transition-colors shadow-xs focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:outline-none"
                >
                  <Send size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

"use client";

import React, { useState } from "react";
import { ChevronDown, Package, GraduationCap, Calculator, ShieldCheck, Sparkles, Send, ArrowRight, UserCheck, Layers } from "lucide-react";
import Link from "next/link";

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
      id: "roles",
      number: "01",
      title: "Dual Role-Based System (Builders & Sellers)",
      icon: <UserCheck size={16} className="text-sky-600" />,
      tag: "Role Control",
      description: "Users can register with role-based access to operate as Builders (learning crafts & sourcing packs), Sellers (listing products & publishing courses), or Both with seamless 1-click mode switching.",
      actionText: "Try Role Switcher",
      actionHref: "/builder-dashboard",
      simulatedChat: {
        question: "How does the dual-role system work in Bondor?",
        answer: "You can operate as a Builder to learn crafts and buy wholesale starter packs, or switch to Seller mode to publish your own video masterclasses and list raw materials from your vendor dashboard.",
      },
    },
    {
      id: "courses",
      number: "02",
      title: "Structured Course Marketplace",
      icon: <GraduationCap size={16} className="text-sky-600" />,
      tag: "Education",
      description: "Comprehensive business courses taught in Bangla by practicing entrepreneurs. Master T-shirt printing, candle making, soap formulating, and sublimation mechanics.",
      actionText: "Explore Courses",
      actionHref: "/courses",
      simulatedChat: {
        question: "What business categories are currently available to learn?",
        answer: "Bondor features 4 core business docks: T-Shirt Screenprinting (apparel manufacturing), Scented Candle Making (soy wax pouring), Organic Soap Craft (cold process), and Mug Sublimation (heat press merch).",
      },
    },
    {
      id: "materials",
      number: "03",
      title: "Wholesale Material Pack Marketplace",
      icon: <Package size={16} className="text-sky-600" />,
      tag: "Sourcing",
      description: "Direct wholesale sourcing for small-scale entrepreneurs. Access combed cotton blanks, soy wax flakes, cosmetic fragrance oils, and mesh frames at verified vendor prices.",
      actionText: "Browse Material Packs",
      actionHref: "/materials",
      simulatedChat: {
        question: "What comes in a typical raw material starter pack?",
        answer: "Starter packs contain calibrated ratios of production-grade materials (e.g. 20 cotton blanks + 1kg ink + screen frame for T-shirts, or 1kg soy wax + wicks + fragrance oil for candles) designed for first batch runs.",
      },
    },
    {
      id: "checkout",
      number: "04",
      title: "Cart & Stripe Payment Gateway",
      icon: <ShieldCheck size={16} className="text-emerald-600" />,
      tag: "Secure Pay",
      description: "Integrated shopping cart calculating exact batch subtotals with Stripe payment processing to ensure smooth, secure online checkout.",
      actionText: "View Cart & Checkout",
      actionHref: "/cart",
      simulatedChat: {
        question: "How are payments handled on Bondor?",
        answer: "All transactions are securely handled through Stripe checkout with instant payment confirmation, transparent itemized receipts, and instant curriculum enrollment.",
      },
    },
  ];

  const [activeId, setActiveId] = useState<string>("roles");
  const currentItem = items.find((it) => it.id === activeId) || items[0];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-12">
      {/* Section Header based on Functional Requirements */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
            <span>Platform Capabilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-slate-900 tracking-tight leading-tight text-balance">
            System Features Designed for
            <br />
            Micro-Entrepreneurs &amp; Vendors
          </h2>
        </div>

        <p className="text-sm text-slate-600 max-w-md leading-relaxed text-pretty font-normal">
          From role-based access and category-driven marketplaces to shopping cart management and Stripe checkout, Bondor provides a complete startup foundation.
        </p>
      </div>

      {/* Split Interactive Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left: Accordion List (6 cols) */}
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
                    <h4 className="text-sm font-bold text-white font-serif">Bondor System Intelligence</h4>
                    <p className="text-[10px] text-sky-200/70">Interactive Architecture Simulation</p>
                  </div>
                </div>

                <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Simulator
                </span>
              </div>

              {/* Chat Simulation Area */}
              <div className="space-y-3.5">
                {/* User Question */}
                <div className="flex justify-end">
                  <div className="max-w-[85%] bg-sky-600 text-white px-4 py-2.5 rounded-2xl rounded-tr-sm text-xs font-medium shadow-xs leading-relaxed">
                    {currentItem.simulatedChat.question}
                  </div>
                </div>

                {/* System Answer */}
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
                  placeholder="Select a feature on the left to see details..."
                  aria-label="Simulated system query"
                  className="bg-transparent border-none outline-none text-xs text-white placeholder:text-slate-400 flex-1"
                  readOnly
                  value={`Exploring: ${currentItem.title}`}
                />
                <button
                  type="button"
                  aria-label="Learn more about this system feature"
                  onClick={() => setActiveId("materials")}
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

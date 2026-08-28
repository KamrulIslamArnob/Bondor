"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Layers, Flame, Box } from "lucide-react";

export const MakerStories: React.FC = () => {
  const stories = [
    {
      id: "tshirt",
      category: "T-Shirt Screenprinting",
      name: "Tariqul Islam",
      role: "Builder · Dhaka Streetwear Co.",
      story: "Enrolled in the screen preparation masterclass and sourced 50 cotton blanks directly from a verified supplier. Reached break-even in my second week.",
      tag: "500 Shirts/Month",
      color: "from-sky-950/90 via-slate-900/70 to-transparent",
      icon: <Layers size={14} aria-hidden="true" />,
      bgImage: "https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "candle",
      category: "Scented Candle Making",
      name: "Samira Rahman",
      role: "Builder · Luminate Studio Sylhet",
      story: "Started with a ৳3,200 soy wax starter pack and mastered wick sizing through the video courses. Now stocked in 14 local lifestyle boutiques.",
      tag: "14 Boutiques",
      color: "from-amber-950/90 via-slate-900/70 to-transparent",
      icon: <Flame size={14} aria-hidden="true" />,
      bgImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "soap",
      category: "Handmade Soap & Cosmetics",
      name: "Zubair Ahmed",
      role: "Builder · PureBotanic BD",
      story: "Learned cold-process saponification and ordered certified botanical oils and caustic soda in calibrated batch ratios with secure Stripe payment.",
      tag: "Zero Defect Batches",
      color: "from-emerald-950/90 via-slate-900/70 to-transparent",
      icon: <Sparkles size={14} aria-hidden="true" />,
      bgImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-12">
      {/* Section Header based on User Roles & Responsibilities */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-700 bg-sky-50 px-3 py-1 rounded-full border border-sky-200/80">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-600" />
            <span>Empowering Micro-Entrepreneurs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-slate-900 tracking-tight leading-tight text-balance">
            Real Businesses Built on
            <br />
            Bondor's Digital Harbor
          </h2>
        </div>

        <p className="text-sm text-slate-600 max-w-md leading-relaxed text-pretty font-normal">
          How aspiring Bangladeshi builders turn business-oriented video education and wholesale raw material packs into profitable small-scale production workshops.
        </p>
      </div>

      {/* 3 Vertical Portrait Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stories.map((maker) => (
          <div
            key={maker.id}
            className="group relative aspect-[3/4] sm:aspect-[4/5] rounded-3xl overflow-hidden shadow-xs hover:shadow-card transition-[box-shadow,transform] duration-300 hover:-translate-y-1 border border-slate-200/80"
          >
            {/* Background Image */}
            <img
              src={maker.bgImage}
              alt={maker.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Gradient Overlay */}
            <div className={`absolute inset-0 bg-gradient-to-t ${maker.color} pointer-events-none`} />

            {/* Top Category Badge */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-md text-slate-900 text-xs font-semibold px-3 py-1 rounded-full border border-white/60 shadow-xs">
                {maker.icon}
                <span>{maker.category}</span>
              </span>

              <span className="bg-white/20 backdrop-blur-md text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-full border border-white/30">
                {maker.tag}
              </span>
            </div>

            {/* Bottom Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10 text-white space-y-2">
              <div>
                <h3 className="font-serif text-xl font-bold tracking-tight text-white">
                  {maker.name}
                </h3>
                <p className="text-xs text-sky-200 font-medium">
                  {maker.role}
                </p>
              </div>

              <p className="text-xs text-slate-200 leading-relaxed font-normal text-pretty line-clamp-3">
                "{maker.story}"
              </p>

              <div className="pt-2">
                <Link
                  href={`/courses?business=${maker.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-sky-300 hover:text-white transition-colors"
                >
                  <span>Explore this Business Dock</span>
                  <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

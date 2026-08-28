"use client";

import React from "react";
import { Star, ShieldCheck } from "lucide-react";

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: "Mahmudul Hasan",
      role: "T-Shirt Screenprinter, Chittagong",
      company: "CraftWave Studio",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
      content: "Bondor completely eliminated my biggest headache: finding reliable blank tees that don't shrink after the first wash. The courses also taught me half-tone printing in one weekend.",
    },
    {
      id: 2,
      name: "Farhana Karim",
      role: "Candle Maker & Scent Designer, Sylhet",
      company: "AromaHaven",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
      content: "I started with zero experience. The batch calculator helped me price my scented candles profitably right away. The soy wax kit arrived within 48 hours in perfect condition.",
    },
    {
      id: 3,
      name: "Arif Chowdhury",
      role: "Handmade Soap Crafter, Dhaka",
      company: "Botanical Bar",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
      content: "The escrow checkout gives total peace of mind. Knowing my money is only released after quality inspection makes ordering raw ingredients completely stress-free.",
    },
  ];

  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16 sm:py-24 space-y-12">
      {/* Centered Editorial Header */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-slate-900 tracking-tight text-balance">
          Trusted by 15,000+ makers &amp; vendors
        </h2>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Real stories from independent Bangladeshi producers
        </p>
      </div>

      {/* 3 Testimonial Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs hover:shadow-card transition-[box-shadow,border-color] duration-200 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              {/* Star Rating */}
              <div className="flex items-center gap-1 text-amber-400" aria-label="5 out of 5 stars rating">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-amber-400" aria-hidden="true" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-pretty font-normal">
                "{rev.content}"
              </p>
            </div>

            {/* Author */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-9 h-9 rounded-full object-cover border border-slate-200 shrink-0"
                />
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 truncate">
                    {rev.name}
                  </h4>
                  <p className="text-[11px] text-slate-500 truncate">
                    {rev.role}
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/80 shrink-0 flex items-center gap-1">
                <ShieldCheck size={11} />
                <span>Verified</span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

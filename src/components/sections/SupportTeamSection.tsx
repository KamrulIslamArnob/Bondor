"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, ShieldCheck, HeartHandshake } from "lucide-react";

export const SupportTeamSection: React.FC = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Side: Avatar Cluster & 9.8 Score Badge (6 cols) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-6 flex items-center justify-center"
        >
          <div className="relative w-full max-w-md aspect-square rounded-3xl bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 border border-slate-200/90 p-8 flex items-center justify-center shadow-card">
            {/* Center Score Badge */}
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="w-36 h-36 rounded-3xl bg-white shadow-card border border-blue-200/80 p-4 flex flex-col items-center justify-center text-center space-y-1 z-10"
            >
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
                ★
              </div>
              <span className="text-3xl font-extrabold text-slate-900 tracking-tight tabular-nums font-serif">
                9.8
              </span>
              <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">
                MAKER SATISFACTION
              </span>
            </motion.div>

            {/* Floating Avatars */}
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="Artisan maker"
              className="absolute top-6 left-6 w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md animate-float"
            />
            <img
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80"
              alt="Artisan maker"
              className="absolute top-6 right-6 w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md animate-float [animation-delay:1s]"
            />
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
              alt="Artisan maker"
              className="absolute bottom-6 left-6 w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md animate-float [animation-delay:2s]"
            />
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
              alt="Wholesale supplier"
              className="absolute bottom-6 right-6 w-14 h-14 rounded-2xl object-cover border-2 border-white shadow-md animate-float [animation-delay:1.5s]"
            />
          </div>
        </motion.div>

        {/* Right Side: Text & CTA (6 cols) */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-6 space-y-6"
        >
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-50 border border-blue-200/80 rounded-full text-xs font-bold text-blue-700">
              <span>24/7 Workshop Guidance</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug font-serif">
              Best-in-class guidance{" "}
              <span className="text-blue-600">and workshop support</span>
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed font-normal">
              Our makers agree: 98% consider us an essential digital harbor in their production journey. We are rated highest for reliable wholesale sourcing and practical Bangla masterclass clarity.
            </p>
          </div>

          <div className="pt-2">
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="inline-block">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
              >
                <span>Join the Maker Harbor</span>
                <ArrowRight size={15} />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

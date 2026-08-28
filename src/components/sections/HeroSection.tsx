"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";
import { 
  ArrowRight, 
  Flame, 
  Sparkles, 
  BookOpen, 
  Layers, 
  Star, 
  Package,
  Coffee,
  CheckCircle2,
  Anchor
} from "lucide-react";
import Link from "next/link";

export const HeroSection: React.FC = () => {
  const router = useRouter();
  const { quickLogin } = useAuth();

  const handleQuickStart = async (role: "builder" | "seller") => {
    await quickLogin(role);
    if (role === "seller") {
      router.push("/seller-dashboard");
    } else {
      router.push("/builder-dashboard");
    }
  };

  const categories = [
    {
      id: "tshirt",
      title: "Apparel & Printing",
      bnTitle: "টি-শার্ট স্ক্রিনপ্রিন্টিং",
      desc: "Produce combed cotton tees, hoodies & custom streetwear.",
      icon: <Layers size={18} className="text-blue-600" />,
      badge: null,
      href: "/courses?business=tshirt",
    },
    {
      id: "candle",
      title: "Candle Craft",
      bnTitle: "সুগন্ধি মোমবাতি তৈরি",
      desc: "Hand-poured soy wax candles, wooden wicks & aroma blending.",
      icon: <Flame size={18} className="text-amber-500" />,
      badge: null,
      href: "/courses?business=candle",
    },
    {
      id: "soap",
      title: "Organic Cosmetics",
      bnTitle: "ভেষজ সাবান ও প্রসাধনী",
      desc: "Cold-process handmade soaps & botanical skincare bars.",
      icon: <Sparkles size={18} className="text-emerald-500" />,
      badge: "বিশুদ্ধ",
      href: "/courses?business=soap",
    },
    {
      id: "mug",
      title: "Sublimation Merch",
      bnTitle: "মগ ও কাস্টম মার্চেন্ডাইজ",
      desc: "Mug heat-press printing, vinyl decals & micro-packaging.",
      icon: <Coffee size={18} className="text-purple-500" />,
      badge: "জনপ্রিয়",
      href: "/courses?business=mug",
    },
    {
      id: "academy",
      title: "Video Academy",
      bnTitle: "ভিডিও মাস্টারক্লাস",
      desc: "Step-by-step masterclasses taught in Bangla by makers.",
      icon: <BookOpen size={18} className="text-sky-500" />,
      badge: null,
      href: "/courses",
    },
  ];

  return (
    <section className="w-full pt-6 pb-16 text-center space-y-10 overflow-hidden">
      {/* Top Main Headline with Animation */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-4xl mx-auto space-y-4 px-4"
      >
        {/* Bengali Brand Harbor Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-50/90 border border-blue-200/80 rounded-full text-xs font-semibold text-blue-900 shadow-xs mb-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-hind font-bold text-sm text-blue-700">বন্দর (Bondor)</span>
          <span className="text-blue-300">·</span>
          <span className="font-hind font-medium text-slate-700">বাংলাদেশের ক্ষুদ্র উদ্যোক্তাদের ডিজিটাল বন্দর</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] text-balance">
          Launch local,{" "}
          <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
            manufacture global
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed text-pretty font-normal">
          Automate and collaborate on your business education and wholesale sourcing. Accelerate local business growth and create meaningful maker experiences in Bangladesh.
        </p>
      </motion.div>

      {/* 5 Category Bento Cards Row with Stagger Animation */}
      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        className="max-w-6xl mx-auto px-4 sm:px-6"
      >
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 text-left">
          {categories.map((cat, idx) => (
            <motion.div
              key={cat.id}
              whileHover={{ y: -4, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 350, damping: 25 }}
            >
              <Link
                href={cat.href}
                className="group h-full bg-slate-50/80 hover:bg-white border border-slate-200/80 hover:border-blue-400 rounded-2xl p-4 transition-colors duration-200 shadow-xs hover:shadow-card flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="w-9 h-9 rounded-xl bg-white shadow-xs border border-slate-200/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                      {cat.icon}
                    </div>
                    {cat.badge && (
                      <span className="font-hind text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                        {cat.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm group-hover:text-blue-600 transition-colors flex flex-col">
                      <span>{cat.title}</span>
                      <span className="font-hind text-[11px] text-slate-500 font-semibold mt-0.5">
                        {cat.bnTitle}
                      </span>
                    </h3>
                    <p className="text-[11px] text-slate-500 leading-relaxed mt-1 font-normal line-clamp-2">
                      {cat.desc}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Primary Actions & Sub-captions with Smooth Motion */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="max-w-md mx-auto px-4 space-y-3"
      >
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={() => handleQuickStart("builder")}
            className="w-full sm:w-auto px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Start as Builder</span>
            <ArrowRight size={15} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={() => handleQuickStart("seller")}
            className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold rounded-xl text-sm transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Enter as Seller</span>
          </motion.button>
        </div>

        <p className="text-xs text-slate-500 font-medium font-hind">
          তাত্ক্ষণিক প্রবেশ · No credit card required.
        </p>
      </motion.div>

      {/* G2 / Capterra Style Reviews Rating Social Proof */}
      <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-14 pt-2 text-xs font-semibold text-slate-600">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-900 text-sm">4.8</span>
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={13} className="fill-amber-400" />
            ))}
          </div>
          <span className="text-[11px] text-slate-500 font-bold tracking-wider uppercase">
            G2 REVIEWS
          </span>
        </div>

        <div className="h-4 w-px bg-slate-200 hidden sm:block" />

        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-900 text-sm">4.8</span>
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={13} className="fill-amber-400" />
            ))}
          </div>
          <span className="text-[11px] text-slate-500 font-bold tracking-wider uppercase">
            CAPTERRA REVIEWS
          </span>
        </div>
      </div>
    </section>
  );
};

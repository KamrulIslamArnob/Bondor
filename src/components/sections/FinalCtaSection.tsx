"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ArrowRight, Hammer, Store } from "lucide-react";

export const FinalCtaSection: React.FC = () => {
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

  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-16">
      <div className="bg-gradient-to-br from-blue-50 via-sky-50 to-indigo-50 border border-blue-200/90 rounded-3xl p-8 sm:p-14 text-center space-y-6 shadow-sm">
        <div className="space-y-3 max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-serif text-balance">
            Stop wasting time with unverified suppliers and guesswork.
          </h2>
          <p className="text-sm sm:text-base text-blue-900/80 font-medium">
            Launch your micro-manufacturing business in Bangladesh today.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => handleQuickStart("builder")}
            className="w-full sm:w-auto px-7 py-3.5 bg-blue-600 hover:bg-blue-700 active:scale-[0.96] text-white font-bold rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <Hammer size={16} />
            <span>Get started as Builder</span>
            <ArrowRight size={15} />
          </button>

          <button
            type="button"
            onClick={() => handleQuickStart("seller")}
            className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 active:scale-[0.96] text-slate-900 border border-slate-300 font-bold rounded-xl text-sm transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <Store size={16} className="text-amber-600" />
            <span>Enter as Seller</span>
          </button>
        </div>
      </div>
    </section>
  );
};

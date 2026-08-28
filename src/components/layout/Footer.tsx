import React from "react";
import Link from "next/link";
import { Anchor, ShieldCheck, CreditCard, ArrowRight } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto bg-[#070C18] text-slate-400 border-t border-slate-800/80 pt-16 pb-12 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Case Studies Card on Left (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Maker Spotlight
            </h4>

            <div className="bg-white/[0.05] border border-white/10 rounded-2xl p-5 space-y-4">
              <div className="aspect-[16/9] rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=600&q=80"
                  alt="Maker studio case study"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <span className="text-xs font-bold text-blue-400 block">
                  Dhaka Streetwear Co.
                </span>
                <p className="text-xs text-slate-300 leading-relaxed font-normal mt-1">
                  How an independent Bangladeshi maker scaled from 10 sample shirts to 500 orders/month with Bondor's verified supply packs.
                </p>
              </div>

              <Link
                href="/courses?business=tshirt"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-white hover:text-blue-400 transition-colors"
              >
                <span>Read case study</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* 4 Navigation Columns on Right (8 cols) */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
            {/* Column 1: Business Docks */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Business Docks
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/courses?business=tshirt" className="hover:text-white transition-colors">
                    T-Shirt Screenprinting
                  </Link>
                </li>
                <li>
                  <Link href="/courses?business=candle" className="hover:text-white transition-colors">
                    Scented Candle Making
                  </Link>
                </li>
                <li>
                  <Link href="/courses?business=soap" className="hover:text-white transition-colors">
                    Handmade Soap Craft
                  </Link>
                </li>
                <li>
                  <Link href="/courses?business=mug" className="hover:text-white transition-colors">
                    Mug Sublimation Merch
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: System Scope */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Platform
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/courses" className="hover:text-white transition-colors">
                    Video Academy
                  </Link>
                </li>
                <li>
                  <Link href="/materials" className="hover:text-white transition-colors">
                    Wholesale Packs
                  </Link>
                </li>
                <li>
                  <Link href="/builder-dashboard" className="hover:text-white transition-colors">
                    Batch Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="hover:text-white transition-colors">
                    Stripe Checkout
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: For Sellers */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                For Sellers
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <Link href="/seller-dashboard" className="hover:text-white transition-colors">
                    Seller Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/seller/products/new" className="hover:text-white transition-colors">
                    List Material Pack
                  </Link>
                </li>
                <li>
                  <Link href="/seller/courses/new" className="hover:text-white transition-colors">
                    Publish Course
                  </Link>
                </li>
                <li>
                  <Link href="/signup" className="hover:text-white transition-colors">
                    Apply as Supplier
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Legal & Security */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                Security &amp; Legal
              </h4>
              <ul className="space-y-2 text-xs">
                <li>
                  <span className="text-slate-300">Stripe Encrypted</span>
                </li>
                <li>
                  <span className="text-slate-300">Escrow Protected</span>
                </li>
                <li>
                  <span className="text-slate-300">Terms of Service</span>
                </li>
                <li>
                  <span className="text-slate-300">Privacy Policy</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-xs">
              <Anchor size={13} />
            </div>
            <span className="font-bold text-slate-300">Bondor (বন্দর)</span>
            <span>·</span>
            <span>Digital Harbor for Micro-Entrepreneurs in Bangladesh.</span>
          </div>

          <p>© {new Date().getFullYear()} Bondor Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

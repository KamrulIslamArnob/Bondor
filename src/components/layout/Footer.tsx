import React from "react";
import Link from "next/link";
import { Anchor, ShieldCheck } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto bg-[#0B0F19] text-slate-400 border-t border-slate-800/80 pt-16 pb-12 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main 4-Column Sitemap Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-sky-500 text-white flex items-center justify-center font-bold shadow-xs">
                <Anchor size={16} />
              </div>
              <span className="font-serif text-lg font-bold text-white tracking-tight">
                Bondor
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-normal">
              The end-to-end production harbor for makers and verified suppliers in Bangladesh. Learn modular manufacturing crafts and source raw materials directly.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-3 py-1 rounded-full w-fit">
              <ShieldCheck size={13} />
              <span>100% Escrow Protected Commerce</span>
            </div>
          </div>

          {/* Maker Docks */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Maker Docks
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/courses?business=tshirt" className="hover:text-white transition-colors">
                  Apparel &amp; Tees
                </Link>
              </li>
              <li>
                <Link href="/courses?business=candle" className="hover:text-white transition-colors">
                  Scented Candles
                </Link>
              </li>
              <li>
                <Link href="/courses?business=soap" className="hover:text-white transition-colors">
                  Organic Soaps
                </Link>
              </li>
              <li>
                <Link href="/courses?business=mug" className="hover:text-white transition-colors">
                  Sublimation Merch
                </Link>
              </li>
            </ul>
          </div>

          {/* For Suppliers */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              For Sellers
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/seller-dashboard" className="hover:text-white transition-colors">
                  Vendor Dashboard
                </Link>
              </li>
              <li>
                <Link href="/seller/products/new" className="hover:text-white transition-colors">
                  List Raw Supply Kit
                </Link>
              </li>
              <li>
                <Link href="/seller/courses/new" className="hover:text-white transition-colors">
                  Publish Video Course
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-white transition-colors">
                  Apply as Supplier
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Platform
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/builder-dashboard" className="hover:text-white transition-colors">
                  Batch Calculator
                </Link>
              </li>
              <li>
                <Link href="/materials" className="hover:text-white transition-colors">
                  Material Catalog
                </Link>
              </li>
              <li>
                <Link href="/courses" className="hover:text-white transition-colors">
                  Video Academy
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white transition-colors">
                  Escrow Checkout
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Bondor Inc. All rights reserved. Dhaka, Bangladesh.</p>
          <div className="flex items-center gap-6">
            <Link href="/" className="hover:text-slate-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="/" className="hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/" className="hover:text-slate-400 transition-colors">
              Escrow Guarantee
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

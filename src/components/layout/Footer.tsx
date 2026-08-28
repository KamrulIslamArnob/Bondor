import React from "react";
import Link from "next/link";
import { Anchor, ShieldCheck, CreditCard } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto bg-[#0B0F19] text-slate-400 border-t border-slate-800/80 pt-16 pb-12 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Sitemap Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-sky-500 text-white flex items-center justify-center font-bold shadow-xs">
                <Anchor size={16} />
              </div>
              <span className="font-serif text-lg font-bold text-white tracking-tight">
                Bondor (বন্দর)
              </span>
            </div>

            <p className="text-xs text-slate-400 max-w-sm leading-relaxed font-normal">
              A digital harbor empowering micro-entrepreneurs in Bangladesh by integrating business education and wholesale raw material sourcing into a single unified platform.
            </p>

            <div className="flex items-center gap-2 text-[11px] text-emerald-400 bg-emerald-950/40 border border-emerald-500/20 px-3 py-1 rounded-full w-fit">
              <CreditCard size={13} />
              <span>Stripe Payment Gateway Integration</span>
            </div>
          </div>

          {/* Business Docks */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Business Docks
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/courses?business=tshirt" className="hover:text-white transition-colors">
                  T-Shirt Printing
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

          {/* User Roles */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              User Portals
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/builder-dashboard" className="hover:text-white transition-colors">
                  Builder Dashboard
                </Link>
              </li>
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
                  Publish Business Course
                </Link>
              </li>
            </ul>
          </div>

          {/* System Scope */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              System Scope
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/courses" className="hover:text-white transition-colors">
                  Course Marketplace
                </Link>
              </li>
              <li>
                <Link href="/materials" className="hover:text-white transition-colors">
                  Material Pack Marketplace
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-white transition-colors">
                  Cart &amp; Stripe Checkout
                </Link>
              </li>
              <li>
                <Link href="/my-courses" className="hover:text-white transition-colors">
                  Enrolled Masterclasses
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Bondor (বন্দর) · Digital Harbor for Micro-Entrepreneurs in Bangladesh.</p>
          <div className="flex items-center gap-6">
            <span>Role-Based Access</span>
            <span>·</span>
            <span>Wholesale Sourcing</span>
            <span>·</span>
            <span>Business Education</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

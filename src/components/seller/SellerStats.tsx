import React from "react";
import { formatPrice } from "@/lib/price-utils";
import { DollarSign, ShoppingBag, Box, BookOpen } from "lucide-react";

interface SellerStatsProps {
  totalEarnings?: number;
  ordersCount?: number;
  activeProductsCount: number;
  activeCoursesCount?: number;
}

export const SellerStats: React.FC<SellerStatsProps> = ({
  totalEarnings = 0,
  ordersCount = 0,
  activeProductsCount = 0,
  activeCoursesCount = 0,
}) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
      {/* Total Earnings */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-1 hover:shadow-card hover:border-slate-300 transition-[box-shadow,border-color] duration-200">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Total Revenue
          </span>
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
        </div>
        <h4 className="text-2xl font-extrabold text-slate-900 tabular-nums">
          {formatPrice(totalEarnings, "৳")}
        </h4>
        <p className="text-[11px] text-slate-400 font-medium">Escrow Verified</p>
      </div>

      {/* Orders */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-1 hover:shadow-card hover:border-slate-300 transition-[box-shadow,border-color] duration-200">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Orders
          </span>
          <div className="w-2 h-2 rounded-full bg-sky-500" />
        </div>
        <h4 className="text-2xl font-extrabold text-slate-900 tabular-nums">{ordersCount}</h4>
        <p className="text-[11px] text-slate-400 font-medium">Completed Deliveries</p>
      </div>

      {/* Active Products */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-1 hover:shadow-card hover:border-slate-300 transition-[box-shadow,border-color] duration-200">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Material Packs
          </span>
          <div className="w-2 h-2 rounded-full bg-amber-400" />
        </div>
        <h4 className="text-2xl font-extrabold text-slate-900 tabular-nums">
          {activeProductsCount}
        </h4>
        <p className="text-[11px] text-slate-400 font-medium">Active Supply Listings</p>
      </div>

      {/* Published Courses */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-xs space-y-1 hover:shadow-card hover:border-slate-300 transition-[box-shadow,border-color] duration-200">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
            Published Courses
          </span>
          <div className="w-2 h-2 rounded-full bg-sky-500" />
        </div>
        <h4 className="text-2xl font-extrabold text-slate-900 tabular-nums">
          {activeCoursesCount}
        </h4>
        <p className="text-[11px] text-slate-400 font-medium">Video Masterclasses</p>
      </div>
    </div>
  );
};

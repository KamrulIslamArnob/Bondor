"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import {
  Menu,
  ShoppingBag,
  Store,
  Hammer,
  Search,
  Plus,
  ArrowUpRight
} from "lucide-react";
import { Button } from "@/components/ui/Button";

interface DashboardHeaderProps {
  onOpenMobileMenu: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({ onOpenMobileMenu }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, userProfile, activeRole, setActiveRole } = useAuth();
  const { cartCount } = useCart();

  const isSeller = activeRole === "seller";

  const getPageTitle = () => {
    if (pathname.startsWith("/builder-dashboard")) return "Business Docks";
    if (pathname.startsWith("/seller-dashboard")) return "Seller Workspace";
    if (pathname.startsWith("/courses")) return "Video Academy";
    if (pathname.startsWith("/materials")) return "Starter Supplies";
    if (pathname.startsWith("/my-courses")) return "Enrolled Masterclasses";
    if (pathname.startsWith("/cart")) return "Shopping Cart";
    if (pathname.startsWith("/seller/products/new")) return "Add Material Pack";
    if (pathname.startsWith("/seller/courses/new")) return "Publish Video Course";
    if (pathname.startsWith("/seller/products")) return "Edit Product";
    if (pathname.startsWith("/products")) return "Product Details";
    return "Dashboard";
  };

  const handleRoleToggle = () => {
    const nextRole = isSeller ? "builder" : "seller";
    setActiveRole(nextRole);
    if (nextRole === "seller") {
      router.push("/seller-dashboard");
    } else {
      router.push("/builder-dashboard");
    }
  };

  return (
    <header className="sticky top-0 z-30 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 h-14 flex items-center justify-between px-4 sm:px-6">
      {/* Left: Mobile Toggle & Breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu size={18} />
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-400 hidden sm:inline">
            Bondor
          </span>
          <span className="text-slate-300 hidden sm:inline">/</span>
          <h2 className="text-sm font-bold text-slate-900 tracking-tight">
            {getPageTitle()}
          </h2>
        </div>
      </div>

      {/* Right: Role Switcher, Cart, Action Shortcuts */}
      <div className="flex items-center gap-2.5">
        {/* Workspace Mode Pill */}
        <button
          onClick={handleRoleToggle}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white text-slate-800 border border-slate-200 hover:border-sky-300 hover:bg-sky-50/50 transition-all cursor-pointer shadow-xs"
          title={`Click to switch to ${isSeller ? "Builder" : "Seller"} mode`}
        >
          {isSeller ? (
            <>
              <Store size={13} className="text-sky-600" />
              <span>Seller Mode</span>
            </>
          ) : (
            <>
              <Hammer size={13} className="text-sky-600" />
              <span>Builder Mode</span>
            </>
          )}
          <span className="text-[10px] text-sky-700 font-semibold bg-sky-50 px-1.5 py-0.2 rounded-full border border-sky-200/80">Switch</span>
        </button>

        {/* Quick Add Shortcut for Sellers */}
        {isSeller && (
          <Link href="/seller/products/new" className="hidden md:inline-block">
            <Button variant="default" size="sm" leftIcon={<Plus size={13} />}>
              <span>New Pack</span>
            </Button>
          </Link>
        )}

        {/* Shopping Cart Button */}
        <Link href="/cart">
          <Button variant="secondary" size="sm" className="relative h-8 px-2.5">
            <ShoppingBag size={14} />
            <span className="hidden sm:inline text-xs">Cart</span>
            {cartCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-sky-600 text-white text-[10px] font-bold rounded-full tabular-nums">
                {cartCount}
              </span>
            )}
          </Button>
        </Link>
      </div>
    </header>
  );
};

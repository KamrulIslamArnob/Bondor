"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import {
  Anchor,
  LayoutDashboard,
  BookOpen,
  Package,
  ShoppingBag,
  PlusCircle,
  BarChart3,
  LogOut,
  Layers,
  Store,
  Hammer,
  GraduationCap,
  Sparkles,
  ChevronRight,
  X
} from "lucide-react";

interface SidebarProps {
  onCloseMobile?: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  counter?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ onCloseMobile }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, userProfile, activeRole, setActiveRole, logout } = useAuth();
  const { cartCount } = useCart();

  const isSeller = activeRole === "seller";
  const isBoth = userProfile?.role === "both";

  const handleRoleSwitch = (role: "builder" | "seller") => {
    if (!isBoth && userProfile?.role !== role) return; // RBAC: only "both" can switch freely
    setActiveRole(role);
    if (role === "seller") {
      router.push("/seller-dashboard");
    } else {
      router.push("/builder-dashboard");
    }
    if (onCloseMobile) onCloseMobile();
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
    if (onCloseMobile) onCloseMobile();
  };

  const builderLinks: NavItem[] = [
    {
      label: "Business Docks",
      href: "/builder-dashboard",
      icon: <LayoutDashboard size={16} />,
      badge: "4 Active",
    },
    {
      label: "My Storefront",
      href: "/my-store",
      icon: <Store size={16} />,
      badge: "Shopify",
    },
    {
      label: "Video Academy",
      href: "/courses",
      icon: <GraduationCap size={16} />,
    },
    {
      label: "Starter Supplies",
      href: "/materials",
      icon: <Package size={16} />,
    },
    {
      label: "My Masterclasses",
      href: "/my-courses",
      icon: <BookOpen size={16} />,
    },
    {
      label: "Shopping Cart",
      href: "/cart",
      icon: <ShoppingBag size={16} />,
      counter: cartCount,
    },
  ];

  const sellerLinks: NavItem[] = [
    {
      label: "Seller Dashboard",
      href: "/seller-dashboard",
      icon: <BarChart3 size={16} />,
    },
    {
      label: "My Storefront",
      href: "/my-store",
      icon: <Store size={16} />,
      badge: "Live",
    },
    {
      label: "List Material Pack",
      href: "/seller/products/new",
      icon: <PlusCircle size={16} />,
      badge: "New",
    },
    {
      label: "Publish Course",
      href: "/seller/courses/new",
      icon: <PlusCircle size={16} />,
      badge: "New",
    },
  ];

  const navItems = isSeller ? sellerLinks : builderLinks;

  return (
    <aside className="w-64 h-full bg-slate-50/70 border-r border-slate-200/80 flex flex-col justify-between shrink-0 select-none">
      {/* Top Header & Workspace Switcher */}
      <div className="p-4 space-y-4">
        {/* Brand */}
        <div className="flex items-center justify-between">
          <Link
            href={user ? (isSeller ? "/seller-dashboard" : "/builder-dashboard") : "/"}
            onClick={onCloseMobile}
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold text-sm shadow-xs group-hover:bg-sky-500 transition-colors border border-sky-500">
              <Anchor size={16} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-bold text-slate-900 tracking-tight">Bondor</span>
                <span className="text-[10px] font-semibold text-sky-700 bg-sky-50 px-1.5 py-0.2 rounded-full border border-sky-200/80">
                  Live
                </span>
              </div>
              <span className="text-[10px] text-slate-500 font-medium block">
                Maker &amp; Vendor Hub
              </span>
            </div>
          </Link>

          {onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100 cursor-pointer"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Dual Mode / Workspace Switcher */}
        {isBoth ? (
          <div className="p-1 bg-white rounded-full border border-slate-200 shadow-xs">
            <div className="grid grid-cols-2 gap-1">
              <button
                type="button"
                onClick={() => handleRoleSwitch("builder")}
                className={`flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                  !isSeller
                    ? "bg-sky-600 text-white shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Hammer size={13} />
                <span>Builder</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSwitch("seller")}
                className={`flex items-center justify-center gap-1.5 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                  isSeller
                    ? "bg-sky-600 text-white shadow-xs font-bold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                <Store size={13} />
                <span>Seller</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2 py-2 px-3 bg-sky-50 border border-sky-200/60 rounded-full">
            {isSeller ? <Store size={13} className="text-sky-600" /> : <Hammer size={13} className="text-sky-600" />}
            <span className="text-xs font-bold text-sky-800 capitalize">{activeRole} Workspace</span>
            <span className="text-[10px] font-semibold text-sky-700 bg-white px-1.5 py-0.2 rounded-full border border-sky-200">Locked</span>
          </div>
        )}

        {/* Navigation Section */}
        <div className="space-y-1 pt-1">
          <div className="px-2 pb-1.5">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              {isSeller ? "Seller Operations" : "Maker Navigation"}
            </span>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onCloseMobile}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-all ${
                    isActive
                      ? "bg-sky-600 text-white font-semibold shadow-xs"
                      : "text-slate-700 hover:text-slate-900 hover:bg-white border border-transparent font-medium"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? "text-white" : "text-slate-400"}>
                      {item.icon}
                    </span>
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive
                          ? "bg-white text-sky-800"
                          : "bg-slate-100 text-slate-700 border border-slate-200"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}

                  {typeof item.counter === "number" && item.counter > 0 && (
                    <span className="px-1.5 py-0.2 bg-white text-sky-800 text-[10px] font-bold rounded-full tabular-nums">
                      {item.counter}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Secondary Navigation */}
        <div className="space-y-1 pt-3 border-t border-slate-200/80">
          <div className="px-2 pb-1.5">
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Quick Shortcuts
            </span>
          </div>

          <nav className="space-y-0.5">
            <Link
              href="/courses?business=tshirt"
              onClick={onCloseMobile}
              className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-slate-700 hover:text-slate-900 hover:bg-white transition-colors font-medium"
            >
              <div className="flex items-center gap-2.5">
                <Layers size={14} className="text-slate-400" />
                <span>Apparel Dock</span>
              </div>
              <ChevronRight size={13} className="text-slate-400" />
            </Link>

            <Link
              href="/courses?business=candle"
              onClick={onCloseMobile}
              className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-slate-700 hover:text-slate-900 hover:bg-white transition-colors font-medium"
            >
              <div className="flex items-center gap-2.5">
                <Sparkles size={14} className="text-slate-400" />
                <span>Candle Studio</span>
              </div>
              <ChevronRight size={13} className="text-slate-400" />
            </Link>
          </nav>
        </div>
      </div>

      {/* User Footer Profile & Disconnect */}
      <div className="p-4 border-t border-slate-200/80 space-y-3 bg-white/70">
        {user ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-xs shrink-0 border border-slate-800">
                {userProfile?.name?.charAt(0) || user.email?.charAt(0) || "U"}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-slate-900 truncate">
                  {userProfile?.name || "Verified User"}
                </p>
                <p className="text-[10px] text-slate-500 capitalize truncate font-medium">
                  {activeRole} Mode
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md hover:bg-slate-100 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut size={15} />
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <Link href="/login" onClick={onCloseMobile} className="block">
              <button className="w-full py-1.5 px-3 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors border border-slate-900 cursor-pointer">
                Sign In
              </button>
            </Link>
            <Link href="/signup" onClick={onCloseMobile} className="block">
              <button className="w-full py-1.5 px-3 bg-white border border-slate-200 text-slate-900 rounded-lg text-xs font-semibold hover:bg-sky-50 transition-colors cursor-pointer">
                Create Account
              </button>
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
};

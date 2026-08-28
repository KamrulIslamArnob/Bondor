"use client";

import React from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, LogOut, Plus, BookOpen, Package, Compass, LayoutDashboard, Anchor } from "lucide-react";
import { Button } from "@/components/ui/Button";

export const Navbar: React.FC = () => {
  const { user, userProfile, activeRole, setActiveRole, logout } = useAuth();
  const { cartCount } = useCart();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  const handleModeChange = (mode: "builder" | "seller") => {
    setActiveRole(mode);
    if (mode === "seller") {
      router.push("/seller-dashboard");
    } else {
      router.push("/builder-dashboard");
    }
  };

  const isSellerView = activeRole === "seller";
  const isBoth = userProfile?.role === "both";

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link
          href={user ? (isSellerView ? "/seller-dashboard" : "/builder-dashboard") : "/"}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold text-sm shadow-xs group-hover:bg-sky-500 transition-colors border border-sky-500">
            <Anchor size={16} />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-slate-900 tracking-tight">
                Bondor
              </span>
              <span className="text-[10px] font-semibold text-sky-700 bg-sky-50 px-1.5 py-0.2 rounded-full border border-sky-200/80">
                Live
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium">
              Maker &amp; Seller Hub
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-2">
          {user ? (
            <>
              {/* Dual Role Switcher */}
              {isBoth && (
                <div className="flex items-center p-0.5 bg-slate-100/80 border border-slate-200 rounded-full mr-2 shadow-xs">
                  <button
                    type="button"
                    className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                      activeRole === "builder"
                        ? "bg-white text-slate-900 shadow-xs font-bold"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                    onClick={() => handleModeChange("builder")}
                  >
                    Builder
                  </button>
                  <button
                    type="button"
                    className={`px-3 py-1 text-xs font-semibold rounded-full transition-all ${
                      activeRole === "seller"
                        ? "bg-white text-slate-900 shadow-xs font-bold"
                        : "text-slate-600 hover:text-slate-900"
                    }`}
                    onClick={() => handleModeChange("seller")}
                  >
                    Seller
                  </button>
                </div>
              )}

              {/* Builder Actions */}
              {!isSellerView && (
                <div className="flex items-center gap-1.5">
                  <Link href="/builder-dashboard">
                    <Button
                      variant={pathname === "/builder-dashboard" ? "default" : "ghost"}
                      size="sm"
                      leftIcon={<LayoutDashboard size={14} />}
                    >
                      <span className="hidden sm:inline">Docks</span>
                    </Button>
                  </Link>
                  <Link href="/my-courses">
                    <Button
                      variant={pathname === "/my-courses" ? "default" : "ghost"}
                      size="sm"
                      leftIcon={<BookOpen size={14} />}
                    >
                      <span className="hidden sm:inline">My Courses</span>
                    </Button>
                  </Link>
                  <Link href="/cart">
                    <Button
                      variant={pathname === "/cart" ? "default" : "secondary"}
                      size="sm"
                      className="relative"
                    >
                      <ShoppingBag size={14} />
                      <span className="hidden sm:inline">Cart</span>
                      {cartCount > 0 && (
                        <span className="ml-1 px-1.5 py-0.2 bg-sky-600 text-white text-[10px] font-bold rounded-full tabular-nums">
                          {cartCount}
                        </span>
                      )}
                    </Button>
                  </Link>
                </div>
              )}

              {/* Seller Actions */}
              {isSellerView && (
                <div className="flex items-center gap-1.5">
                  <Link href="/seller-dashboard">
                    <Button
                      variant={pathname === "/seller-dashboard" ? "default" : "ghost"}
                      size="sm"
                      leftIcon={<LayoutDashboard size={14} />}
                    >
                      <span className="hidden sm:inline">Dashboard</span>
                    </Button>
                  </Link>
                  <Link href="/seller/products/new">
                    <Button
                      variant="secondary"
                      size="sm"
                      leftIcon={<Plus size={13} />}
                    >
                      <span>Add Kit</span>
                    </Button>
                  </Link>
                  <Link href="/seller/courses/new">
                    <Button
                      variant="gradient"
                      size="sm"
                      leftIcon={<Plus size={13} />}
                    >
                      <span>Add Course</span>
                    </Button>
                  </Link>
                </div>
              )}

              {/* User Logout */}
              <div className="flex items-center pl-2 border-l border-slate-200 ml-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  title="Disconnect Session"
                  className="text-slate-400 hover:text-rose-600"
                >
                  <LogOut size={15} />
                </Button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/builder-dashboard">
                <Button variant="ghost" size="sm">
                  Explore Docks
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="secondary" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="gradient" size="sm">
                  Get Started
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

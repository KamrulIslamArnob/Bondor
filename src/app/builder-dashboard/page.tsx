"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { BUSINESS_CATEGORIES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { BookOpen, Package, Calculator, Search, Layers, Flame, Sparkles, Printer } from "lucide-react";

const getDockIcon = (id: string) => {
  switch (id) {
    case "tshirt":
      return <Layers size={20} className="text-sky-600" />;
    case "candle":
      return <Flame size={20} className="text-amber-600" />;
    case "soap":
      return <Sparkles size={20} className="text-emerald-600" />;
    default:
      return <Printer size={20} className="text-rose-600" />;
  }
};

export default function BuilderDashboard() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();
  const [enrolledCount, setEnrolledCount] = useState<number>(0);
  const [materialsCount, setMaterialsCount] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("all");

  // Auth guard: require login
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  // RBAC guard: pure seller should use seller dashboard
  useEffect(() => {
    if (!loading && userProfile?.role === "seller") {
      router.push("/seller-dashboard");
    }
  }, [loading, userProfile, router]);

  const [isCalcOpen, setIsCalcOpen] = useState(false);
  const [calcDock, setCalcDock] = useState(BUSINESS_CATEGORIES[0].id);
  const [calcUnits, setCalcUnits] = useState(100);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    const fetchCounts = async () => {
      try {
        const [enrollSnap, prodSnap] = await Promise.all([
          getDocs(query(collection(db, "enrollments"), where("userId", "==", user.uid))),
          getDocs(collection(db, "products")),
        ]);
        if (!cancelled) {
          setEnrolledCount(enrollSnap.size);
          setMaterialsCount(prodSnap.size);
        }
      } catch (e) {
        console.error("Error fetching stats:", e);
      }
    };
    fetchCounts();
    return () => { cancelled = true; };
  }, [user]);

  if (loading) {
    return <LoadingSpinner message="Loading builder workspace..." />;
  }

  if (!user) {
    return <LoadingSpinner message="Redirecting to sign in..." />;
  }

  if (userProfile?.role === "seller") {
    return <LoadingSpinner message="Redirecting to seller workspace..." />;
  }

  const filteredDocks = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return BUSINESS_CATEGORIES.filter((dock) => {
      const matchesSearch =
        dock.title.toLowerCase().includes(q) ||
        dock.subtitle.toLowerCase().includes(q) ||
        dock.code.toLowerCase().includes(q);
      const matchesFilter = filterCategory === "all" || dock.id === filterCategory;
      return matchesSearch && matchesFilter;
    });
  }, [searchQuery, filterCategory]);

  const selectedCalcDock = useMemo(() => BUSINESS_CATEGORIES.find((d) => d.id === calcDock) || BUSINESS_CATEGORIES[0], [calcDock]);
  const { estKitCost, kitsNeeded, totalSupplyCost, estimatedRevenue, estimatedProfit } = useMemo(() => {
    const cost = calcDock === "tshirt" ? 1200 : calcDock === "candle" ? 850 : calcDock === "soap" ? 650 : 450;
    const kits = Math.ceil(calcUnits / 25);
    const total = kits * cost;
    const revenue = calcUnits * (cost / 12);
    return { estKitCost: cost, kitsNeeded: kits, totalSupplyCost: total, estimatedRevenue: revenue, estimatedProfit: revenue - total };
  }, [calcDock, calcUnits]);

  return (
    <div className="space-y-8">
      {/* Header Banner with Modern Gradient */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sky-600 via-sky-500 to-sky-700 text-white border border-sky-500 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/15 pb-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white bg-white/15 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 uppercase tracking-wider shadow-xs">
                Maker Workspace
              </span>
              <span className="text-xs font-semibold text-sky-100 bg-sky-400/20 px-3 py-1 rounded-full border border-white/15 shadow-xs">
                Active Harbor
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-balance">
              {user ? `Welcome back, ${userProfile?.name || "Maker"}` : "Maker Business Hub"}
            </h1>
            <p className="text-sm text-sky-100 leading-relaxed max-w-2xl font-normal text-pretty">
              Master hands-on production skills with modular video courses and order certified starter material packs from verified suppliers.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="secondary"
              size="md"
              onClick={() => setIsCalcOpen(true)}
              leftIcon={<Calculator size={15} className="text-sky-600" />}
            >
              Batch Calculator
            </Button>
          </div>
        </div>

        {/* Telemetry Stat Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 space-y-1 shadow-xs">
            <span className="text-xs font-medium text-sky-100 block uppercase tracking-wider">Available Docks</span>
            <span className="text-2xl font-bold text-white tabular-nums">4</span>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 space-y-1 shadow-xs">
            <span className="text-xs font-medium text-sky-100 block uppercase tracking-wider">Enrolled Courses</span>
            <span className="text-2xl font-bold text-white tabular-nums">
              {user ? enrolledCount : "0"}
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 space-y-1 shadow-xs">
            <span className="text-xs font-medium text-sky-100 block uppercase tracking-wider">Supply Kits</span>
            <span className="text-2xl font-bold text-white tabular-nums">
              {materialsCount || 11}
            </span>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 space-y-1 shadow-xs">
            <span className="text-xs font-medium text-sky-100 block uppercase tracking-wider">Network Status</span>
            <span className="text-2xl font-bold text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Active
            </span>
          </div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search categories..."
            className="w-full pl-9 pr-3.5 py-2 bg-slate-50/70 border border-slate-200 rounded-full text-base sm:text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Chips */}
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          <button
            onClick={() => setFilterCategory("all")}
            className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              filterCategory === "all"
                ? "bg-sky-600 text-white shadow-xs"
                : "bg-slate-100/80 text-slate-700 hover:bg-slate-200/70 border border-slate-200/60"
            }`}
          >
            All (4)
          </button>
          {BUSINESS_CATEGORIES.map((dock, index) => (
            <button
              key={dock.id}
              onClick={() => setFilterCategory(dock.id)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all cursor-pointer ${
                filterCategory === dock.id
                  ? "bg-sky-600 text-white shadow-xs"
                  : "bg-slate-100/80 text-slate-700 hover:bg-slate-200/70 border border-slate-200/60"
              }`}
            >
              0{index + 1}. {dock.title.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Docks Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredDocks.map((dock, index) => (
          <div
            key={dock.id}
            className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between gap-5 transition-[box-shadow,border-color,transform] duration-200 group shadow-xs hover:shadow-card hover:border-sky-300 hover:-translate-y-0.5"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md tabular-nums">
                    0{index + 1}.
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-100 flex items-center justify-center font-bold">
                    {getDockIcon(dock.id)}
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-sky-700 bg-sky-50 px-2.5 py-0.5 rounded-full border border-sky-200/80 tabular-nums">
                  {dock.growth}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors text-balance">
                  {dock.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed text-pretty">
                  {dock.subtitle}
                </p>
              </div>

              <div className="pt-1 flex items-center justify-between text-xs text-slate-600 font-medium tabular-nums">
                <span className="bg-slate-50 px-2.5 py-0.5 rounded-full border border-slate-200/60">
                  {dock.coursesCount} Courses
                </span>
                <span className="bg-slate-50 px-2.5 py-0.5 rounded-full border border-slate-200/60">
                  {dock.materialsCount} Kits
                </span>
              </div>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-100">
              <Link href={`/courses?business=${dock.id}`} className="block">
                <Button variant="default" size="sm" fullWidth leftIcon={<BookOpen size={13} />}>
                  Browse Courses
                </Button>
              </Link>
              <Link href={`/materials?business=${dock.id}`} className="block">
                <Button variant="secondary" size="sm" fullWidth leftIcon={<Package size={13} />}>
                  Order Supplies
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Production Batch Calculator Modal */}
      <Modal isOpen={isCalcOpen} onClose={() => setIsCalcOpen(false)} title="Production Batch Calculator">
        <div className="space-y-5">
          <p className="text-xs text-zinc-600 leading-relaxed">
            Estimate starter material requirements, production cost, and profit margins before ordering supplies.
          </p>

          <div className="space-y-3.5">
            <div>
              <label className="text-xs font-medium text-zinc-700 block mb-1">
                Business Category
              </label>
              <select
                className="w-full p-2 bg-white border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-zinc-900"
                value={calcDock}
                onChange={(e) => setCalcDock(e.target.value)}
              >
                {BUSINESS_CATEGORIES.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <div className="flex justify-between text-xs font-medium text-zinc-700 mb-1">
                <span>Target Batch Volume</span>
                <span className="font-semibold text-zinc-950">{calcUnits} units</span>
              </div>
              <input
                type="range"
                min="25"
                max="500"
                step="25"
                value={calcUnits}
                onChange={(e) => setCalcUnits(Number(e.target.value))}
                className="w-full accent-zinc-900 cursor-pointer"
              />
            </div>
          </div>

          {/* Simulation Output Card */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-zinc-600">Starter Kits Needed:</span>
              <span className="font-semibold text-zinc-900">{kitsNeeded} kit(s)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600">Total Material Cost:</span>
              <span className="font-semibold text-zinc-900">৳{totalSupplyCost.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600">Estimated Batch Revenue:</span>
              <span className="font-semibold text-emerald-700">
                ৳{estimatedRevenue.toLocaleString()}
              </span>
            </div>
            <div className="pt-2 border-t border-zinc-200 flex justify-between font-semibold text-zinc-950 text-sm">
              <span>Estimated Net Margin:</span>
              <span className="text-zinc-950">৳{estimatedProfit.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Link href={`/materials?business=${calcDock}`} className="flex-1" onClick={() => setIsCalcOpen(false)}>
              <Button variant="default" size="md" fullWidth>
                Order {selectedCalcDock.title.split(" ")[0]} Supplies
              </Button>
            </Link>
            <Button variant="secondary" size="md" onClick={() => setIsCalcOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { SellerStats } from "@/components/seller/SellerStats";
import { TrendingDocks } from "@/components/seller/TrendingDocks";
import { ProductsTable } from "@/components/seller/ProductsTable";
import { CoursesTable } from "@/components/seller/CoursesTable";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui/Button";
import { Product, Course } from "@/types";
import { collection, query, where, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Plus, Package, BookOpen, Clock } from "lucide-react";

export default function SellerDashboard() {
  const { user, userProfile, loading } = useAuth();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "all">("30d");

  const loadSellerData = useCallback(async (uid: string) => {
    setLoadingData(true);
    try {
      const [pSnap, cSnap] = await Promise.all([
        getDocs(query(collection(db, "products"), where("sellerId", "==", uid))),
        getDocs(query(collection(db, "courses"), where("sellerId", "==", uid))),
      ]);
      const pList: Product[] = [];
      pSnap.forEach((d) => {
        pList.push({ id: d.id, ...(d.data() as Omit<Product, "id">) });
      });
      const cList: Course[] = [];
      cSnap.forEach((d) => {
        cList.push({ id: d.id, ...(d.data() as Omit<Course, "id">) });
      });
      setProducts(pList);
      setCourses(cList);
    } catch (err) {
      console.error("Error loading seller data:", err);
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      loadSellerData(user.uid);
    }
  }, [user, loadSellerData]);

  const handleDeleteProduct = useCallback(async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this material pack?")) return;
    try {
      await deleteDoc(doc(db, "products", id));
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Failed to delete product:", err);
      alert("Failed to delete product.");
    }
  }, []);

  const handleDeleteCourse = useCallback(async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await deleteDoc(doc(db, "courses", id));
      setCourses((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Failed to delete course:", err);
      alert("Failed to delete course.");
    }
  }, []);

  // Auth guard
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    if (!loading && userProfile?.role === "builder") {
      router.push("/builder-dashboard");
    }
  }, [loading, userProfile, router]);

  if (loading) {
    return <LoadingSpinner message="Loading seller workspace..." />;
  }

  if (!user) {
    return <LoadingSpinner message="Redirecting to sign in..." />;
  }

  if (userProfile?.role === "builder") {
    return <LoadingSpinner message="Redirecting to builder workspace..." />;
  }

  const earningsByRange = useMemo(() => ({
    "7d": 4800,
    "30d": 18400,
    all: 52600,
  }[timeRange]), [timeRange]);

  const ordersByRange = useMemo(() => ({
    "7d": 4,
    "30d": 16,
    all: 48,
  }[timeRange]), [timeRange]);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sky-600 via-sky-500 to-sky-700 text-white border border-sky-500 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/15 pb-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white bg-white/15 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-xs uppercase tracking-wider">
                Seller Operations
              </span>
              <span className="text-xs font-semibold text-sky-100 bg-sky-400/20 px-3 py-1 rounded-full border border-white/15 shadow-xs">
                Live Store
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-balance">
              Store &amp; Academy Management
            </h1>
            <p className="text-sm text-sky-100 leading-relaxed font-normal max-w-2xl text-pretty">
              Manage live inventory, publish video modules, and monitor verified sales in Bangladesh.
            </p>
          </div>

          {/* Time Range Filter */}
          <div className="flex items-center gap-1 p-1 bg-white/15 backdrop-blur-md border border-white/20 rounded-full shadow-xs">
            <Clock size={13} className="text-sky-200 ml-2 mr-0.5" />
            <button
              onClick={() => setTimeRange("7d")}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                timeRange === "7d"
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-sky-100 hover:text-white"
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeRange("30d")}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                timeRange === "30d"
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-sky-100 hover:text-white"
              }`}
            >
              30 Days
            </button>
            <button
              onClick={() => setTimeRange("all")}
              className={`px-3 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                timeRange === "all"
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "text-sky-100 hover:text-white"
              }`}
            >
              All Time
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Link href="/seller/products/new">
            <Button variant="secondary" size="sm" leftIcon={<Plus size={13} />}>
              Add Material Pack
            </Button>
          </Link>
          <Link href="/seller/courses/new">
            <Button variant="gradient" size="sm" leftIcon={<Plus size={13} />}>
              Publish Video Course
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <SellerStats
        totalEarnings={earningsByRange}
        ordersCount={ordersByRange}
        activeProductsCount={products.length}
        activeCoursesCount={courses.length}
      />

      {/* Live Storefront Spotlight Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-xs border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
              Micro-Storefront Feature (Shopify Mode)
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            Launch &amp; Manage Your Own Brand Website
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed font-normal">
            Create your unique public store at <code className="text-sky-300 font-mono">/store/[your-brand]</code>, customize banners and themes, and process direct orders with Cash on Delivery and bKash.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link href="/my-store">
            <Button variant="default" size="md" className="bg-sky-500 hover:bg-sky-400 text-white font-bold">
              Manage My Storefront
            </Button>
          </Link>
          <a
            href="/store/demo-crafts"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold border border-white/15 transition-colors"
          >
            Preview Demo Store
          </a>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Trending Docks Radar & Quick Shortcuts */}
        <div className="lg:col-span-4 space-y-6">
          <TrendingDocks />

          {/* Quick Actions Card */}
          <div className="bg-white border border-zinc-200/90 rounded-2xl p-5 shadow-xs space-y-3">
            <h3 className="text-base font-bold text-zinc-950">
              Publish New Content
            </h3>
            <p className="text-xs text-zinc-600 leading-relaxed font-medium">
              Broadcast new starter packs or lesson series to all registered harbor builders.
            </p>
            <div className="space-y-2 pt-2">
              <Link href="/seller/products/new" className="block">
                <Button variant="secondary" fullWidth size="sm" leftIcon={<Package size={14} />}>
                  List Material Pack
                </Button>
              </Link>
              <Link href="/seller/courses/new" className="block">
                <Button variant="gradient" fullWidth size="sm" leftIcon={<BookOpen size={14} />}>
                  Publish Video Course
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Right: Products & Courses Tables */}
        <div className="lg:col-span-8 space-y-6">
          {/* Products Table Card */}
          <div className="bg-white border border-zinc-200/90 rounded-2xl shadow-xs overflow-hidden">
            <div className="p-4 border-b border-zinc-100 flex items-center justify-between bg-[#FAF8F5]">
              <div>
                <h3 className="text-base font-bold text-zinc-950">
                  Material Packs Inventory ({products.length})
                </h3>
                <p className="text-xs text-zinc-600 font-medium">
                  Live raw supplies available for builder order
                </p>
              </div>
              <Link href="/seller/products/new">
                <Button variant="secondary" size="sm" leftIcon={<Plus size={12} />}>
                  New Kit
                </Button>
              </Link>
            </div>

            <ProductsTable
              products={products}
              onDelete={user ? handleDeleteProduct : undefined}
              loading={loadingData}
            />
          </div>

          {/* Courses Table Card */}
          <div className="bg-white border border-zinc-200/90 rounded-2xl shadow-xs overflow-hidden">
            <div className="p-4 border-b border-zinc-100 flex items-center justify-between bg-[#FAF8F5]">
              <div>
                <h3 className="text-base font-bold text-zinc-950">
                  Video Masterclasses ({courses.length})
                </h3>
                <p className="text-xs text-zinc-600 font-medium">
                  Published hands-on creator lessons
                </p>
              </div>
              <Link href="/seller/courses/new">
                <Button variant="gradient" size="sm" leftIcon={<Plus size={12} />}>
                  New Course
                </Button>
              </Link>
            </div>

            <CoursesTable
              courses={courses}
              onDelete={user ? handleDeleteCourse : undefined}
              loading={loadingData}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

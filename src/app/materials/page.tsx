"use client";

import React, { useEffect, useState, Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Product } from "@/types";
import { BUSINESS_CATEGORIES } from "@/lib/constants";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { BookOpen, Search, ArrowLeft, Package } from "lucide-react";

const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "prod_tshirt_01",
    name: "Screenprint Starter Pack (20 Cotton Blanks + 1kg Plastisol Ink)",
    description: "20 premium combed cotton blanks (180 GSM), 1kg eco-plastisol ink, 110-mesh wooden screen frame, squeegee, and emulsion kit.",
    category: "tshirt",
    price: 4500,
    stock: 45,
    sellerId: "seller_dhaka_01",
    images: ["https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=85"],
    createdAt: Date.now(),
  },
  {
    id: "prod_candle_01",
    name: "Artisan Soy Wax Starter Bundle (1kg Golden Wax + 20 Wicks + Oils)",
    description: "1kg 100% organic soy wax flakes, 20 braided cotton wicks, 100ml therapeutic fragrance oil blend, and 6 amber glass jars.",
    category: "candle",
    price: 3200,
    stock: 30,
    sellerId: "seller_sylhet_01",
    images: ["https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=800&q=85"],
    createdAt: Date.now(),
  },
  {
    id: "prod_soap_01",
    name: "Botanical Soap Starter Pack (Organic Coconut & Olive Oil + Lye)",
    description: "1L cold-pressed virgin coconut oil, 500ml olive oil, high-purity sodium hydroxide (lye), natural turmeric colorant, and silicone loaf mold.",
    category: "soap",
    price: 2800,
    stock: 25,
    sellerId: "seller_ctg_01",
    images: ["https://images.unsplash.com/photo-1607006314633-8a30364d99c4?auto=format&fit=crop&w=800&q=85"],
    createdAt: Date.now(),
  },
  {
    id: "prod_mug_01",
    name: "Sublimation Merch Kit (12 Ceramic Blanks + Heat Tape + Paper)",
    description: "12 grade-AAA coated white ceramic mugs, 50 sheets high-transfer sublimation paper, thermal tape, and protective silicon wraps.",
    category: "mug",
    price: 2100,
    stock: 40,
    sellerId: "seller_dhaka_02",
    images: ["https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=85"],
    createdAt: Date.now(),
  },
];

function MaterialsContent() {
  const searchParams = useSearchParams();
  const businessParam = searchParams.get("business");

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDock, setSelectedDock] = useState<string>(businessParam || "all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    if (businessParam) {
      setSelectedDock(businessParam);
    }
  }, [businessParam]);

  useEffect(() => {
    let cancelled = false;
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const snap = await getDocs(collection(db, "products"));
        const list: Product[] = [];
        snap.forEach((doc) => {
          list.push({ id: doc.id, ...(doc.data() as Omit<Product, "id">) });
        });
        if (!cancelled) setProducts(list.length > 0 ? list : DEFAULT_PRODUCTS);
      } catch (err) {
        console.error("Error fetching products, using defaults:", err);
        if (!cancelled) setProducts(DEFAULT_PRODUCTS);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchProducts();
    return () => { cancelled = true; };
  }, []);

  const filteredProducts = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return products.filter((p) => {
      const matchesDock = selectedDock === "all" || p.category === selectedDock;
      const matchesSearch =
        p.name.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q));
      return matchesDock && matchesSearch;
    });
  }, [products, selectedDock, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sky-600 via-sky-500 to-sky-700 text-white border border-sky-500 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/15 pb-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Link href="/builder-dashboard" className="text-xs text-sky-100 hover:text-white flex items-center gap-1 font-medium bg-white/15 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-xs">
                <ArrowLeft size={13} />
                <span>Back to Docks</span>
              </Link>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-balance">
              Starter Supplies &amp; Raw Materials
            </h1>
            <p className="text-sm text-sky-100 leading-relaxed font-normal max-w-2xl text-pretty">
              Order verified raw ingredient kits directly from vetted local sellers in Bangladesh.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link href={`/courses${selectedDock !== "all" ? `?business=${selectedDock}` : ""}`}>
              <Button variant="secondary" size="sm" leftIcon={<BookOpen size={14} className="text-sky-600" />}>
                Browse Video Courses
              </Button>
            </Link>
          </div>
        </div>

        {/* Filter Chips & Search */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <button
              onClick={() => setSelectedDock("all")}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all cursor-pointer ${
                selectedDock === "all"
                  ? "bg-white text-slate-900 shadow-xs font-bold"
                  : "bg-white/15 text-sky-100 hover:bg-white/25 border border-white/20"
              }`}
            >
              All Supplies ({products.length})
            </button>
            {BUSINESS_CATEGORIES.map((dock) => (
              <button
                key={dock.id}
                onClick={() => setSelectedDock(dock.id)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-full whitespace-nowrap transition-all cursor-pointer ${
                  selectedDock === dock.id
                    ? "bg-white text-slate-900 shadow-xs font-bold"
                    : "bg-white/15 text-sky-100 hover:bg-white/25 border border-white/20"
                }`}
              >
                {dock.title.split(" ")[0]}
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-sky-200" />
            <input
              type="text"
              placeholder="Search supply packs..."
              className="w-full pl-9 pr-3.5 py-2 bg-white/15 border border-white/20 text-white rounded-full text-base sm:text-xs font-medium placeholder:text-sky-200 focus:outline-none focus:bg-white focus:text-slate-900 focus:placeholder:text-slate-400 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <LoadingSpinner message="Retrieving certified material packs..." />
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white border border-zinc-200/90 rounded-xl p-12 text-center shadow-xs flex flex-col items-center justify-center space-y-3">
          <Package size={28} className="text-zinc-400" />
          <div>
            <h3 className="text-base font-semibold text-zinc-900">No Supply Packs Found</h3>
            <p className="text-xs text-zinc-500 max-w-sm mt-1">
              No inventory currently matches your selected category and search terms.
            </p>
          </div>
          <Button variant="secondary" size="sm" onClick={() => { setSelectedDock("all"); setSearchQuery(""); }}>
            Reset Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function MaterialsPage() {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading materials catalog..." />}>
      <MaterialsContent />
    </Suspense>
  );
}

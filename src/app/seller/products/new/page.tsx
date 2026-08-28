"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { BUSINESS_CATEGORIES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Plus, Trash2, ArrowRight, Package } from "lucide-react";

export default function AddProductPage() {
  const router = useRouter();
  const { user, userProfile, loading: authLoading } = useAuth();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(1000);
  const [stock, setStock] = useState<number>(50);
  const [category, setCategory] = useState<string>("tshirt");
  const [imageUrls, setImageUrls] = useState<string[]>([""]);
  const [loading, setLoading] = useState(false);

  // RBAC guard: only seller/both can add products
  React.useEffect(() => {
    if (!authLoading && !user) router.push("/login");
    if (!authLoading && userProfile && userProfile.role === "builder") router.push("/builder-dashboard");
  }, [authLoading, user, userProfile, router]);

  const handleAddImageUrl = () => {
    setImageUrls([...imageUrls, ""]);
  };

  const handleImageUrlChange = (index: number, value: string) => {
    const next = [...imageUrls];
    next[index] = value;
    setImageUrls(next);
  };

  const handleRemoveImageUrl = (index: number) => {
    const next = imageUrls.filter((_, i) => i !== index);
    setImageUrls(next.length > 0 ? next : [""]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in as a seller to list a material pack.");
      return;
    }

    setLoading(true);
    try {
      const validImages = imageUrls.filter((url) => url.trim().length > 0);

      await addDoc(collection(db, "products"), {
        sellerId: user.uid,
        name: name.trim(),
        description: description.trim(),
        price: Number(price),
        stock: Number(stock),
        category: category,
        images: validImages,
        createdAt: Date.now(),
      });

      router.push("/seller-dashboard");
    } catch (err) {
      console.error("Error creating product:", err);
      alert("Failed to publish material pack. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white border border-zinc-200/90 rounded-xl p-6 sm:p-7 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Link href="/seller-dashboard" className="text-xs text-zinc-500 hover:text-zinc-900 flex items-center gap-1 font-medium">
            <ArrowLeft size={13} />
            <span>Back to Workspace</span>
          </Link>
        </div>
        <div className="space-y-1">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider block">
            Supply Inventory
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">
            List New Material Pack
          </h1>
          <p className="text-sm text-zinc-600">
            Publish verified raw materials and starter kits for maker batch production.
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-zinc-200/90 rounded-xl p-6 sm:p-7 shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-700 block">
              Material Pack Title *
            </label>
            <input
              type="text"
              placeholder="e.g. 50x Premium Blank 220 GSM Organic Cotton Tees"
              className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm placeholder:text-zinc-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-zinc-900"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 block">
                Category *
              </label>
              <select
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-zinc-900"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {BUSINESS_CATEGORIES.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 block">
                Unit Price (৳ BDT) *
              </label>
              <input
                type="number"
                min="1"
                step="1"
                placeholder="1000"
                className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-zinc-900"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 block">
                Initial Stock Units *
              </label>
              <input
                type="number"
                min="0"
                step="1"
                placeholder="50"
                className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-zinc-900"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-700 block">
              Package Specifications &amp; Material Breakdown *
            </label>
            <textarea
              rows={4}
              placeholder="List all ingredients, dimensions, certifications, and recommended batch usage..."
              className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm placeholder:text-zinc-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-zinc-900"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Image URLs */}
          <div className="space-y-2 pt-2 border-t border-zinc-100">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-zinc-700">
                Product Image URLs
              </label>
              <button
                type="button"
                onClick={handleAddImageUrl}
                className="text-xs text-zinc-600 hover:text-zinc-900 flex items-center gap-1 font-medium"
              >
                <Plus size={13} />
                <span>Add Image</span>
              </button>
            </div>

            {imageUrls.map((url, idx) => (
              <div key={idx} className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... or direct image link"
                  className="flex-1 px-3.5 py-1.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs focus:outline-none focus:bg-white focus:ring-1 focus:ring-zinc-900"
                  value={url}
                  onChange={(e) => handleImageUrlChange(idx, e.target.value)}
                />
                {imageUrls.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveImageUrl(idx)}
                    className="p-1.5 text-zinc-400 hover:text-rose-600 rounded transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-zinc-100 flex items-center justify-end gap-3">
            <Link href="/seller-dashboard">
              <Button variant="secondary" size="md">
                Cancel
              </Button>
            </Link>
            <Button
              type="submit"
              variant="default"
              size="md"
              isLoading={loading}
              rightIcon={<ArrowRight size={14} />}
            >
              Publish Material Pack
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

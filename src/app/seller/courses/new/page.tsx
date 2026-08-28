"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { BUSINESS_CATEGORIES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Plus, Trash2, ArrowRight } from "lucide-react";

export default function AddCoursePage() {
  const router = useRouter();
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [business, setBusiness] = useState<string>("tshirt");
  const [links, setLinks] = useState<string[]>([""]);
  const [loading, setLoading] = useState(false);

  const handleAddLink = () => {
    setLinks([...links, ""]);
  };

  const handleLinkChange = (index: number, value: string) => {
    const next = [...links];
    next[index] = value;
    setLinks(next);
  };

  const handleRemoveLink = (index: number) => {
    const next = links.filter((_, i) => i !== index);
    setLinks(next.length > 0 ? next : [""]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in as a seller to publish a course.");
      return;
    }

    setLoading(true);
    try {
      const validLinks = links.filter((l) => l.trim().length > 0);

      await addDoc(collection(db, "courses"), {
        sellerId: user.uid,
        title: title.trim(),
        description: description.trim(),
        price: Number(price),
        business: business,
        links: validLinks,
        createdAt: Date.now(),
      });

      router.push("/seller-dashboard");
    } catch (err) {
      console.error("Error creating course:", err);
      alert("Failed to publish course. Please try again.");
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
            Academy Curriculum
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight">
            Publish Video Course
          </h1>
          <p className="text-sm text-zinc-600">
            Share your hands-on production expertise and structure modular video lessons.
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-zinc-200/90 rounded-xl p-6 sm:p-7 shadow-xs">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-700 block">
              Course Title *
            </label>
            <input
              type="text"
              placeholder="e.g. Masterclass: Starting a Silk-Screen Apparel Brand from Home"
              className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm placeholder:text-zinc-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-zinc-900"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-zinc-700 block">
                Category *
              </label>
              <select
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-zinc-900"
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
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
                Enrollment Fee (৳ BDT) *
              </label>
              <input
                type="number"
                min="0"
                step="1"
                placeholder="0 for Free, or enter amount"
                className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-zinc-900"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-zinc-700 block">
              Course Description &amp; Learning Objectives *
            </label>
            <textarea
              rows={4}
              placeholder="Outline what makers will build, recommended tools, and step-by-step takeaways..."
              className="w-full px-3.5 py-2 bg-zinc-50 border border-zinc-200 rounded-lg text-sm placeholder:text-zinc-400 focus:outline-none focus:bg-white focus:ring-1 focus:ring-zinc-900"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Video Lesson URLs */}
          <div className="space-y-2 pt-2 border-t border-zinc-100">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-zinc-700">
                Video Lesson Streams (YouTube / Direct URL)
              </label>
              <button
                type="button"
                onClick={handleAddLink}
                className="text-xs text-zinc-600 hover:text-zinc-900 flex items-center gap-1 font-medium"
              >
                <Plus size={13} />
                <span>Add Lesson Module</span>
              </button>
            </div>

            {links.map((link, idx) => (
              <div key={idx} className="flex gap-2 items-center">
                <span className="text-xs font-semibold text-zinc-400 min-w-[55px]">
                  Lesson {idx + 1}:
                </span>
                <input
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="flex-1 px-3.5 py-1.5 bg-zinc-50 border border-zinc-200 rounded-lg text-xs focus:outline-none focus:bg-white focus:ring-1 focus:ring-zinc-900"
                  value={link}
                  onChange={(e) => handleLinkChange(idx, e.target.value)}
                />
                {links.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveLink(idx)}
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
              Publish Masterclass
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

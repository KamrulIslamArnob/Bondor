"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { BUSINESS_CATEGORIES } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Plus, Trash2, ArrowRight, Clock, ShieldCheck, Info, CheckCircle2, Sparkles } from "lucide-react";

const REQUEST_NEW_VALUE = "__request_new__";

export default function AddCoursePage() {
  const router = useRouter();
  const { user, userProfile, loading: authLoading } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [business, setBusiness] = useState<string>("tshirt");
  const [links, setLinks] = useState<string[]>([""]);
  const [loading, setLoading] = useState(false);

  // New category request fields
  const [proposedName, setProposedName] = useState("");
  const [proposedDesc, setProposedDesc] = useState("");
  const [requestSuccess, setRequestSuccess] = useState(false);
  const [requestId, setRequestId] = useState<string | null>(null);

  React.useEffect(() => {
    if (!authLoading && !user) router.push("/login");
    if (!authLoading && userProfile && userProfile.role === "builder") router.push("/builder-dashboard");
  }, [authLoading, user, userProfile, router]);

  const handleAddLink = () => setLinks([...links, ""]);
  const handleLinkChange = (index: number, value: string) => {
    const next = [...links];
    next[index] = value;
    setLinks(next);
  };
  const handleRemoveLink = (index: number) => {
    const next = links.filter((_, i) => i !== index);
    setLinks(next.length > 0 ? next : [""]);
  };

  const isRequestMode = business === REQUEST_NEW_VALUE;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in as a seller to publish a course.");
      return;
    }

    if (isRequestMode) {
      if (!proposedName.trim() || proposedName.trim().length < 3) {
        alert("Please enter a proposed category name (at least 3 characters).");
        return;
      }
      if (!proposedDesc.trim() || proposedDesc.trim().length < 20) {
        alert("Please provide a detailed description for the new category (at least 20 characters).");
        return;
      }
    }

    setLoading(true);
    try {
      const validLinks = links.filter((l) => l.trim().length > 0);

      if (isRequestMode) {
        const slug = proposedName.trim().toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "").slice(0, 40);
        const docRef = await addDoc(collection(db, "categoryRequests"), {
          type: "course",
          requestedBy: user.uid,
          requestedByEmail: user.email || userProfile?.email || "",
          requestedByName: userProfile?.name || user.displayName || user.email || "Seller",
          proposedName: proposedName.trim(),
          proposedSlug: slug,
          categoryDescription: proposedDesc.trim(),
          businessContext: "Video Course",
          originalCourse: {
            title: title.trim(),
            description: description.trim(),
            price: Number(price),
            links: validLinks,
          },
          status: "pending",
          regulatoryNotice: "Per Bondor Regulatory Guideline BD-2024 §4.2, new business docks require admin verification & compliance review.",
          estimatedReviewDays: "5–6 business days",
          adminNotes: "",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
        setRequestId(docRef.id);
        setRequestSuccess(true);
      } else {
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
      }
    } catch (err) {
      console.error("Error creating course/request:", err);
      alert(isRequestMode ? "Failed to submit category request. Please try again." : "Failed to publish course. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (requestSuccess) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white border border-emerald-200 rounded-2xl p-8 shadow-sm text-center space-y-5">
          <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto">
            <CheckCircle2 size={28} className="text-emerald-600" />
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold text-slate-900">Category Request Submitted</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Your request for <span className="font-bold text-slate-900">“{proposedName}”</span> has been received.
              {requestId && <span className="block text-xs font-mono text-slate-500 mt-1">Ref: {requestId.slice(0, 8).toUpperCase()}</span>}
            </p>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-left space-y-3">
            <div className="flex items-start gap-2.5">
              <Clock size={16} className="text-amber-600 mt-0.5 shrink-0" />
              <div className="space-y-1">
                <p className="text-xs font-bold text-amber-900">Admin Review Timeline — 5–6 Business Days</p>
                <p className="text-xs text-amber-800 leading-relaxed">
                  Per <span className="font-semibold">Bondor Regulatory Guideline BD-2024 §4.2</span> and Bangladesh Digital Commerce compliance, all new business docks undergo admin verification, quality & regulatory screening before appearing in the harbor.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-2.5 pt-2 border-t border-amber-200/60">
              <ShieldCheck size={16} className="text-emerald-600 mt-0.5 shrink-0" />
              <p className="text-xs text-slate-600 leading-relaxed">
                You’ll receive an email at <span className="font-semibold">{user?.email}</span> upon approval. Your course draft is saved and will auto-publish under the new dock once approved. For urgent cases, contact <span className="font-mono text-sky-700">support@bondor.io</span>.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <Link href="/seller-dashboard">
              <Button variant="secondary" size="md">Go to Dashboard</Button>
            </Link>
            <Button variant="default" size="md" onClick={() => { setRequestSuccess(false); setBusiness("tshirt"); setProposedName(""); setProposedDesc(""); }}>
              Submit Another
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
                className={`w-full px-3 py-2 bg-zinc-50 border rounded-lg text-sm focus:outline-none focus:bg-white focus:ring-1 focus:ring-zinc-900 ${isRequestMode ? "border-amber-300 bg-amber-50/50" : "border-zinc-200"}`}
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
              >
                {BUSINESS_CATEGORIES.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.title}
                  </option>
                ))}
                <option value={REQUEST_NEW_VALUE} className="font-bold">
                  ＋ Request New Category…
                </option>
              </select>
              <p className="text-[10px] text-zinc-500">Don’t see your dock? Request a new category.</p>
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

          {/* Request New Category Panel */}
          {isRequestMode && (
            <div className="space-y-4 bg-amber-50/60 border border-amber-200 rounded-xl p-4 animate-in fade-in">
              <div className="flex items-start gap-2">
                <Sparkles size={16} className="text-amber-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-amber-900">Propose a New Business Dock</h4>
                  <p className="text-xs text-amber-800">Your category will be reviewed by Bondor Admin before going live.</p>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 block">
                  Proposed Category Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Perfume & Attar Lab, Leather Craft, Jute Weaving"
                  className="w-full px-3.5 py-2 bg-white border border-amber-200 rounded-lg text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  value={proposedName}
                  onChange={(e) => setProposedName(e.target.value)}
                  required={isRequestMode}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-700 block">
                  Category Purpose &amp; Description *
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe what makers will produce in this dock, typical course topics, and why it deserves a dedicated harbor dock…"
                  className="w-full px-3.5 py-2 bg-white border border-amber-200 rounded-lg text-sm placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
                  value={proposedDesc}
                  onChange={(e) => setProposedDesc(e.target.value)}
                  required={isRequestMode}
                />
              </div>

              <div className="bg-white border border-amber-200 rounded-lg p-3 flex gap-2.5">
                <Info size={14} className="text-sky-600 mt-0.5 shrink-0" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Clock size={12} className="text-amber-600" />
                    Admin Review: 5–6 Business Days
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Per <span className="font-semibold">Bondor Regulatory Guideline BD-2024 §4.2</span>, new docks undergo compliance, quality & supplier verification. Your request is queued in the <span className="font-mono text-sky-700">Admin Dashboard</span> for review. This timeline aligns with Bangladesh digital commerce policy for marketplace category expansion.
                  </p>
                </div>
              </div>
            </div>
          )}

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
              variant={isRequestMode ? "gradient" : "default"}
              size="md"
              isLoading={loading}
              rightIcon={isRequestMode ? <Clock size={14} /> : <ArrowRight size={14} />}
            >
              {isRequestMode ? "Submit for Admin Approval" : "Publish Masterclass"}
            </Button>
          </div>

          {isRequestMode && (
            <p className="text-[11px] text-center text-zinc-500">
              By submitting, you acknowledge the 5–6 business day review per regulatory guideline. No listing fee until approval.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

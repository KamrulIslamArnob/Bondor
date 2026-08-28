"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { CheckCircle2, ArrowRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { user } = useAuth();
  const { cart, clearCart } = useCart();
  const router = useRouter();

  const [saving, setSaving] = useState(true);
  const [recorded, setRecorded] = useState(false);

  useEffect(() => {
    const recordEnrollmentAndOrder = async () => {
      if (!user || cart.length === 0 || recorded) {
        setSaving(false);
        return;
      }

      try {
        const courseItems = cart.filter((item) => item.type === "course");
        const productItems = cart.filter((item) => item.type === "product");

        for (const course of courseItems) {
          await addDoc(collection(db, "enrollments"), {
            userId: user.uid,
            courseId: course.id,
            enrolledAt: Date.now(),
            sessionId: sessionId || "direct_checkout",
          });
        }

        if (productItems.length > 0) {
          await addDoc(collection(db, "orders"), {
            userId: user.uid,
            items: productItems,
            total: productItems.reduce((acc, curr) => acc + curr.price * (curr.qty || 1), 0),
            createdAt: Date.now(),
            status: "paid",
            sessionId: sessionId || "direct_checkout",
          });
        }

        setRecorded(true);
        clearCart();
      } catch (err) {
        console.error("Error recording checkout data:", err);
      } finally {
        setSaving(false);
      }
    };

    recordEnrollmentAndOrder();
  }, [user, cart, sessionId, recorded, clearCart]);

  if (saving) {
    return <LoadingSpinner message="Finalizing your orders &amp; course enrollment..." />;
  }

  return (
    <div className="max-w-lg mx-auto py-10 space-y-6">
      <div className="bg-white border border-zinc-200/90 rounded-xl p-8 shadow-xs text-center space-y-5">
        <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
          <CheckCircle2 size={26} />
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-medium text-emerald-700 uppercase tracking-wider block">
            Payment Confirmed
          </span>
          <h1 className="text-2xl font-bold text-zinc-950 tracking-tight">
            Order Complete!
          </h1>
          <p className="text-xs text-zinc-500 leading-relaxed max-w-sm mx-auto">
            Your transaction has been securely processed. All purchased masterclasses are unlocked
            and raw material kits are dispatched for preparation.
          </p>
        </div>

        {sessionId && (
          <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-lg text-xs font-mono text-zinc-600 truncate">
            Session Ref: {sessionId}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-zinc-100">
          <Link href="/my-courses">
            <Button variant="default" size="md" fullWidth leftIcon={<BookOpen size={14} />}>
              My Courses
            </Button>
          </Link>
          <Link href="/builder-dashboard">
            <Button variant="secondary" size="md" fullWidth rightIcon={<ArrowRight size={14} />}>
              Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<LoadingSpinner message="Verifying transaction telemetry..." />}>
      <PaymentSuccessContent />
    </Suspense>
  );
}

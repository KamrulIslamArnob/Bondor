"use client";

import React from "react";
import Link from "next/link";
import { AlertCircle, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function PaymentCancelPage() {
  return (
    <div className="max-w-lg mx-auto py-10 space-y-6">
      <div className="bg-white border border-zinc-200/90 rounded-xl p-8 shadow-xs text-center space-y-5">
        <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto text-rose-600">
          <AlertCircle size={26} />
        </div>

        <div className="space-y-1.5">
          <span className="text-xs font-medium text-rose-700 uppercase tracking-wider block">
            Checkout Cancelled
          </span>
          <h1 className="text-2xl font-bold text-zinc-950 tracking-tight">
            Transaction Not Completed
          </h1>
          <p className="text-xs text-zinc-500 leading-relaxed max-w-sm mx-auto">
            You were not charged for this transaction. Your shopping cart items remain saved
            so you can resume anytime.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-zinc-100">
          <Link href="/cart">
            <Button variant="default" size="md" fullWidth leftIcon={<ShoppingBag size={14} />}>
              Return to Cart
            </Button>
          </Link>
          <Link href="/builder-dashboard">
            <Button variant="secondary" size="md" fullWidth leftIcon={<ArrowLeft size={14} />}>
              Explore Docks
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

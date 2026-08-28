"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/lib/price-utils";
import { Trash2, ShoppingBag, Plus, Minus, ArrowLeft, ArrowRight, ShieldCheck, Tag, Package, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount } = useCart();
  const { user } = useAuth();

  const [voucherCode, setVoucherCode] = useState<string>("");
  const [voucherDiscount, setVoucherDiscount] = useState<number>(0);
  const [voucherMessage, setVoucherMessage] = useState<{ text: string; isError: boolean } | null>(null);
  const [isCheckingOut, setIsCheckingOut] = useState<boolean>(false);

  const handleApplyVoucher = (e: React.FormEvent) => {
    e.preventDefault();
    const code = voucherCode.trim().toUpperCase();

    if (code === "MAKER10" || code === "PORT10" || code === "BONDOR10") {
      setVoucherDiscount(0.1);
      setVoucherMessage({ text: "10% Port Builder Discount applied!", isError: false });
    } else if (code === "MAKER20" || code === "HARBOR20") {
      setVoucherDiscount(0.2);
      setVoucherMessage({ text: "20% Maker Discount applied!", isError: false });
    } else {
      setVoucherDiscount(0);
      setVoucherMessage({ text: "Invalid or expired voucher code.", isError: true });
    }
  };

  const discountAmount = cartTotal * voucherDiscount;
  const finalPrice = Math.max(0, cartTotal - discountAmount);

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setIsCheckingOut(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          userId: user ? user.uid : "guest_user",
          discount: voucherDiscount,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Failed to initialize checkout session.");
        setIsCheckingOut(false);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("An unexpected error occurred during checkout.");
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sky-600 via-sky-500 to-sky-700 text-white border border-sky-500 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <Link href="/builder-dashboard" className="text-xs text-sky-100 hover:text-white flex items-center gap-1 font-medium bg-white/15 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-xs">
            <ArrowLeft size={13} />
            <span>Continue Shopping</span>
          </Link>
        </div>
        <div className="flex items-baseline justify-between">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-balance">
              Shopping Cart
            </h1>
            <p className="text-sm text-sky-100 font-normal mt-1 text-pretty">
              Review your course enrollments and starter raw supply kits.
            </p>
          </div>
          <span className="text-xs font-semibold text-white bg-white/15 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-xs tabular-nums">
            {cartCount} {cartCount === 1 ? "Item" : "Items"}
          </span>
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white border border-slate-200/80 rounded-3xl p-12 text-center shadow-xs flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center">
            <ShoppingBag size={28} className="text-sky-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Your Cart is Empty</h3>
            <p className="text-xs text-slate-500 max-w-sm mt-1 text-pretty">
              Explore our creator video courses and order raw supply starter packs to begin.
            </p>
          </div>
          <div className="flex items-center gap-3 pt-2">
            <Link href="/courses">
              <Button variant="default" size="sm" leftIcon={<BookOpen size={13} />}>
                Browse Courses
              </Button>
            </Link>
            <Link href="/materials">
              <Button variant="secondary" size="sm" leftIcon={<Package size={13} />}>
                Order Supplies
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Items List */}
          <div className="lg:col-span-7 space-y-3">
            <div className="bg-white border border-slate-200/80 rounded-2xl shadow-xs divide-y divide-slate-100 overflow-hidden">
              {cart.map((item) => (
                <div key={`${item.id}-${item.type}`} className="p-4 sm:p-5 flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3.5 min-w-0">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 shrink-0 flex items-center justify-center overflow-hidden outline outline-1 outline-black/[0.06] -outline-offset-1">
                      {item.image ? (
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      ) : item.type === "course" ? (
                        <BookOpen size={18} className="text-sky-600" />
                      ) : (
                        <Package size={18} className="text-sky-600" />
                      )}
                    </div>

                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-semibold uppercase text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-200/80">
                          {item.type === "course" ? "Masterclass" : "Material Kit"}
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm truncate">
                        {item.name}
                      </h4>
                      <p className="text-xs text-slate-500 font-medium tabular-nums">
                        {formatPrice(item.price)} each
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2.5 shrink-0">
                    <span className="font-bold text-slate-900 text-sm tabular-nums">
                      {formatPrice(item.price * item.qty)}
                    </span>

                    <div className="flex items-center gap-2">
                      {item.type === "product" && (
                        <div className="inline-flex items-center border border-slate-200 bg-slate-50/80 rounded-full p-0.5 shadow-xs">
                          <button
                            onClick={() => updateQuantity(item.id, item.type, Math.max(1, item.qty - 1))}
                            className="p-1 hover:bg-white rounded-full text-slate-700 transition-colors cursor-pointer"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="px-2 font-bold text-xs text-slate-900 tabular-nums">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.type, item.qty + 1)}
                            className="p-1 hover:bg-white rounded-full text-slate-700 transition-colors cursor-pointer"
                          >
                            <Plus size={11} />
                          </button>
                        </div>
                      )}

                      <button
                        onClick={() => removeFromCart(item.id, item.type)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center px-1">
              <button
                onClick={clearCart}
                className="text-xs text-slate-500 hover:text-rose-600 transition-colors font-medium cursor-pointer"
              >
                Clear Cart
              </button>
              <span className="text-xs text-slate-400 font-medium">
                All prices in Bangladeshi Taka (৳)
              </span>
            </div>
          </div>

          {/* Right: Summary & Checkout Card */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-xs space-y-5">
              <h3 className="font-bold text-slate-900 text-base border-b border-slate-100 pb-3">
                Order Summary
              </h3>

              {/* Voucher Code Form */}
              <form onSubmit={handleApplyVoucher} className="space-y-2">
                <label className="text-xs font-semibold text-slate-700 block">
                  Promo / Voucher Code
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="e.g. BONDOR10"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50/70 border border-slate-200 rounded-full text-base sm:text-xs font-semibold placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500 focus:border-transparent uppercase transition-all"
                      value={voucherCode}
                      onChange={(e) => setVoucherCode(e.target.value)}
                    />
                  </div>
                  <Button type="submit" variant="secondary" size="sm">
                    Apply
                  </Button>
                </div>

                {voucherMessage && (
                  <p
                    className={`text-xs font-semibold ${
                      voucherMessage.isError ? "text-rose-600" : "text-emerald-700"
                    }`}
                  >
                    {voucherMessage.text}
                  </p>
                )}
              </form>

              {/* Price Calculation Table */}
              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600 font-medium">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-slate-900 tabular-nums">{formatPrice(cartTotal)}</span>
                </div>

                {voucherDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount ({(voucherDiscount * 100).toFixed(0)}%):</span>
                    <span className="tabular-nums">-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Delivery / Access:</span>
                  <span className="font-semibold text-emerald-600">Instant / Included</span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline font-bold text-slate-900 text-base">
                  <span>Total Amount:</span>
                  <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                    {formatPrice(finalPrice)}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                variant="gradient"
                size="lg"
                fullWidth
                isLoading={isCheckingOut}
                onClick={handleCheckout}
                rightIcon={<ArrowRight size={14} />}
              >
                Proceed to Checkout
              </Button>

              <div className="pt-2 flex items-center justify-center gap-1.5 text-xs text-slate-500 font-medium">
                <ShieldCheck size={14} className="text-emerald-600" />
                <span>Encrypted 256-bit Stripe Checkout</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

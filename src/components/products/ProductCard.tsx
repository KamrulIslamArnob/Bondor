"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product } from "@/types";
import { formatPrice } from "@/lib/price-utils";
import { getBusinessLabel } from "@/lib/constants";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/Button";
import { ShoppingBag, Eye, Minus, Plus, Package } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const firstImg = product.images && product.images.length > 0 ? product.images[0] : "";

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      type: "product",
      name: product.name,
      description: product.description,
      price: product.price,
      image: firstImg,
      qty: quantity,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col justify-between gap-4 transition-[box-shadow,border-color,transform] duration-200 group shadow-xs hover:shadow-card hover:border-sky-300 hover:-translate-y-0.5">
      <div className="space-y-3">
        {/* Thumbnail Preview with 1px outline */}
        <div className="relative aspect-video w-full rounded-xl bg-slate-50 border border-slate-100 overflow-hidden flex items-center justify-center outline outline-1 outline-black/[0.06] -outline-offset-1">
          {firstImg ? (
            <img
              src={firstImg}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
            />
          ) : (
            <Package size={32} className="text-slate-300" />
          )}

          <span className="absolute top-2.5 left-2.5 text-[11px] font-semibold text-slate-800 bg-white/90 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-slate-200/80 shadow-xs">
            {getBusinessLabel(product.category)}
          </span>
        </div>

        {/* Info */}
        <div className="space-y-1">
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="font-bold text-slate-900 text-base group-hover:text-sky-600 transition-colors line-clamp-1 text-balance">
              {product.name}
            </h3>
            <span className="font-bold text-slate-900 text-sm shrink-0 tabular-nums">
              {formatPrice(product.price)}
            </span>
          </div>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed text-pretty">
            {product.description || "Certified raw supplies pack for maker batch production."}
          </p>
        </div>

        {/* Stock status */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 font-medium tabular-nums">
          <span>Available Stock:</span>
          <span className="font-semibold text-slate-700 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200/60">{product.stock} units</span>
        </div>
      </div>

      {/* Action Footer */}
      <div className="space-y-2 pt-3 border-t border-slate-100">
        <div className="flex items-center gap-2">
          {/* Quantity Stepper */}
          <div className="inline-flex items-center gap-1 border border-slate-200 bg-slate-50/80 rounded-full p-0.5 shadow-xs">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 hover:bg-white rounded-full text-slate-700 transition-colors cursor-pointer"
              title="Decrease quantity"
            >
              <Minus size={12} />
            </button>
            <span className="px-2 font-bold text-xs text-slate-900 min-w-[20px] text-center tabular-nums">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              className="p-1 hover:bg-white rounded-full text-slate-700 transition-colors cursor-pointer"
              title="Increase quantity"
            >
              <Plus size={12} />
            </button>
          </div>

          <Button
            variant="default"
            size="sm"
            fullWidth
            onClick={handleAddToCart}
            leftIcon={<ShoppingBag size={13} />}
          >
            {added ? "Added to Cart" : "Add to Cart"}
          </Button>
        </div>

        <Link href={`/products/${product.id}`} className="block">
          <Button variant="secondary" size="sm" fullWidth leftIcon={<Eye size={12} className="text-slate-500" />}>
            Inspect Details
          </Button>
        </Link>
      </div>
    </div>
  );
};

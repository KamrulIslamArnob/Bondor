"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Product } from "@/types";
import { formatPrice } from "@/lib/price-utils";
import { getBusinessLabel } from "@/lib/constants";
import { Edit, Trash2, Plus, Minus, Package } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface ProductsTableProps {
  products: Product[];
  onDelete?: (id: string) => Promise<void>;
  loading?: boolean;
}

export const ProductsTable: React.FC<ProductsTableProps> = ({
  products,
  onDelete,
  loading = false,
}) => {
  const [stockMap, setStockMap] = useState<Record<string, number>>({});

  const handleStockUpdate = async (product: Product, delta: number) => {
    const currentStock = stockMap[product.id] ?? product.stock;
    const newStock = Math.max(0, currentStock + delta);
    setStockMap((prev) => ({ ...prev, [product.id]: newStock }));

    try {
      await updateDoc(doc(db, "products", product.id), {
        stock: newStock,
        updatedAt: Date.now(),
      });
    } catch (err) {
      console.error("Error updating stock in Firestore:", err);
    }
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-zinc-500 text-xs">
        Loading inventory...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-12 px-4 text-center flex flex-col items-center justify-center space-y-3">
        <div className="w-12 h-12 rounded-xl bg-zinc-50 border border-zinc-200 flex items-center justify-center text-zinc-400">
          <Package size={22} />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-zinc-900">No Material Packs Listed</h4>
          <p className="text-xs text-zinc-500 max-w-sm mt-0.5">
            Publish your first starter raw supplies kit with unit stock and pricing.
          </p>
        </div>
        <Link href="/seller/products/new">
          <Button variant="default" size="sm" leftIcon={<Plus size={13} />}>
            Add Material Pack
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto text-xs">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-zinc-200 bg-zinc-50/70 text-zinc-700 font-semibold text-[11px] uppercase tracking-wider">
            <th className="py-3 px-4">Item &amp; Specifications</th>
            <th className="py-3 px-4">Category</th>
            <th className="py-3 px-4">Price</th>
            <th className="py-3 px-4">Stock Control</th>
            <th className="py-3 px-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 border-b border-zinc-200">
          {products.map((p) => {
            const firstImg = p.images && p.images.length > 0 ? p.images[0] : "";
            const currentStock = stockMap[p.id] ?? p.stock;

            return (
              <tr key={p.id} className="hover:bg-zinc-50/60 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-zinc-100 border border-zinc-200 shrink-0 flex items-center justify-center overflow-hidden">
                      {firstImg ? (
                        <img src={firstImg} alt={p.name} className="w-full h-full object-cover" />
                      ) : (
                        <Package size={16} className="text-zinc-400" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-zinc-950 truncate max-w-[200px]">
                        {p.name}
                      </div>
                      <div className="text-[11px] text-zinc-500 truncate max-w-[220px]">
                        {p.description || "No description provided"}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3.5 px-4">
                  <span className="text-[11px] font-medium text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
                    {getBusinessLabel(p.category)}
                  </span>
                </td>
                <td className="py-3.5 px-4 font-semibold text-zinc-950">
                  {formatPrice(p.price)}
                </td>
                <td className="py-3.5 px-4">
                  <div className="inline-flex items-center gap-1 border border-zinc-200 bg-white rounded-md p-0.5 shadow-xs">
                    <button
                      onClick={() => handleStockUpdate(p, -1)}
                      className="p-1 hover:bg-zinc-100 rounded text-zinc-700 transition-colors"
                      title="Decrease stock"
                    >
                      <Minus size={12} />
                    </button>
                    <span className="px-2 font-medium text-zinc-950 min-w-[24px] text-center">
                      {currentStock}
                    </span>
                    <button
                      onClick={() => handleStockUpdate(p, 1)}
                      className="p-1 hover:bg-zinc-100 rounded text-zinc-700 transition-colors"
                      title="Increase stock"
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-right">
                  <div className="inline-flex items-center gap-1">
                    <Link href={`/seller/products/${p.id}/edit`}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 text-zinc-600"
                        title="Edit product"
                      >
                        <Edit size={13} />
                      </Button>
                    </Link>
                    {onDelete && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onDelete(p.id)}
                        className="h-7 w-7 text-zinc-500 hover:text-rose-600"
                        title="Delete product"
                      >
                        <Trash2 size={13} />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

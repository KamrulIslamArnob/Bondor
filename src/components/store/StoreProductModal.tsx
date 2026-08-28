"use client";

import React, { useState, useEffect } from "react";
import { StoreProduct } from "@/types";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Plus, Trash2, Tag, Sparkles, Image as ImageIcon, Layers } from "lucide-react";

interface StoreProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (productData: Partial<StoreProduct>) => Promise<void>;
  productToEdit?: StoreProduct | null;
  storeId: string;
  sellerId: string;
}

const CATEGORY_SUGGESTIONS = [
  "Apparel",
  "Home & Candles",
  "Body & Care",
  "Stationery",
  "Ceramics & Decor",
  "Leather Goods",
  "Jewelry",
  "Food & Sweets",
  "General",
];

export const StoreProductModal: React.FC<StoreProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
  productToEdit,
  storeId,
  sellerId,
}) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Apparel");
  const [customCategory, setCustomCategory] = useState("");
  const [price, setPrice] = useState<number>(500);
  const [comparePrice, setComparePrice] = useState<number | undefined>(undefined);
  const [stock, setStock] = useState<number>(20);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([""]);
  const [isFeatured, setIsFeatured] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name || "");
      if (CATEGORY_SUGGESTIONS.includes(productToEdit.category)) {
        setCategory(productToEdit.category);
        setCustomCategory("");
      } else {
        setCategory("Other");
        setCustomCategory(productToEdit.category || "");
      }
      setPrice(productToEdit.price || 0);
      setComparePrice(productToEdit.comparePrice);
      setStock(productToEdit.stock ?? 20);
      setDescription(productToEdit.description || "");
      setImages(productToEdit.images && productToEdit.images.length > 0 ? productToEdit.images : [""]);
      setIsFeatured(Boolean(productToEdit.isFeatured));
    } else {
      setName("");
      setCategory("Apparel");
      setCustomCategory("");
      setPrice(500);
      setComparePrice(undefined);
      setStock(20);
      setDescription("");
      setImages([""]);
      setIsFeatured(false);
    }
  }, [productToEdit, isOpen]);

  const handleAddImage = () => setImages([...images, ""]);
  const handleImageChange = (index: number, val: string) => {
    const updated = [...images];
    updated[index] = val;
    setImages(updated);
  };
  const handleRemoveImage = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated.length > 0 ? updated : [""]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Product name is required.");
      return;
    }
    if (price <= 0) {
      alert("Price must be greater than 0.");
      return;
    }

    const finalCategory = category === "Other" ? customCategory.trim() || "General" : category;
    const validImages = images.map((u) => u.trim()).filter((u) => u.length > 0);

    setLoading(true);
    try {
      await onSave({
        id: productToEdit?.id,
        storeId,
        sellerId,
        name: name.trim(),
        category: finalCategory,
        price: Number(price),
        comparePrice: comparePrice ? Number(comparePrice) : undefined,
        stock: Number(stock),
        description: description.trim(),
        images: validImages.length > 0 ? validImages : [
          "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=800&auto=format&fit=crop&q=80"
        ],
        isFeatured,
      });
      onClose();
    } catch (err) {
      console.error("Error saving store product:", err);
      alert("Failed to save product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={productToEdit ? "Edit Store Product" : "Add New Product to Store"}
    >
      <form onSubmit={handleSubmit} className="space-y-4 max-h-[75vh] overflow-y-auto pr-1">
        {/* Name */}
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            Product Title *
          </label>
          <input
            type="text"
            placeholder="e.g. Handmade Ceramic Matcha Bowl"
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500 font-medium"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Category & Featured */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Category
            </label>
            <select
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORY_SUGGESTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
              <option value="Other">Other / Custom</option>
            </select>

            {category === "Other" && (
              <input
                type="text"
                placeholder="Enter custom category"
                className="w-full mt-2 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
              />
            )}
          </div>

          <div className="flex items-center gap-2 pt-5">
            <label className="relative flex items-center gap-2 text-xs font-semibold text-slate-800 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-slate-300"
              />
              <span className="flex items-center gap-1">
                <Sparkles size={13} className="text-amber-500" />
                <span>Feature in Top Highlights</span>
              </span>
            </label>
          </div>
        </div>

        {/* Pricing & Stock */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Selling Price (৳) *
            </label>
            <input
              type="number"
              min="1"
              step="1"
              placeholder="650"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              required
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Compare Price (৳ Optional)
            </label>
            <input
              type="number"
              min="0"
              step="1"
              placeholder="850"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-500 line-through focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500"
              value={comparePrice ?? ""}
              onChange={(e) => setComparePrice(e.target.value ? Number(e.target.value) : undefined)}
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Inventory Stock *
            </label>
            <input
              type="number"
              min="0"
              step="1"
              placeholder="25"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500"
              value={stock}
              onChange={(e) => setStock(Number(e.target.value))}
              required
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            Product Description &amp; Details
          </label>
          <textarea
            rows={3}
            placeholder="Describe material composition, dimensions, care instructions, and usage..."
            className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {/* Image URLs */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700">
              Product Images (URLs)
            </label>
            <button
              type="button"
              onClick={handleAddImage}
              className="text-xs text-sky-600 hover:text-sky-700 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Plus size={13} />
              <span>Add Image</span>
            </button>
          </div>

          {images.map((imgUrl, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 shrink-0 overflow-hidden flex items-center justify-center">
                {imgUrl ? (
                  <img src={imgUrl} alt="Thumb" className="w-full h-full object-cover" />
                ) : (
                  <ImageIcon size={14} className="text-slate-400" />
                )}
              </div>
              <input
                type="url"
                placeholder="https://images.unsplash.com/... or image link"
                className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500 font-mono"
                value={imgUrl}
                onChange={(e) => handleImageChange(idx, e.target.value)}
              />
              {images.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveImage(idx)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-md transition-colors cursor-pointer"
                >
                  <Trash2 size={14} />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Modal Buttons */}
        <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-100">
          <Button type="button" variant="secondary" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="default" size="sm" isLoading={loading}>
            {productToEdit ? "Update Product" : "Add to Storefront"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

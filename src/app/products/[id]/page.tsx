"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { Product } from "@/types";
import { getPriceOrRandom, formatPrice } from "@/lib/price-utils";
import { getBusinessLabel } from "@/lib/constants";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/Button";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { ArrowLeft, ShoppingBag, Edit, Package, Minus, Plus, Check } from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { user } = useAuth();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) return;

    const fetchProduct = async () => {
      setLoading(true);
      try {
        const snap = await getDoc(doc(db, "products", id));
        if (snap.exists()) {
          setProduct({ id: snap.id, ...(snap.data() as Omit<Product, "id">) });
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <LoadingSpinner message="Retrieving material pack details..." />;
  }

  if (!product) {
    return (
      <div className="bg-white border border-zinc-200/90 rounded-xl shadow-xs p-12 text-center max-w-lg mx-auto space-y-4">
        <Package size={32} className="text-zinc-400 mx-auto" />
        <h2 className="text-lg font-bold text-zinc-950">Material Pack Not Found</h2>
        <p className="text-xs text-zinc-500">
          The requested starter pack is unavailable or may have been unlisted.
        </p>
        <Button variant="secondary" onClick={() => router.back()} leftIcon={<ArrowLeft size={13} />}>
          Return to Materials
        </Button>
      </div>
    );
  }

  const basePrice = getPriceOrRandom(product.id, product.price);
  const totalPrice = basePrice * quantity;
  const images = product.images && product.images.length > 0 ? product.images : [];
  const currentImg = images[activeImageIndex] || "";
  const isOwner = user && user.uid === product.sellerId;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      type: "product",
      name: product.name || "Material Pack",
      description: product.description || "",
      price: basePrice,
      image: currentImg,
      qty: quantity,
    });
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart");
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Back Button */}
      <div>
        <Button
          variant="secondary"
          size="sm"
          onClick={() => router.back()}
          leftIcon={<ArrowLeft size={13} />}
        >
          <span>Back to Materials</span>
        </Button>
      </div>

      {/* Main Details Card */}
      <div className="bg-white border border-slate-200/80 rounded-3xl shadow-xs p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Left: Image Gallery */}
        <div className="md:col-span-6 space-y-4">
          <div className="w-full aspect-square bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden flex items-center justify-center relative outline outline-1 outline-black/[0.06] -outline-offset-1">
            {currentImg ? (
              <img
                src={currentImg}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center text-slate-300 gap-2">
                <Package size={44} />
                <span className="text-xs">No image provided</span>
              </div>
            )}
            <div className="absolute top-3 left-3">
              <span className="text-[11px] font-semibold bg-white/90 backdrop-blur-md text-slate-800 px-2.5 py-0.5 rounded-full border border-slate-200/80 shadow-xs">
                {getBusinessLabel(product.category)}
              </span>
            </div>
          </div>

          {/* Thumbnails */}
          {images.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-16 h-16 rounded-xl bg-slate-50 border transition-all shrink-0 overflow-hidden outline outline-1 outline-black/[0.06] -outline-offset-1 ${
                    activeImageIndex === idx
                      ? "border-sky-600 ring-2 ring-sky-500/20"
                      : "border-slate-200 opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`thumb ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info & Interactive Customizer */}
        <div className="md:col-span-6 space-y-5">
          <div className="space-y-1.5 border-b border-slate-100 pb-4">
            <span className="text-xs font-semibold text-sky-700 uppercase tracking-wider">
              Certified Raw Supply
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-balance">
              {product.name}
            </h1>
          </div>

          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xs font-medium text-slate-500 block uppercase tracking-wider">Unit Price</span>
              <span className="text-3xl font-extrabold text-slate-900 tabular-nums">
                {formatPrice(basePrice)}
              </span>
            </div>
            <span
              className={`text-xs font-semibold px-3 py-1 rounded-full border tabular-nums ${
                product.stock > 0
                  ? "bg-sky-50 text-sky-700 border-sky-200/80"
                  : "bg-amber-50 text-amber-800 border-amber-200/80"
              }`}
            >
              {product.stock > 0 ? `${product.stock} units in stock` : "Out of stock"}
            </span>
          </div>

          {/* Interactive Batch Quantity Stepper */}
          <div className="p-4 bg-slate-50/80 border border-slate-200/70 rounded-2xl space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-slate-700">Batch Quantity:</span>
              <span className="font-bold text-slate-900 tabular-nums">
                Total: {formatPrice(totalPrice)}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center border border-slate-200 bg-white rounded-full p-0.5 shadow-xs">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-1.5 hover:bg-slate-100 rounded-full text-slate-700 transition-colors cursor-pointer"
                >
                  <Minus size={14} />
                </button>
                <span className="px-3 font-bold text-slate-900 text-xs tabular-nums">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(Math.min(product.stock || 50, quantity + 1))}
                  className="p-1.5 hover:bg-slate-100 rounded-full text-slate-700 transition-colors cursor-pointer"
                >
                  <Plus size={14} />
                </button>
              </div>

              <span className="text-xs text-slate-500 font-medium">
                {quantity > 1 ? `${quantity} kits in batch` : "Single starter pack"}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5 text-xs text-slate-500 leading-relaxed">
            <h4 className="font-bold text-slate-900">Description &amp; Maker Specs</h4>
            <p className="text-pretty">{product.description || "Certified raw materials pack for hands-on production."}</p>
          </div>

          {/* Actions */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <Button
              variant="default"
              size="lg"
              fullWidth
              onClick={handleAddToCart}
              leftIcon={<ShoppingBag size={14} />}
            >
              {addedAnimation ? "Added to Cart!" : "Add to Cart"}
            </Button>
            <Button
              variant="gradient"
              size="lg"
              fullWidth
              onClick={handleBuyNow}
            >
              Buy Now
            </Button>
          </div>

          {isOwner && (
            <div className="pt-2 border-t-2 border-zinc-100">
              <Link href={`/seller/products/${product.id}/edit`} className="block">
                <Button variant="secondary" size="sm" fullWidth leftIcon={<Edit size={13} />}>
                  Edit Listing Information
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  Store,
  StoreProduct,
  StoreOrder,
  StoreOrderItem,
  StoreThemeColor,
} from "@/types";
import {
  getStoreBySlug,
  getStoreProducts,
  createStoreOrder,
} from "@/lib/store-service";
import { formatPrice } from "@/lib/price-utils";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import confetti from "canvas-confetti";
import {
  ShoppingBag,
  Search,
  CheckCircle2,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Truck,
  ShieldCheck,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Eye,
  Store as StoreIcon,
  MessageCircle,
  Share2,
  Check,
  Copy,
  Layers,
  Flame,
  Award,
  CreditCard,
  Banknote,
  Smartphone,
  X,
} from "lucide-react";

const THEME_STYLES: Record<
  StoreThemeColor,
  {
    primaryBg: string;
    primaryHover: string;
    primaryText: string;
    primaryBorder: string;
    accentBg: string;
    accentText: string;
    gradient: string;
    badgeBg: string;
  }
> = {
  sky: {
    primaryBg: "bg-sky-600",
    primaryHover: "hover:bg-sky-700",
    primaryText: "text-sky-600",
    primaryBorder: "border-sky-600",
    accentBg: "bg-sky-50",
    accentText: "text-sky-700",
    gradient: "from-sky-700 via-sky-600 to-sky-900",
    badgeBg: "bg-sky-500",
  },
  emerald: {
    primaryBg: "bg-emerald-600",
    primaryHover: "hover:bg-emerald-700",
    primaryText: "text-emerald-600",
    primaryBorder: "border-emerald-600",
    accentBg: "bg-emerald-50",
    accentText: "text-emerald-700",
    gradient: "from-emerald-700 via-emerald-600 to-emerald-900",
    badgeBg: "bg-emerald-500",
  },
  amber: {
    primaryBg: "bg-amber-600",
    primaryHover: "hover:bg-amber-700",
    primaryText: "text-amber-600",
    primaryBorder: "border-amber-600",
    accentBg: "bg-amber-50",
    accentText: "text-amber-700",
    gradient: "from-amber-700 via-amber-600 to-amber-900",
    badgeBg: "bg-amber-500",
  },
  rose: {
    primaryBg: "bg-rose-600",
    primaryHover: "hover:bg-rose-700",
    primaryText: "text-rose-600",
    primaryBorder: "border-rose-600",
    accentBg: "bg-rose-50",
    accentText: "text-rose-700",
    gradient: "from-rose-700 via-rose-600 to-rose-900",
    badgeBg: "bg-rose-500",
  },
  purple: {
    primaryBg: "bg-purple-600",
    primaryHover: "hover:bg-purple-700",
    primaryText: "text-purple-600",
    primaryBorder: "border-purple-600",
    accentBg: "bg-purple-50",
    accentText: "text-purple-700",
    gradient: "from-purple-700 via-purple-600 to-purple-900",
    badgeBg: "bg-purple-500",
  },
  slate: {
    primaryBg: "bg-slate-900",
    primaryHover: "hover:bg-slate-800",
    primaryText: "text-slate-900",
    primaryBorder: "border-slate-900",
    accentBg: "bg-slate-100",
    accentText: "text-slate-900",
    gradient: "from-slate-900 via-slate-800 to-black",
    badgeBg: "bg-slate-800",
  },
};

interface CartEntry {
  product: StoreProduct;
  qty: number;
}

export default function StorefrontPage() {
  const params = useParams();
  const router = useRouter();
  const slug = typeof params?.slug === "string" ? params.slug : "";

  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"featured" | "price-asc" | "price-desc" | "newest">(
    "featured"
  );

  // Cart State
  const [cart, setCart] = useState<CartEntry[]>([]);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Quick View Modal
  const [quickViewProduct, setQuickViewProduct] = useState<StoreProduct | null>(null);
  const [quickViewImageIndex, setQuickViewImageIndex] = useState(0);
  const [quickViewQty, setQuickViewQty] = useState(1);

  // Checkout State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [deliveryArea, setDeliveryArea] = useState<"inside_dhaka" | "outside_dhaka">(
    "inside_dhaka"
  );
  const [paymentMethod, setPaymentMethod] = useState<"cod" | "bkash" | "card">("cod");
  const [orderNotes, setOrderNotes] = useState("");
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<StoreOrder | null>(null);

  // Share link feedback
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (!slug) return;
    const fetchStore = async () => {
      setLoading(true);
      try {
        const storeDoc = await getStoreBySlug(slug);
        if (!storeDoc) {
          setNotFound(true);
        } else {
          setStore(storeDoc);
          const prods = await getStoreProducts(storeDoc.id);
          setProducts(prods);
        }
      } catch (err) {
        console.error("Error fetching store:", err);
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    };
    fetchStore();
  }, [slug]);

  const theme = THEME_STYLES[store?.themeColor || "sky"] || THEME_STYLES.sky;

  // Categories list
  const categories = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category).filter(Boolean)));
    return ["all", ...cats];
  }, [products]);

  // Filtered and Sorted products
  const displayedProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = selectedCategory === "all" || p.category === selectedCategory;
        const q = searchQuery.toLowerCase();
        const matchesQuery =
          !q ||
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q);
        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "newest") return (b.createdAt || 0) - (a.createdAt || 0);
        // "featured" default: featured first then newest
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return (b.createdAt || 0) - (a.createdAt || 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  // Cart operations
  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.qty, 0);
  }, [cart]);

  const cartSubtotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.product.price * item.qty, 0);
  }, [cart]);

  const shippingCost = useMemo(() => {
    if (cart.length === 0) return 0;
    return deliveryArea === "inside_dhaka"
      ? store?.shippingInsideDhaka ?? 60
      : store?.shippingOutsideDhaka ?? 120;
  }, [deliveryArea, store, cart]);

  const grandTotal = cartSubtotal + shippingCost;

  const addToCart = (product: StoreProduct, qty: number = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, qty: Math.min(product.stock, item.qty + qty) }
            : item
        );
      }
      return [...prev, { product, qty }];
    });
    setIsCartDrawerOpen(true);
  };

  const updateCartQty = (productId: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, qty: Math.min(item.product.stock, qty) } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleInstantBuy = (product: StoreProduct) => {
    addToCart(product, 1);
    setQuickViewProduct(null);
    setIsCartDrawerOpen(false);
    setIsCheckoutOpen(true);
  };

  // Place Order Submit
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!store || cart.length === 0) return;
    if (!customerName.trim() || !customerPhone.trim() || !shippingAddress.trim()) {
      alert("Please fill in your name, phone number, and delivery address.");
      return;
    }

    setIsPlacingOrder(true);
    try {
      const orderItems: StoreOrderItem[] = cart.map((item) => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        qty: item.qty,
        image: item.product.images?.[0] || "",
        category: item.product.category,
      }));

      const newOrder = await createStoreOrder({
        storeId: store.id,
        sellerId: store.sellerId,
        storeSlug: store.slug,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
        customerEmail: customerEmail.trim() || undefined,
        shippingAddress: shippingAddress.trim(),
        deliveryArea,
        paymentMethod,
        items: orderItems,
        subtotal: cartSubtotal,
        shippingCost,
        total: grandTotal,
        status: "pending",
        notes: orderNotes.trim() || undefined,
        createdAt: Date.now(),
      });

      setConfirmedOrder(newOrder);
      setCart([]);
      setIsCheckoutOpen(false);

      // Trigger Confetti Celebration
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch (e) {
        // ignore confetti errors
      }
    } catch (err) {
      console.error("Order submission failed:", err);
      alert("Failed to place order. Please check your connection and try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const handleCopyStoreLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading store catalog..." />;
  }

  if (notFound || !store) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-600">
          <StoreIcon size={30} />
        </div>
        <div className="space-y-1 max-w-md">
          <h1 className="text-2xl font-bold text-slate-900">Store Not Found</h1>
          <p className="text-xs text-slate-500">
            The store you are looking for ({slug}) does not exist or may have changed its URL.
          </p>
        </div>
        <Link href="/">
          <Button variant="default" size="md">
            Return to Bondor Home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col selection:bg-slate-900 selection:text-white">
      {/* 1. Top Announcement Bar */}
      {store.announcementText && (
        <aside aria-label="Store Announcement" className={`py-2 px-4 text-center text-xs font-semibold text-white ${theme.primaryBg} shadow-xs`}>
          <div className="max-w-6xl mx-auto flex items-center justify-center gap-2">
            <span>{store.announcementText}</span>
          </div>
        </aside>
      )}

      {/* 2. Store Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-2xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Store Logo & Branding */}
          <Link href={`/store/${store.slug}`} className="flex items-center gap-3 group">
            {store.logoUrl ? (
              <img
                src={store.logoUrl}
                alt={store.name}
                className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-2xs group-hover:scale-105 transition-transform"
              />
            ) : (
              <div
                className={`w-10 h-10 rounded-xl ${theme.primaryBg} text-white flex items-center justify-center font-bold text-base shadow-xs group-hover:scale-105 transition-transform`}
              >
                {store.name ? store.name.charAt(0) : "S"}
              </div>
            )}

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-lg text-slate-900 tracking-tight">
                  {store.name}
                </span>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full uppercase tracking-wider ${theme.accentBg} ${theme.accentText}`}
                >
                  Official
                </span>
              </div>
              {store.tagline && (
                <span className="text-[11px] text-slate-500 truncate max-w-[220px] sm:max-w-sm">
                  {store.tagline}
                </span>
              )}
            </div>
          </Link>

          {/* Right Header Controls: Share & Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleCopyStoreLink}
              title="Share store link"
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
            >
              {copiedLink ? <Check size={15} className="text-emerald-600" /> : <Share2 size={15} />}
              <span className="hidden sm:inline">{copiedLink ? "Copied" : "Share"}</span>
            </button>

            {/* Cart Trigger */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className={`px-4 py-2 text-white ${theme.primaryBg} ${theme.primaryHover} rounded-xl text-xs font-bold shadow-xs flex items-center gap-2 transition-all cursor-pointer hover:shadow-md active:scale-95`}
            >
              <ShoppingBag size={15} />
              <span>Cart</span>
              {cartCount > 0 && (
                <span className="px-1.5 py-0.2 bg-white text-slate-900 text-[10px] font-extrabold rounded-full tabular-nums">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 3. Hero Banner Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white min-h-[300px] sm:min-h-[360px] flex items-center">
        {store.bannerUrl && (
          <img
            src={store.bannerUrl}
            alt="Store Banner"
            className="absolute inset-0 w-full h-full object-cover opacity-35"
          />
        )}
        <div className={`absolute inset-0 bg-gradient-to-r ${theme.gradient} opacity-85 mix-blend-multiply`} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-white border border-white/20 text-xs font-semibold shadow-xs">
            <Award size={13} className="text-amber-300" />
            <span>Verified Independent Maker Studio</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-balance max-w-3xl leading-tight">
            {store.name}
          </h1>

          <p className="text-sm sm:text-base text-slate-100 max-w-2xl font-normal leading-relaxed text-pretty">
            {store.description || store.tagline || "Discover crafted goods made with passion and precision."}
          </p>

          <div className="flex items-center gap-3 pt-2">
            <a
              href="#catalog"
              className="px-5 py-2.5 bg-white text-slate-900 hover:bg-slate-100 rounded-xl text-xs font-bold shadow-xs flex items-center gap-2 transition-transform active:scale-95"
            >
              <span>Browse Products</span>
              <ChevronRight size={14} />
            </a>

            {store.whatsappNumber && (
              <a
                href={`https://wa.me/${store.whatsappNumber.replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-2 transition-transform active:scale-95"
              >
                <MessageCircle size={14} />
                <span>WhatsApp Inquiry</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* 4. Trust Badges Row */}
      <section className="border-b border-slate-100 bg-slate-50/70 py-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium text-slate-600">
          <div className="flex items-center gap-2.5">
            <Truck size={16} className={theme.primaryText} />
            <span>Fast Courier Nationwide</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Banknote size={16} className={theme.primaryText} />
            <span>Cash on Delivery Available</span>
          </div>
          <div className="flex items-center gap-2.5">
            <ShieldCheck size={16} className={theme.primaryText} />
            <span>100% Quality Guaranteed</span>
          </div>
          <div className="flex items-center gap-2.5">
            <MessageCircle size={16} className={theme.primaryText} />
            <span>Direct Maker Support</span>
          </div>
        </div>
      </section>

      {/* 5. Product Catalog Section */}
      <main id="catalog" className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Search, Filter & Sort Toolbar */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search products in store..."
                className="w-full pl-9 pr-3.5 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs font-medium placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900 transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-end md:self-auto text-xs">
              <span className="text-slate-500 font-semibold">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:bg-white cursor-pointer"
              >
                <option value="featured">Featured First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="newest">Newest Added</option>
              </select>
            </div>
          </div>

          {/* Category Chips */}
          {categories.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isSelected
                        ? `${theme.primaryBg} text-white shadow-xs`
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {cat === "all" ? "All Products" : cat}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Product Grid */}
        {displayedProducts.length === 0 ? (
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-white border border-slate-200 flex items-center justify-center mx-auto text-slate-400">
              <ShoppingBag size={22} />
            </div>
            <h4 className="text-base font-bold text-slate-900">No Matching Items</h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              No products found matching your search. Try adjusting keywords or category filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedProducts.map((product) => {
              const hasDiscount = Boolean(product.comparePrice && product.comparePrice > product.price);
              const discountPct = hasDiscount
                ? Math.round(((product.comparePrice! - product.price) / product.comparePrice!) * 100)
                : 0;

              return (
                <div
                  key={product.id}
                  className="bg-white border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between gap-4 group hover:shadow-card hover:border-slate-300 transition-all"
                >
                  <div className="space-y-3">
                    {/* Image Box */}
                    <div
                      className="relative h-56 rounded-xl overflow-hidden bg-slate-100 border border-slate-100 cursor-pointer"
                      onClick={() => {
                        setQuickViewProduct(product);
                        setQuickViewImageIndex(0);
                        setQuickViewQty(1);
                      }}
                    >
                      {product.images && product.images[0] ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <ShoppingBag size={32} />
                        </div>
                      )}

                      {/* Badges */}
                      <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
                        {product.isFeatured && (
                          <span className="px-2 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-bold shadow-xs flex items-center gap-1">
                            <Sparkles size={10} className="text-amber-400" />
                            <span>Featured</span>
                          </span>
                        )}
                        {hasDiscount && (
                          <span className="px-2 py-0.5 rounded-full bg-rose-600 text-white text-[10px] font-bold shadow-xs">
                            -{discountPct}% OFF
                          </span>
                        )}
                      </div>

                      {/* Stock badge */}
                      <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-md text-[10px] font-bold text-slate-800 border border-slate-200 shadow-xs">
                        {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                      </span>
                    </div>

                    {/* Meta info */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                        {product.category}
                      </span>
                      <h3
                        className="text-sm font-bold text-slate-900 group-hover:text-slate-700 transition-colors line-clamp-1 cursor-pointer"
                        onClick={() => {
                          setQuickViewProduct(product);
                          setQuickViewImageIndex(0);
                          setQuickViewQty(1);
                        }}
                      >
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-3 border-t border-slate-100 space-y-2.5">
                    <div className="flex items-baseline gap-2">
                      <span className="text-lg font-extrabold text-slate-900 tabular-nums">
                        {formatPrice(product.price)}
                      </span>
                      {hasDiscount && (
                        <span className="text-xs text-slate-400 line-through tabular-nums">
                          {formatPrice(product.comparePrice!)}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => {
                          setQuickViewProduct(product);
                          setQuickViewImageIndex(0);
                          setQuickViewQty(1);
                        }}
                        leftIcon={<Eye size={12} />}
                      >
                        Details
                      </Button>

                      <button
                        onClick={() => addToCart(product, 1)}
                        disabled={product.stock <= 0}
                        className={`px-3 py-1.5 text-white ${theme.primaryBg} ${theme.primaryHover} rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <Plus size={13} />
                        <span>Add</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 6. About Store Section */}
        {store.aboutText && (
          <section className="mt-16 bg-slate-50 border border-slate-200/90 rounded-3xl p-8 sm:p-10 space-y-4">
            <div className="max-w-2xl space-y-2">
              <span className={`text-xs font-bold uppercase tracking-wider ${theme.primaryText}`}>
                About The Studio
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Crafted with Intention &amp; Care
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed text-pretty">
                {store.aboutText}
              </p>
            </div>

            <div className="pt-4 flex flex-wrap gap-4 text-xs font-semibold text-slate-700">
              {store.contactPhone && (
                <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200">
                  <Phone size={14} className={theme.primaryText} />
                  <span>{store.contactPhone}</span>
                </div>
              )}
              {store.contactEmail && (
                <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-xl border border-slate-200">
                  <Mail size={14} className={theme.primaryText} />
                  <span>{store.contactEmail}</span>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      {/* 7. Store Footer */}
      <footer className="mt-16 border-t border-slate-200 bg-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <StoreIcon size={16} className={theme.primaryText} />
            <span className="font-bold text-slate-900">{store.name}</span>
            <span>• © {new Date().getFullYear()} All Rights Reserved.</span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <span>Powered by</span>
            <Link
              href="/"
              className="font-bold text-slate-900 hover:text-sky-600 transition-colors flex items-center gap-1 font-serif"
            >
              <span>Bondor</span>
            </Link>
          </div>
        </div>
      </footer>

      {/* MODAL 1: PRODUCT QUICK VIEW */}
      {quickViewProduct && (
        <Modal
          isOpen={Boolean(quickViewProduct)}
          onClose={() => setQuickViewProduct(null)}
          title={quickViewProduct.name}
        >
          <div className="space-y-5 max-h-[80vh] overflow-y-auto pr-1">
            {/* Image Gallery */}
            <div className="space-y-2">
              <div className="h-64 sm:h-72 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center">
                {quickViewProduct.images && quickViewProduct.images[quickViewImageIndex] ? (
                  <img
                    src={quickViewProduct.images[quickViewImageIndex]}
                    alt={quickViewProduct.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ShoppingBag size={40} className="text-slate-400" />
                )}
              </div>

              {quickViewProduct.images && quickViewProduct.images.length > 1 && (
                <div className="flex items-center gap-2 overflow-x-auto pb-1">
                  {quickViewProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setQuickViewImageIndex(idx)}
                      className={`w-14 h-14 rounded-xl overflow-hidden border-2 shrink-0 transition-all cursor-pointer ${
                        quickViewImageIndex === idx ? "border-slate-900" : "border-slate-200 opacity-60 hover:opacity-100"
                      }`}
                    >
                      <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Price & Meta */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  {quickViewProduct.category}
                </span>
                <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  {quickViewProduct.stock > 0 ? `${quickViewProduct.stock} Available in Stock` : "Out of Stock"}
                </span>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-extrabold text-slate-900 tabular-nums">
                  {formatPrice(quickViewProduct.price)}
                </span>
                {quickViewProduct.comparePrice && (
                  <span className="text-sm text-slate-400 line-through tabular-nums">
                    {formatPrice(quickViewProduct.comparePrice)}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {quickViewProduct.description}
              </p>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-3 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">Select Quantity:</span>
                <div className="inline-flex items-center border border-slate-200 bg-slate-50 rounded-full p-0.5">
                  <button
                    onClick={() => setQuickViewQty((q) => Math.max(1, q - 1))}
                    className="p-1 hover:bg-white rounded-full text-slate-700 transition-colors cursor-pointer"
                  >
                    <Minus size={13} />
                  </button>
                  <span className="px-3 font-bold text-xs text-slate-900 tabular-nums">
                    {quickViewQty}
                  </span>
                  <button
                    onClick={() => setQuickViewQty((q) => Math.min(quickViewProduct.stock, q + 1))}
                    className="p-1 hover:bg-white rounded-full text-slate-700 transition-colors cursor-pointer"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button
                  variant="secondary"
                  size="md"
                  fullWidth
                  onClick={() => {
                    addToCart(quickViewProduct, quickViewQty);
                    setQuickViewProduct(null);
                  }}
                  leftIcon={<ShoppingBag size={14} />}
                >
                  Add to Cart
                </Button>

                <button
                  onClick={() => handleInstantBuy(quickViewProduct)}
                  className={`w-full py-2.5 px-4 text-white ${theme.primaryBg} ${theme.primaryHover} rounded-xl text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer`}
                >
                  <span>Instant Order Now</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* DRAWER / MODAL 2: SHOPPING CART */}
      {isCartDrawerOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex justify-end"
          onClick={() => setIsCartDrawerOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cart Header */}
            <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className={theme.primaryText} />
                <h3 className="text-base font-bold text-slate-900">Your Cart</h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 tabular-nums">
                  {cartCount}
                </span>
              </div>
              <button
                onClick={() => setIsCartDrawerOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-900 rounded-lg hover:bg-slate-100 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3 divide-y divide-slate-100">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-3 py-16">
                  <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400">
                    <ShoppingBag size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Your cart is empty</h4>
                    <p className="text-xs text-slate-500 mt-1">Browse products and click Add to Cart.</p>
                  </div>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.product.id} className="pt-3 first:pt-0 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3 min-w-0">
                      <div className="w-14 h-14 rounded-xl bg-slate-100 border border-slate-200 shrink-0 overflow-hidden">
                        {item.product.images && item.product.images[0] ? (
                          <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <ShoppingBag size={16} />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 space-y-0.5">
                        <h4 className="text-xs font-bold text-slate-900 truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-xs font-semibold text-slate-700 tabular-nums">
                          {formatPrice(item.product.price)} each
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="font-bold text-xs text-slate-900 tabular-nums">
                        {formatPrice(item.product.price * item.qty)}
                      </span>

                      <div className="flex items-center gap-1.5">
                        <div className="inline-flex items-center border border-slate-200 bg-slate-50 rounded-full p-0.5">
                          <button
                            onClick={() => updateCartQty(item.product.id, item.qty - 1)}
                            className="p-0.5 hover:bg-white rounded-full text-slate-700 transition-colors cursor-pointer"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="px-2 font-bold text-[11px] text-slate-900 tabular-nums">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => updateCartQty(item.product.id, item.qty + 1)}
                            className="p-0.5 hover:bg-white rounded-full text-slate-700 transition-colors cursor-pointer"
                          >
                            <Plus size={10} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded transition-colors cursor-pointer"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/70 space-y-3">
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span className="font-bold text-slate-900 tabular-nums">{formatPrice(cartSubtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Shipping:</span>
                    <span className="text-slate-500">Calculated at checkout</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className={`w-full py-3 px-4 text-white ${theme.primaryBg} ${theme.primaryHover} rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer`}
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 3: IN-STORE CHECKOUT */}
      {isCheckoutOpen && (
        <Modal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          title={`Order from ${store.name}`}
        >
          <form onSubmit={handlePlaceOrder} className="space-y-4 max-h-[80vh] overflow-y-auto pr-1">
            {/* Customer Details */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                1. Delivery &amp; Contact Information
              </h4>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Kamrul Islam"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Phone Number (for Courier) *
                  </label>
                  <input
                    type="tel"
                    placeholder="01712345678"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    placeholder="name@email.com"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                  />
                </div>
              </div>

              {/* Delivery Zone */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Delivery Region *
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setDeliveryArea("inside_dhaka")}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      deliveryArea === "inside_dhaka"
                        ? "border-slate-900 bg-slate-50 ring-2 ring-slate-900"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <span className="text-xs font-bold text-slate-900 block">Inside Dhaka</span>
                    <span className="text-xs text-slate-500 font-semibold mt-0.5 block">
                      +{formatPrice(store.shippingInsideDhaka ?? 60)}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryArea("outside_dhaka")}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      deliveryArea === "outside_dhaka"
                        ? "border-slate-900 bg-slate-50 ring-2 ring-slate-900"
                        : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <span className="text-xs font-bold text-slate-900 block">Outside Dhaka</span>
                    <span className="text-xs text-slate-500 font-semibold mt-0.5 block">
                      +{formatPrice(store.shippingOutsideDhaka ?? 120)}
                    </span>
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Full Shipping Address *
                </label>
                <textarea
                  rows={2}
                  placeholder="House #, Road #, Area / Thana, City..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900"
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Delivery Notes / Special Instructions
                </label>
                <input
                  type="text"
                  placeholder="e.g. Call before delivery, ring doorbell"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-900"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
                2. Payment Method
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    paymentMethod === "cod"
                      ? "border-slate-900 bg-slate-50 ring-2 ring-slate-900"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <Banknote size={16} className="text-emerald-600 mb-1" />
                  <span className="text-xs font-bold text-slate-900 block">Cash on Delivery</span>
                  <span className="text-[10px] text-slate-500">Pay when delivered</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("bkash")}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    paymentMethod === "bkash"
                      ? "border-slate-900 bg-slate-50 ring-2 ring-slate-900"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <Smartphone size={16} className="text-rose-600 mb-1" />
                  <span className="text-xs font-bold text-slate-900 block">bKash / Nagad</span>
                  <span className="text-[10px] text-slate-500">Mobile wallet pay</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    paymentMethod === "card"
                      ? "border-slate-900 bg-slate-50 ring-2 ring-slate-900"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <CreditCard size={16} className="text-sky-600 mb-1" />
                  <span className="text-xs font-bold text-slate-900 block">Card / Online</span>
                  <span className="text-[10px] text-slate-500">Visa, Mastercard</span>
                </button>
              </div>
            </div>

            {/* Order Summary breakdown */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Items Total ({cartCount} pcs):</span>
                <span className="font-bold text-slate-900 tabular-nums">{formatPrice(cartSubtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Delivery Charge:</span>
                <span className="font-bold text-slate-900 tabular-nums">+{formatPrice(shippingCost)}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline font-bold text-slate-900 text-sm">
                <span>Total Amount Due:</span>
                <span className="text-base text-slate-900 tabular-nums">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isPlacingOrder}
                className={`w-full py-3 px-4 text-white ${theme.primaryBg} ${theme.primaryHover} rounded-xl text-xs font-bold shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50`}
              >
                {isPlacingOrder ? (
                  <span>Confirming Order...</span>
                ) : (
                  <>
                    <span>Confirm Order ({formatPrice(grandTotal)})</span>
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* MODAL 4: ORDER CONFIRMED & SUCCESS */}
      {confirmedOrder && (
        <Modal
          isOpen={Boolean(confirmedOrder)}
          onClose={() => setConfirmedOrder(null)}
          title="Order Confirmed!"
        >
          <div className="text-center space-y-5 p-2">
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 size={30} />
            </div>

            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                Thank You For Your Order!
              </span>
              <h3 className="text-xl font-bold text-slate-900">
                Order #{confirmedOrder.id.slice(-6).toUpperCase()}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                We have received your order and the maker will prepare your package for courier dispatch.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Customer:</span>
                <span className="font-bold text-slate-900">{confirmedOrder.customerName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Phone:</span>
                <span className="font-mono text-slate-900">{confirmedOrder.customerPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Delivery Address:</span>
                <span className="font-medium text-slate-800 text-right max-w-[200px] truncate">
                  {confirmedOrder.shippingAddress}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payment:</span>
                <span className="font-bold text-slate-900 uppercase">{confirmedOrder.paymentMethod}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-slate-900 text-sm">
                <span>Total Payable:</span>
                <span className="text-base text-slate-900 tabular-nums">{formatPrice(confirmedOrder.total)}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              {store.whatsappNumber && (
                <a
                  href={`https://wa.me/${store.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                    `Hi ${store.name}, I placed Order #${confirmedOrder.id.slice(-6).toUpperCase()} for ${formatPrice(
                      confirmedOrder.total
                    )}. Please confirm tracking!`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <MessageCircle size={14} />
                  <span>Notify Maker on WhatsApp</span>
                </a>
              )}

              <Button
                variant="secondary"
                size="md"
                fullWidth
                onClick={() => setConfirmedOrder(null)}
              >
                Continue Browsing Store
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Store, StoreProduct, StoreOrder, OrderStatus } from "@/types";
import {
  getStoreBySellerId,
  saveStore,
  getStoreProducts,
  addStoreProduct,
  updateStoreProduct,
  deleteStoreProduct,
  getStoreOrders,
  updateStoreOrderStatus,
  DEMO_STORE,
  DEMO_STORE_PRODUCTS,
} from "@/lib/store-service";
import { formatPrice } from "@/lib/price-utils";
import { StoreCustomizerForm } from "@/components/store/StoreCustomizerForm";
import { StoreProductModal } from "@/components/store/StoreProductModal";
import { StoreOrdersTable } from "@/components/store/StoreOrdersTable";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import { Button } from "@/components/ui/Button";
import {
  Store as StoreIcon,
  Globe,
  Package,
  ShoppingBag,
  ExternalLink,
  Plus,
  Edit2,
  Trash2,
  Copy,
  Check,
  QrCode,
  Sparkles,
  Share2,
  Layers,
  ArrowRight,
  TrendingUp,
  Tag,
} from "lucide-react";
import { Modal } from "@/components/ui/Modal";

export default function MyStoreDashboardPage() {
  const { user, userProfile, loading: authLoading } = useAuth();
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<"overview" | "customizer" | "products" | "orders">(
    "overview"
  );
  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<StoreProduct[]>([]);
  const [orders, setOrders] = useState<StoreOrder[]>([]);
  const [loadingData, setLoadingData] = useState<boolean>(true);
  const [savingStore, setSavingStore] = useState<boolean>(false);

  // Modals
  const [isProductModalOpen, setIsProductModalOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<StoreProduct | null>(null);
  const [isQrModalOpen, setIsQrModalOpen] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Auth Guard
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login?next=/my-store");
    }
  }, [authLoading, user, router]);

  const loadData = useCallback(async (uid: string) => {
    setLoadingData(true);
    try {
      let currentStore = await getStoreBySellerId(uid);
      if (currentStore) {
        setStore(currentStore);
        const [prodList, orderList] = await Promise.all([
          getStoreProducts(currentStore.id),
          getStoreOrders(currentStore.id),
        ]);
        setProducts(prodList);
        setOrders(orderList);
      } else {
        setStore(null);
        setProducts([]);
        setOrders([]);
      }
    } catch (err) {
      console.error("Error loading store data:", err);
    } finally {
      setLoadingData(false);
    }
  }, []);

  useEffect(() => {
    if (user) {
      loadData(user.uid);
    }
  }, [user, loadData]);

  // Handle Save or Initialize Store
  const handleSaveStore = async (
    storeData: Partial<Store> & { sellerId: string; slug: string; name: string }
  ) => {
    if (!user) return;
    setSavingStore(true);
    try {
      const saved = await saveStore(storeData);
      setStore(saved);

      // If newly created and has 0 products, offer to add demo seed products
      if (!store) {
        try {
          for (const dp of DEMO_STORE_PRODUCTS) {
            await addStoreProduct({
              storeId: saved.id,
              sellerId: user.uid,
              name: dp.name,
              category: dp.category,
              price: dp.price,
              comparePrice: dp.comparePrice,
              stock: dp.stock,
              description: dp.description,
              images: dp.images,
              isFeatured: dp.isFeatured,
              createdAt: Date.now(),
            });
          }
          const prods = await getStoreProducts(saved.id);
          setProducts(prods);
        } catch (e) {
          console.warn("Could not seed demo products:", e);
        }
      }

      alert("Storefront settings updated successfully!");
    } catch (err) {
      console.error("Failed to save store:", err);
      alert("Failed to save store settings.");
    } finally {
      setSavingStore(false);
    }
  };

  // Product Actions
  const handleSaveProduct = async (productData: Partial<StoreProduct>) => {
    if (!store || !user) return;
    if (productData.id) {
      await updateStoreProduct(productData.id, productData);
    } else {
      await addStoreProduct({
        storeId: store.id,
        sellerId: user.uid,
        name: productData.name || "Untitled Product",
        category: productData.category || "General",
        price: productData.price || 0,
        comparePrice: productData.comparePrice,
        stock: productData.stock ?? 10,
        description: productData.description || "",
        images: productData.images || [],
        isFeatured: Boolean(productData.isFeatured),
        createdAt: Date.now(),
      });
    }
    const updatedList = await getStoreProducts(store.id);
    setProducts(updatedList);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product from your storefront?")) return;
    try {
      await deleteStoreProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Failed to delete store product:", err);
      alert("Failed to delete product.");
    }
  };

  // Order Status Update
  const handleUpdateOrderStatus = async (orderId: string, status: OrderStatus) => {
    await updateStoreOrderStatus(orderId, status);
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status, updatedAt: Date.now() } : o))
    );
  };

  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const publicUrl = store?.slug ? `${origin}/store/${store.slug}` : "";

  const handleCopyLink = () => {
    if (!publicUrl) return;
    navigator.clipboard.writeText(publicUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleShareWhatsApp = () => {
    if (!publicUrl) return;
    const text = encodeURIComponent(
      `Check out our official online store: ${store?.name || "Shop"}!\nBrowse our products and order online: ${publicUrl}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const metrics = useMemo(() => {
    const totalRev = orders
      .filter((o) => o.status !== "cancelled")
      .reduce((sum, o) => sum + (o.total || 0), 0);
    const pendingOrders = orders.filter(
      (o) => o.status === "pending" || o.status === "processing"
    ).length;
    return {
      revenue: totalRev,
      ordersCount: orders.length,
      pendingOrders,
      productsCount: products.length,
    };
  }, [orders, products]);

  if (authLoading || loadingData) {
    return <LoadingSpinner message="Loading your storefront workspace..." />;
  }

  if (!user) {
    return <LoadingSpinner message="Redirecting to sign in..." />;
  }

  return (
    <div className="space-y-8">
      {/* Top Banner Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-sky-600 via-sky-500 to-sky-700 text-white border border-sky-500 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/15 pb-5">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white bg-white/15 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 uppercase tracking-wider shadow-xs">
                Micro-Storefront Studio
              </span>
              <span className="text-xs font-semibold text-sky-100 bg-sky-400/20 px-3 py-1 rounded-full border border-white/15 shadow-xs flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Shopify-Style Website
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-balance">
              {store ? store.name : "Launch Your Own Online Store"}
            </h1>
            <p className="text-sm text-sky-100 max-w-2xl font-normal text-pretty">
              {store
                ? `Your live website is published at ${origin}/store/${store.slug}. Manage branding, products, and direct customer orders.`
                : "Create a branded website on a fixed template in 60 seconds with direct order collection and bKash / COD payments."}
            </p>
          </div>

          {store && (
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={`/store/${store.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 bg-white text-slate-900 hover:bg-slate-50 rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <span>Open Live Website</span>
                <ExternalLink size={14} />
              </a>
            </div>
          )}
        </div>

        {/* Telemetry Metrics */}
        {store && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 space-y-1 shadow-xs">
              <span className="text-xs font-medium text-sky-100 block uppercase tracking-wider">
                Store Revenue
              </span>
              <span className="text-2xl font-bold text-white tabular-nums">
                {formatPrice(metrics.revenue)}
              </span>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 space-y-1 shadow-xs">
              <span className="text-xs font-medium text-sky-100 block uppercase tracking-wider">
                Total Orders
              </span>
              <span className="text-2xl font-bold text-white tabular-nums">
                {metrics.ordersCount}
              </span>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 space-y-1 shadow-xs">
              <span className="text-xs font-medium text-sky-100 block uppercase tracking-wider">
                Pending Action
              </span>
              <span className="text-2xl font-bold text-white tabular-nums">
                {metrics.pendingOrders}
              </span>
            </div>

            <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 space-y-1 shadow-xs">
              <span className="text-xs font-medium text-sky-100 block uppercase tracking-wider">
                Live Products
              </span>
              <span className="text-2xl font-bold text-white tabular-nums">
                {metrics.productsCount}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* If No Store Exists Yet: Onboarding Welcome */}
      {!store ? (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-xs space-y-6">
            <div className="max-w-xl space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold border border-sky-200">
                <Sparkles size={13} />
                <span>Zero-Code Website Builder</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Launch Your Brand Website in 1 Minute
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Get a dedicated e-commerce storefront with your chosen brand name, custom URL slug,
                custom color palette, and built-in order management.
              </p>
            </div>

            <StoreCustomizerForm
              initialStore={{
                name: userProfile?.name ? `${userProfile.name}'s Studio` : "My Craft Store",
                slug: userProfile?.name
                  ? userProfile.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")
                  : "my-store",
                tagline: "Handcrafted Artisanal Goods & Essentials",
                themeColor: "sky",
                templateStyle: "modern",
                shippingInsideDhaka: 60,
                shippingOutsideDhaka: 120,
              }}
              sellerId={user.uid}
              onSave={handleSaveStore}
              saving={savingStore}
            />
          </div>
        </div>
      ) : (
        /* Existing Store Workspace */
        <div className="space-y-6">
          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-1 overflow-x-auto">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "overview"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white"
              }`}
            >
              <Globe size={14} />
              <span>Storefront Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("products")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "products"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white"
              }`}
            >
              <Package size={14} />
              <span>Products &amp; Inventory ({products.length})</span>
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "orders"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white"
              }`}
            >
              <ShoppingBag size={14} />
              <span>Customer Orders ({orders.length})</span>
              {metrics.pendingOrders > 0 && (
                <span className="px-1.5 py-0.2 bg-amber-400 text-slate-900 text-[10px] font-extrabold rounded-full">
                  {metrics.pendingOrders}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("customizer")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center gap-2 ${
                activeTab === "customizer"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white"
              }`}
            >
              <Sparkles size={14} />
              <span>Website Customizer &amp; Settings</span>
            </button>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Share & Live Website Card */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                      Storefront is Live to the Public
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {store.name}
                  </h3>
                  <p className="text-xs font-mono text-slate-600 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 inline-block">
                    {publicUrl}
                  </p>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap">
                  <button
                    onClick={handleCopyLink}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
                  >
                    {copiedLink ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                    <span>{copiedLink ? "Link Copied" : "Copy Link"}</span>
                  </button>

                  <button
                    onClick={handleShareWhatsApp}
                    className="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-emerald-200"
                  >
                    <Share2 size={14} />
                    <span>Share on WhatsApp</span>
                  </button>

                  <button
                    onClick={() => setIsQrModalOpen(true)}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
                  >
                    <QrCode size={14} />
                    <span>Store QR Code</span>
                  </button>

                  <a
                    href={`/store/${store.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>Visit Store</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>

              {/* Quick Jump Bento */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Inventory Summary */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600">
                      <Package size={20} />
                    </div>
                    <h4 className="text-base font-bold text-slate-900">Product Inventory</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      You currently have <strong>{products.length} products</strong> published on your storefront.
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    fullWidth
                    onClick={() => {
                      setEditingProduct(null);
                      setIsProductModalOpen(true);
                    }}
                    leftIcon={<Plus size={13} />}
                  >
                    Add New Product
                  </Button>
                </div>

                {/* Orders Summary */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600">
                      <ShoppingBag size={20} />
                    </div>
                    <h4 className="text-base font-bold text-slate-900">Incoming Orders</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      {metrics.pendingOrders > 0
                        ? `You have ${metrics.pendingOrders} order(s) waiting for packaging and shipment.`
                        : "All customer orders are up to date and fulfilled."}
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    fullWidth
                    onClick={() => setActiveTab("orders")}
                    rightIcon={<ArrowRight size={13} />}
                  >
                    Manage Orders ({orders.length})
                  </Button>
                </div>

                {/* Customizer Quick Jump */}
                <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-600">
                      <Sparkles size={20} />
                    </div>
                    <h4 className="text-base font-bold text-slate-900">Theme &amp; Branding</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Theme: <strong className="capitalize">{store.themeColor}</strong> • Template:{" "}
                      <strong className="capitalize">{store.templateStyle}</strong>
                    </p>
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    fullWidth
                    onClick={() => setActiveTab("customizer")}
                    leftIcon={<Edit2 size={13} />}
                  >
                    Edit Store Theme
                  </Button>
                </div>
              </div>

              {/* Recent Orders Preview */}
              <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <h4 className="text-base font-bold text-slate-900">Recent Customer Activity</h4>
                    <p className="text-xs text-slate-500">Latest orders placed on your live URL</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setActiveTab("orders")}>
                    View All Orders
                  </Button>
                </div>

                <StoreOrdersTable
                  orders={orders.slice(0, 5)}
                  onUpdateStatus={handleUpdateOrderStatus}
                />
              </div>
            </div>
          )}

          {/* TAB 2: PRODUCTS */}
          {activeTab === "products" && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Storefront Inventory ({products.length})
                  </h3>
                  <p className="text-xs text-slate-500">
                    Manage items, pricing, and stock displayed on your public catalog.
                  </p>
                </div>
                <Button
                  variant="gradient"
                  size="sm"
                  onClick={() => {
                    setEditingProduct(null);
                    setIsProductModalOpen(true);
                  }}
                  leftIcon={<Plus size={14} />}
                >
                  Add New Product
                </Button>
              </div>

              {products.length === 0 ? (
                <div className="bg-white border border-slate-200/90 rounded-2xl p-12 text-center shadow-xs space-y-4">
                  <div className="w-14 h-14 rounded-full bg-sky-50 border border-sky-100 flex items-center justify-center mx-auto text-sky-600">
                    <Package size={26} />
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900">No Products in Storefront</h4>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
                      Add your crafted products, candles, apparel, or kits so visitors can purchase them from your URL.
                    </p>
                  </div>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => {
                      setEditingProduct(null);
                      setIsProductModalOpen(true);
                    }}
                    leftIcon={<Plus size={14} />}
                  >
                    Create First Product
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((prod) => (
                    <div
                      key={prod.id}
                      className="bg-white border border-slate-200/90 rounded-2xl p-4 shadow-xs flex flex-col justify-between gap-4 group hover:shadow-card transition-all"
                    >
                      <div className="space-y-3">
                        <div className="relative h-44 rounded-xl overflow-hidden bg-slate-100 border border-slate-100">
                          {prod.images && prod.images[0] ? (
                            <img
                              src={prod.images[0]}
                              alt={prod.name}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-400">
                              <Package size={30} />
                            </div>
                          )}
                          {prod.isFeatured && (
                            <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-slate-900 text-white text-[10px] font-bold shadow-xs flex items-center gap-1">
                              <Sparkles size={10} className="text-amber-400" />
                              <span>Featured</span>
                            </span>
                          )}
                          <span className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-bold border border-slate-200 shadow-xs">
                            {prod.stock > 0 ? `${prod.stock} in stock` : "Out of stock"}
                          </span>
                        </div>

                        <div>
                          <span className="text-[10px] font-semibold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-md uppercase tracking-wider">
                            {prod.category}
                          </span>
                          <h4 className="text-sm font-bold text-slate-900 mt-1.5 line-clamp-1">
                            {prod.name}
                          </h4>
                          <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                            {prod.description}
                          </p>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                        <div>
                          <span className="text-base font-extrabold text-slate-900 tabular-nums">
                            {formatPrice(prod.price)}
                          </span>
                          {prod.comparePrice && (
                            <span className="text-xs text-slate-400 line-through ml-1.5 tabular-nums">
                              {formatPrice(prod.comparePrice)}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setEditingProduct(prod);
                              setIsProductModalOpen(true);
                            }}
                            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                            title="Edit Product"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(prod.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ORDERS */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200/90 rounded-2xl p-5 shadow-xs">
                <h3 className="text-base font-bold text-slate-900">
                  Customer Orders &amp; Fulfillment ({orders.length})
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Track, pack, and transition delivery statuses for orders placed on your website.
                </p>
              </div>

              <StoreOrdersTable orders={orders} onUpdateStatus={handleUpdateOrderStatus} />
            </div>
          )}

          {/* TAB 4: CUSTOMIZER */}
          {activeTab === "customizer" && (
            <div className="space-y-6">
              <StoreCustomizerForm
                initialStore={store}
                sellerId={user.uid}
                onSave={handleSaveStore}
                saving={savingStore}
              />
            </div>
          )}
        </div>
      )}

      {/* Product Add/Edit Modal */}
      {store && (
        <StoreProductModal
          isOpen={isProductModalOpen}
          onClose={() => {
            setIsProductModalOpen(false);
            setEditingProduct(null);
          }}
          onSave={handleSaveProduct}
          productToEdit={editingProduct}
          storeId={store.id}
          sellerId={user.uid}
        />
      )}

      {/* QR Code Modal */}
      {store && (
        <Modal
          isOpen={isQrModalOpen}
          onClose={() => setIsQrModalOpen(false)}
          title={`Scan QR Code for ${store.name}`}
        >
          <div className="text-center space-y-4 p-2">
            <p className="text-xs text-slate-600">
              Print or share this QR code on packaging slips, business cards, or packaging boxes. Customers can scan with their phone to visit your online store!
            </p>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl inline-block shadow-inner">
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                  publicUrl
                )}`}
                alt="Storefront QR Code"
                className="w-48 h-48 mx-auto"
              />
            </div>

            <p className="text-xs font-mono text-slate-700 font-bold break-all">{publicUrl}</p>

            <div className="flex justify-center gap-2 pt-2">
              <Button variant="secondary" size="sm" onClick={handleCopyLink}>
                {copiedLink ? "Copied Link!" : "Copy URL Link"}
              </Button>
              <Button variant="default" size="sm" onClick={() => setIsQrModalOpen(false)}>
                Done
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

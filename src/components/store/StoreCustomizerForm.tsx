"use client";

import React, { useState, useEffect } from "react";
import { Store, StoreThemeColor, StoreTemplateStyle } from "@/types";
import { Button } from "@/components/ui/Button";
import { checkSlugAvailability } from "@/lib/store-service";
import {
  Palette,
  Sparkles,
  Globe,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Truck,
  Phone,
  MessageSquare,
  Mail,
  Store as StoreIcon,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";

interface StoreCustomizerFormProps {
  initialStore: Partial<Store> | null;
  sellerId: string;
  onSave: (storeData: Partial<Store> & { sellerId: string; slug: string; name: string }) => Promise<void>;
  saving: boolean;
}

const THEME_COLORS: { id: StoreThemeColor; label: string; bgClass: string; borderClass: string; textClass: string; gradientClass: string }[] = [
  { id: "sky", label: "Sky Azure", bgClass: "bg-sky-500", borderClass: "border-sky-500", textClass: "text-sky-600", gradientClass: "from-sky-600 to-sky-800" },
  { id: "emerald", label: "Artisan Emerald", bgClass: "bg-emerald-600", borderClass: "border-emerald-600", textClass: "text-emerald-600", gradientClass: "from-emerald-600 to-emerald-800" },
  { id: "amber", label: "Sunset Amber", bgClass: "bg-amber-500", borderClass: "border-amber-500", textClass: "text-amber-600", gradientClass: "from-amber-600 to-amber-800" },
  { id: "rose", label: "Rose Coral", bgClass: "bg-rose-500", borderClass: "border-rose-500", textClass: "text-rose-600", gradientClass: "from-rose-600 to-rose-800" },
  { id: "purple", label: "Royal Violet", bgClass: "bg-purple-600", borderClass: "border-purple-600", textClass: "text-purple-600", gradientClass: "from-purple-600 to-purple-800" },
  { id: "slate", label: "Midnight Slate", bgClass: "bg-slate-900", borderClass: "border-slate-900", textClass: "text-slate-900", gradientClass: "from-slate-800 to-slate-950" },
];

const TEMPLATE_STYLES: { id: StoreTemplateStyle; label: string; desc: string }[] = [
  { id: "modern", label: "Modern Boutique", desc: "Clean typography, prominent hero banner, and polished badge accents." },
  { id: "artisan", label: "Artisan Minimal", desc: "Editorial craftsmanship layout with emphasis on makers and natural tones." },
  { id: "bold", label: "Bold Grid", desc: "High-contrast product focus with fast-action checkout triggers." },
];

const PRESET_BANNERS = [
  { label: "Craft Workshop", url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=80" },
  { label: "Botanical & Scent", url: "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=1600&auto=format&fit=crop&q=80" },
  { label: "Apparel & Fabric", url: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=1600&auto=format&fit=crop&q=80" },
  { label: "Minimalist Studio", url: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1600&auto=format&fit=crop&q=80" },
];

export const StoreCustomizerForm: React.FC<StoreCustomizerFormProps> = ({
  initialStore,
  sellerId,
  onSave,
  saving,
}) => {
  const [name, setName] = useState(initialStore?.name || "");
  const [slug, setSlug] = useState(initialStore?.slug || "");
  const [tagline, setTagline] = useState(initialStore?.tagline || "");
  const [description, setDescription] = useState(initialStore?.description || "");
  const [logoUrl, setLogoUrl] = useState(initialStore?.logoUrl || "");
  const [bannerUrl, setBannerUrl] = useState(
    initialStore?.bannerUrl || PRESET_BANNERS[0].url
  );
  const [themeColor, setThemeColor] = useState<StoreThemeColor>(
    initialStore?.themeColor || "sky"
  );
  const [templateStyle, setTemplateStyle] = useState<StoreTemplateStyle>(
    initialStore?.templateStyle || "modern"
  );
  const [announcementText, setAnnouncementText] = useState(
    initialStore?.announcementText || "✨ Welcome to our live studio store! Order online with fast delivery across Bangladesh."
  );
  const [contactEmail, setContactEmail] = useState(initialStore?.contactEmail || "");
  const [contactPhone, setContactPhone] = useState(initialStore?.contactPhone || "");
  const [whatsappNumber, setWhatsappNumber] = useState(initialStore?.whatsappNumber || "");
  const [shippingInsideDhaka, setShippingInsideDhaka] = useState(
    initialStore?.shippingInsideDhaka ?? 60
  );
  const [shippingOutsideDhaka, setShippingOutsideDhaka] = useState(
    initialStore?.shippingOutsideDhaka ?? 120
  );
  const [aboutText, setAboutText] = useState(initialStore?.aboutText || "");

  const [slugStatus, setSlugStatus] = useState<"idle" | "checking" | "available" | "taken">("idle");
  const [copiedLink, setCopiedLink] = useState(false);

  // Auto generate slug from name if empty
  const handleNameChange = (val: string) => {
    setName(val);
    if (!initialStore?.slug && (!slug || slugStatus !== "available")) {
      const generated = val.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      setSlug(generated);
    }
  };

  // Check slug availability on debounce
  useEffect(() => {
    if (!slug || slug.length < 3) {
      setSlugStatus("idle");
      return;
    }
    const timer = setTimeout(async () => {
      setSlugStatus("checking");
      const available = await checkSlugAvailability(slug, initialStore?.id);
      setSlugStatus(available ? "available" : "taken");
    }, 400);

    return () => clearTimeout(timer);
  }, [slug, initialStore?.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Please enter a Store Name.");
      return;
    }
    if (!slug.trim() || slug.length < 3) {
      alert("Please enter a valid URL slug (at least 3 characters).");
      return;
    }
    if (slugStatus === "taken") {
      alert("This store URL slug is already taken. Please choose another one.");
      return;
    }

    await onSave({
      id: initialStore?.id,
      sellerId,
      name: name.trim(),
      slug: slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, ""),
      tagline: tagline.trim(),
      description: description.trim(),
      logoUrl: logoUrl.trim(),
      bannerUrl: bannerUrl.trim(),
      themeColor,
      templateStyle,
      announcementText: announcementText.trim(),
      contactEmail: contactEmail.trim(),
      contactPhone: contactPhone.trim(),
      whatsappNumber: whatsappNumber.trim(),
      shippingInsideDhaka: Number(shippingInsideDhaka),
      shippingOutsideDhaka: Number(shippingOutsideDhaka),
      aboutText: aboutText.trim(),
      isActive: true,
    });
  };

  const currentTheme = THEME_COLORS.find((t) => t.id === themeColor) || THEME_COLORS[0];
  const origin = typeof window !== "undefined" ? window.location.origin : "";
  const publicStoreUrl = `${origin}/store/${slug || "your-store"}`;

  const handleCopyLink = () => {
    if (!slug) return;
    navigator.clipboard.writeText(publicStoreUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Live Storefront Link Bar */}
      {slug && (
        <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <StoreIcon size={16} className="text-sky-400" />
              <span className="text-xs font-semibold text-sky-400 uppercase tracking-wider">
                Your Public Website URL
              </span>
            </div>
            <p className="text-sm sm:text-base font-mono font-bold text-white break-all">
              {publicStoreUrl}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCopyLink}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-white/15"
            >
              {copiedLink ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              <span>{copiedLink ? "Copied!" : "Copy Link"}</span>
            </button>

            <a
              href={`/store/${slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-sky-500 hover:bg-sky-400 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <span>Visit Live Store</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      )}

      {/* Grid: Settings on Left, Live Preview Card on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form Settings */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Store Basics */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Globe size={18} className="text-sky-600" />
              <h3 className="text-base font-bold text-slate-900">1. Store Identity &amp; URL</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Store / Brand Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Amber &amp; Wood Studio"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500 font-medium"
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Custom Website URL Slug *
                </label>
                <div className="flex items-center">
                  <span className="px-3 py-2.5 bg-slate-100 border border-r-0 border-slate-200 rounded-l-xl text-xs font-mono text-slate-500 shrink-0">
                    /store/
                  </span>
                  <input
                    type="text"
                    placeholder="amber-wood"
                    className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-r-xl text-sm font-mono focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500 font-semibold text-slate-900"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                    required
                  />
                </div>
                <div className="flex items-center gap-1.5 mt-1.5 text-xs">
                  {slugStatus === "checking" && (
                    <span className="text-slate-400">Checking availability...</span>
                  )}
                  {slugStatus === "available" && (
                    <span className="text-emerald-600 font-semibold flex items-center gap-1">
                      <CheckCircle2 size={13} /> URL is available!
                    </span>
                  )}
                  {slugStatus === "taken" && (
                    <span className="text-rose-600 font-semibold flex items-center gap-1">
                      <AlertCircle size={13} /> URL is already taken. Please choose another.
                    </span>
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Tagline / Catchphrase
                </label>
                <input
                  type="text"
                  placeholder="e.g. Handcrafted Botanical Candles &amp; Sustainable Goods"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Store Bio / Short Description
                </label>
                <textarea
                  rows={2}
                  placeholder="Briefly describe what makes your products and craft special..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Section 2: Visual Themes & Template */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Palette size={18} className="text-sky-600" />
              <h3 className="text-base font-bold text-slate-900">2. Template Style &amp; Theme Palette</h3>
            </div>

            {/* Theme Color Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700 block">
                Brand Accent Palette
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {THEME_COLORS.map((t) => {
                  const isSelected = themeColor === t.id;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setThemeColor(t.id)}
                      className={`flex items-center gap-2.5 p-2.5 rounded-xl border transition-all text-left cursor-pointer ${
                        isSelected
                          ? `${t.borderClass} ring-2 ring-offset-1 ring-slate-900 bg-slate-50/80`
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <span className={`w-4 h-4 rounded-full ${t.bgClass} shrink-0 shadow-xs`} />
                      <span className="text-xs font-bold text-slate-900">{t.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Template Style Selector */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold text-slate-700 block">
                Layout Template
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {TEMPLATE_STYLES.map((tmpl) => {
                  const isSelected = templateStyle === tmpl.id;
                  return (
                    <button
                      key={tmpl.id}
                      type="button"
                      onClick={() => setTemplateStyle(tmpl.id)}
                      className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                        isSelected
                          ? "border-sky-600 bg-sky-50/50 ring-2 ring-sky-600/30"
                          : "border-slate-200 hover:border-slate-300 bg-white"
                      }`}
                    >
                      <span className="text-xs font-bold text-slate-900 block">{tmpl.label}</span>
                      <span className="text-[11px] text-slate-500 mt-1 block leading-normal">{tmpl.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Banner & Logo URLs */}
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700">
                    Hero Cover Banner Image URL
                  </label>
                  <span className="text-[11px] text-slate-400">Presets below</span>
                </div>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500 font-mono"
                  value={bannerUrl}
                  onChange={(e) => setBannerUrl(e.target.value)}
                />

                {/* Preset Banner Buttons */}
                <div className="flex items-center gap-1.5 flex-wrap mt-2">
                  <span className="text-[10px] font-semibold text-slate-400 uppercase">Presets:</span>
                  {PRESET_BANNERS.map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setBannerUrl(preset.url)}
                      className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 transition-colors cursor-pointer"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Store Logo / Avatar URL
                </label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/... or your brand logo image"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500 font-mono"
                  value={logoUrl}
                  onChange={(e) => setLogoUrl(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Top Announcement Bar
                </label>
                <input
                  type="text"
                  placeholder="e.g. 🚚 Free shipping across Bangladesh on orders over ৳1,500!"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500"
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Section 3: Contact & Shipping */}
          <div className="bg-white border border-slate-200/90 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Truck size={18} className="text-sky-600" />
              <h3 className="text-base font-bold text-slate-900">3. Shipping Rates &amp; Customer Contact</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Inside Dhaka Delivery (৳ BDT)
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="60"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500"
                  value={shippingInsideDhaka}
                  onChange={(e) => setShippingInsideDhaka(Number(e.target.value))}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Outside Dhaka Delivery (৳ BDT)
                </label>
                <input
                  type="number"
                  min="0"
                  placeholder="120"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500"
                  value={shippingOutsideDhaka}
                  onChange={(e) => setShippingOutsideDhaka(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  WhatsApp Support
                </label>
                <input
                  type="text"
                  placeholder="+8801712345678"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500"
                  value={whatsappNumber}
                  onChange={(e) => setWhatsappNumber(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Customer Phone
                </label>
                <input
                  type="text"
                  placeholder="+880 1712..."
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Customer Support Email
                </label>
                <input
                  type="email"
                  placeholder="shop@example.com"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                About The Maker / Studio Story
              </label>
              <textarea
                rows={3}
                placeholder="Tell customers about your craftsmanship process, workshop location, and mission..."
                className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:bg-white focus:ring-2 focus:ring-sky-500"
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <Button
              type="submit"
              variant="gradient"
              size="lg"
              isLoading={saving}
              leftIcon={<Sparkles size={16} />}
            >
              {initialStore?.id ? "Save & Publish Store Changes" : "Launch My Store Website"}
            </Button>
          </div>
        </div>

        {/* Right Live Preview Card */}
        <div className="lg:col-span-5 sticky top-20 space-y-4">
          <div className="bg-white border border-slate-200/90 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Live Storefront Preview</span>
              </div>
              <span className="font-mono text-[10px] text-slate-400">/store/{slug || "slug"}</span>
            </div>

            {/* Announcement mockup */}
            <div className={`p-2 text-center text-[10px] font-bold text-white ${currentTheme.bgClass}`}>
              {announcementText || "Special Store Announcement Banner"}
            </div>

            {/* Header Mockup */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                {logoUrl ? (
                  <img src={logoUrl} alt="Logo" className="w-8 h-8 rounded-lg object-cover border border-slate-200" />
                ) : (
                  <div className={`w-8 h-8 rounded-lg ${currentTheme.bgClass} text-white flex items-center justify-center font-bold text-xs`}>
                    {name ? name.charAt(0) : "S"}
                  </div>
                )}
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-tight">
                    {name || "Your Store Name"}
                  </h4>
                  <p className="text-[10px] text-slate-500 font-medium">
                    {tagline || "Your craft tagline"}
                  </p>
                </div>
              </div>

              <div className="px-2.5 py-1 rounded-full bg-slate-100 text-[10px] font-bold text-slate-700">
                Cart (0)
              </div>
            </div>

            {/* Hero Mockup */}
            <div className="relative h-40 bg-slate-800 overflow-hidden flex items-center justify-center p-4 text-center">
              {bannerUrl && (
                <img
                  src={bannerUrl}
                  alt="Banner"
                  className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
              )}
              <div className="relative z-10 space-y-1.5 max-w-xs text-white">
                <span className={`text-[9px] uppercase font-extrabold px-2 py-0.5 rounded-full ${currentTheme.bgClass}`}>
                  Featured Collection
                </span>
                <h3 className="text-sm sm:text-base font-extrabold">
                  {name || "Artisan Goods"}
                </h3>
                <p className="text-[10px] text-slate-200 line-clamp-2">
                  {description || "Explore handcrafted goods directly from our independent studio."}
                </p>
              </div>
            </div>

            {/* Sample Products Mockup */}
            <div className="p-4 space-y-3 bg-slate-50/50">
              <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                <span>Featured Catalog</span>
                <span className="text-[10px] text-slate-500">Shipping: ৳{shippingInsideDhaka} (Dhaka)</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="bg-white border border-slate-200 rounded-xl p-2 space-y-1.5 shadow-2xs">
                  <div className="h-16 bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center text-slate-400 text-xs">
                    <ImageIcon size={18} />
                  </div>
                  <p className="text-[11px] font-bold text-slate-900 truncate">Signature Product</p>
                  <p className={`text-[11px] font-bold ${currentTheme.textClass}`}>৳1,200</p>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-2 space-y-1.5 shadow-2xs">
                  <div className="h-16 bg-slate-100 rounded-lg overflow-hidden flex items-center justify-center text-slate-400 text-xs">
                    <ImageIcon size={18} />
                  </div>
                  <p className="text-[11px] font-bold text-slate-900 truncate">Artisan Kit</p>
                  <p className={`text-[11px] font-bold ${currentTheme.textClass}`}>৳650</p>
                </div>
              </div>
            </div>

            {/* Footer preview */}
            <div className="p-3 border-t border-slate-100 bg-white text-center text-[10px] text-slate-400 font-medium">
              Powered by <strong className="text-slate-900">Bondor Storefront</strong>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

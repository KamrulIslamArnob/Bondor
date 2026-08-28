export type UserRole = "builder" | "seller" | "both";

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt?: number;
}

export type BusinessCategory = "tshirt" | "candle" | "soap" | "sticker" | string;

export interface BusinessDockInfo {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  color: string;
  coursesCount: number;
  materialsCount: number;
  growth: string;
}

export interface Product {
  id: string;
  name: string;
  category: BusinessCategory;
  description: string;
  price: number;
  stock: number;
  images: string[];
  sellerId: string;
  createdAt?: number;
  updatedAt?: number;
}

export interface Course {
  id: string;
  title: string;
  business: BusinessCategory;
  description: string;
  price: number;
  links: string[]; // YouTube or module video URLs
  sellerId: string;
  createdAt?: number;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  business: BusinessCategory;
  enrolledAt?: number;
}

export interface CartItem {
  id: string;
  type: "course" | "product";
  name: string;
  description?: string;
  price: number;
  image?: string;
  qty: number;
}

export type StoreThemeColor = "sky" | "emerald" | "amber" | "rose" | "purple" | "slate";
export type StoreTemplateStyle = "modern" | "artisan" | "minimal" | "bold";

export interface Store {
  id: string;
  sellerId: string;
  slug: string; // Unique URL slug, e.g. "arnob-apparel"
  name: string;
  tagline: string;
  description: string;
  logoUrl?: string;
  bannerUrl?: string;
  themeColor: StoreThemeColor;
  templateStyle: StoreTemplateStyle;
  announcementText?: string;
  contactEmail?: string;
  contactPhone?: string;
  whatsappNumber?: string;
  shippingInsideDhaka: number;
  shippingOutsideDhaka: number;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    website?: string;
  };
  aboutText?: string;
  isActive: boolean;
  createdAt: number;
  updatedAt?: number;
}

export interface StoreProduct {
  id: string;
  storeId: string;
  sellerId: string;
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  stock: number;
  images: string[];
  category: string;
  isFeatured?: boolean;
  createdAt: number;
  updatedAt?: number;
}

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "cancelled";
export type PaymentMethod = "cod" | "bkash" | "card";

export interface StoreOrderItem {
  productId: string;
  name: string;
  price: number;
  qty: number;
  image?: string;
  category?: string;
}

export interface StoreOrder {
  id: string;
  storeId: string;
  sellerId: string;
  storeSlug: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  shippingAddress: string;
  deliveryArea: "inside_dhaka" | "outside_dhaka";
  paymentMethod: PaymentMethod;
  items: StoreOrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  status: OrderStatus;
  notes?: string;
  createdAt: number;
  updatedAt?: number;
}


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

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Store, StoreProduct, StoreOrder, OrderStatus } from "@/types";

// Default Demo Store for instant preview / fallback
export const DEMO_STORE: Store = {
  id: "demo-crafts-id",
  sellerId: "demo-seller",
  slug: "demo-crafts",
  name: "Arnob Artisan Crafts",
  tagline: "Handmade Botanical Candles & Organic Apparel from Dhaka",
  description:
    "We create small-batch artisanal lifestyle goods crafted with 100% organic cotton, natural soy wax, and traditional Bangladeshi herbal infusions.",
  logoUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=200&auto=format&fit=crop&q=80",
  bannerUrl:
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=80",
  themeColor: "sky",
  templateStyle: "modern",
  announcementText: "✨ Spring Offer: Free home delivery across Bangladesh on orders over ৳1,500!",
  contactEmail: "arnob.crafts@bondor.bd",
  contactPhone: "+880 1712-345678",
  whatsappNumber: "+8801712345678",
  shippingInsideDhaka: 60,
  shippingOutsideDhaka: 120,
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    website: "https://bondor.com",
  },
  aboutText:
    "Founded in 2024 in Old Dhaka, our studio connects local artisans with makers across Bangladesh. Every item is produced sustainably in ethically certified workshops.",
  isActive: true,
  createdAt: Date.now() - 30 * 24 * 60 * 60 * 1000,
};

export const DEMO_STORE_PRODUCTS: StoreProduct[] = [
  {
    id: "demo-p-1",
    storeId: "demo-crafts-id",
    sellerId: "demo-seller",
    name: "Wild Jasmine & Sandalwood Soy Candle (250g)",
    description:
      "Hand-poured 100% natural soy wax infused with botanical jasmine absolute and rich sandalwood. Burns cleanly for up to 45 hours.",
    price: 650,
    comparePrice: 850,
    stock: 24,
    images: [
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Home & Candles",
    isFeatured: true,
    createdAt: Date.now() - 10 * 24 * 60 * 60 * 1000,
  },
  {
    id: "demo-p-2",
    storeId: "demo-crafts-id",
    sellerId: "demo-seller",
    name: "Heavyweight 240 GSM Organic Cotton Oversized Tee",
    description:
      "Crafted with combed ring-spun organic Bangladeshi cotton. Preshrunk, double-needle stitched neckline with tailored dropped shoulders.",
    price: 1150,
    comparePrice: 1450,
    stock: 45,
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Apparel",
    isFeatured: true,
    createdAt: Date.now() - 8 * 24 * 60 * 60 * 1000,
  },
  {
    id: "demo-p-3",
    storeId: "demo-crafts-id",
    sellerId: "demo-seller",
    name: "Handmade Turmeric & Raw Honey Cold-Pressed Soap Bar",
    description:
      "All-natural nourishing soap bar with raw Sundarban honey, organic turmeric root extract, and virgin coconut oil base.",
    price: 280,
    comparePrice: 350,
    stock: 60,
    images: [
      "https://images.unsplash.com/photo-1607006314041-38374d812328?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Body & Care",
    isFeatured: false,
    createdAt: Date.now() - 5 * 24 * 60 * 60 * 1000,
  },
  {
    id: "demo-p-4",
    storeId: "demo-crafts-id",
    sellerId: "demo-seller",
    name: "Die-Cut Vinyl Creator Sticker Pack (10 Pcs)",
    description:
      "Waterproof, scratch-resistant vinyl art stickers featuring original maker illustrations. Perfect for laptops, flasks, and journals.",
    price: 180,
    comparePrice: 250,
    stock: 100,
    images: [
      "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=800&auto=format&fit=crop&q=80",
    ],
    category: "Stationery",
    isFeatured: true,
    createdAt: Date.now() - 3 * 24 * 60 * 60 * 1000,
  },
];

/**
 * Fetch a store by its unique URL slug
 */
export async function getStoreBySlug(slug: string): Promise<Store | null> {
  const normalized = slug.trim().toLowerCase();
  if (normalized === "demo-crafts" || normalized === "demo") {
    return DEMO_STORE;
  }

  try {
    const q = query(collection(db, "stores"), where("slug", "==", normalized));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const docData = snap.docs[0];
      return { id: docData.id, ...(docData.data() as Omit<Store, "id">) };
    }
  } catch (err) {
    console.warn("Error fetching store by slug from firestore:", err);
  }

  // If slug matches demo, return fallback
  if (normalized === "demo-crafts" || normalized === "demo") {
    return DEMO_STORE;
  }
  return null;
}

/**
 * Fetch a user's store by seller UID
 */
export async function getStoreBySellerId(sellerId: string): Promise<Store | null> {
  try {
    const q = query(collection(db, "stores"), where("sellerId", "==", sellerId));
    const snap = await getDocs(q);
    if (!snap.empty) {
      const docData = snap.docs[0];
      return { id: docData.id, ...(docData.data() as Omit<Store, "id">) };
    }
  } catch (err) {
    console.error("Error fetching store by sellerId:", err);
  }
  return null;
}

/**
 * Check if a URL slug is available
 */
export async function checkSlugAvailability(
  slug: string,
  currentStoreId?: string
): Promise<boolean> {
  const normalized = slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");
  if (!normalized || normalized.length < 3) return false;
  if (normalized === "demo-crafts" && currentStoreId !== "demo-crafts-id") return false;

  try {
    const q = query(collection(db, "stores"), where("slug", "==", normalized));
    const snap = await getDocs(q);
    if (snap.empty) return true;
    if (currentStoreId && snap.docs.length === 1 && snap.docs[0].id === currentStoreId) {
      return true;
    }
    return false;
  } catch (err) {
    console.warn("Could not check slug:", err);
    return true;
  }
}

/**
 * Create or update a store
 */
export async function saveStore(
  storeData: Partial<Store> & { sellerId: string; slug: string; name: string }
): Promise<Store> {
  const now = Date.now();
  const slug = storeData.slug.trim().toLowerCase().replace(/[^a-z0-9-]/g, "");

  if (storeData.id) {
    const storeRef = doc(db, "stores", storeData.id);
    const updated: Partial<Store> = {
      ...storeData,
      slug,
      updatedAt: now,
    };
    await updateDoc(storeRef, updated);
    return { ...(storeData as Store), slug, updatedAt: now };
  } else {
    const newStoreRef = doc(collection(db, "stores"));
    const newStore: Store = {
      id: newStoreRef.id,
      sellerId: storeData.sellerId,
      slug,
      name: storeData.name.trim(),
      tagline: storeData.tagline || "",
      description: storeData.description || "",
      logoUrl: storeData.logoUrl || "",
      bannerUrl:
        storeData.bannerUrl ||
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&auto=format&fit=crop&q=80",
      themeColor: storeData.themeColor || "sky",
      templateStyle: storeData.templateStyle || "modern",
      announcementText: storeData.announcementText || "",
      contactEmail: storeData.contactEmail || "",
      contactPhone: storeData.contactPhone || "",
      whatsappNumber: storeData.whatsappNumber || "",
      shippingInsideDhaka: storeData.shippingInsideDhaka ?? 60,
      shippingOutsideDhaka: storeData.shippingOutsideDhaka ?? 120,
      socialLinks: storeData.socialLinks || {},
      aboutText: storeData.aboutText || "",
      isActive: storeData.isActive ?? true,
      createdAt: now,
      updatedAt: now,
    };
    await setDoc(newStoreRef, newStore);
    return newStore;
  }
}

/**
 * Fetch all products belonging to a store
 */
export async function getStoreProducts(storeId: string): Promise<StoreProduct[]> {
  if (storeId === "demo-crafts-id") {
    return DEMO_STORE_PRODUCTS;
  }

  try {
    const q = query(
      collection(db, "storeProducts"),
      where("storeId", "==", storeId)
    );
    const snap = await getDocs(q);
    const products: StoreProduct[] = [];
    snap.forEach((d) => {
      products.push({ id: d.id, ...(d.data() as Omit<StoreProduct, "id">) });
    });
    // Sort newest first
    products.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    return products;
  } catch (err) {
    console.error("Error fetching store products:", err);
    return [];
  }
}

/**
 * Add a new product to the store
 */
export async function addStoreProduct(
  productData: Omit<StoreProduct, "id">
): Promise<StoreProduct> {
  const now = Date.now();
  const docRef = await addDoc(collection(db, "storeProducts"), {
    ...productData,
    createdAt: now,
    updatedAt: now,
  });
  return {
    id: docRef.id,
    ...productData,
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Update an existing store product
 */
export async function updateStoreProduct(
  productId: string,
  data: Partial<StoreProduct>
): Promise<void> {
  const docRef = doc(db, "storeProducts", productId);
  await updateDoc(docRef, {
    ...data,
    updatedAt: Date.now(),
  });
}

/**
 * Delete a store product
 */
export async function deleteStoreProduct(productId: string): Promise<void> {
  const docRef = doc(db, "storeProducts", productId);
  await deleteDoc(docRef);
}

/**
 * Create a new store order from a customer
 */
export async function createStoreOrder(
  orderData: Omit<StoreOrder, "id">
): Promise<StoreOrder> {
  const now = Date.now();
  const docRef = await addDoc(collection(db, "storeOrders"), {
    ...orderData,
    status: orderData.status || "pending",
    createdAt: now,
    updatedAt: now,
  });
  return {
    id: docRef.id,
    ...orderData,
    createdAt: now,
    updatedAt: now,
  };
}

/**
 * Fetch all orders for a store
 */
export async function getStoreOrders(storeId: string): Promise<StoreOrder[]> {
  try {
    const q = query(
      collection(db, "storeOrders"),
      where("storeId", "==", storeId)
    );
    const snap = await getDocs(q);
    const orders: StoreOrder[] = [];
    snap.forEach((d) => {
      orders.push({ id: d.id, ...(d.data() as Omit<StoreOrder, "id">) });
    });
    // Sort newest first
    orders.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    return orders;
  } catch (err) {
    console.error("Error fetching store orders:", err);
    return [];
  }
}

/**
 * Update an order's status
 */
export async function updateStoreOrderStatus(
  orderId: string,
  status: OrderStatus
): Promise<void> {
  const docRef = doc(db, "storeOrders", orderId);
  await updateDoc(docRef, {
    status,
    updatedAt: Date.now(),
  });
}

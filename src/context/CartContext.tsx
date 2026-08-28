"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { CartItem } from "@/types";
import { getPriceOrRandom } from "@/lib/price-utils";

const CART_KEY = "bondor_cart";

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (item: Omit<CartItem, "qty"> & { qty?: number }) => void;
  removeFromCart: (id: string, type: "course" | "product") => void;
  updateQuantity: (id: string, type: "course" | "product", qty: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  // Load cart from localStorage on client mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          // Normalize prices
          const sanitized = parsed.map((item: CartItem) => ({
            ...item,
            price: getPriceOrRandom(item.id, item.price),
            qty: Number(item.qty) > 0 ? Number(item.qty) : 1
          }));
          setCart(sanitized);
        }
      }
    } catch (err) {
      console.error("Failed to load cart from localStorage", err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (err) {
      console.error("Failed to persist cart to localStorage", err);
    }
  }, [cart, isLoaded]);

  const addToCart = (item: Omit<CartItem, "qty"> & { qty?: number }) => {
    setCart((prev) => {
      const displayPrice = getPriceOrRandom(item.id, item.price);
      const qtyToAdd = item.qty && item.qty > 0 ? item.qty : 1;
      const index = prev.findIndex((c) => c.id === item.id && c.type === item.type);

      if (index >= 0) {
        const copy = [...prev];
        copy[index] = {
          ...copy[index],
          price: displayPrice,
          qty: copy[index].qty + qtyToAdd,
        };
        return copy;
      }

      return [
        ...prev,
        {
          id: item.id,
          type: item.type,
          name: item.name || "Item",
          description: item.description || "",
          price: displayPrice,
          image: item.image || "",
          qty: qtyToAdd,
        },
      ];
    });
  };

  const removeFromCart = (id: string, type: "course" | "product") => {
    setCart((prev) => prev.filter((c) => !(c.id === id && c.type === type)));
  };

  const updateQuantity = (id: string, type: "course" | "product", qty: number) => {
    if (qty <= 0) {
      removeFromCart(id, type);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.type === type ? { ...item, qty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    try {
      localStorage.removeItem(CART_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + (item.qty || 1), 0);

  const cartTotal = cart.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.qty) || 1;
    return sum + price * qty;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

import type { Metadata } from "next";
import { Outfit, Space_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { AppLayoutWrapper } from "@/components/layout/AppLayoutWrapper";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bondor — The Platform for Micro-Makers & Verified Sellers",
  description:
    "Learn hands-on business production with modular video courses, then buy certified raw supplies from verified sellers in Bangladesh.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${spaceMono.variable}`}>
      <body className="bg-[#FAF8F5] text-zinc-950 min-h-screen antialiased font-sans selection:bg-[#62B6FC] selection:text-zinc-950">
        <AuthProvider>
          <CartProvider>
            <AppLayoutWrapper>{children}</AppLayoutWrapper>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

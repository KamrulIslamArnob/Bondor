import type { Metadata } from "next";
import { Outfit, Space_Mono, Hind_Siliguri } from "next/font/google";
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

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali", "latin"],
  variable: "--font-hind-siliguri",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bondor (বন্দর) — The Platform for Micro-Makers & Wholesale Suppliers",
  description:
    "Learn hands-on business production with modular video courses, then buy certified raw supplies from verified sellers in Bangladesh.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${spaceMono.variable} ${hindSiliguri.variable}`}>
      <body className="bg-white text-slate-900 min-h-screen antialiased font-sans selection:bg-blue-600 selection:text-white">
        <AuthProvider>
          <CartProvider>
            <AppLayoutWrapper>{children}</AppLayoutWrapper>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

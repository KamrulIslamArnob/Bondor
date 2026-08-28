import { BusinessDockInfo } from "@/types";

export const BUSINESS_CATEGORIES: (BusinessDockInfo & { code: string; throughput: string; activeShips: number })[] = [
  {
    id: "tshirt",
    code: "Dock 01",
    title: "Apparel & Screen Printing",
    subtitle: "From blank organic tees to branded custom apparel collections.",
    icon: "layers",
    color: "#0284c7",
    coursesCount: 3,
    materialsCount: 2,
    growth: "+45.2%",
    throughput: "8.4k units/mo",
    activeShips: 12,
  },
  {
    id: "candle",
    code: "Dock 02",
    title: "Artisan Candle Workshop",
    subtitle: "Hand-poured soy wax candles, cotton wicks & aroma blending.",
    icon: "flame",
    color: "#d97706",
    coursesCount: 4,
    materialsCount: 5,
    growth: "+32.8%",
    throughput: "4.1k units/mo",
    activeShips: 9,
  },
  {
    id: "soap",
    code: "Dock 03",
    title: "Botanical Soap Lab",
    subtitle: "Cold-process handmade bars & organic skincare formulations.",
    icon: "sparkles",
    color: "#059669",
    coursesCount: 2,
    materialsCount: 3,
    growth: "+15.6%",
    throughput: "2.8k units/mo",
    activeShips: 6,
  },
  {
    id: "sticker",
    code: "Dock 04",
    title: "Vinyl & Print Studio",
    subtitle: "Die-cut decals, holographic stickers & micro-brand packaging.",
    icon: "printer",
    color: "#dc2626",
    coursesCount: 3,
    materialsCount: 1,
    growth: "+28.4%",
    throughput: "14.2k units/mo",
    activeShips: 15,
  },
];

export function getBusinessLabel(id: string): string {
  const dock = BUSINESS_CATEGORIES.find((b) => b.id === id);
  return dock ? dock.title : id || "Business Dock";
}

export function getBusinessCode(id: string): string {
  const dock = BUSINESS_CATEGORIES.find((b) => b.id === id);
  return dock ? dock.code : "Dock";
}

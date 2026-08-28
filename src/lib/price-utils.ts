const priceCache = new Map<string, number>();

/**
 * Calculate a stable fallback price if the item does not have a set price in Firestore.
 * Optimized with LRU-like memoization to avoid repeated hashing.
 */
export function getPriceOrRandom(id: string | number, price?: number | string | null, min = 200, max = 1500): number {
  const numericPrice = Number(price);
  if (Number.isFinite(numericPrice) && numericPrice > 0) {
    return Math.round(numericPrice);
  }

  const cacheKey = `${id}:${min}:${max}:${price}`;
  const cached = priceCache.get(cacheKey);
  if (cached !== undefined) return cached;

  const safeId = String(id || "");
  let hash = 0;
  for (let i = 0; i < safeId.length; i += 1) {
    hash = (hash * 31 + safeId.charCodeAt(i)) | 0;
  }

  const range = Math.max(1, max - min + 1);
  const value = Math.abs(hash) % range;
  const result = min + value;

  // Bound cache size to prevent memory leak
  if (priceCache.size > 500) priceCache.clear();
  priceCache.set(cacheKey, result);
  return result;
}

// Pre-allocate formatter for BDT to avoid recreating Intl per call
const bdtFormatter = new Intl.NumberFormat("en-BD");
const usdFormatter = new Intl.NumberFormat("en-US");

export function formatPrice(amount: number, currency = "BDT"): string {
  const formatted = currency === "BDT" ? bdtFormatter.format(amount) : usdFormatter.format(amount);
  return `${currency} ${formatted}`;
}

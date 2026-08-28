/**
 * Calculate a stable fallback price if the item does not have a set price in Firestore.
 */
export function getPriceOrRandom(id: string | number, price?: number | string | null, min = 200, max = 1500): number {
  const numericPrice = Number(price);
  if (Number.isFinite(numericPrice) && numericPrice > 0) {
    return Math.round(numericPrice);
  }

  const safeId = String(id || "");
  let hash = 0;
  for (let i = 0; i < safeId.length; i += 1) {
    hash = (hash * 31 + safeId.charCodeAt(i)) | 0;
  }

  const range = Math.max(1, max - min + 1);
  const value = Math.abs(hash) % range;
  return min + value;
}

export function formatPrice(amount: number, currency = "BDT"): string {
  return `${currency} ${amount.toLocaleString()}`;
}

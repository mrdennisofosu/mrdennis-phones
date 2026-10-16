import { LOW_STOCK_THRESHOLD } from "../shopConfig";

// True when you have given the item a stock number or a list of units
export const hasCount = (item) =>
  Array.isArray(item.units) || typeof item.stock === "number";

// How many can be sold right now.
// Older items with only inStock: true count as 99 until you add a stock number.
export function getAvailable(item) {
  if (Array.isArray(item.units)) {
    return item.units.filter((u) => u.status === "available").length;
  }
  if (typeof item.stock === "number") return item.stock;
  return item.inStock ? 99 : 0;
}

export function getReserved(item) {
  if (Array.isArray(item.units)) {
    return item.units.filter((u) => u.status === "reserved").length;
  }
  return typeof item.reserved === "number" ? item.reserved : 0;
}

export function getStatus(item) {
  const available = getAvailable(item);
  if (available > 0) {
    if (hasCount(item) && available <= LOW_STOCK_THRESHOLD) {
      return { key: "low", label: "Low Stock", tone: "bg-amber-100 text-amber-800" };
    }
    return { key: "in", label: "In Stock", tone: "bg-blue-100 text-blue-700" };
  }
  if (getReserved(item) > 0) {
    return { key: "reserved", label: "Reserved", tone: "bg-indigo-100 text-indigo-700" };
  }
  return { key: "sold", label: "Sold Out", tone: "bg-slate-200 text-slate-600" };
}

// Codes of the individual devices that would be sold (your own codes, never IMEI numbers)
export function pickUnits(item, qty) {
  if (!Array.isArray(item.units)) return [];
  return item.units
    .filter((u) => u.status === "available")
    .slice(0, qty)
    .map((u) => u.id);
}
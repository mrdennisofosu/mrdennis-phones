import { phones } from "../data/phones";
import { accessories, categoryIcons } from "../data/accessories";
import { deals } from "../data/deals";
import { getAvailable } from "./stock";

const catalog = { phone: phones, accessory: accessories };

export const cedis = (amount) => `GH₵ ${amount.toLocaleString()}`;

export const findProduct = (kind, id) =>
  catalog[kind]?.find((p) => p.id === id);

// The running deal for a product, if there is one
export function getDeal(kind, id, now = Date.now()) {
  return (
    deals.find(
      (d) =>
        d.kind === kind &&
        d.productId === id &&
        d.quantity > 0 &&
        new Date(d.endsAt).getTime() > now
    ) || null
  );
}

// The price one unit costs right now (the deal price if a deal is running)
export function getPrice(kind, item) {
  const deal = getDeal(kind, item.id);
  if (deal && deal.promoPrice < item.price) {
    return { price: deal.promoPrice, original: item.price, deal };
  }
  return { price: item.price, original: null, deal: null };
}

// The most a customer can buy at once
export function maxQty(kind, item) {
  const { deal } = getPrice(kind, item);
  const available = getAvailable(item);
  return deal ? Math.min(available, deal.quantity) : available;
}

// Gives cards and pop-ups one shape for phones and accessories
export function describe(kind, item) {
  if (kind === "phone") {
    return {
      title: item.name,
      label: item.brand,
      sub: item.storage,
      badge: item.condition,
      icon: "📱",
    };
  }
  return {
    title: item.name,
    label: item.category,
    sub: item.compatibility || "",
    badge: item.category,
    icon: categoryIcons[item.category] || "🛍️",
  };
}
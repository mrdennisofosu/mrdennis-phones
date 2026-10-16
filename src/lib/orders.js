import { cedis } from "./products";

const ORDERS_KEY = "mdp-orders";

export function makeReference() {
  const d = new Date();
  const date = `${String(d.getFullYear()).slice(2)}${String(
    d.getMonth() + 1
  ).padStart(2, "0")}${String(d.getDate()).padStart(2, "0")}`;
  const code = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `MDP-${date}-${code}`;
}

export function loadOrders() {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY)) || [];
  } catch {
    return [];
  }
}

export function saveOrder(order) {
  try {
    const old = loadOrders();
    localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...old].slice(0, 20)));
  } catch {
    /* storage not available */
  }
}

// The WhatsApp message that carries the order to you
export function buildOrderMessage(order) {
  const items = order.lines.map(
    (l, i) =>
      `${i + 1}. ${l.name}${l.sub ? ` (${l.sub})` : ""} x${l.qty} - ${cedis(
        l.price
      )} each${l.units.length ? ` [Device: ${l.units.join(", ")}]` : ""}`
  );
  const c = order.customer;
  const where =
    order.method === "delivery"
      ? `Delivery to: ${c.area}, ${c.address}${
          c.landmark ? ` (${c.landmark})` : ""
        }`
      : "Shop pickup";

  return [
    `New order ${order.ref}`,
    `Payment: ${
      order.payOption === "deposit"
        ? `Reservation deposit (${order.depositPercent}%)`
        : "Full payment"
    }`,
    "",
    "Items:",
    ...items,
    "",
    `Subtotal: ${cedis(order.subtotal)}`,
    order.method === "delivery"
      ? order.deliveryFee !== null
        ? `Delivery fee: ${cedis(order.deliveryFee)}`
        : "Delivery fee: to be confirmed"
      : "",
    `Pay now: ${cedis(order.payNow)}`,
    order.balance > 0 ? `Balance later: ${cedis(order.balance)}` : "",
    "",
    where,
    `Name: ${c.name}`,
    `Phone: ${c.phone}`,
    c.email ? `Email: ${c.email}` : "",
    c.notes ? `Notes: ${c.notes}` : "",
  ]
    .filter((line, i, all) => line !== "" || all[i - 1] !== "")
    .join("\n");
}
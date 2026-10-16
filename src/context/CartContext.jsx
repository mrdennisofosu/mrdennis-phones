import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { findProduct, getPrice, maxQty } from "../lib/products";
import { RESERVATION_DEPOSIT_PERCENT } from "../shopConfig";

const CartContext = createContext(null);
const STORAGE_KEY = "mdp-cart";

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return {
      items: Array.isArray(saved?.items) ? saved.items : [],
      payOption: saved?.payOption === "deposit" ? "deposit" : "full",
    };
  } catch {
    return { items: [], payOption: "full" };
  }
}

export function CartProvider({ children }) {
  const [state, setState] = useState(load);

  // Keep the cart when the visitor refreshes or comes back later
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage not available */
    }
  }, [state]);

  const add = (kind, id, qty = 1) => {
    const item = findProduct(kind, id);
    if (!item) return;
    const limit = maxQty(kind, item);

    setState((prev) => {
      const existing = prev.items.find((i) => i.kind === kind && i.id === id);
      const nextQty = Math.min((existing?.qty || 0) + qty, limit);
      if (nextQty <= 0) return prev;
      const items = existing
        ? prev.items.map((i) => (i === existing ? { ...i, qty: nextQty } : i))
        : [...prev.items, { kind, id, qty: nextQty }];
      return { ...prev, items };
    });
  };

  const setQty = (kind, id, qty) => {
    const item = findProduct(kind, id);
    if (!item) return;
    const next = Math.max(1, Math.min(qty, maxQty(kind, item)));
    setState((prev) => ({
      ...prev,
      items: prev.items.map((i) =>
        i.kind === kind && i.id === id ? { ...i, qty: next } : i,
      ),
    }));
  };

  const remove = (kind, id) =>
    setState((prev) => ({
      ...prev,
      items: prev.items.filter((i) => !(i.kind === kind && i.id === id)),
    }));

  const clear = () => setState({ items: [], payOption: "full" });

  const setPayOption = (payOption) =>
    setState((prev) => ({ ...prev, payOption }));

  // Each cart line with its live price and stock check
  const lines = useMemo(
    () =>
      state.items
        .map((entry) => {
          const item = findProduct(entry.kind, entry.id);
          if (!item) return null;
          const { price, original, deal } = getPrice(entry.kind, item);
          const limit = maxQty(entry.kind, item);
          return {
            ...entry,
            item,
            price,
            original,
            deal,
            limit,
            total: price * entry.qty,
            problem:
              limit < 1
                ? "Not available right now"
                : entry.qty > limit
                  ? `Only ${limit} available`
                  : "",
          };
        })
        .filter(Boolean),
    [state.items],
  );

  const subtotal = lines.reduce((sum, l) => sum + l.total, 0);
  const count = lines.reduce((sum, l) => sum + l.qty, 0);
  const deposit = Math.round((subtotal * RESERVATION_DEPOSIT_PERCENT) / 100);

  const value = {
    lines,
    count,
    subtotal,
    deposit,
    payOption: state.payOption,
    hasProblem: lines.some((l) => l.problem),
    add,
    setQty,
    remove,
    clear,
    setPayOption,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}

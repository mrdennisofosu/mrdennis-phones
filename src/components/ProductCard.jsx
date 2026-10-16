import { useState } from "react";
import { useCart } from "../context/CartContext";
import { getAvailable, getStatus, hasCount } from "../lib/stock";
import { cedis, describe, getPrice, maxQty } from "../lib/products";

function ProductCard({ kind, item, onOpen }) {
  const { add, lines } = useCart();
  const [added, setAdded] = useState(false);

  const info = describe(kind, item);
  const status = getStatus(item);
  const { price, original } = getPrice(kind, item);
  const limit = maxQty(kind, item);
  const inCart =
    lines.find((l) => l.kind === kind && l.id === item.id)?.qty || 0;
  const atLimit = limit > 0 && inCart >= limit;
  const compact = kind === "accessory";

  const handleAdd = (e) => {
    e.stopPropagation();
    add(kind, item.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const label =
    limit < 1
      ? "Unavailable"
      : atLimit
        ? "Max in cart"
        : added
          ? "Added ✓"
          : "Add to Cart";

  return (
    <article
      onClick={() => onOpen(item)}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-md transition duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10"
    >
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 ${
          compact ? "aspect-square" : "h-72"
        }`}
      >
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
          />
        ) : (
          <span
            className="text-6xl transition duration-500 group-hover:scale-110"
            aria-hidden="true"
          >
            {info.icon}
          </span>
        )}

        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
            info.badge === "Brand New"
              ? "bg-blue-500 text-white"
              : "bg-slate-900 text-white"
          }`}
        >
          {info.badge}
        </span>
        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-bold ${status.tone}`}
        >
          {status.label}
        </span>
        <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 shadow">
          View details
        </span>
      </div>

      <div className={`flex flex-1 flex-col ${compact ? "p-4" : "p-5"}`}>
        <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
          {info.label}
        </p>
        <h3 className="mt-1 text-lg font-bold leading-snug text-slate-900">
          {info.title}
        </h3>
        {info.sub && (
          <p className="text-sm font-medium text-slate-700">{info.sub}</p>
        )}

        <div className="mt-3 flex flex-wrap items-baseline gap-2">
          <p className="text-xl font-extrabold text-slate-900">
            {cedis(price)}
          </p>
          {original && (
            <p className="text-sm font-semibold text-slate-500 line-through">
              {cedis(original)}
            </p>
          )}
        </div>
        {hasCount(item) && getAvailable(item) > 0 && (
          <p className="mt-1 text-xs font-bold text-slate-600">
            {getAvailable(item)} available
          </p>
        )}

        <div className="mt-auto pt-4">
          <button
            type="button"
            onClick={handleAdd}
            disabled={limit < 1 || atLimit}
            className="block w-full rounded-lg bg-slate-900 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
          >
            {label}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;

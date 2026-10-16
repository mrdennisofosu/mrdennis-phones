import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { whatsappLink } from "../config";
import { getAvailable, getStatus, hasCount } from "../lib/stock";
import { cedis, describe, getPrice, maxQty } from "../lib/products";
import { RESERVATION_DEPOSIT_PERCENT } from "../shopConfig";

function ProductModal({ kind, item, onClose }) {
  const navigate = useNavigate();
  const { add, setPayOption } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  // Close on Esc, and stop the page behind from scrolling while open
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  const info = describe(kind, item);
  const status = getStatus(item);
  const { price, original, deal } = getPrice(kind, item);
  const limit = maxQty(kind, item);
  const canBuy = limit > 0;
  const deposit = Math.round((price * RESERVATION_DEPOSIT_PERCENT) / 100);
  const suffix = info.sub ? ` (${info.sub})` : "";
  const buyMessage = `Hello, I want to buy the ${item.name}${suffix} listed at ${cedis(price)}.`;
  const askMessage = `Hello, I have a question about the ${item.name}${suffix}.`;

  const details = [
    { label: kind === "phone" ? "Brand" : "Category", value: info.label },
    info.sub && {
      label: kind === "phone" ? "Storage" : "Works with",
      value: info.sub,
    },
    kind === "phone" && { label: "Condition", value: item.condition },
    { label: "Status", value: status.label },
    hasCount(item) && { label: "Available", value: String(getAvailable(item)) },
    item.color && { label: "Colour", value: item.color },
    item.battery && { label: "Battery health", value: item.battery },
  ].filter(Boolean);

  const handleAdd = () => {
    add(kind, item.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleReserve = () => {
    add(kind, item.id, 1);
    setPayOption("deposit");
    onClose();
    navigate("/checkout");
  };

  return (
    <div
      className="animate-fade-in fixed inset-0 z-[100] flex items-end justify-center bg-slate-900/60 backdrop-blur-sm sm:items-center sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${item.name} details`}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="animate-modal-in relative grid max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl md:grid-cols-2"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl text-slate-900 shadow-md ring-1 ring-slate-200 transition hover:bg-slate-900 hover:text-white"
        >
          ✕
        </button>

        {/* Big picture */}
        <div className="relative flex min-h-[18rem] items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="max-h-[60vh] w-full object-contain object-center p-3 md:max-h-[80vh]"
            />
          ) : (
            <span className="text-8xl" aria-hidden="true">
              {info.icon}
            </span>
          )}
          <span
            className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold ${status.tone}`}
          >
            {status.label}
          </span>
        </div>

        {/* Details */}
        <div className="flex flex-col p-6 md:p-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
            {info.label}
          </p>
          <h2 className="mt-1 text-2xl font-extrabold text-slate-900 md:text-3xl">
            {item.name}
          </h2>

          <div className="mt-3 flex flex-wrap items-baseline gap-3">
            <p className="text-3xl font-extrabold text-slate-900">
              {cedis(price)}
            </p>
            {original && (
              <p className="text-lg font-semibold text-slate-500 line-through">
                {cedis(original)}
              </p>
            )}
          </div>
          {deal && (
            <p className="mt-1 text-sm font-bold text-blue-600">
              Deal price until{" "}
              {new Date(deal.endsAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
              })}
            </p>
          )}

          <dl className="mt-5 grid grid-cols-2 gap-3">
            {details.map((d) => (
              <div
                key={d.label}
                className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200"
              >
                <dt className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                  {d.label}
                </dt>
                <dd className="mt-1 font-bold text-slate-900">{d.value}</dd>
              </div>
            ))}
          </dl>

          {item.description && (
            <p className="mt-4 font-medium leading-relaxed text-slate-700">
              {item.description}
            </p>
          )}

          {/* Actions */}
          <div className="mt-auto flex flex-col gap-3 pt-6">
            {canBuy ? (
              <>
                <div className="flex gap-3">
                  <div className="flex items-center rounded-lg border border-slate-300">
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.max(1, q - 1))}
                      aria-label="Fewer"
                      className="h-12 w-10 text-xl font-bold text-slate-700 hover:text-blue-600"
                    >
                      −
                    </button>
                    <span className="w-8 text-center font-extrabold text-slate-900">
                      {qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQty((q) => Math.min(limit, q + 1))}
                      aria-label="More"
                      className="h-12 w-10 text-xl font-bold text-slate-700 hover:text-blue-600"
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={handleAdd}
                    className="flex-1 rounded-lg bg-blue-500 py-3 font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-600"
                  >
                    {added ? "Added ✓" : "Add to Cart"}
                  </button>
                </div>

                {kind === "phone" && (
                  <button
                    type="button"
                    onClick={handleReserve}
                    className="rounded-lg bg-slate-900 py-3 font-semibold text-white transition hover:bg-black"
                  >
                    Reserve This Device ({RESERVATION_DEPOSIT_PERCENT}% deposit:{" "}
                    {cedis(deposit)})
                  </button>
                )}
              </>
            ) : (
              <p className="rounded-lg bg-slate-100 py-3 text-center font-semibold text-slate-600">
                {status.key === "reserved"
                  ? "This device is reserved"
                  : "Currently unavailable"}
              </p>
            )}

            <div className="grid grid-cols-2 gap-3">
              {canBuy && (
                <a
                  href={whatsappLink(buyMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg bg-white py-2.5 text-center text-sm font-semibold text-slate-900 ring-1 ring-slate-300 transition hover:ring-blue-400"
                >
                  Order on WhatsApp
                </a>
              )}
              <a
                href={whatsappLink(askMessage)}
                target="_blank"
                rel="noreferrer"
                className={`rounded-lg bg-white py-2.5 text-center text-sm font-semibold text-slate-900 ring-1 ring-slate-300 transition hover:ring-blue-400 ${
                  canBuy ? "" : "col-span-2"
                }`}
              >
                {canBuy ? "Chat with us" : "Ask about availability"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductModal;

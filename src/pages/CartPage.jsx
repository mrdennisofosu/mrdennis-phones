import { Link, useNavigate } from "react-router-dom";
import Reveal from "../components/Reveal";
import { useCart } from "../context/CartContext";
import { cedis, describe } from "../lib/products";
import { RESERVATION_DEPOSIT_PERCENT } from "../shopConfig";

function CartPage() {
  const navigate = useNavigate();
  const { lines, count, subtotal, deposit, setQty, remove, clear, hasProblem } =
    useCart();

  return (
    <div className="min-h-[70vh] bg-[#e9eff7]">
      <section className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Your cart
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-slate-900 md:text-4xl">
            Shopping cart
          </h1>
        </Reveal>

        {lines.length === 0 ? (
          <Reveal delay={100}>
            <div className="mt-8 rounded-3xl border border-slate-300 bg-white p-10 text-center shadow-md">
              <p className="text-5xl">🛒</p>
              <p className="mt-3 text-xl font-extrabold text-slate-900">
                Your cart is empty
              </p>
              <p className="mt-1 font-medium text-slate-700">
                Add a phone or an accessory to get started.
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  to="/phones"
                  className="rounded-lg bg-blue-500 px-7 py-3 font-semibold text-white transition hover:bg-blue-600"
                >
                  Browse Phones
                </Link>
                <Link
                  to="/accessories"
                  className="rounded-lg bg-white px-7 py-3 font-semibold text-slate-900 ring-1 ring-slate-300 transition hover:ring-blue-400"
                >
                  Browse Accessories
                </Link>
              </div>
            </div>
          </Reveal>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
            <div className="space-y-4">
              {lines.map((line) => {
                const info = describe(line.kind, line.item);
                return (
                  <div
                    key={`${line.kind}-${line.id}`}
                    className="flex gap-4 rounded-2xl border border-slate-300 bg-white p-4 shadow-sm"
                  >
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 sm:h-28 sm:w-28">
                      {line.item.image ? (
                        <img
                          src={line.item.image}
                          alt={line.item.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-4xl" aria-hidden="true">
                          {info.icon}
                        </span>
                      )}
                    </div>

                    <div className="flex min-w-0 flex-1 flex-col">
                      <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                        {info.label}
                      </p>
                      <h2 className="font-bold text-slate-900">{info.title}</h2>
                      {info.sub && (
                        <p className="text-sm font-medium text-slate-700">
                          {info.sub}
                        </p>
                      )}
                      <div className="mt-1 flex items-baseline gap-2">
                        <p className="font-extrabold text-slate-900">
                          {cedis(line.price)}
                        </p>
                        {line.original && (
                          <p className="text-sm font-semibold text-slate-500 line-through">
                            {cedis(line.original)}
                          </p>
                        )}
                      </div>
                      {line.problem && (
                        <p className="mt-1 text-sm font-bold text-amber-700">
                          {line.problem}
                        </p>
                      )}

                      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-3">
                        <div className="flex items-center rounded-lg border border-slate-300">
                          <button
                            type="button"
                            onClick={() =>
                              setQty(line.kind, line.id, line.qty - 1)
                            }
                            disabled={line.qty <= 1}
                            aria-label="Fewer"
                            className="h-9 w-9 text-lg font-bold text-slate-700 hover:text-blue-600 disabled:text-slate-300"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-extrabold">
                            {line.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              setQty(line.kind, line.id, line.qty + 1)
                            }
                            disabled={line.qty >= line.limit}
                            aria-label="More"
                            className="h-9 w-9 text-lg font-bold text-slate-700 hover:text-blue-600 disabled:text-slate-300"
                          >
                            +
                          </button>
                        </div>
                        <p className="font-extrabold text-slate-900">
                          {cedis(line.total)}
                        </p>
                        <button
                          type="button"
                          onClick={() => remove(line.kind, line.id)}
                          className="text-sm font-bold text-slate-600 underline transition hover:text-blue-600"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              <button
                type="button"
                onClick={clear}
                className="text-sm font-bold text-slate-600 underline transition hover:text-blue-600"
              >
                Clear cart
              </button>
            </div>

            {/* Summary */}
            <aside className="h-fit rounded-2xl border border-slate-300 bg-white p-6 shadow-md lg:sticky lg:top-24">
              <h2 className="text-xl font-extrabold text-slate-900">
                Order summary
              </h2>
              <div className="mt-4 flex justify-between font-medium text-slate-700">
                <span>Items ({count})</span>
                <span className="font-extrabold text-slate-900">
                  {cedis(subtotal)}
                </span>
              </div>
              <p className="mt-2 text-sm font-medium text-slate-600">
                Any delivery fee is added at checkout.
              </p>

              <div className="mt-4 rounded-xl bg-blue-50 p-3 text-sm font-medium text-slate-700 ring-1 ring-blue-100">
                Prefer to reserve? At checkout you can pay a{" "}
                {RESERVATION_DEPOSIT_PERCENT}% deposit ({cedis(deposit)}) now
                instead of the full amount.
              </div>

              <button
                type="button"
                onClick={() => navigate("/checkout")}
                disabled={hasProblem}
                className="mt-5 w-full rounded-lg bg-blue-500 py-3 font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
              >
                Proceed to Checkout
              </button>
              {hasProblem && (
                <p className="mt-2 text-sm font-bold text-amber-700">
                  Fix the items marked above to continue.
                </p>
              )}

              <p className="mt-4 text-center text-sm font-medium text-slate-600">
                Already ordered?{" "}
                <Link to="/track" className="font-bold text-blue-600 underline">
                  Track an order
                </Link>
              </p>
            </aside>
          </div>
        )}
      </section>
    </div>
  );
}

export default CartPage;

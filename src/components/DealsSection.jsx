import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Reveal from "./Reveal";
import { SectionHeading } from "./PageParts";
import { deals } from "../data/deals";
import { useCart } from "../context/CartContext";
import { cedis, describe, findProduct } from "../lib/products";
import { getAvailable } from "../lib/stock";
import { RESERVATION_DEPOSIT_PERCENT } from "../shopConfig";

function useNow() {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);
  return now;
}

function Countdown({ endsAt, now }) {
  const diff = Math.max(0, new Date(endsAt).getTime() - now);
  const parts = [
    ["days", Math.floor(diff / 86400000)],
    ["hrs", Math.floor(diff / 3600000) % 24],
    ["min", Math.floor(diff / 60000) % 60],
    ["sec", Math.floor(diff / 1000) % 60],
  ];

  return (
    <div className="flex gap-2" aria-label="Time left">
      {parts.map(([label, value]) => (
        <div
          key={label}
          className="min-w-12 rounded-lg bg-slate-900 px-2 py-1.5 text-center text-white"
        >
          <p className="text-lg font-extrabold leading-none">
            {String(value).padStart(2, "0")}
          </p>
          <p className="text-[10px] font-semibold uppercase text-slate-300">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}

function DealsSection() {
  const now = useNow();
  const navigate = useNavigate();
  const { add, setPayOption } = useCart();
  const [justAdded, setJustAdded] = useState(null);

  const active = deals
    .map((deal) => ({ deal, item: findProduct(deal.kind, deal.productId) }))
    .filter(
      ({ deal, item }) =>
        item &&
        deal.promoPrice < item.price &&
        deal.quantity > 0 &&
        getAvailable(item) > 0 &&
        new Date(deal.endsAt).getTime() > now,
    );

  if (active.length === 0) return null;

  const handleAdd = (deal) => {
    add(deal.kind, deal.productId, 1);
    setJustAdded(deal.id);
    setTimeout(() => setJustAdded(null), 1500);
  };

  const handleReserve = (deal) => {
    add(deal.kind, deal.productId, 1);
    setPayOption("deposit");
    navigate("/checkout");
  };

  return (
    <section id="deals" className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Deals of the Week"
          title="This week's best prices"
          text="Limited quantities. When the timer ends, the deal ends."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {active.map(({ deal, item }, i) => {
            const info = describe(deal.kind, item);
            const left = Math.min(getAvailable(item), deal.quantity);
            const off = Math.round((1 - deal.promoPrice / item.price) * 100);

            return (
              <Reveal key={deal.id} delay={(i % 3) * 120} className="h-full">
                <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-md transition duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10">
                  <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-6xl" aria-hidden="true">
                        {info.icon}
                      </span>
                    )}
                    <span className="absolute left-3 top-3 rounded-full bg-blue-500 px-3 py-1 text-sm font-extrabold text-white shadow">
                      -{off}%
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                      {info.label}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-slate-900">
                      {item.name}
                    </h3>
                    {info.sub && (
                      <p className="text-sm font-medium text-slate-700">
                        {info.sub}
                      </p>
                    )}

                    <div className="mt-3 flex flex-wrap items-baseline gap-2">
                      <p className="text-2xl font-extrabold text-slate-900">
                        {cedis(deal.promoPrice)}
                      </p>
                      <p className="text-sm font-semibold text-slate-500 line-through">
                        {cedis(item.price)}
                      </p>
                    </div>
                    <p className="mt-1 text-sm font-bold text-blue-600">
                      Only {left} left at this price
                    </p>

                    <div className="mt-4">
                      {deal.showCountdown ? (
                        <Countdown endsAt={deal.endsAt} now={now} />
                      ) : (
                        <p className="text-sm font-semibold text-slate-600">
                          Ends{" "}
                          {new Date(deal.endsAt).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                          })}
                        </p>
                      )}
                    </div>

                    <div className="mt-auto flex flex-col gap-2 pt-5">
                      <button
                        type="button"
                        onClick={() => handleAdd(deal)}
                        className="rounded-lg bg-blue-500 py-2.5 font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-600"
                      >
                        {justAdded === deal.id ? "Added ✓" : "Add to Cart"}
                      </button>
                      {deal.kind === "phone" && (
                        <button
                          type="button"
                          onClick={() => handleReserve(deal)}
                          className="rounded-lg bg-slate-900 py-2.5 text-sm font-semibold text-white transition hover:bg-black"
                        >
                          Reserve ({RESERVATION_DEPOSIT_PERCENT}% deposit:{" "}
                          {cedis(
                            Math.round(
                              (deal.promoPrice * RESERVATION_DEPOSIT_PERCENT) /
                                100,
                            ),
                          )}
                          )
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default DealsSection;

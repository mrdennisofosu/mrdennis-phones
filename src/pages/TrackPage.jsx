import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { whatsappLink } from "../config";
import { loadOrders } from "../lib/orders";
import { cedis } from "../lib/products";

const STAGES = [
  "Order sent to shop",
  "Payment confirmed",
  "Ready for pickup or delivery",
  "Completed",
];

function TrackPage() {
  const [params] = useSearchParams();
  const [ref, setRef] = useState(params.get("ref") || "");
  const orders = loadOrders();

  const search = ref.trim().toUpperCase();
  const found = orders.find((o) => o.ref === search);

  return (
    <div className="min-h-[70vh] bg-[#e9eff7]">
      <section className="mx-auto max-w-3xl px-4 py-12 md:py-16">
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
          Track an order
        </p>
        <h1 className="mt-2 text-3xl font-extrabold text-slate-900 md:text-4xl">
          Where is my order?
        </h1>
        <p className="mt-2 font-medium text-slate-700">
          Enter your reference number, for example MDP-261015-AB12.
        </p>

        <input
          value={ref}
          onChange={(e) => setRef(e.target.value)}
          placeholder="Reference number"
          aria-label="Reference number"
          className="mt-5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 font-bold uppercase tracking-wide text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />

        {found && (
          <div className="mt-6 rounded-2xl border border-slate-300 bg-white p-6 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xl font-extrabold text-blue-700">
                {found.ref}
              </p>
              <p className="text-sm font-semibold text-slate-600">
                {new Date(found.createdAt).toLocaleString("en-GB")}
              </p>
            </div>

            <ul className="mt-4 space-y-1 text-sm font-medium text-slate-700">
              {found.lines.map((l, i) => (
                <li key={i}>
                  {l.name} × {l.qty}
                  {l.units.length > 0 && ` (device ${l.units.join(", ")})`}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm font-medium text-slate-700">
              {found.payOption === "deposit"
                ? "Reservation deposit"
                : "Full payment"}
              : <b className="text-slate-900">{cedis(found.payNow)}</b>
              {found.balance > 0 && (
                <>
                  {" "}
                  · Balance later:{" "}
                  <b className="text-slate-900">{cedis(found.balance)}</b>
                </>
              )}
            </p>

            <ol className="mt-5 space-y-3">
              {STAGES.map((stage, i) => (
                <li key={stage} className="flex items-center gap-3">
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold ${
                      i === 0
                        ? "bg-blue-500 text-white"
                        : "bg-slate-200 text-slate-500"
                    }`}
                  >
                    {i === 0 ? "✓" : i + 1}
                  </span>
                  <span
                    className={`font-semibold ${
                      i === 0 ? "text-slate-900" : "text-slate-500"
                    }`}
                  >
                    {stage}
                  </span>
                </li>
              ))}
            </ol>

            <p className="mt-4 rounded-xl bg-blue-50 p-3 text-sm font-medium text-slate-700 ring-1 ring-blue-100">
              This page does not update by itself yet. We confirm each step with
              you on WhatsApp.
            </p>

            <a
              href={whatsappLink(
                `Hello, I would like an update on my order ${found.ref}.`,
              )}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
            >
              Ask for an update on WhatsApp
            </a>
          </div>
        )}

        {!found && search && (
          <div className="mt-6 rounded-2xl border border-slate-300 bg-white p-6 shadow-md">
            <p className="font-extrabold text-slate-900">
              We could not find that reference on this device
            </p>
            <p className="mt-1 text-sm font-medium text-slate-700">
              Orders are saved on the phone or computer that placed them.
              Message us with your reference and we will check.
            </p>
            <a
              href={whatsappLink(
                `Hello, I would like an update on my order ${search}.`,
              )}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
            >
              Ask on WhatsApp
            </a>
          </div>
        )}

        {!search && orders.length > 0 && (
          <div className="mt-8">
            <p className="font-extrabold text-slate-900">
              Orders on this device
            </p>
            <div className="mt-3 space-y-2">
              {orders.map((o) => (
                <button
                  key={o.ref}
                  type="button"
                  onClick={() => setRef(o.ref)}
                  className="flex w-full items-center justify-between rounded-xl border border-slate-300 bg-white px-4 py-3 text-left transition hover:border-blue-300"
                >
                  <span className="font-bold text-blue-700">{o.ref}</span>
                  <span className="text-sm font-semibold text-slate-600">
                    {new Date(o.createdAt).toLocaleDateString("en-GB")}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        <Link
          to="/"
          className="mt-8 inline-block text-sm font-bold text-slate-600 underline hover:text-blue-600"
        >
          Back to home
        </Link>
      </section>
    </div>
  );
}

export default TrackPage;

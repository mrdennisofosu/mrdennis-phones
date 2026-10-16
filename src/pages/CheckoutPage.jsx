import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { whatsappLink } from "../config";
import { cedis, describe } from "../lib/products";
import { pickUnits } from "../lib/stock";
import { buildOrderMessage, makeReference, saveOrder } from "../lib/orders";
import {
  DELIVERY_FEE,
  DELIVERY_NOTE,
  PICKUP_ADDRESS,
  PICKUP_HOURS,
  PICKUP_NOTE,
  RESERVATION_DEPOSIT_PERCENT,
  RESERVATION_TERMS,
} from "../shopConfig";

const inputClass =
  "mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 font-medium text-slate-900 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200";

function Field({ label, error, children }) {
  return (
    <label className="block text-sm font-bold text-slate-800">
      {label}
      {children}
      {error && (
        <span className="mt-1 block text-sm font-bold text-red-600">
          {error}
        </span>
      )}
    </label>
  );
}

function CheckoutPage() {
  const {
    lines,
    subtotal,
    deposit,
    payOption,
    setPayOption,
    clear,
    hasProblem,
  } = useCart();

  const [method, setMethod] = useState("delivery");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    area: "",
    address: "",
    landmark: "",
    notes: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState({});
  const [placed, setPlaced] = useState(null);

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const isDeposit = payOption === "deposit";
  const fee = method === "delivery" && DELIVERY_FEE !== null ? DELIVERY_FEE : 0;
  const payNow = isDeposit ? deposit : subtotal + fee;
  const balance = isDeposit ? subtotal - deposit + fee : 0;

  const validate = () => {
    const found = {};
    if (!form.name.trim()) found.name = "Please enter your name.";
    if (form.phone.replace(/\D/g, "").length < 9)
      found.phone = "Please enter a valid phone number.";
    if (method === "delivery") {
      if (!form.area.trim()) found.area = "Please enter your area or town.";
      if (!form.address.trim()) found.address = "Please enter your address.";
    }
    if (isDeposit && RESERVATION_TERMS.length > 0 && !agreed)
      found.agreed = "Please accept the reservation terms.";
    return found;
  };

  const submit = (e) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0 || lines.length === 0 || hasProblem)
      return;

    const order = {
      ref: makeReference(),
      createdAt: new Date().toISOString(),
      status: "Sent to shop",
      payOption,
      depositPercent: RESERVATION_DEPOSIT_PERCENT,
      method,
      customer: { ...form },
      lines: lines.map((l) => {
        const info = describe(l.kind, l.item);
        return {
          name: l.item.name,
          sub: info.sub,
          qty: l.qty,
          price: l.price,
          units: pickUnits(l.item, l.qty),
        };
      }),
      subtotal,
      deliveryFee: method === "delivery" ? DELIVERY_FEE : 0,
      payNow,
      balance,
    };

    saveOrder(order);
    window.open(whatsappLink(buildOrderMessage(order)), "_blank");
    setPlaced(order);
    clear();
  };

  /* ---------- After the order is placed ---------- */
  if (placed) {
    return (
      <div className="min-h-[70vh] bg-[#e9eff7] px-4 py-12 md:py-16">
        <div className="mx-auto max-w-xl rounded-3xl border border-blue-200 bg-white p-8 text-center shadow-lg shadow-blue-500/10">
          <p className="text-5xl">✅</p>
          <h1 className="mt-3 text-3xl font-extrabold text-slate-900">
            Almost done: send your order
          </h1>
          <p className="mt-3 font-medium text-slate-700">
            WhatsApp should have opened with your order. Press <b>Send</b> in
            WhatsApp so it reaches us. We will then confirm your order and tell
            you how to pay.
          </p>
          <p className="mt-5 text-sm font-semibold text-slate-600">
            Your reference
          </p>
          <p className="mt-1 inline-block rounded-xl bg-blue-50 px-5 py-2 text-2xl font-extrabold tracking-widest text-blue-700">
            {placed.ref}
          </p>
          <p className="mt-4 font-medium text-slate-700">
            Amount to pay now once confirmed:{" "}
            <b className="text-slate-900">{cedis(placed.payNow)}</b>
            {placed.balance > 0 && (
              <>
                <br />
                Balance later:{" "}
                <b className="text-slate-900">{cedis(placed.balance)}</b>
              </>
            )}
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <a
              href={whatsappLink(buildOrderMessage(placed))}
              target="_blank"
              rel="noreferrer"
              className="rounded-lg bg-blue-500 py-3 font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-600"
            >
              Open WhatsApp again
            </a>
            <Link
              to={`/track?ref=${placed.ref}`}
              className="rounded-lg bg-white py-3 font-semibold text-slate-900 ring-1 ring-slate-300 transition hover:ring-blue-400"
            >
              Track this order
            </Link>
            <Link
              to="/"
              className="text-sm font-bold text-slate-600 underline hover:text-blue-600"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ---------- Empty cart ---------- */
  if (lines.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#e9eff7] px-4 py-16 text-center">
        <p className="text-5xl">🛒</p>
        <p className="mt-3 text-xl font-extrabold text-slate-900">
          Your cart is empty
        </p>
        <Link
          to="/phones"
          className="mt-6 inline-block rounded-lg bg-blue-500 px-7 py-3 font-semibold text-white transition hover:bg-blue-600"
        >
          Browse Phones
        </Link>
      </div>
    );
  }

  /* ---------- The checkout form ---------- */
  return (
    <div className="bg-[#e9eff7]">
      <form
        onSubmit={submit}
        noValidate
        className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:py-16 lg:grid-cols-[1fr_22rem]"
      >
        <div className="space-y-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              Checkout
            </p>
            <h1 className="mt-2 text-3xl font-extrabold text-slate-900 md:text-4xl">
              Finish your order
            </h1>
          </div>

          {/* Payment option */}
          <section className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-extrabold text-slate-900">
              1. How do you want to pay?
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                {
                  value: "full",
                  title: "Pay in full",
                  text: `Pay ${cedis(subtotal + fee)} now.`,
                },
                {
                  value: "deposit",
                  title: "Reserve with a deposit",
                  text: `Pay ${RESERVATION_DEPOSIT_PERCENT}% (${cedis(
                    deposit,
                  )}) now. Balance ${cedis(subtotal - deposit + fee)} later.`,
                },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setPayOption(option.value)}
                  className={`rounded-xl border-2 p-4 text-left transition ${
                    payOption === option.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-300 bg-white hover:border-blue-300"
                  }`}
                >
                  <p className="font-extrabold text-slate-900">
                    {option.title}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {option.text}
                  </p>
                </button>
              ))}
            </div>

            {isDeposit && (
              <div className="mt-4 rounded-xl bg-slate-50 p-4 ring-1 ring-slate-200">
                <p className="text-sm font-extrabold text-slate-900">
                  Reservation terms
                </p>
                {RESERVATION_TERMS.length > 0 ? (
                  <>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-sm font-medium text-slate-700">
                      {RESERVATION_TERMS.map((term) => (
                        <li key={term}>{term}</li>
                      ))}
                    </ul>
                    <label className="mt-3 flex items-start gap-2 text-sm font-bold text-slate-800">
                      <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-1"
                      />
                      I have read and accept the reservation terms.
                    </label>
                    {errors.agreed && (
                      <p className="mt-1 text-sm font-bold text-red-600">
                        {errors.agreed}
                      </p>
                    )}
                  </>
                ) : (
                  <p className="mt-1 text-sm font-medium text-slate-700">
                    Please ask us for the reservation terms on WhatsApp before
                    you pay.
                  </p>
                )}
              </div>
            )}
          </section>

          {/* Delivery or pickup */}
          <section className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-extrabold text-slate-900">
              2. Delivery or pickup
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {[
                { value: "delivery", title: "🚚 Delivery" },
                { value: "pickup", title: "🏪 Shop pickup" },
              ].map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setMethod(option.value)}
                  className={`rounded-xl border-2 p-4 text-left font-extrabold text-slate-900 transition ${
                    method === option.value
                      ? "border-blue-500 bg-blue-50"
                      : "border-slate-300 bg-white hover:border-blue-300"
                  }`}
                >
                  {option.title}
                </button>
              ))}
            </div>

            {method === "delivery" ? (
              <div className="mt-4 space-y-4">
                <p className="rounded-xl bg-blue-50 p-3 text-sm font-bold text-slate-800 ring-1 ring-blue-100">
                  Delivery fee:{" "}
                  {DELIVERY_FEE !== null ? cedis(DELIVERY_FEE) : DELIVERY_NOTE}
                </p>
                <Field label="Area or town" error={errors.area}>
                  <input
                    value={form.area}
                    onChange={update("area")}
                    className={inputClass}
                    placeholder="For example, East Legon"
                  />
                </Field>
                <Field
                  label="Street, house number or address"
                  error={errors.address}
                >
                  <input
                    value={form.address}
                    onChange={update("address")}
                    className={inputClass}
                  />
                </Field>
                <Field label="Landmark (optional)">
                  <input
                    value={form.landmark}
                    onChange={update("landmark")}
                    className={inputClass}
                  />
                </Field>
              </div>
            ) : (
              <div className="mt-4 rounded-xl bg-blue-50 p-4 text-sm font-medium text-slate-800 ring-1 ring-blue-100">
                {PICKUP_ADDRESS && (
                  <p>
                    <b>Address:</b> {PICKUP_ADDRESS}
                  </p>
                )}
                {PICKUP_HOURS && (
                  <p>
                    <b>Hours:</b> {PICKUP_HOURS}
                  </p>
                )}
                <p className={PICKUP_ADDRESS || PICKUP_HOURS ? "mt-1" : ""}>
                  {PICKUP_NOTE}
                </p>
              </div>
            )}
          </section>

          {/* Customer details */}
          <section className="rounded-2xl border border-slate-300 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-extrabold text-slate-900">
              3. Your details
            </h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" error={errors.name}>
                <input
                  value={form.name}
                  onChange={update("name")}
                  className={inputClass}
                  autoComplete="name"
                />
              </Field>
              <Field label="Phone number" error={errors.phone}>
                <input
                  value={form.phone}
                  onChange={update("phone")}
                  className={inputClass}
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="024 123 4567"
                />
              </Field>
              <div className="sm:col-span-2">
                <Field label="Email (optional)">
                  <input
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    className={inputClass}
                    autoComplete="email"
                  />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field label="Notes (optional)">
                  <textarea
                    value={form.notes}
                    onChange={update("notes")}
                    rows={3}
                    className={inputClass}
                  />
                </Field>
              </div>
            </div>
          </section>
        </div>

        {/* Summary */}
        <aside className="h-fit rounded-2xl border border-slate-300 bg-white p-6 shadow-md lg:sticky lg:top-24">
          <h2 className="text-xl font-extrabold text-slate-900">Your order</h2>
          <ul className="mt-4 space-y-2">
            {lines.map((l) => (
              <li
                key={`${l.kind}-${l.id}`}
                className="flex justify-between gap-3 text-sm font-medium text-slate-700"
              >
                <span>
                  {l.item.name} × {l.qty}
                </span>
                <span className="font-bold text-slate-900">
                  {cedis(l.total)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 space-y-1 border-t border-slate-200 pt-4 text-sm font-medium text-slate-700">
            <p className="flex justify-between">
              <span>Subtotal</span>
              <span className="font-bold text-slate-900">
                {cedis(subtotal)}
              </span>
            </p>
            {method === "delivery" && (
              <p className="flex justify-between">
                <span>Delivery</span>
                <span className="font-bold text-slate-900">
                  {DELIVERY_FEE !== null
                    ? cedis(DELIVERY_FEE)
                    : "To be confirmed"}
                </span>
              </p>
            )}
            <p className="flex justify-between pt-2 text-base">
              <span className="font-extrabold text-slate-900">Pay now</span>
              <span className="font-extrabold text-blue-600">
                {cedis(payNow)}
              </span>
            </p>
            {balance > 0 && (
              <p className="flex justify-between">
                <span>Balance later</span>
                <span className="font-bold text-slate-900">
                  {cedis(balance)}
                </span>
              </p>
            )}
          </div>

          <p className="mt-4 rounded-xl bg-slate-50 p-3 text-xs font-medium text-slate-700 ring-1 ring-slate-200">
            Online card and mobile money payment is not connected yet. When you
            place the order, it is sent to us on WhatsApp and we will confirm
            the payment details with you.
          </p>

          <button
            type="submit"
            disabled={hasProblem}
            className="mt-4 w-full rounded-lg bg-blue-500 py-3 font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
          >
            Place order on WhatsApp
          </button>
          <Link
            to="/cart"
            className="mt-3 block text-center text-sm font-bold text-slate-600 underline hover:text-blue-600"
          >
            Back to cart
          </Link>
        </aside>
      </form>
    </div>
  );
}

export default CheckoutPage;

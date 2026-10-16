// DEALS OF THE WEEK. These are SAMPLES: replace them with your real deals.
// kind: "phone" or "accessory"
// productId: the id of that item in phones.js or accessories.js
// promoPrice: the deal price. quantity: how many are available at that price.
// endsAt: when the deal ends. showCountdown: true shows a live timer.
export const deals = [
  {
    id: "deal-1",
    kind: "phone",
    productId: 1,
    promoPrice: 5900,
    quantity: 2,
    endsAt: "2026-12-31T23:59:00",
    showCountdown: true,
  },
  {
    id: "deal-2",
    kind: "phone",
    productId: 4,
    promoPrice: 6500,
    quantity: 1,
    endsAt: "2026-12-31T23:59:00",
    showCountdown: true,
  },
  {
    id: "deal-3",
    kind: "accessory",
    productId: 1,
    promoPrice: 120,
    quantity: 5,
    endsAt: "2026-12-31T23:59:00",
    showCountdown: false,
  },
];
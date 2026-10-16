// YOUR SHOP RULES. Items marked TODO are placeholders. Set them before going live.

// Items with this many units or fewer (but more than 0) show "Low Stock"
export const LOW_STOCK_THRESHOLD = 2;

// TODO: reservation deposit as a percentage of the price. 20 is ONLY a placeholder.
export const RESERVATION_DEPOSIT_PERCENT = 20;

// TODO: your real reservation rules, one line each (how long a reservation is
// held, cancellation, refunds). Leave empty until you decide. While it is empty,
// the checkout tells customers to ask you for the terms.
export const RESERVATION_TERMS = [];

// TODO: delivery fee in GH₵ (a number), or null if you agree the fee with each customer
export const DELIVERY_FEE = null;
export const DELIVERY_NOTE =
  "We confirm the delivery fee and time with you on WhatsApp.";

// TODO: shop pickup details
export const PICKUP_ADDRESS = "";
export const PICKUP_HOURS = "";
export const PICKUP_NOTE =
  "We will send you the pickup location and time on WhatsApp.";
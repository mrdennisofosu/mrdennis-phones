// import { whatsappLink } from "../config";

// function PhoneCard({ phone, onOpen }) {
//   const message = `Hello, I am interested in the ${phone.name} (${phone.storage}, ${phone.condition}) listed at GH₵ ${phone.price.toLocaleString()}.`;

//   return (
//     <article
//       onClick={() => onOpen(phone)}
//       className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-md transition duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10"
//     >
//       {/* Image area */}
//       <div className="relative flex h-72 items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
//         {phone.image ? (
//           <img
//             src={phone.image}
//             alt={phone.name}
//             className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
//           />
//         ) : (
//           <span
//             className="text-6xl transition duration-500 group-hover:scale-110"
//             aria-hidden="true"
//           >
//             📱
//           </span>
//         )}

//         <span
//           className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
//             phone.condition === "Brand New"
//               ? "bg-blue-500 text-white"
//               : "bg-slate-900 text-white"
//           }`}
//         >
//           {phone.condition}
//         </span>

//         {!phone.inStock && (
//           <span className="absolute right-3 top-3 rounded-full bg-slate-500 px-3 py-1 text-xs font-semibold text-white">
//             Sold out
//           </span>
//         )}

//         <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 shadow">
//           View details
//         </span>
//       </div>

//       {/* Details */}
//       <div className="flex flex-1 flex-col p-5">
//         <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
//           {phone.brand}
//         </p>
//         <h3 className="mt-1 text-lg font-bold text-slate-900">
//           <button
//             type="button"
//             className="text-left transition group-hover:text-blue-600 focus:outline-none focus-visible:underline"
//           >
//             {phone.name}
//           </button>
//         </h3>
//         <p className="text-sm font-medium text-slate-700">{phone.storage}</p>

//         <p className="mt-4 text-2xl font-extrabold text-slate-900">
//           GH₵ {phone.price.toLocaleString()}
//         </p>

//         <div className="mt-auto pt-5">
//           {phone.inStock ? (
//             <a
//               href={whatsappLink(message)}
//               target="_blank"
//               rel="noreferrer"
//               onClick={(e) => e.stopPropagation()}
//               className="block rounded-lg bg-slate-900 py-3 text-center font-semibold text-white transition hover:bg-blue-500"
//             >
//               Order on WhatsApp
//             </a>
//           ) : (
//             <div className="block rounded-lg bg-slate-100 py-3 text-center font-semibold text-slate-500">
//               Currently unavailable
//             </div>
//           )}
//         </div>
//       </div>
//     </article>
//   );
// }

// export default PhoneCard;

import ProductCard from "./ProductCard";

function PhoneCard({ phone, onOpen }) {
  return <ProductCard kind="phone" item={phone} onOpen={onOpen} />;
}

export default PhoneCard;

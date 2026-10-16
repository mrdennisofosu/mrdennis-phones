// import { whatsappLink } from "../config";
// import { categoryIcons } from "../data/accessories";

// function AccessoryCard({ item, onOpen }) {
//   const message = `Hello, I am interested in the ${item.name} listed at GH₵ ${item.price.toLocaleString()}.`;

//   return (
//     <article
//       onClick={() => onOpen(item)}
//       className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-md transition duration-300 hover:-translate-y-1.5 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10"
//     >
//       {/* Image area */}
//       <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">
//         {item.image ? (
//           <img
//             src={item.image}
//             alt={item.name}
//             className="h-full w-full object-cover object-center transition duration-500 group-hover:scale-105"
//           />
//         ) : (
//           <span
//             className="text-6xl transition duration-500 group-hover:scale-110"
//             aria-hidden="true"
//           >
//             {categoryIcons[item.category] || "🛍️"}
//           </span>
//         )}

//         <span className="absolute left-2 top-2 rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">
//           {item.category}
//         </span>

//         {!item.inStock && (
//           <span className="absolute right-2 top-2 rounded-full bg-slate-500 px-3 py-1 text-xs font-semibold text-white">
//             Sold out
//           </span>
//         )}

//         <span className="absolute bottom-2 right-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 shadow">
//           View details
//         </span>
//       </div>

//       {/* Details */}
//       <div className="flex flex-1 flex-col p-4">
//         <h3 className="font-bold leading-snug text-slate-900">
//           <button
//             type="button"
//             className="text-left transition group-hover:text-blue-600 focus:outline-none focus-visible:underline"
//           >
//             {item.name}
//           </button>
//         </h3>

//         <p className="mt-3 text-xl font-extrabold text-slate-900">
//           GH₵ {item.price.toLocaleString()}
//         </p>

//         <div className="mt-auto pt-4">
//           {item.inStock ? (
//             <a
//               href={whatsappLink(message)}
//               target="_blank"
//               rel="noreferrer"
//               onClick={(e) => e.stopPropagation()}
//               className="block rounded-lg bg-slate-900 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-500"
//             >
//               Order on WhatsApp
//             </a>
//           ) : (
//             <div className="block rounded-lg bg-slate-100 py-2.5 text-center text-sm font-semibold text-slate-500">
//               Currently unavailable
//             </div>
//           )}
//         </div>
//       </div>
//     </article>
//   );
// }

// export default AccessoryCard;

import ProductCard from "./ProductCard";

function AccessoryCard({ item, onOpen }) {
  return <ProductCard kind="accessory" item={item} onOpen={onOpen} />;
}

export default AccessoryCard;

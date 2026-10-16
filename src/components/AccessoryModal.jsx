// import { useEffect } from "react";
// import { whatsappLink } from "../config";
// import { categoryIcons } from "../data/accessories";

// function AccessoryModal({ item, onClose }) {
//   // Close on Esc, and stop the page behind from scrolling while open
//   useEffect(() => {
//     const onKey = (e) => {
//       if (e.key === "Escape") onClose();
//     };
//     document.addEventListener("keydown", onKey);
//     const previousOverflow = document.body.style.overflow;
//     document.body.style.overflow = "hidden";

//     return () => {
//       document.removeEventListener("keydown", onKey);
//       document.body.style.overflow = previousOverflow;
//     };
//   }, [onClose]);

//   const price = `GH₵ ${item.price.toLocaleString()}`;
//   const buyMessage = `Hello, I want to buy the ${item.name} listed at ${price}.`;
//   const askMessage = `Hello, I have a question about the ${item.name}.`;

//   const details = [
//     { label: "Category", value: item.category },
//     item.compatibility && { label: "Works with", value: item.compatibility },
//     { label: "Availability", value: item.inStock ? "In stock" : "Sold out" },
//   ].filter(Boolean);

//   return (
//     <div
//       className="animate-fade-in fixed inset-0 z-[100] flex items-end justify-center bg-slate-900/60 backdrop-blur-sm sm:items-center sm:p-6"
//       onClick={onClose}
//       role="dialog"
//       aria-modal="true"
//       aria-label={`${item.name} details`}
//     >
//       <div
//         onClick={(e) => e.stopPropagation()}
//         className="animate-modal-in relative grid max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl md:grid-cols-2"
//       >
//         {/* Close button */}
//         <button
//           type="button"
//           onClick={onClose}
//           aria-label="Close"
//           className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl text-slate-900 shadow-md ring-1 ring-slate-200 transition hover:bg-slate-900 hover:text-white"
//         >
//           ✕
//         </button>

//         {/* Big picture */}
//         <div className="relative flex min-h-[18rem] items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100">
//           {item.image ? (
//             <img
//               src={item.image}
//               alt={item.name}
//               className="max-h-[60vh] w-full object-contain object-center p-3 md:max-h-[80vh]"
//             />
//           ) : (
//             <span className="text-8xl" aria-hidden="true">
//               {categoryIcons[item.category] || "🛍️"}
//             </span>
//           )}
//         </div>

//         {/* Details */}
//         <div className="flex flex-col p-6 md:p-8">
//           <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
//             {item.category}
//           </p>
//           <h2 className="mt-1 text-2xl font-extrabold text-slate-900 md:text-3xl">
//             {item.name}
//           </h2>

//           <p className="mt-3 text-3xl font-extrabold text-slate-900">{price}</p>

//           <dl className="mt-6 grid grid-cols-2 gap-3">
//             {details.map((detail) => (
//               <div
//                 key={detail.label}
//                 className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200"
//               >
//                 <dt className="text-xs font-semibold uppercase tracking-wide text-slate-600">
//                   {detail.label}
//                 </dt>
//                 <dd className="mt-1 font-bold text-slate-900">
//                   {detail.value}
//                 </dd>
//               </div>
//             ))}
//           </dl>

//           {item.description && (
//             <p className="mt-5 font-medium leading-relaxed text-slate-700">
//               {item.description}
//             </p>
//           )}

//           {/* WhatsApp buttons */}
//           <div className="mt-auto flex flex-col gap-3 pt-6">
//             {item.inStock ? (
//               <>
//                 <a
//                   href={whatsappLink(buyMessage)}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="rounded-lg bg-blue-500 py-3 text-center font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:-translate-y-0.5 hover:bg-blue-600"
//                 >
//                   Order on WhatsApp
//                 </a>
//                 <a
//                   href={whatsappLink(askMessage)}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="rounded-lg bg-slate-900 py-3 text-center font-semibold text-white transition hover:-translate-y-0.5 hover:bg-black"
//                 >
//                   Chat with us
//                 </a>
//               </>
//             ) : (
//               <a
//                 href={whatsappLink(askMessage)}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="rounded-lg bg-slate-900 py-3 text-center font-semibold text-white transition hover:bg-black"
//               >
//                 Ask about availability
//               </a>
//             )}
//             <p className="text-center text-xs font-medium text-slate-600">
//               You'll be taken to WhatsApp with this item's details filled in.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AccessoryModal;

import ProductModal from "./ProductModal";

function AccessoryModal({ item, onClose }) {
  return <ProductModal kind="accessory" item={item} onClose={onClose} />;
}

export default AccessoryModal;

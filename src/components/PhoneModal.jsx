// import { useEffect } from "react";
// import { whatsappLink } from "../config";

// function PhoneModal({ phone, onClose }) {
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

//   const price = `GH₵ ${phone.price.toLocaleString()}`;
//   const buyMessage = `Hello, I want to buy the ${phone.name} (${phone.storage}, ${phone.condition}) listed at ${price}.`;
//   const askMessage = `Hello, I have a question about the ${phone.name} (${phone.storage}, ${phone.condition}).`;

//   const details = [
//     { label: "Brand", value: phone.brand },
//     { label: "Storage", value: phone.storage },
//     { label: "Condition", value: phone.condition },
//     { label: "Availability", value: phone.inStock ? "In stock" : "Sold out" },
//     phone.color && { label: "Colour", value: phone.color },
//     phone.battery && { label: "Battery health", value: phone.battery },
//   ].filter(Boolean);

//   return (
//     <div
//       className="animate-fade-in fixed inset-0 z-[100] flex items-end justify-center bg-slate-900/60 backdrop-blur-sm sm:items-center sm:p-6"
//       onClick={onClose}
//       role="dialog"
//       aria-modal="true"
//       aria-label={`${phone.name} details`}
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
//           {phone.image ? (
//             <img
//               src={phone.image}
//               alt={phone.name}
//               className="max-h-[60vh] w-full object-contain object-center p-3 md:max-h-[80vh]"
//             />
//           ) : (
//             <span className="text-8xl" aria-hidden="true">
//               📱
//             </span>
//           )}

//           <span
//             className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold ${
//               phone.condition === "Brand New"
//                 ? "bg-blue-500 text-white"
//                 : "bg-slate-900 text-white"
//             }`}
//           >
//             {phone.condition}
//           </span>
//         </div>

//         {/* Details */}
//         <div className="flex flex-col p-6 md:p-8">
//           <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">
//             {phone.brand}
//           </p>
//           <h2 className="mt-1 text-2xl font-extrabold text-slate-900 md:text-3xl">
//             {phone.name}
//           </h2>

//           <p className="mt-3 text-3xl font-extrabold text-slate-900">{price}</p>

//           <dl className="mt-6 grid grid-cols-2 gap-3">
//             {details.map((item) => (
//               <div
//                 key={item.label}
//                 className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200"
//               >
//                 <dt className="text-xs font-semibold uppercase tracking-wide text-slate-600">
//                   {item.label}
//                 </dt>
//                 <dd className="mt-1 font-bold text-slate-900">{item.value}</dd>
//               </div>
//             ))}
//           </dl>

//           {phone.description && (
//             <p className="mt-5 font-medium leading-relaxed text-slate-700">
//               {phone.description}
//             </p>
//           )}

//           {/* WhatsApp buttons */}
//           <div className="mt-auto flex flex-col gap-3 pt-6">
//             {phone.inStock ? (
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
//               You'll be taken to WhatsApp with this phone's details filled in.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default PhoneModal;

import ProductModal from "./ProductModal";

function PhoneModal({ phone, onClose }) {
  return <ProductModal kind="phone" item={phone} onClose={onClose} />;
}

export default PhoneModal;

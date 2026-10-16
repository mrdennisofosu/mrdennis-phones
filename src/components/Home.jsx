import { Link } from "react-router-dom";
import { whatsappLink } from "../config";
import Reveal from "./Reveal";
import HeroVideo from "./HeroVideo";
import Services from "./Services";
import DealsSection from "./DealsSection";
import Installment from "./Installment";

const highlights = [
  { icon: "✅", title: "Quality-checked", text: "Phones checked before sale" },
  { icon: "🔄", title: "Swaps welcome", text: "Trade in your old phone" },
  { icon: "⚡", title: "Data bundles", text: "Top up at fair prices" },
];

function Home() {
  return (
    <section id="home" className="relative bg-[#e9eff7]">
      {/* Hero with video background */}
      <div className="relative flex min-h-[560px] items-center overflow-hidden bg-slate-900 md:min-h-[680px]">
        <HeroVideo />

        {/* Dark layers so the text is easy to read */}
        <div className="absolute inset-0 bg-slate-900/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 to-transparent" />

        <div className="relative mx-auto w-full max-w-6xl px-4 pb-28 pt-20 md:pb-32">
          <div className="mx-auto max-w-2xl text-center md:mx-0 md:text-left">
            <Reveal>
              <p className="inline-block rounded-full bg-white/10 px-4 py-1 text-sm font-medium text-white ring-1 ring-white/25 backdrop-blur">
                📍 Circle, Near Odo Rice, Accra, Ghana
              </p>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="mt-5 text-4xl font-extrabold leading-tight text-white md:text-6xl">
                Buy, Sell & Swap Phones
                <span className="block text-blue-400">with Confidence</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-6 max-w-xl text-lg font-medium text-slate-100 md:max-w-lg">
                Genuine phones at fair prices, easy swaps, data bundles and
                iPhone accessories, all in one place.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center md:justify-start">
                <Link
                  to="/phones"
                  className="w-full rounded-lg bg-blue-500 px-8 py-3 text-center font-semibold text-white shadow-lg shadow-blue-500/30 transition hover:-translate-y-0.5 hover:bg-blue-600 sm:w-auto"
                >
                  Browse Phones
                </Link>
                <a
                  href={whatsappLink("Hello, I want to swap my phone.")}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full rounded-lg bg-white px-8 py-3 text-center font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:bg-blue-50 sm:w-auto"
                >
                  Swap Your Phone
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
      {/* Highlights (overlap the bottom of the video) */}
      <div className="relative z-10 mx-auto -mt-12 max-w-6xl px-4 pb-16 md:-mt-14 md:pb-24">
        <div className="grid gap-4 sm:grid-cols-3">
          {highlights.map((item, i) => (
            <Reveal key={item.title} delay={i * 120} className="h-full">
              <div className="h-full rounded-2xl border border-slate-300 bg-white p-5 shadow-md transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg">
                <span className="text-2xl">{item.icon}</span>
                <h3 className="mt-2 font-bold text-slate-900">{item.title}</h3>
                <p className="text-sm font-medium text-slate-700">
                  {item.text}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
      <DealsSection /> <Services />
      <Installment />
    </section>
  );
}

export default Home;

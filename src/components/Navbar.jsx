import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { whatsappLink } from "../config";
import CartButton from "./CartButton";

const links = [
  { label: "Home", to: "/" },
  { label: "Phones", to: "/phones" },
  { label: "Swap", to: "/swap" },
  { label: "Data Bundles", to: "/data-bundles" },
  { label: "Accessories", to: "/accessories" },
  { label: "Contact", to: "/contact" },
];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 10);
      setProgress(max > 0 ? (y / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/90 backdrop-blur transition-shadow duration-300 ${
        scrolled ? "shadow-md" : "border-b border-slate-200"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        {/* Logo / name */}
        <Link
          to="/"
          className="flex items-center gap-2 text-xl font-extrabold text-slate-900"
        >
          <img
            src="/logo.jpg"
            alt="Mr Dennis Phones logo"
            className="h-12 w-12 rounded-full object-cover"
          />
          <span>
            Mr Dennis <span className="text-blue-500">Phones</span>
          </span>
        </Link>
        {/* Desktop links */}
        <ul className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.to === "/"}
                className={({ isActive }) =>
                  `relative text-sm font-semibold transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:bg-blue-500 after:transition-all after:duration-300 ${
                    isActive
                      ? "text-blue-600 after:w-full"
                      : "text-slate-800 after:w-0 hover:text-blue-600 hover:after:w-full"
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <CartButton className="hidden md:flex" /> {/* Desktop button */}
        <a
          href={whatsappLink()}
          target="_blank"
          rel="noreferrer"
          className="hidden rounded-lg bg-blue-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-600 md:block"
        >
          Chat on WhatsApp
        </a>
        <CartButton className="ml-auto mr-3 flex md:hidden" />{" "}
        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="text-2xl text-slate-900 md:hidden"
          aria-label="Toggle menu"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-slate-200 bg-white px-4 pb-4 md:hidden">
          <ul className="flex flex-col gap-1 pt-2">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    `block rounded-md px-2 py-3 font-medium ${
                      isActive
                        ? "bg-blue-50 text-blue-600"
                        : "text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noreferrer"
            className="mt-3 block rounded-lg bg-blue-500 px-4 py-3 text-center font-semibold text-white"
          >
            Chat on WhatsApp
          </a>
        </div>
      )}

      {/* Scroll progress bar */}
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-blue-500 transition-[width] duration-100"
        style={{ width: `${progress}%` }}
      />
    </header>
  );
}

export default Navbar;

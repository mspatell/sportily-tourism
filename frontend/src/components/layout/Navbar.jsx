import { useState, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", to: "/" },
  { label: "Events", to: "/events" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="navbar"
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-white/70 backdrop-blur-xl backdrop-saturate-150 border-b border-stone-200/60" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link to="/" data-testid="logo" className="flex items-center gap-2">
          <img src="/favicon.png" alt="Sportily" className="h-8 w-8" />
          <span className="font-heading text-2xl tracking-tight text-stone-900">Sportily</span>
        </Link>

        <div className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === "/"}
              data-testid={`nav-${l.label.toLowerCase()}`}
              className={({ isActive }) =>
                `text-sm transition-colors duration-200 ${isActive ? "text-amber-700 font-semibold" : "text-stone-600 hover:text-amber-700"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <button
            data-testid="nav-quote-btn"
            onClick={() => navigate("/contact")}
            className="bg-amber-700 text-white font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-amber-800 active:scale-95 transition-transform duration-150"
          >
            Plan my trip
          </button>
        </div>

        <button className="md:hidden text-stone-800" data-testid="mobile-menu-btn" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white border-t border-stone-200 px-6 py-6 flex flex-col gap-4"
        >
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} onClick={() => setOpen(false)} className="text-stone-700 py-1">
              {l.label}
            </NavLink>
          ))}
          <button
            onClick={() => { setOpen(false); navigate("/contact"); }}
            className="bg-amber-700 text-white font-semibold px-5 py-3 rounded-full mt-2"
          >
            Plan my trip
          </button>
        </motion.div>
      )}
    </header>
  );
}

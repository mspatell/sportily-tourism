import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Events", href: "#events" },
  { label: "Services", href: "#services" },
  { label: "How it works", href: "#how" },
  { label: "Stories", href: "#stories" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      data-testid="navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-black/50 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      }`}
    >
      <nav className="max-w-[1400px] mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
        <a href="#top" data-testid="logo" onClick={(e) => { e.preventDefault(); go("#top"); }} className="flex items-center gap-2">
          <span className="font-heading font-extrabold text-xl tracking-tight">SPORTILY</span>
          <span className="h-2 w-2 rounded-full bg-volt" />
        </a>

        <div className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <button
              key={l.href}
              data-testid={`nav-${l.label.toLowerCase().replace(/\s/g, "-")}`}
              onClick={() => go(l.href)}
              className="text-sm text-gray-300 hover:text-white transition-colors duration-200"
            >
              {l.label}
            </button>
          ))}
          <button
            data-testid="nav-quote-btn"
            onClick={() => go("#contact")}
            className="bg-volt text-black font-semibold text-sm px-5 py-2.5 rounded-full hover:brightness-110 active:scale-95 transition-transform duration-150"
          >
            Get a Quote
          </button>
        </div>

        <button className="md:hidden text-white" data-testid="mobile-menu-btn" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-black/95 border-t border-white/10 px-6 py-6 flex flex-col gap-4"
        >
          {links.map((l) => (
            <button key={l.href} onClick={() => go(l.href)} className="text-left text-gray-200 py-1">
              {l.label}
            </button>
          ))}
          <button onClick={() => go("#contact")} className="bg-volt text-black font-semibold px-5 py-3 rounded-full mt-2">
            Get a Quote
          </button>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;

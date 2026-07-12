import { motion } from "framer-motion";
import { ArrowRight, Ticket } from "lucide-react";

const HERO_IMG =
  "https://images.unsplash.com/photo-1629217855633-79a6925d6c47?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHN0YWRpdW0lMjBmYW5zJTIwbmlnaHR8ZW58MHx8fHwxNzgzODk5NjEzfDA&ixlib=rb-4.1.0&q=85";

const go = (href) => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

export const Hero = () => (
  <section id="top" className="relative min-h-screen flex items-center overflow-hidden">
    <div className="absolute inset-0">
      <img src={HERO_IMG} alt="Stadium crowd at night" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-obsidian/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/60" />
    </div>

    <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-10 w-full pt-28">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-3xl"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 mb-7 backdrop-blur">
          <Ticket className="h-4 w-4 text-volt" strokeWidth={1.5} />
          <span className="text-xs tracking-[0.15em] uppercase text-gray-200">Sports & Live Event Travel Experts</span>
        </div>

        <h1 className="font-heading font-bold text-5xl sm:text-6xl md:text-7xl tracking-tighter leading-[1.05]">
          Be there when the <span className="text-volt">roar</span> happens.
        </h1>

        <p className="mt-7 text-base md:text-lg text-gray-300 leading-relaxed max-w-xl">
          Sportily Tourism turns fandom into front-row memories. We secure the tickets, book the
          flights & stays, and sort your visas — for the World Cup, Grand Slams, the IPL,
          the Olympics, Tomorrowland and every stage in between.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <button
            data-testid="hero-quote-btn"
            onClick={() => go("#contact")}
            className="group inline-flex items-center gap-2 bg-volt text-black font-semibold px-7 py-3.5 rounded-full hover:brightness-110 active:scale-95 transition-transform duration-150"
          >
            Plan my trip
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" strokeWidth={2} />
          </button>
          <button
            data-testid="hero-events-btn"
            onClick={() => go("#events")}
            className="inline-flex items-center gap-2 border border-white/20 text-white px-7 py-3.5 rounded-full hover:bg-white/5 transition-colors duration-200"
          >
            Explore events
          </button>
        </div>

        <div className="mt-14 flex flex-wrap gap-10">
          {[
            ["12k+", "Fans sent trackside"],
            ["40+", "Countries covered"],
            ["100%", "Visa & logistics handled"],
          ].map(([n, l]) => (
            <div key={l}>
              <div className="font-heading text-3xl font-bold text-white">{n}</div>
              <div className="text-sm text-gray-400 mt-1">{l}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default Hero;

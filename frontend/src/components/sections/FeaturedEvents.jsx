import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { EVENTS } from "../../data/content";

const go = () => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });

export const FeaturedEvents = () => (
  <section id="events" className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24 md:py-32">
    <div className="mb-14 max-w-2xl">
      <p className="overline mb-4">The bucket list</p>
      <h2 className="font-heading text-4xl sm:text-5xl font-semibold tracking-tight leading-none">
        Events worth crossing the world for.
      </h2>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 auto-rows-[240px] gap-6">
      {EVENTS.map((e, i) => (
        <motion.button
          key={e.id}
          data-testid={`event-${e.id}`}
          onClick={go}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: (i % 3) * 0.1 }}
          className={`group relative overflow-hidden rounded-2xl border border-white/10 text-left ${e.span}`}
        >
          <img
            src={e.img}
            alt={e.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-transparent group-hover:from-obsidian group-hover:via-obsidian/60 transition-colors duration-300" />
          <div className="absolute top-5 left-5">
            <span className="text-[11px] uppercase tracking-[0.2em] font-bold bg-volt text-black px-3 py-1 rounded-full">
              {e.tag}
            </span>
          </div>
          <div className="absolute top-5 right-5 h-9 w-9 rounded-full bg-white/10 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ArrowUpRight className="h-4 w-4 text-white" strokeWidth={2} />
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h3 className="font-heading text-2xl font-semibold tracking-tight">{e.title}</h3>
            <p className="text-gray-300 text-sm mt-2 max-w-md opacity-0 max-h-0 group-hover:opacity-100 group-hover:max-h-24 transition-all duration-300">
              {e.blurb}
            </p>
          </div>
        </motion.button>
      ))}
    </div>
  </section>
);

export default FeaturedEvents;

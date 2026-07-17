import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { EVENTS } from "../data/content";

export default function Events() {
  return (
    <div data-testid="page-events">
      <section className="pt-36 pb-14 md:pt-44">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <p className="overline mb-4">Curated experiences</p>
            <h1 className="font-heading text-5xl sm:text-6xl tracking-tighter font-light text-stone-900 leading-[1.08]">
              The events. The moments. The trips.
            </h1>
            <p className="mt-6 text-lg text-stone-600 leading-relaxed">
              From packed football stadiums to the hush before a match point, from IPL nights to
              Tomorrowland's mainstage — pick your moment and we'll take care of the rest.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-28">
        <div className="grid md:grid-cols-12 auto-rows-[280px] gap-8">
          {EVENTS.map((e, i) => {
            const span = i % 5 === 0 ? "md:col-span-8" : i % 5 === 3 ? "md:col-span-7" : i % 5 === 4 ? "md:col-span-5" : "md:col-span-4";
            return (
              <motion.div
                key={e.id}
                data-testid={`event-${e.id}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.1 }}
                className={`group relative overflow-hidden rounded-3xl border border-stone-100 shadow-[0_8px_30px_rgb(0,0,0,0.05)] ${span}`}
              >
                <img src={e.img} alt={e.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/80 via-stone-900/20 to-transparent" />
                <div className="absolute top-5 left-5">
                  <span className="text-[11px] uppercase tracking-[0.18em] font-bold bg-white/90 text-amber-800 px-3 py-1 rounded-full">{e.tag}</span>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-7">
                  <h3 className="font-heading text-2xl text-white mb-2">{e.title}</h3>
                  <p className="text-white/85 text-sm leading-relaxed max-w-lg">{e.blurb}</p>
                  <Link to="/contact" className="inline-flex items-center gap-2 text-white font-semibold text-sm mt-4 hover:gap-3 transition-all duration-200">
                    Enquire about this <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

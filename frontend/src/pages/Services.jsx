import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Ticket, Plane, BedDouble, Stamp } from "lucide-react";
import { SERVICES } from "../data/content";

const ICONS = { tickets: Ticket, flights: Plane, stays: BedDouble, visas: Stamp };

export default function Services() {
  return (
    <div data-testid="page-services">
      <section className="pt-36 pb-14 md:pt-44">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="overline mb-4">Seamless journeys</p>
            <h1 className="font-heading text-5xl sm:text-6xl tracking-tighter font-light text-stone-900 leading-[1.08]">
              One team for the entire journey.
            </h1>
            <p className="mt-6 text-lg text-stone-600 leading-relaxed">
              You bring the passion. We handle the four things that stand between you and the
              stadium — tickets, flights, a bed, and the border.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-28 space-y-16 md:space-y-24">
        {SERVICES.map((s, i) => {
          const Icon = ICONS[s.id];
          const reverse = i % 2 === 1;
          return (
            <motion.div
              key={s.id}
              data-testid={`service-${s.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center ${reverse ? "lg:[direction:rtl]" : ""}`}
            >
              <div className="rounded-3xl overflow-hidden shadow-[0_12px_40px_rgb(0,0,0,0.08)] [direction:ltr]">
                <img src={s.img} alt={s.title} className="w-full h-[300px] md:h-[400px] object-cover" />
              </div>
              <div className="[direction:ltr]">
                <div className="h-14 w-14 rounded-2xl bg-amber-50 flex items-center justify-center mb-6">
                  <Icon className="h-7 w-7 text-amber-700" strokeWidth={1.5} />
                </div>
                <span className="overline">0{i + 1}</span>
                <h2 className="font-heading text-3xl sm:text-4xl text-stone-900 mt-2 mb-4">{s.title}</h2>
                <p className="text-stone-600 text-lg leading-relaxed max-w-lg">{s.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-28">
        <div className="rounded-3xl border border-stone-200 bg-stone-100/60 px-8 md:px-16 py-14 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-heading text-2xl sm:text-3xl text-stone-900">Let's build your itinerary.</h2>
            <p className="text-stone-600 mt-2">A tailored quote lands in your inbox within 48 hours.</p>
          </div>
          <Link to="/contact" data-testid="services-cta-btn" className="inline-flex items-center gap-2 bg-amber-700 text-white font-semibold px-7 py-3.5 rounded-full hover:bg-amber-800 active:scale-95 transition-transform duration-150 whitespace-nowrap">
            Get a quote <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      </section>
    </div>
  );
}

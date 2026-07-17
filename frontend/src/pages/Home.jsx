import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, ShieldCheck, Gem, Headphones } from "lucide-react";
import Ribbon from "../components/Ribbon";
import { EVENTS } from "../data/content";

const fade = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

const HERO_IMG =
  "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2OTV8MHwxfHNlYXJjaHwxfHx0ZW5uaXMlMjBncmFuZCUyMHNsYW0lMjBjb3VydCUyMG1hdGNofGVufDB8fHx8MTc4Mzg5OTYxM3ww&ixlib=rb-4.1.0&q=85";

export default function Home() {
  const top = EVENTS.slice(0, 3);
  return (
    <div data-testid="page-home">
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <motion.div {...fade}>
            <p className="overline mb-5">Sports & live-event travel experts</p>
            <h1 className="font-heading text-5xl sm:text-6xl tracking-tighter font-light text-stone-900 leading-[1.08]">
              Be there when the <span className="italic text-amber-700">roar</span> happens.
            </h1>
            <p className="mt-7 text-lg text-stone-600 leading-relaxed max-w-xl">
              Sportily Tourism turns fandom into front-row memories. We secure the tickets, book
              your flights & stays, and sort the visas — for the World Cup, the Grand Slams, the
              IPL, the Olympics, Tomorrowland and every stage in between.
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                data-testid="hero-quote-btn"
                className="group inline-flex items-center justify-center gap-2 bg-amber-700 text-white font-semibold px-7 py-3.5 rounded-full hover:bg-amber-800 active:scale-95 transition-transform duration-150"
              >
                Plan my trip
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" strokeWidth={2} />
              </Link>
              <Link
                to="/events"
                data-testid="hero-events-btn"
                className="inline-flex items-center justify-center gap-2 bg-stone-100 text-stone-900 px-7 py-3.5 rounded-full hover:bg-stone-200 transition-colors duration-200"
              >
                Explore events
              </Link>
            </div>
            <div className="mt-12 flex flex-wrap gap-10">
              {[["12k+", "Fans sent trackside"], ["40+", "Countries covered"], ["100%", "Logistics handled"]].map(([n, l]) => (
                <div key={l}>
                  <div className="font-heading text-3xl text-stone-900">{n}</div>
                  <div className="text-sm text-stone-500 mt-1">{l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_60px_rgb(0,0,0,0.10)]">
              <img src={HERO_IMG} alt="Tennis player mid-serve" className="w-full h-[440px] lg:h-[540px] object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl border border-stone-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)] px-6 py-5 hidden sm:block">
              <p className="overline mb-1">Now booking</p>
              <p className="font-heading text-xl text-stone-900">The 2026 season</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Ribbon />

      {/* Highlights */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="overline mb-4">The bucket list</p>
            <h2 className="text-3xl sm:text-4xl tracking-tight font-normal text-stone-900">
              Events worth crossing the world for.
            </h2>
          </div>
          <Link to="/events" className="inline-flex items-center gap-2 text-amber-700 font-semibold hover:gap-3 transition-all duration-200">
            View all events <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {top.map((e, i) => (
            <motion.div
              key={e.id}
              data-testid={`home-event-${e.id}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group rounded-3xl overflow-hidden bg-white border border-stone-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-[transform,box-shadow] duration-300"
            >
              <div className="h-56 overflow-hidden">
                <img src={e.img} alt={e.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8">
                <span className="overline">{e.tag}</span>
                <h3 className="font-heading text-2xl text-stone-900 mt-2 mb-3">{e.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{e.blurb}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="bg-stone-100/60 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-32 grid lg:grid-cols-3 gap-10">
          {[
            { icon: ShieldCheck, title: "Guaranteed seats", desc: "Every ticket verified. If the fixture moves, so do we — no fine print." },
            { icon: Gem, title: "Concierge-grade", desc: "One dedicated planner from your first message to the final whistle." },
            { icon: Headphones, title: "24/7 on-trip support", desc: "Real humans in your timezone, reachable the whole journey." },
          ].map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white rounded-3xl border border-stone-100 p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            >
              <p.icon className="h-8 w-8 text-amber-700 mb-6" strokeWidth={1.5} />
              <h3 className="font-heading text-xl text-stone-900 mb-2">{p.title}</h3>
              <p className="text-stone-600 leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-32">
        <div className="rounded-3xl bg-amber-700 text-white px-8 md:px-16 py-16 md:py-20 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl tracking-tight font-normal mb-4">Ready when you are.</h2>
          <p className="text-amber-50/90 max-w-xl mx-auto mb-8 leading-relaxed">
            Tell us the event you're dreaming of and we'll build the whole trip around it.
          </p>
          <Link
            to="/contact"
            data-testid="home-cta-btn"
            className="inline-flex items-center gap-2 bg-white text-amber-800 font-semibold px-8 py-3.5 rounded-full hover:bg-amber-50 active:scale-95 transition-transform duration-150"
          >
            Start planning <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      </section>
    </div>
  );
}

import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowUpRight, ShieldCheck, Gem, Headphones } from "lucide-react";
import Ribbon from "../components/Ribbon";
import Reveal from "../components/Reveal";
import MaskLines from "../components/MaskLines";
import { EVENTS, GALLERY, CHAPTERS } from "../data/content";

const HERO_IMG =
  "https://images.unsplash.com/photo-1629217855633-79a6925d6c47?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHN0YWRpdW0lMjBmYW5zJTIwbmlnaHR8ZW58MHx8fHwxNzgzODk5NjEzfDA&ixlib=rb-4.1.0&q=85";

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section ref={ref} className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
        <div>
          <motion.p
            className="overline mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Sports & live-event travel experts
          </motion.p>

          <h1 className="font-heading text-5xl sm:text-6xl md:text-[4.6rem] tracking-tighter font-light text-stone-900 leading-[1.02]">
            <MaskLines
              lines={[
                <>Be there when</>,
                <>the <span className="italic text-amber-700">roar</span> happens.</>,
              ]}
            />
          </h1>

          <motion.p
            className="mt-8 text-lg text-stone-600 leading-relaxed max-w-xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            Sportily Tourism turns fandom into front-row memories. We secure the tickets, book your
            flights & stays, and sort the visas — for the World Cup, the Grand Slams, the IPL, the
            Olympics, Tomorrowland and every stage in between.
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
          >
            <Link to="/contact" data-testid="hero-quote-btn" className="group inline-flex items-center justify-center gap-2 bg-amber-700 text-white font-semibold px-7 py-3.5 rounded-full hover:bg-amber-800 active:scale-95 transition-transform duration-150">
              Plan my trip
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" strokeWidth={2} />
            </Link>
            <Link to="/events" data-testid="hero-events-btn" className="inline-flex items-center justify-center gap-2 bg-stone-100 text-stone-900 px-7 py-3.5 rounded-full hover:bg-stone-200 transition-colors duration-200">
              Explore events
            </Link>
          </motion.div>

          <motion.div
            className="mt-12 flex flex-wrap gap-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[["12k+", "Fans sent trackside"], ["40+", "Countries covered"], ["100%", "Logistics handled"]].map(([n, l]) => (
              <div key={l}>
                <div className="font-heading text-3xl text-stone-900">{n}</div>
                <div className="text-sm text-stone-500 mt-1">{l}</div>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="relative"
        >
          <div className="relative rounded-[2rem] overflow-hidden shadow-[0_30px_80px_rgb(0,0,0,0.14)] h-[440px] lg:h-[560px]">
            <motion.img
              src={HERO_IMG}
              alt="Football stadium under lights"
              style={{ y: imgY, scale: imgScale }}
              className="absolute inset-0 w-full h-[130%] object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-[2rem]" />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="absolute -bottom-6 -left-6 bg-white rounded-2xl border border-stone-100 shadow-[0_10px_40px_rgb(0,0,0,0.10)] px-6 py-5 hidden sm:block"
          >
            <p className="overline mb-1">Now booking</p>
            <p className="font-heading text-xl text-stone-900">The 2026 season</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Highlights() {
  const top = EVENTS.slice(0, 3);
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-32">
      <Reveal>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="overline mb-4">The bucket list</p>
            <h2 className="text-3xl sm:text-4xl tracking-tight font-normal text-stone-900">Events worth crossing the world for.</h2>
          </div>
          <Link to="/events" className="inline-flex items-center gap-2 text-amber-700 font-semibold hover:gap-3 transition-all duration-200">
            View all events <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      </Reveal>
      <div className="grid md:grid-cols-3 gap-8">
        {top.map((e, i) => (
          <Reveal key={e.id} delay={i * 0.1}>
            <div data-testid={`home-event-${e.id}`} className="group rounded-3xl overflow-hidden bg-white border border-stone-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-[transform,box-shadow] duration-300">
              <div className="h-56 overflow-hidden">
                <img src={e.img} alt={e.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-8">
                <span className="overline">{e.tag}</span>
                <h3 className="font-heading text-2xl text-stone-900 mt-2 mb-3">{e.title}</h3>
                <p className="text-stone-600 text-sm leading-relaxed">{e.blurb}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="bg-stone-900 text-stone-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-28 md:py-36 grid lg:grid-cols-12 gap-14">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.22em] font-bold text-amber-500 mb-5">The manifesto</p>
            <h2 className="font-heading text-4xl sm:text-5xl font-light leading-tight">Why fans choose Sportily.</h2>
            <p className="text-stone-400 mt-6 leading-relaxed">Three principles we refuse to compromise on.</p>
          </Reveal>
        </div>
        <div className="lg:col-span-8 lg:pl-10">
          {CHAPTERS.map((c, i) => (
            <Reveal key={c.n} delay={i * 0.08}>
              <div className="grid grid-cols-[auto,1fr] gap-6 md:gap-10 py-10 border-t border-white/10 first:border-t-0 lg:first:border-t">
                <span className="font-heading text-4xl md:text-5xl text-amber-500/90 leading-none">{c.n}</span>
                <div>
                  <h3 className="font-heading text-2xl md:text-3xl mb-3">{c.title}</h3>
                  <p className="text-stone-400 leading-relaxed max-w-xl">{c.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryStrip() {
  return (
    <section className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-12">
        <Reveal>
          <p className="overline mb-4">Moments we made</p>
          <h2 className="text-3xl sm:text-4xl tracking-tight font-normal text-stone-900 max-w-2xl">From the tunnel to the mainstage.</h2>
        </Reveal>
      </div>
      <div className="flex gap-6 overflow-x-auto px-6 lg:px-8 pb-6 snap-x [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {GALLERY.map((g, i) => (
          <Reveal key={i} delay={(i % 3) * 0.08}>
            <div className={`group relative shrink-0 snap-start rounded-3xl overflow-hidden border border-stone-100 shadow-[0_10px_30px_rgb(0,0,0,0.06)] ${i % 2 === 0 ? "w-[300px] h-[400px]" : "w-[300px] h-[340px] mt-0 md:mt-14"}`}>
              <img src={g.src} alt={g.label} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute bottom-5 left-5 text-white font-heading text-xl opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">{g.label}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Trust() {
  const items = [
    { icon: ShieldCheck, title: "Guaranteed seats", desc: "Every ticket verified. If the fixture moves, so do we — no fine print." },
    { icon: Gem, title: "Concierge-grade", desc: "One dedicated planner from your first message to the final whistle." },
    { icon: Headphones, title: "24/7 on-trip support", desc: "Real humans in your timezone, reachable the whole journey." },
  ];
  return (
    <section className="bg-stone-100/60 border-y border-stone-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-32 grid lg:grid-cols-3 gap-10">
        {items.map((p, i) => (
          <Reveal key={p.title} delay={i * 0.08}>
            <div className="bg-white rounded-3xl border border-stone-100 p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-full">
              <p.icon className="h-8 w-8 text-amber-700 mb-6" strokeWidth={1.5} />
              <h3 className="font-heading text-xl text-stone-900 mb-2">{p.title}</h3>
              <p className="text-stone-600 leading-relaxed">{p.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-32">
      <Reveal>
        <div className="rounded-[2rem] bg-amber-700 text-white px-8 md:px-16 py-16 md:py-20 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl tracking-tight font-normal mb-4">Ready when you are.</h2>
          <p className="text-amber-50/90 max-w-xl mx-auto mb-8 leading-relaxed">Tell us the event you're dreaming of and we'll build the whole trip around it.</p>
          <Link to="/contact" data-testid="home-cta-btn" className="inline-flex items-center gap-2 bg-white text-amber-800 font-semibold px-8 py-3.5 rounded-full hover:bg-amber-50 active:scale-95 transition-transform duration-150">
            Start planning <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </Link>
        </div>
      </Reveal>
    </section>
  );
}

export default function Home() {
  return (
    <div data-testid="page-home">
      <Hero />
      <Ribbon />
      <Highlights />
      <Manifesto />
      <GalleryStrip />
      <Trust />
      <CTA />
    </div>
  );
}

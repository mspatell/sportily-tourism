import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Globe2, KeyRound, Sparkles, Quote, Trophy, Plane } from "lucide-react";
import Reveal from "../components/Reveal";
import { LIFESTYLE_IMG } from "../data/content";

const INSPIRATION_IMG =
  "https://images.unsplash.com/photo-1629217855633-79a6925d6c47?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzV8MHwxfHNlYXJjaHwxfHxmb290YmFsbCUyMHN0YWRpdW0lMjBmYW5zJTIwbmlnaHR8ZW58MHx8fHwxNzgzODk5NjEzfDA&ixlib=rb-4.1.0&q=85";

export default function About() {
  return (
    <div data-testid="page-about">
      <section className="pt-36 pb-16 md:pt-44">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-14 items-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="overline mb-4">Our story</p>
            <h1 className="font-heading text-5xl sm:text-6xl tracking-tighter font-light text-stone-900 leading-[1.08]">
              Fans, first. Always.
            </h1>
            <p className="mt-6 text-lg text-stone-600 leading-relaxed">
              Sportily Tourism began with a simple frustration: getting to the big game shouldn't be
              harder than the game itself. We're travellers and superfans who turned that itch into a
              craft — obsessing over logistics so our clients can obsess over the moment.
            </p>
            <p className="mt-4 text-lg text-stone-600 leading-relaxed">
              Today we send thousands of fans trackside every year, across 40+ countries and every
              sport that matters — plus the world's most iconic festivals.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl overflow-hidden shadow-[0_20px_60px_rgb(0,0,0,0.10)]"
          >
            <img src={LIFESTYLE_IMG} alt="Travellers heading to a private flight" className="w-full h-[420px] lg:h-[520px] object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Our Inspiration */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-14 items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="overline mb-4">Our inspiration</p>
              <h2 className="font-heading text-4xl sm:text-5xl tracking-tight font-light text-stone-900 leading-[1.1]">
                A dream, deferred — then finally lived.
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="mt-8 rounded-3xl overflow-hidden shadow-[0_20px_60px_rgb(0,0,0,0.12)]">
                <img src={INSPIRATION_IMG} alt="A packed World Cup stadium at night" className="w-full h-[320px] object-cover" />
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7 lg:pt-4">
            <Reveal delay={0.05}>
              <p className="text-lg text-stone-600 leading-relaxed">
                Sportily Tourism Pvt. Ltd. was born out of a lifelong passion for both sport and travel.
                From a young age, a love for football sparked a simple longing — to feel the roar of the
                crowd in person, rather than through a screen.
              </p>
              <p className="mt-5 text-lg text-stone-600 leading-relaxed">
                When the USA hosted the FIFA World Cup in 1994, that dream felt within reach. Yet without
                the right resources to plan the trip and secure a visa, it slipped away — unfulfilled.
                It was only in 2018, standing inside a stadium at the FIFA World Cup in Russia, that the
                dream was finally realised. That single, transformative moment became the spark for
                something bigger: a platform to help fellow sports lovers across India turn their own
                impossible-seeming dreams into boarding passes and front-row seats.
              </p>
            </Reveal>

            {/* Milestone timeline */}
            <div className="mt-10 grid sm:grid-cols-2 gap-6">
              {[
                { icon: Plane, year: "1994", title: "The dream deferred", body: "A first shot at the World Cup in the USA — undone by visas and dead-ends. The itch never left." },
                { icon: Trophy, year: "2018", title: "The dream fulfilled", body: "Russia. The whistle, the roar, the goosebumps. A lifelong wait, finally worth it — and a mission born." },
              ].map((m, i) => (
                <Reveal key={m.year} delay={0.1 + i * 0.1}>
                  <div className="relative bg-white rounded-3xl border border-stone-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.05)] h-full">
                    <m.icon className="h-7 w-7 text-amber-700 mb-4" strokeWidth={1.5} />
                    <div className="font-heading text-3xl text-stone-900">{m.year}</div>
                    <div className="text-sm font-semibold text-amber-700 mt-1 mb-3">{m.title}</div>
                    <p className="text-stone-600 text-sm leading-relaxed">{m.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>

        <Reveal delay={0.15}>
          <figure className="mt-16 max-w-4xl">
            <Quote className="h-10 w-10 text-amber-700 mb-5" strokeWidth={1.5} />
            <blockquote className="font-heading text-2xl sm:text-3xl text-stone-900 leading-snug italic">
              "I built Sportily so that no fan's dream would ever be lost to paperwork, distance, or
              not knowing where to begin."
            </blockquote>
            <figcaption className="mt-5 text-sm uppercase tracking-[0.18em] font-bold text-stone-500">
              — Founder, Sportily Tourism
            </figcaption>
          </figure>
        </Reveal>
      </section>

      <section className="bg-stone-100/60 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-2xl mb-14">
            <p className="overline mb-4">What we stand for</p>
            <h2 className="font-heading text-3xl sm:text-4xl text-stone-900">The Sportily promise.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: Sparkles, title: "Expertise", desc: "Decades of combined experience in sports travel — we know the venues, the seasons and the shortcuts." },
              { icon: KeyRound, title: "Access", desc: "Relationships with federations, clubs and organisers open doors that public sales can't." },
              { icon: Globe2, title: "Support", desc: "A dedicated planner and 24/7 on-ground help, wherever in the world the fixture takes you." },
            ].map((v, i) => (
              <motion.div
                key={v.title}
                data-testid={`value-${i}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-3xl border border-stone-100 p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
              >
                <v.icon className="h-8 w-8 text-amber-700 mb-6" strokeWidth={1.5} />
                <h3 className="font-heading text-xl text-stone-900 mb-2">{v.title}</h3>
                <p className="text-stone-600 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-32">
        <div className="grid lg:grid-cols-12 gap-14 items-start">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="overline mb-4">About us</p>
              <h2 className="font-heading text-4xl sm:text-5xl tracking-tight font-light text-stone-900 leading-[1.1]">
                The spirit of India, in every journey.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={0.05}>
              <p className="text-lg text-stone-600 leading-relaxed">
                At Sportily Tourism, we craft a wide range of sports tour packages paired with
                comprehensive, end-to-end travel services. Our dedicated team of qualified, multilingual
                professionals is devoted to your comfort, convenience and security — whether you prefer a
                fully escorted tour or the freedom to travel independently.
              </p>
              <p className="mt-5 text-lg text-stone-600 leading-relaxed">
                We infuse the warmth and spirit of India into every itinerary, caring for solo travellers,
                families and large groups alike. Today we specialise in securing official tickets to the
                most sought-after global events — ensuring a smooth, secure and unforgettable experience
                for every fan.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8">
                <p className="text-sm uppercase tracking-[0.18em] font-bold text-stone-500 mb-4">Our core values</p>
                <div className="flex flex-wrap gap-3">
                  {["Discipline", "Courtesy", "Honesty", "Loyalty", "Personalized service"].map((v) => (
                    <span key={v} className="rounded-full bg-amber-50 text-amber-800 text-sm font-semibold px-5 py-2.5 border border-amber-200/60">
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Philosophy band */}
        <Reveal delay={0.1}>
          <div className="mt-16 rounded-[2rem] bg-stone-900 text-stone-50 px-8 md:px-16 py-14 md:py-16">
            <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
              {[
                { k: "Travel", v: "fosters knowledge" },
                { k: "Knowledge", v: "opens doors to opportunity" },
                { k: "Opportunity", v: "leads to success" },
              ].map((p, i) => (
                <div key={p.k} className="relative md:pl-6 md:border-l md:border-white/10 first:border-l-0 first:pl-0">
                  <div className="font-heading text-3xl md:text-4xl text-amber-500">{p.k}</div>
                  <div className="text-stone-300 mt-2 leading-relaxed">{p.v}</div>
                </div>
              ))}
            </div>
            <p className="mt-10 text-stone-400 max-w-2xl leading-relaxed">
              That belief guides everything we do. Let us help you turn your travel dreams into reality.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="max-w-7xl mx-auto px-6 lg:px-8 py-24 md:py-32 text-center">
        <h2 className="font-heading text-3xl sm:text-4xl text-stone-900 mb-4">Come with us to the next one.</h2>
        <p className="text-stone-600 max-w-xl mx-auto mb-8">Wherever the game is, we'll get you there in style.</p>
        <Link to="/contact" data-testid="about-cta-btn" className="inline-flex items-center gap-2 bg-amber-700 text-white font-semibold px-8 py-3.5 rounded-full hover:bg-amber-800 active:scale-95 transition-transform duration-150">
          Plan my trip <ArrowRight className="h-4 w-4" strokeWidth={2} />
        </Link>
      </section>
    </div>
  );
}

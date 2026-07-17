import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Globe2, KeyRound, Sparkles } from "lucide-react";
import { LIFESTYLE_IMG } from "../data/content";

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

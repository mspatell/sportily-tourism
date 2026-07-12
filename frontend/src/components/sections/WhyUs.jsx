import { motion } from "framer-motion";
import { ShieldCheck, Gem, Headphones, Globe2 } from "lucide-react";

const points = [
  { icon: ShieldCheck, title: "Guaranteed seats", desc: "Every ticket verified. If the game moves, so do we — no fine print." },
  { icon: Gem, title: "Concierge-grade", desc: "One dedicated planner from first message to final whistle." },
  { icon: Headphones, title: "24/7 on-trip support", desc: "Real humans in your timezone, reachable the whole journey." },
  { icon: Globe2, title: "Global reach", desc: "Relationships in 40+ countries mean access others simply can't get." },
];

export const WhyUs = () => (
  <section className="border-y border-white/10 bg-[#080808]">
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24 md:py-32 grid lg:grid-cols-12 gap-14">
      <div className="lg:col-span-4">
        <p className="overline mb-4">Why Sportily</p>
        <h2 className="font-heading text-4xl sm:text-5xl font-semibold tracking-tight leading-none">
          Fandom, without the friction.
        </h2>
        <p className="text-gray-400 mt-6 leading-relaxed">
          We obsess over logistics so you can obsess over the game. That's the whole deal.
        </p>
      </div>
      <div className="lg:col-span-8 grid sm:grid-cols-2 gap-6">
        {points.map((p, i) => (
          <motion.div
            key={p.title}
            data-testid={`why-${i}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="rounded-2xl border border-white/10 bg-card p-7 hover:border-volt/40 transition-colors duration-300"
          >
            <p.icon className="h-7 w-7 text-volt mb-5" strokeWidth={1.5} />
            <h3 className="font-heading text-xl font-medium mb-2">{p.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyUs;

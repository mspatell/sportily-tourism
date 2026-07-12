import { motion } from "framer-motion";

const steps = [
  { n: "01", title: "Tell us the dream", desc: "Your event, your crew, your dates. Share as much or as little as you like." },
  { n: "02", title: "Get a tailored plan", desc: "Tickets, flights, stays and visas — priced and packaged within 48 hours." },
  { n: "03", title: "Confirm & relax", desc: "We lock everything in and send your full itinerary and travel documents." },
  { n: "04", title: "Live the moment", desc: "Show up. We handle the rest, on the ground, around the clock." },
];

export const HowItWorks = () => (
  <section id="how" className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24 md:py-32">
    <div className="mb-14 max-w-2xl">
      <p className="overline mb-4">How it works</p>
      <h2 className="font-heading text-4xl sm:text-5xl font-semibold tracking-tight leading-none">
        Four steps to the front row.
      </h2>
    </div>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-border/60 border border-border/60 rounded-2xl overflow-hidden">
      {steps.map((s, i) => (
        <motion.div
          key={s.n}
          data-testid={`step-${i}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="bg-obsidian p-8 hover:bg-white/[0.02] transition-colors duration-300"
        >
          <div className="font-heading text-5xl font-bold text-volt/90">{s.n}</div>
          <h3 className="font-heading text-xl font-medium mt-6 mb-2">{s.title}</h3>
          <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
        </motion.div>
      ))}
    </div>
  </section>
);

export default HowItWorks;

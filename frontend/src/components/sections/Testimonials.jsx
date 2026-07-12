import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const stories = [
  { quote: "They got us four seats to the Champions League final in 48 hours. Flights, a hotel two blocks from the ground, everything. Unreal.", name: "Marcus D.", trip: "UCL Final · Wembley" },
  { quote: "Our IPL trip was flawless — visas sorted, transfers waiting, and courtside energy I'll never forget.", name: "Aisha R.", trip: "IPL · Mumbai" },
  { quote: "Tomorrowland with zero stress. Sportily handled the chaos so we just danced.", name: "Leon & crew", trip: "Tomorrowland · Boom" },
];

export const Testimonials = () => (
  <section id="stories" className="border-y border-white/10 bg-[#080808]">
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24 md:py-32">
      <div className="mb-14 max-w-2xl">
        <p className="overline mb-4">Fan stories</p>
        <h2 className="font-heading text-4xl sm:text-5xl font-semibold tracking-tight leading-none">
          Memories we helped make.
        </h2>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {stories.map((s, i) => (
          <motion.figure
            key={i}
            data-testid={`testimonial-${i}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-white/10 bg-card p-8 flex flex-col"
          >
            <Quote className="h-8 w-8 text-volt mb-6" strokeWidth={1.5} />
            <blockquote className="text-gray-200 leading-relaxed flex-1">"{s.quote}"</blockquote>
            <figcaption className="mt-6 pt-6 border-t border-white/10">
              <div className="font-heading font-medium">{s.name}</div>
              <div className="text-sm text-gray-500">{s.trip}</div>
            </figcaption>
          </motion.figure>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;

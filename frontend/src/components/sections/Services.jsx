import { motion } from "framer-motion";
import { Ticket, Plane, BedDouble, StampIcon } from "lucide-react";

const FLIGHT = "https://images.unsplash.com/photo-1512100356356-de1b84283e18?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDV8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB0cmF2ZWwlMjBsaWZlc3R5bGUlMjBmbGlnaHR8ZW58MHx8fHwxNzgzODk5NTExfDA&ixlib=rb-4.1.0&q=85";
const STAY = "https://images.unsplash.com/photo-1666307536243-a9bf2d66c51d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1MDV8MHwxfHNlYXJjaHwzfHxsdXh1cnklMjB0cmF2ZWwlMjBsaWZlc3R5bGUlMjBmbGlnaHR8ZW58MHx8fHwxNzgzODk5NTExfDA&ixlib=rb-4.1.0&q=85";

const services = [
  { icon: Ticket, title: "Event Tickets", desc: "Verified seats — from category-1 to hospitality suites — for sold-out fixtures worldwide." },
  { icon: Plane, title: "Flights", desc: "Routing, upgrades and timing built around kick-off, so you land ready to cheer." },
  { icon: BedDouble, title: "Accommodation", desc: "Hand-picked hotels close to the action, matched to your budget and style." },
  { icon: StampIcon, title: "Visas & Logistics", desc: "Paperwork, transfers and on-ground support handled end to end." },
];

export const Services = () => (
  <section id="services" className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24 md:py-32">
    <div className="grid lg:grid-cols-12 gap-10 items-end mb-14">
      <div className="lg:col-span-7">
        <p className="overline mb-4">Everything, arranged</p>
        <h2 className="font-heading text-4xl sm:text-5xl font-semibold tracking-tight leading-none">
          One team for the entire journey.
        </h2>
      </div>
      <p className="lg:col-span-5 text-gray-400 leading-relaxed">
        You bring the passion. We handle the four things that stand between you and the stadium —
        tickets, flights, a bed, and the border.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-4 border-t border-l border-border/60">
      {services.map((s, i) => (
        <motion.div
          key={s.title}
          data-testid={`service-${i}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08 }}
          className="group border-r border-b border-border/60 p-8 hover:bg-white/[0.03] transition-colors duration-300"
        >
          <s.icon className="h-8 w-8 text-volt mb-6" strokeWidth={1.5} />
          <h3 className="font-heading text-2xl font-medium tracking-tight mb-3">{s.title}</h3>
          <p className="text-gray-400 leading-relaxed text-sm">{s.desc}</p>
        </motion.div>
      ))}
    </div>

    <div className="grid md:grid-cols-2 gap-6 mt-6">
      {[FLIGHT, STAY].map((img, i) => (
        <div key={i} className="relative h-64 rounded-2xl overflow-hidden border border-white/10 group">
          <img src={img} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 to-transparent" />
          <div className="absolute bottom-6 left-6">
            <p className="overline mb-1">{i === 0 ? "In the air" : "On the ground"}</p>
            <p className="font-heading text-xl font-semibold">{i === 0 ? "Business-class routing" : "Suites by the stadium"}</p>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Services;

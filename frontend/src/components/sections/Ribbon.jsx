import Marquee from "react-fast-marquee";
import { Star } from "lucide-react";
import { RIBBON } from "../../data/content";

export const Ribbon = () => (
  <div className="bg-[#111] border-y border-white/10 py-4">
    <Marquee speed={40} gradient={false}>
      {RIBBON.map((item, i) => (
        <div key={i} className="flex items-center">
          <span className="font-heading uppercase tracking-[0.15em] text-white text-sm md:text-base px-8">
            {item}
          </span>
          <Star className="h-3.5 w-3.5 text-volt" strokeWidth={1.5} fill="#DFFF00" />
        </div>
      ))}
    </Marquee>
  </div>
);

export default Ribbon;

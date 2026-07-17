import Marquee from "react-fast-marquee";
import { RIBBON } from "../data/content";

export default function Ribbon() {
  return (
    <div className="bg-stone-100 border-y border-stone-200 py-4">
      <Marquee speed={38} gradient gradientColor="#F5F5F4" gradientWidth={80}>
        {RIBBON.map((item, i) => (
          <div key={i} className="flex items-center">
            <span className="font-heading italic text-stone-700 text-lg md:text-xl px-8">{item}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-amber-700" />
          </div>
        ))}
      </Marquee>
    </div>
  );
}

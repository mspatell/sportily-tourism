import { Mail, MapPin, Phone } from "lucide-react";

export const Footer = () => (
  <footer id="contactinfo" className="border-t border-white/10">
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 grid md:grid-cols-4 gap-10">
      <div className="md:col-span-2">
        <div className="flex items-center gap-2 mb-4">
          <span className="font-heading font-extrabold text-xl tracking-tight">SPORTILY</span>
          <span className="h-2 w-2 rounded-full bg-volt" />
        </div>
        <p className="text-gray-400 max-w-sm leading-relaxed">
          Sportily Tourism — sports & live-event travel experts. We make the dream trip happen,
          ticket to touchdown.
        </p>
      </div>
      <div>
        <p className="overline mb-4">Reach us</p>
        <ul className="space-y-3 text-sm text-gray-300">
          <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-volt" strokeWidth={1.5} /> hello@sportily.travel</li>
          <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-volt" strokeWidth={1.5} /> +1 (800) 555-0142</li>
          <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-volt" strokeWidth={1.5} /> London · Dubai · Mumbai</li>
        </ul>
      </div>
      <div>
        <p className="overline mb-4">Events</p>
        <ul className="space-y-2 text-sm text-gray-400">
          <li>Football</li><li>Tennis Grand Slams</li><li>Cricket ICC & IPL</li>
          <li>NBA</li><li>Olympics</li><li>Tomorrowland</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-white/10 py-6 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} Sportily Tourism. All rights reserved.
    </div>
  </footer>
);

export default Footer;

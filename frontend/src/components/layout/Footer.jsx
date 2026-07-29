import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-100/60">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <img src="/favicon.png" alt="Sportily" className="h-8 w-8" />
            <span className="font-heading text-2xl tracking-tight text-stone-900">Sportily</span>
          </div>
          <p className="text-stone-600 max-w-sm leading-relaxed">
            Sportily Tourism — sports & live-event travel experts. We make the dream trip happen,
            from ticket to touchdown.
          </p>
        </div>
        <div>
          <p className="overline mb-4">Explore</p>
          <ul className="space-y-2 text-sm text-stone-600">
            <li><Link to="/events" className="hover:text-amber-700 transition-colors">Events</Link></li>
            <li><Link to="/gallery" className="hover:text-amber-700 transition-colors">Gallery</Link></li>
            <li><Link to="/services" className="hover:text-amber-700 transition-colors">Services</Link></li>
            <li><Link to="/about" className="hover:text-amber-700 transition-colors">About</Link></li>
            <li><Link to="/contact" className="hover:text-amber-700 transition-colors">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="overline mb-4">Reach us</p>
          <ul className="space-y-3 text-sm text-stone-600">
            <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-amber-700" strokeWidth={1.5} /> hello@sportilytourism.com</li>
            <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-amber-700" strokeWidth={1.5} /> +91 7572997755</li>
            <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-amber-700" strokeWidth={1.5} /> Ahmedabad · New Jersey · Auckland · Toronto</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-stone-200 py-6 text-center text-sm text-stone-500">
        © 2024 - 2026 Sportily Tourism Pvt Ltd. All rights reserved.
      </div>
    </footer>
  );
}

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Reveal from "../components/Reveal";
import { GALLERY, CATEGORIES } from "../data/gallery";

export default function Gallery() {
  const [cat, setCat] = useState("All");
  const [lightbox, setLightbox] = useState(null); // index into filtered

  const filtered = useMemo(
    () => (cat === "All" ? GALLERY : GALLERY.filter((g) => g.category === cat)),
    [cat]
  );

  const open = (i) => setLightbox(i);
  const close = () => setLightbox(null);
  const prev = (e) => { e.stopPropagation(); setLightbox((i) => (i - 1 + filtered.length) % filtered.length); };
  const next = (e) => { e.stopPropagation(); setLightbox((i) => (i + 1) % filtered.length); };

  return (
    <div data-testid="page-gallery">
      {/* Header */}
      <section className="pt-36 pb-10 md:pt-44">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <Reveal>
            <p className="overline mb-4">The gallery</p>
            <h1 className="font-heading text-5xl sm:text-6xl tracking-tighter font-light text-stone-900 leading-[1.08]">
              Moments we made possible.
            </h1>
            <p className="mt-6 text-lg text-stone-600 leading-relaxed max-w-2xl">
              A look at the trips, the roars and the celebrations — from stadium tunnels to festival
              mainstages and the journeys in between.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 mb-10">
        <div className="flex flex-wrap gap-3" data-testid="gallery-filters">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              data-testid={`filter-${c.toLowerCase()}`}
              onClick={() => { setCat(c); }}
              className={`text-sm px-5 py-2.5 rounded-full border transition-colors duration-200 ${
                cat === c
                  ? "bg-amber-700 text-white border-amber-700"
                  : "bg-white text-stone-700 border-stone-200 hover:border-amber-700 hover:text-amber-700"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Masonry grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-28">
        {filtered.length === 0 ? (
          <div className="py-24 text-center text-stone-500" data-testid="gallery-empty">No photos in this category yet.</div>
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]">
            {filtered.map((g, i) => (
              <Reveal key={g.src} delay={(i % 3) * 0.06}>
                <button
                  onClick={() => open(i)}
                  data-testid={`gallery-item-${i}`}
                  className="group relative mb-6 block w-full overflow-hidden rounded-2xl border border-stone-100 shadow-[0_8px_30px_rgb(0,0,0,0.05)] break-inside-avoid"
                >
                  <img src={g.src} alt={g.title} loading="lazy" className="w-full object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span className="text-white font-heading text-lg">{g.title}</span>
                    <span className="text-[10px] uppercase tracking-wide font-bold bg-white/90 text-amber-800 px-2.5 py-1 rounded-full">{g.category}</span>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && filtered[lightbox] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            data-testid="gallery-lightbox"
            className="fixed inset-0 z-[100] bg-stone-900/90 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <button onClick={close} data-testid="lightbox-close" className="absolute top-6 right-6 h-11 w-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors">
              <X className="h-5 w-5" />
            </button>
            <button onClick={prev} data-testid="lightbox-prev" className="absolute left-4 md:left-8 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button onClick={next} data-testid="lightbox-next" className="absolute right-4 md:right-8 h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors">
              <ChevronRight className="h-6 w-6" />
            </button>
            <motion.figure
              key={filtered[lightbox].src}
              initial={{ scale: 0.94, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-5xl w-full"
            >
              <img src={filtered[lightbox].src} alt={filtered[lightbox].title} className="w-full max-h-[80vh] object-contain rounded-xl" />
              <figcaption className="text-center mt-4 text-stone-200">
                <span className="font-heading text-xl">{filtered[lightbox].title}</span>
                <span className="text-stone-400 ml-3 text-sm">{filtered[lightbox].category}</span>
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

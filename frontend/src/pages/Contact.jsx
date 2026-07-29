import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Send, CheckCircle2, Mail, Phone, MapPin, MessageCircle, Building2 } from "lucide-react";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { EVENTS, LIFESTYLE_IMG } from "../data/content";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const empty = { name: "", email: "", phone: "", event: "", travelers: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [config, setConfig] = useState(null);

  useEffect(() => {
    axios.get(`${API}/config`).then((r) => setConfig(r.data)).catch(() => {});
  }, []);

  const whatsappLink = `${config?.whatsapp_link || "https://wa.me/917572997755"}?text=${encodeURIComponent(
    "Hi Sportily Tourism! I'd like to plan a sports trip."
  )}`;

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in your name, email and message.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/inquiries`, form);
      setDone(true);
      setForm(empty);
      toast.success("Request sent! Our team will reach out within 48 hours.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls = "bg-stone-50 border-stone-200 text-stone-900 placeholder:text-stone-400 focus-visible:ring-2 focus-visible:ring-amber-700/30 focus-visible:border-amber-700 rounded-xl h-12";

  return (
    <div data-testid="page-contact" className="pt-36 pb-28 md:pt-44">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-12 gap-12">
        {/* Left */}
        <div className="lg:col-span-5">
          <p className="overline mb-4">Start the journey</p>
          <h1 className="font-heading text-5xl sm:text-6xl tracking-tighter font-light text-stone-900 leading-[1.08]">
            Tell us the dream trip.
          </h1>
          <p className="mt-6 text-lg text-stone-600 leading-relaxed max-w-md">
            Drop your details and the event you're chasing. A dedicated planner sends back a tailored
            quote — tickets, flights, stays and visas — within 48 hours. No obligation.
          </p>

          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" data-testid="whatsapp-btn" className="mt-8 group inline-flex items-center gap-3 bg-[#25D366] text-white font-semibold px-6 py-3.5 rounded-full hover:brightness-95 active:scale-95 transition-transform duration-150">
            <MessageCircle className="h-5 w-5" strokeWidth={2} /> Message us on WhatsApp
          </a>

          <div className="mt-6 rounded-3xl overflow-hidden shadow-[0_12px_40px_rgb(0,0,0,0.08)]">
            <img src={LIFESTYLE_IMG} alt="Travellers on the tarmac" className="w-full h-52 object-cover" />
          </div>

          <p className="mt-6 text-stone-600 italic leading-relaxed">
            {config?.tagline || "We believe that travel brings knowledge, knowledge brings opportunity, and opportunity brings success."}
          </p>

          <ul className="mt-6 space-y-3 text-stone-700">
            <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-amber-700" strokeWidth={1.5} /> +91 75729 97755</li>
            <li className="flex items-center gap-3"><MapPin className="h-4 w-4 text-amber-700" strokeWidth={1.5} /> Ahmedabad · New Jersey · Auckland · Toronto</li>
          </ul>
        </div>

        {/* Right - form */}
        <div className="lg:col-span-7">
          <div className="rounded-3xl border border-stone-100 bg-white p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.05)]">
            {done ? (
              <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center text-center py-16" data-testid="contact-success">
                <CheckCircle2 className="h-14 w-14 text-amber-700 mb-6" strokeWidth={1.5} />
                <h3 className="font-heading text-2xl text-stone-900 mb-2">Request received</h3>
                <p className="text-stone-600 max-w-sm">Thanks — we've got it. Your Sportily planner will be in touch within 48 hours.</p>
                <button data-testid="contact-reset-btn" onClick={() => setDone(false)} className="mt-8 text-sm text-amber-700 font-semibold hover:underline">
                  Send another request
                </button>
              </motion.div>
            ) : (
              <form onSubmit={submit} className="space-y-5" data-testid="contact-form">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="name" className="text-stone-700 mb-2 block">Full name *</Label>
                    <Input id="name" data-testid="input-name" value={form.name} onChange={set("name")} placeholder="Alex Fan" className={inputCls} />
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-stone-700 mb-2 block">Email *</Label>
                    <Input id="email" type="email" data-testid="input-email" value={form.email} onChange={set("email")} placeholder="you@email.com" className={inputCls} />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <Label htmlFor="phone" className="text-stone-700 mb-2 block">Phone</Label>
                    <Input id="phone" data-testid="input-phone" value={form.phone} onChange={set("phone")} placeholder="+1 ..." className={inputCls} />
                  </div>
                  <div>
                    <Label htmlFor="travelers" className="text-stone-700 mb-2 block">Travelers</Label>
                    <Input id="travelers" data-testid="input-travelers" value={form.travelers} onChange={set("travelers")} placeholder="e.g. 2 adults" className={inputCls} />
                  </div>
                </div>
                <div>
                  <Label htmlFor="event" className="text-stone-700 mb-2 block">Which event?</Label>
                  <select id="event" data-testid="select-event" value={form.event} onChange={set("event")} className="w-full h-12 rounded-xl bg-stone-50 border border-stone-200 text-stone-900 px-3 focus:outline-none focus:ring-2 focus:ring-amber-700/30 focus:border-amber-700">
                    <option value="">Select an event…</option>
                    {EVENTS.map((e) => <option key={e.id} value={e.title}>{e.tag} — {e.title}</option>)}
                    <option value="Other">Something else</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="message" className="text-stone-700 mb-2 block">Tell us more *</Label>
                  <Textarea id="message" data-testid="input-message" value={form.message} onChange={set("message")} placeholder="Dates, budget, who's coming, any special requests…" rows={4} className={`${inputCls} h-auto`} />
                </div>
                <button type="submit" data-testid="contact-submit-btn" disabled={loading} className="group w-full inline-flex items-center justify-center gap-2 bg-amber-700 text-white font-semibold py-4 rounded-full hover:bg-amber-800 active:scale-[0.98] transition-transform duration-150 disabled:opacity-60">
                  {loading ? "Sending…" : "Send my request"}
                  {!loading && <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" strokeWidth={2} />}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Offices */}
      <section className="max-w-7xl mx-auto px-6 lg:px-8 mt-24 md:mt-28">
        <div className="mb-10">
          <p className="overline mb-4">Find us worldwide</p>
          <h2 className="font-heading text-3xl sm:text-4xl text-stone-900">Four offices, one mission.</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(config?.offices || []).map((o, i) => (
            <motion.div
              key={o.label}
              data-testid={`office-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="bg-white rounded-3xl border border-stone-100 p-7 shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex flex-col"
            >
              <Building2 className="h-7 w-7 text-amber-700 mb-4" strokeWidth={1.5} />
              <p className="text-xs uppercase tracking-[0.16em] font-bold text-amber-700">{o.label}</p>
              <h3 className="font-heading text-xl text-stone-900 mt-1 mb-3">{o.city}</h3>
              <p className="text-stone-600 text-sm leading-relaxed flex-1">{o.address}</p>
              <a href={`tel:${(o.phone || "").replace(/\s/g, "")}`} className="mt-4 inline-flex items-center gap-2 text-stone-800 font-medium text-sm hover:text-amber-700 transition-colors">
                <Phone className="h-4 w-4 text-amber-700" strokeWidth={1.6} /> {o.phone}
              </a>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

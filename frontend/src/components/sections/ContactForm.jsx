import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Send, CheckCircle2 } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { EVENTS } from "../../data/content";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const empty = { name: "", email: "", phone: "", event: "", travelers: "", message: "" };

export const ContactForm = () => {
  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

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
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputCls =
    "bg-[#111] border-white/15 text-white placeholder:text-gray-600 focus-visible:ring-volt focus-visible:ring-2 focus-visible:border-volt h-12";

  return (
    <section id="contact" className="max-w-[1400px] mx-auto px-6 lg:px-10 py-24 md:py-32">
      <div className="grid lg:grid-cols-12 gap-14 items-start">
        <div className="lg:col-span-5">
          <p className="overline mb-4">Start the journey</p>
          <h2 className="font-heading text-4xl sm:text-5xl font-semibold tracking-tight leading-none">
            Tell us the dream trip.
          </h2>
          <p className="text-gray-400 mt-6 leading-relaxed max-w-md">
            Drop your details and the event you're chasing. A dedicated planner sends back a
            tailored quote — tickets, flights, stays and visas — within 48 hours. No obligation.
          </p>
        </div>

        <div className="lg:col-span-7 rounded-3xl border border-white/10 bg-card p-8 md:p-10">
          {done ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center py-16"
              data-testid="contact-success"
            >
              <CheckCircle2 className="h-14 w-14 text-volt mb-6" strokeWidth={1.5} />
              <h3 className="font-heading text-2xl font-semibold mb-2">Request received</h3>
              <p className="text-gray-400 max-w-sm">
                Thanks — we've got it. Your Sportily planner will be in touch within 48 hours.
              </p>
              <button
                data-testid="contact-reset-btn"
                onClick={() => setDone(false)}
                className="mt-8 text-sm text-volt hover:underline"
              >
                Send another request
              </button>
            </motion.div>
          ) : (
            <form onSubmit={submit} className="space-y-5" data-testid="contact-form">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="name" className="text-gray-300 mb-2 block">Full name *</Label>
                  <Input id="name" data-testid="input-name" value={form.name} onChange={set("name")} placeholder="Alex Fan" className={inputCls} />
                </div>
                <div>
                  <Label htmlFor="email" className="text-gray-300 mb-2 block">Email *</Label>
                  <Input id="email" type="email" data-testid="input-email" value={form.email} onChange={set("email")} placeholder="you@email.com" className={inputCls} />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <Label htmlFor="phone" className="text-gray-300 mb-2 block">Phone</Label>
                  <Input id="phone" data-testid="input-phone" value={form.phone} onChange={set("phone")} placeholder="+1 ..." className={inputCls} />
                </div>
                <div>
                  <Label htmlFor="travelers" className="text-gray-300 mb-2 block">Travelers</Label>
                  <Input id="travelers" data-testid="input-travelers" value={form.travelers} onChange={set("travelers")} placeholder="e.g. 2 adults" className={inputCls} />
                </div>
              </div>

              <div>
                <Label htmlFor="event" className="text-gray-300 mb-2 block">Which event?</Label>
                <select
                  id="event"
                  data-testid="select-event"
                  value={form.event}
                  onChange={set("event")}
                  className="w-full h-12 rounded-md bg-[#111] border border-white/15 text-white px-3 focus:outline-none focus:ring-2 focus:ring-volt focus:border-volt"
                >
                  <option value="">Select an event…</option>
                  {EVENTS.map((e) => (
                    <option key={e.id} value={e.title}>{e.tag} — {e.title}</option>
                  ))}
                  <option value="Other">Something else</option>
                </select>
              </div>

              <div>
                <Label htmlFor="message" className="text-gray-300 mb-2 block">Tell us more *</Label>
                <Textarea id="message" data-testid="input-message" value={form.message} onChange={set("message")} placeholder="Dates, budget, who's coming, any special requests…" rows={4} className={`${inputCls} h-auto`} />
              </div>

              <button
                type="submit"
                data-testid="contact-submit-btn"
                disabled={loading}
                className="group w-full inline-flex items-center justify-center gap-2 bg-volt text-black font-semibold py-4 rounded-full hover:brightness-110 active:scale-[0.98] transition-transform duration-150 disabled:opacity-60"
              >
                {loading ? "Sending…" : "Send my request"}
                {!loading && <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" strokeWidth={2} />}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactForm;

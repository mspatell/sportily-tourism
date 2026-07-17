import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { LogOut, Inbox, Users, Search, Mail, Phone, Calendar, RefreshCw } from "lucide-react";
import { api, clearToken, getToken } from "../../lib/auth";

function fmtDate(iso) {
  try {
    return new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
  } catch {
    return iso;
  }
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState({ total: 0, by_event: [] });
  const [q, setQ] = useState("");
  const [active, setActive] = useState(null);

  const load = async () => {
    setLoading(true);
    try {
      const [inq, st] = await Promise.all([api.get("/inquiries"), api.get("/inquiries/stats")]);
      setInquiries(inq.data);
      setStats(st.data);
      setActive((prev) => prev || inq.data[0] || null);
    } catch (err) {
      if (err.response?.status === 401) {
        clearToken();
        navigate("/admin/login", { replace: true });
      } else {
        toast.error("Could not load leads.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!getToken()) {
      navigate("/admin/login", { replace: true });
      return;
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    clearToken();
    navigate("/admin/login", { replace: true });
  };

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return inquiries;
    return inquiries.filter((i) =>
      [i.name, i.email, i.event, i.message].filter(Boolean).some((v) => v.toLowerCase().includes(s))
    );
  }, [q, inquiries]);

  const topEvent = stats.by_event?.[0];

  return (
    <div className="min-h-screen bg-stone-50" data-testid="page-admin-dashboard">
      {/* Top bar */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-stone-200/70">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/favicon.png" alt="Sportily" className="h-7 w-7" />
            <span className="font-heading text-xl tracking-tight text-stone-900">Sportily</span>
            <span className="text-stone-300 mx-1">/</span>
            <span className="text-sm text-stone-500">Leads</span>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={load} data-testid="admin-refresh-btn" className="inline-flex items-center gap-2 text-sm text-stone-600 hover:text-amber-700 transition-colors">
              <RefreshCw className="h-4 w-4" strokeWidth={1.8} /> Refresh
            </button>
            <button onClick={logout} data-testid="admin-logout-btn" className="inline-flex items-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-sm font-medium px-4 py-2 rounded-full transition-colors">
              <LogOut className="h-4 w-4" strokeWidth={1.8} /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-10">
        <h1 className="font-heading text-4xl text-stone-900 mb-8">Submitted leads</h1>

        {/* Stat cards */}
        <div className="grid sm:grid-cols-3 gap-6 mb-10">
          {[
            { icon: Inbox, label: "Total inquiries", value: stats.total },
            { icon: Users, label: "Showing now", value: filtered.length },
            { icon: Calendar, label: "Top event", value: topEvent ? topEvent.event : "—", small: true },
          ].map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="bg-white rounded-2xl border border-stone-100 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
            >
              <c.icon className="h-6 w-6 text-amber-700 mb-4" strokeWidth={1.6} />
              <div className={`font-heading text-stone-900 ${c.small ? "text-xl" : "text-3xl"}`} data-testid={`stat-${i}`}>{c.value}</div>
              <div className="text-sm text-stone-500 mt-1">{c.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-6 max-w-md">
          <Search className="h-4 w-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            data-testid="admin-search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, email, event…"
            className="w-full h-11 rounded-full bg-white border border-stone-200 pl-11 pr-4 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/30 focus:border-amber-700"
          />
        </div>

        {/* Content */}
        {loading ? (
          <div className="text-stone-500 py-20 text-center" data-testid="admin-loading">Loading leads…</div>
        ) : filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-stone-100 py-20 text-center text-stone-500" data-testid="admin-empty">
            No leads yet. Inquiries submitted from the site will appear here.
          </div>
        ) : (
          <div className="grid lg:grid-cols-5 gap-6">
            {/* List */}
            <div className="lg:col-span-2 space-y-3" data-testid="admin-inquiry-list">
              {filtered.map((i) => (
                <button
                  key={i.id}
                  data-testid={`inquiry-row-${i.id}`}
                  onClick={() => setActive(i)}
                  className={`w-full text-left bg-white rounded-2xl border p-5 transition-colors duration-200 ${active?.id === i.id ? "border-amber-700 ring-2 ring-amber-700/15" : "border-stone-100 hover:border-stone-300"}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold text-stone-900 truncate">{i.name}</span>
                    {i.event && <span className="text-[11px] uppercase tracking-wide font-bold bg-amber-50 text-amber-800 px-2.5 py-1 rounded-full whitespace-nowrap">{i.event.length > 18 ? i.event.slice(0, 18) + "…" : i.event}</span>}
                  </div>
                  <div className="text-sm text-stone-500 mt-1 truncate">{i.email}</div>
                  <div className="text-xs text-stone-400 mt-2">{fmtDate(i.created_at)}</div>
                </button>
              ))}
            </div>

            {/* Detail */}
            <div className="lg:col-span-3">
              {active && (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-2xl border border-stone-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] sticky top-24"
                  data-testid="admin-inquiry-detail"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h2 className="font-heading text-2xl text-stone-900">{active.name}</h2>
                      <p className="text-sm text-stone-400 mt-1">{fmtDate(active.created_at)}</p>
                    </div>
                    {active.event && <span className="text-xs uppercase tracking-wide font-bold bg-amber-700 text-white px-3 py-1.5 rounded-full">{active.event}</span>}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <a href={`mailto:${active.email}`} className="flex items-center gap-3 text-stone-700 hover:text-amber-700 transition-colors">
                      <Mail className="h-4 w-4 text-amber-700" strokeWidth={1.6} /> {active.email}
                    </a>
                    <div className="flex items-center gap-3 text-stone-700">
                      <Phone className="h-4 w-4 text-amber-700" strokeWidth={1.6} /> {active.phone || "—"}
                    </div>
                    <div className="flex items-center gap-3 text-stone-700">
                      <Users className="h-4 w-4 text-amber-700" strokeWidth={1.6} /> {active.travelers || "—"} travelers
                    </div>
                  </div>
                  <div className="border-t border-stone-100 pt-6">
                    <p className="overline mb-3">Message</p>
                    <p className="text-stone-700 leading-relaxed whitespace-pre-wrap">{active.message}</p>
                  </div>
                  <a
                    href={`mailto:${active.email}?subject=Your Sportily trip inquiry`}
                    className="mt-8 inline-flex items-center gap-2 bg-amber-700 text-white font-semibold px-6 py-3 rounded-full hover:bg-amber-800 transition-colors"
                    data-testid="admin-reply-btn"
                  >
                    <Mail className="h-4 w-4" strokeWidth={1.8} /> Reply by email
                  </a>
                </motion.div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Lock, ArrowRight } from "lucide-react";
import { login, getToken } from "../../lib/auth";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getToken()) navigate("/admin", { replace: true });
  }, [navigate]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back.");
      navigate("/admin", { replace: true });
    } catch (err) {
      const d = err.response?.data?.detail;
      toast.error(typeof d === "string" ? d : "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-6" data-testid="page-admin-login">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="flex items-center gap-2 mb-8 justify-center">
          <img src="/favicon.png" alt="Sportily" className="h-8 w-8" />
          <span className="font-heading text-2xl tracking-tight text-stone-900">Sportily</span>
        </div>
        <div className="bg-white rounded-3xl border border-stone-100 shadow-[0_8px_30px_rgb(0,0,0,0.05)] p-8 md:p-10">
          <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center mb-6">
            <Lock className="h-6 w-6 text-amber-700" strokeWidth={1.5} />
          </div>
          <h1 className="font-heading text-3xl text-stone-900 mb-1">Admin access</h1>
          <p className="text-stone-500 mb-8">Sign in to view submitted leads.</p>
          <form onSubmit={submit} className="space-y-4" data-testid="admin-login-form">
            <div>
              <label className="text-sm text-stone-700 mb-2 block">Email</label>
              <input
                type="email"
                data-testid="admin-email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@sportily.travel"
                className="w-full h-12 rounded-xl bg-stone-50 border border-stone-200 px-4 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/30 focus:border-amber-700"
              />
            </div>
            <div>
              <label className="text-sm text-stone-700 mb-2 block">Password</label>
              <input
                type="password"
                data-testid="admin-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-12 rounded-xl bg-stone-50 border border-stone-200 px-4 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-700/30 focus:border-amber-700"
              />
            </div>
            <button
              type="submit"
              data-testid="admin-login-btn"
              disabled={loading}
              className="group w-full inline-flex items-center justify-center gap-2 bg-amber-700 text-white font-semibold py-3.5 rounded-full hover:bg-amber-800 active:scale-[0.98] transition-transform duration-150 disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign in"}
              {!loading && <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" strokeWidth={2} />}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

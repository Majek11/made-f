import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  // Once auth resolves and user is confirmed admin, redirect
  useEffect(() => {
    if (!authLoading && user && isAdmin) {
      navigate("/admin");
    }
  }, [authLoading, user, isAdmin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) {
      setError("Invalid email or password. Please try again.");
    }
    // Navigation handled by useEffect once isAdmin resolves
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center p-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent/10" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-primary-foreground/5" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex w-16 h-16 rounded-2xl bg-accent items-center justify-center mb-4 shadow-lg">
            <span className="font-display font-bold text-2xl text-foreground">M</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-primary-foreground">Admin Portal</h1>
          <p className="font-body text-primary-foreground/60 text-sm mt-1">MADE Foundation Content Management</p>
        </div>

        {/* Form card */}
        <div className="bg-card rounded-3xl p-8 shadow-2xl border border-border">
          <h2 className="font-display text-xl font-bold text-foreground mb-6">Sign in to your account</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="font-body text-sm font-medium text-foreground block mb-2">Email address</label>
              <div className="relative">
                <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary transition"
                />
              </div>
            </div>

            <div>
              <label className="font-body text-sm font-medium text-foreground block mb-2">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-input bg-background text-foreground text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3">
                <p className="text-destructive text-sm font-body">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-gold py-3 rounded-xl justify-center text-base disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>

        <p className="text-center text-primary-foreground/40 text-xs font-body mt-6">
          Access restricted to authorised administrators only.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;

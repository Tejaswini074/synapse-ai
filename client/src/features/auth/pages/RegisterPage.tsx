import { useState } from "react";
import {
  UserPlus,
  Mail,
  ArrowRight,
  ShieldCheck,
  LockKeyhole,
  AlertCircle,
} from "lucide-react";
import { registerRequest } from "../../../shared/api/authApi";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const googleAuthUrl =
    import.meta.env.VITE_GOOGLE_AUTH_URL ||
    "http://localhost:5000/api/auth/google";
  const githubAuthUrl =
    import.meta.env.VITE_GITHUB_AUTH_URL ||
    "http://localhost:5000/api/auth/github";

  const handleRegister = async () => {
    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await registerRequest({ email, password });
      setSuccess("Account created. You can log in now.");
      setPassword("");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to register right now.";

      if (message === "Failed to fetch") {
        setError(
          "Backend is not reachable on http://localhost:5000. Start the server and try again."
        );
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSocialAuth = (url: string) => {
    window.location.href = url;
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center bg-[#050505] px-4 font-sans selection:bg-emerald-500/30">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-[-10%] top-[-20%] h-[50%] w-[50%] rounded-full bg-emerald-600/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] h-[40%] w-[30%] rounded-full bg-blue-600/5 blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-[420px]">
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className="absolute -inset-4 rounded-full bg-emerald-600/20 blur-xl animate-pulse" />
            <div className="relative rounded-[22px] border border-white/10 bg-gradient-to-br from-emerald-500 to-teal-700 p-3.5 shadow-2xl">
              <UserPlus size={28} className="text-white" />
            </div>
          </div>

          <h1 className="mb-2 text-3xl font-bold tracking-tight text-white">
            Join{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Synapse
            </span>
          </h1>
          <p className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-500">
            Begin your intelligence journey
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[32px] border border-white/[0.06] bg-[#0f111a] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] md:p-10">
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSocialAuth(googleAuthUrl)}
                className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.06]"
              >
                <span className="text-base">G</span>
                Google
              </button>
              <button
                type="button"
                onClick={() => handleSocialAuth(githubAuthUrl)}
                className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.06]"
              >
                <span className="text-[11px] font-black uppercase tracking-[0.18em]">
                  GH
                </span>
                GitHub
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-white/[0.06]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-gray-600">
                Or sign up with email
              </span>
              <div className="h-px flex-1 bg-white/[0.06]" />
            </div>

            <div className="space-y-2">
              <label className="ml-1 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Email Address
              </label>
              <div className="group relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 transition-colors group-focus-within:text-emerald-500"
                  size={18}
                  strokeWidth={1.5}
                />
                <input
                  type="email"
                  value={email}
                  className="w-full rounded-2xl border border-white/5 bg-black/40 p-4 pl-12 text-sm font-medium text-white outline-none transition-all placeholder:text-gray-700 focus:border-emerald-500/40 focus:ring-4 focus:ring-emerald-500/5"
                  placeholder="john@example.com"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="ml-1 text-[10px] font-bold uppercase tracking-widest text-gray-500">
                Password
              </label>
              <div className="group relative">
                <LockKeyhole
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 transition-colors group-focus-within:text-emerald-500"
                  size={18}
                  strokeWidth={1.5}
                />
                <input
                  type="password"
                  value={password}
                  className="w-full rounded-2xl border border-white/5 bg-black/40 p-4 pl-12 text-sm font-medium text-white outline-none transition-all placeholder:text-gray-700 focus:border-emerald-500/40 focus:ring-4 focus:ring-emerald-500/5"
                  placeholder="Create a password"
                  onChange={(event) => setPassword(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      void handleRegister();
                    }
                  }}
                />
              </div>
            </div>

            {error && (
              <div className="flex items-start gap-2 rounded-2xl border border-red-500/15 bg-red-500/8 px-4 py-3 text-sm text-red-300">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div className="rounded-2xl border border-emerald-500/15 bg-emerald-500/8 px-4 py-3 text-sm text-emerald-300">
                {success}
              </div>
            )}

            <button
              onClick={() => void handleRegister()}
              disabled={loading || !email || !password}
              className="group mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 p-4 font-bold text-white shadow-[0_10px_25px_rgba(16,185,129,0.2)] transition-all active:scale-[0.98] hover:bg-emerald-500 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span>{loading ? "Creating account..." : "Get Started"}</span>
              {!loading && (
                <ArrowRight
                  size={18}
                  strokeWidth={2.5}
                  className="transition-transform group-hover:translate-x-1"
                />
              )}
            </button>
          </div>

          <div className="mt-8 border-t border-white/[0.03] pt-8 text-center">
            <div className="mb-4 flex items-center justify-center gap-2 text-[9px] font-bold uppercase tracking-[0.2em] text-gray-600">
              <ShieldCheck size={12} />
              Verified & Secure Access
            </div>
            <p className="text-xs font-medium text-gray-500">
              Already a member?
              <a
                href="/login"
                className="ml-1.5 font-bold text-emerald-400 underline-offset-4 transition-all hover:text-emerald-300 hover:underline"
              >
                Login
              </a>
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-gray-700">
          Synapse Protocol v1.2
        </p>
      </div>
    </div>
  );
};

export default Register;

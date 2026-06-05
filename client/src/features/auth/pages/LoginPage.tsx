import { FormEvent, useEffect, useState } from "react";
import {
  Mail,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  LockKeyhole,
  AlertCircle,
  BadgeInfo,
} from "lucide-react";
import { useApp } from "../../workspace/context/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { loginRequest } from "../../../shared/api/authApi";

const Login = () => {
  const { setCurrentUser } = useApp();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const googleAuthUrl =
    import.meta.env.VITE_GOOGLE_AUTH_URL ||
    "http://localhost:5000/api/auth/google";
  const githubAuthUrl =
    import.meta.env.VITE_GITHUB_AUTH_URL ||
    "http://localhost:5000/api/auth/github";
  const socialAuthEnabled = import.meta.env.VITE_ENABLE_SOCIAL_AUTH === "true";

  useEffect(() => {
    const routedError = (location.state as { error?: string } | null)?.error;
    const queryError = new URLSearchParams(location.search).get("error");

    if (routedError) {
      setError(routedError);
    } else if (queryError) {
      setError("Social login failed. Please try again.");
    }
  }, [location.search, location.state]);

  const formatNameFromEmail = (value: string) =>
    value
      .split("@")[0]
      .split(/[._-]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");

  const navigate = useNavigate();

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await loginRequest({ email: email.trim(), password });
      localStorage.setItem("token", data.token);
      setCurrentUser({
        name: data.user?.name || formatNameFromEmail(data.user?.email || email),
        email: data.user?.email || email,
      });
      navigate("/", { replace: true });
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Unable to sign in. Please try again.";

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

  const handleSocialAuth = (url: string, provider: "Google" | "GitHub") => {
    if (!socialAuthEnabled) {
      setError(
        `${provider} login needs OAuth credentials first. Use email login now, or set VITE_ENABLE_SOCIAL_AUTH=true after configuring the provider.`
      );
      return;
    }

    window.location.href = url;
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#050505] px-4 py-8 font-sans selection:bg-blue-500/30">
      <div className="pointer-events-none absolute left-0 top-0 h-full w-full overflow-hidden">
        <div className="absolute -left-[10%] -top-[10%] h-[40%] w-[40%] rounded-full bg-blue-600/5 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-indigo-600/5 blur-[120px]" />
      </div>

      <div className="relative z-10 grid w-full max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_440px] lg:items-center">
        <section className="hidden rounded-[28px] border border-white/[0.06] bg-white/[0.025] p-8 shadow-[0_24px_80px_rgba(0,0,0,0.35)] lg:block">
          <div className="mb-10 flex items-center gap-3">
            <div className="rounded-2xl border border-blue-400/20 bg-blue-500/10 p-3 text-blue-200">
              <Sparkles size={24} />
            </div>
            <div>
              <p className="text-xs font-black uppercase tracking-[0.22em] text-gray-600">
                Synapse AI
              </p>
              <h2 className="text-2xl font-black text-white">
                Secure AI workspace
              </h2>
            </div>
          </div>

          <div className="grid gap-3">
            {[
              "Chat with multiple AI models",
              "Save chats into offline notes",
              "Organize projects, docs, research, and code",
              "Prepare for encrypted private folders",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-white/[0.05] bg-black/20 p-4"
              >
                <ShieldCheck size={16} className="text-emerald-300" />
                <span className="text-sm font-semibold text-gray-300">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="w-full">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className="absolute -inset-4 animate-pulse rounded-full bg-blue-600/20 blur-xl" />
            <div className="relative rounded-[22px] border border-white/10 bg-gradient-to-br from-blue-600 to-indigo-700 p-3.5 shadow-2xl">
              <Sparkles size={28} className="text-white" />
            </div>
          </div>

          <h1 className="mb-2 text-3xl font-bold tracking-tight text-white">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
              Synapse
            </span>
          </h1>
          <p className="text-sm font-medium tracking-wide text-gray-500">
            ENTER YOUR CREDENTIALS TO ACCESS AI
          </p>
        </div>

        <div className="relative overflow-hidden rounded-[28px] border border-white/[0.06] bg-[#0f111a] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] md:p-8">
          <form onSubmit={handleLogin} className="space-y-6">
            {!socialAuthEnabled && (
              <div className="flex items-start gap-2 rounded-2xl border border-amber-500/15 bg-amber-500/8 px-4 py-3 text-xs leading-5 text-amber-200">
                <BadgeInfo size={16} className="mt-0.5 shrink-0" />
                <span>
                  Social login is parked until OAuth credentials are configured.
                  Email login is ready.
                </span>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleSocialAuth(googleAuthUrl, "Google")}
                className={`flex min-h-12 items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                  socialAuthEnabled
                    ? "border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.06]"
                    : "border-white/[0.04] bg-white/[0.015] text-gray-600 hover:text-gray-400"
                }`}
              >
                <span className="text-base">G</span>
                Google
              </button>
              <button
                type="button"
                onClick={() => handleSocialAuth(githubAuthUrl, "GitHub")}
                className={`flex min-h-12 items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition ${
                  socialAuthEnabled
                    ? "border-white/10 bg-white/[0.03] text-white hover:bg-white/[0.06]"
                    : "border-white/[0.04] bg-white/[0.015] text-gray-600 hover:text-gray-400"
                }`}
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
                Or continue with email
              </span>
              <div className="h-px flex-1 bg-white/[0.06]" />
            </div>

            <div className="space-y-2">
              <label className="ml-1 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                Professional Email
              </label>
              <div className="group/input relative">
                <Mail
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within/input:text-blue-500"
                  size={18}
                  strokeWidth={1.5}
                />
                <input
                  type="email"
                  value={email}
                  className="w-full rounded-2xl border border-white/5 bg-black/40 p-4 pl-12 text-sm font-medium text-white outline-none transition-all placeholder:text-gray-700 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5"
                  placeholder="name@company.com"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="ml-1 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                Password
              </label>
              <div className="group/input relative">
                <LockKeyhole
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 transition-colors group-focus-within/input:text-blue-500"
                  size={18}
                  strokeWidth={1.5}
                />
                <input
                  type="password"
                  value={password}
                  className="w-full rounded-2xl border border-white/5 bg-black/40 p-4 pl-12 text-sm font-medium text-white outline-none transition-all placeholder:text-gray-700 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5"
                  placeholder="Enter your password"
                  onChange={(event) => setPassword(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      void handleLogin();
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

            <button
              type="submit"
              disabled={loading || !email || !password}
              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-white p-4 font-bold text-black shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all active:scale-[0.98] hover:bg-gray-100 disabled:cursor-not-allowed disabled:grayscale disabled:opacity-50"
            >
              <span>{loading ? "Authenticating..." : "Continue"}</span>
              {!loading && (
                <ArrowRight
                  size={18}
                  strokeWidth={3}
                  className="transition-transform group-hover/btn:translate-x-1"
                />
              )}
            </button>
          </div>
        </form>

          <div className="mt-10 flex flex-col items-center gap-4 border-t border-white/[0.03] pt-8">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-600">
              <ShieldCheck size={12} />
              Secure Enterprise Login
            </div>
            <p className="text-xs text-gray-500">
              New here?
              <Link
                to="/register"
                className="ml-1.5 font-bold text-blue-400 underline-offset-4 transition-colors hover:text-blue-300 hover:underline"
              >
                Request Access
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-8 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-gray-700">
          Powered by Synapse Core v1.2
        </p>
        </section>
      </div>
    </div>
  );
};

export default Login;

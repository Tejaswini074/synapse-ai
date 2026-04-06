import { useState } from "react";
import { Mail, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#050505] px-4 font-sans selection:bg-blue-500/30">
      {/* Background Decorative Element */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-indigo-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-[400px]">
        {/* Branding Header */}
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className="absolute -inset-4 bg-blue-600/20 blur-xl rounded-full animate-pulse" />
            <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 p-3.5 rounded-[22px] shadow-2xl border border-white/10">
              <Sparkles size={28} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
            Welcome to <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Synapse</span>
          </h1>
          <p className="text-gray-500 text-sm font-medium tracking-wide">
            ENTER YOUR CREDENTIALS TO ACCESS AI
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#0f111a] border border-white/[0.06] p-8 md:p-10 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">
                Professional Email
              </label>
              <div className="relative group/input">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within/input:text-blue-500 transition-colors" size={18} strokeWidth={1.5} />
                <input
                  type="email"
                  className="w-full bg-black/40 border border-white/5 p-4 pl-12 rounded-2xl text-white outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all placeholder:text-gray-700 text-sm font-medium"
                  placeholder="name@company.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <button
              onClick={handleLogin}
              disabled={loading || !email}
              className="w-full relative group/btn overflow-hidden bg-white text-black font-bold p-4 rounded-2xl transition-all hover:bg-gray-100 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed shadow-[0_0_20px_rgba(255,255,255,0.05)]"
            >
              <span className="relative z-10">{loading ? "Authenticating..." : "Continue"}</span>
              {!loading && <ArrowRight size={18} strokeWidth={3} className="group-hover/btn:translate-x-1 transition-transform" />}
            </button>
          </div>

          {/* Bottom Link */}
          <div className="mt-10 pt-8 border-t border-white/[0.03] flex flex-col items-center gap-4">
             <div className="flex items-center gap-2 text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                <ShieldCheck size={12} />
                Secure Enterprise Login
             </div>
             <p className="text-gray-500 text-xs">
              New here? 
              <a href="/register" className="text-blue-400 hover:text-blue-300 ml-1.5 font-bold transition-colors underline-offset-4 hover:underline">
                Request Access
              </a>
            </p>
          </div>
        </div>

        {/* Footer Credits */}
        <p className="text-center mt-8 text-[10px] text-gray-700 font-bold uppercase tracking-[0.3em]">
          Powered by Synapse Core v1.2
        </p>
      </div>
    </div>
  );
};

export default Login;
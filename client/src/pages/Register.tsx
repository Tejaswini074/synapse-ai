import { UserPlus, Sparkles, User, Mail, ArrowRight, ShieldCheck } from "lucide-react";

const Register = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#050505] px-4 font-sans selection:bg-emerald-500/30">
      {/* Dynamic Background Atmosphere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-emerald-600/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[30%] h-[40%] bg-blue-600/5 blur-[100px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-[400px]">
        {/* Header Section */}
        <div className="mb-10 flex flex-col items-center text-center">
          <div className="relative mb-6">
            <div className="absolute -inset-4 bg-emerald-600/20 blur-xl rounded-full animate-pulse" />
            <div className="relative bg-gradient-to-br from-emerald-500 to-teal-700 p-3.5 rounded-[22px] shadow-2xl border border-white/10">
              <UserPlus size={28} className="text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight mb-2">
            Join <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">Synapse</span>
          </h1>
          <p className="text-gray-500 text-[11px] font-black uppercase tracking-[0.2em]">
            Begin your intelligence journey
          </p>
        </div>

        {/* Registration Card */}
        <div className="bg-[#0f111a] border border-white/[0.06] p-8 md:p-10 rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
          <div className="space-y-5">
            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-emerald-500 transition-colors" size={18} strokeWidth={1.5} />
                <input
                  className="w-full bg-black/40 border border-white/5 p-4 pl-12 rounded-2xl text-white outline-none focus:border-emerald-500/40 focus:ring-4 focus:ring-emerald-500/5 transition-all placeholder:text-gray-700 text-sm font-medium"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-emerald-500 transition-colors" size={18} strokeWidth={1.5} />
                <input
                  type="email"
                  className="w-full bg-black/40 border border-white/5 p-4 pl-12 rounded-2xl text-white outline-none focus:border-emerald-500/40 focus:ring-4 focus:ring-emerald-500/5 transition-all placeholder:text-gray-700 text-sm font-medium"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <button className="w-full relative mt-2 overflow-hidden bg-emerald-600 hover:bg-emerald-500 text-white font-bold p-4 rounded-2xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-[0_10px_25px_rgba(16,185,129,0.2)] group">
              <span>Get Started</span>
              <ArrowRight size={18} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Bottom Footer Section */}
          <div className="mt-8 pt-8 border-t border-white/[0.03] text-center">
            <div className="flex items-center justify-center gap-2 text-[9px] text-gray-600 font-bold uppercase tracking-[0.2em] mb-4">
              <ShieldCheck size={12} />
              Verified & Secure Access
            </div>
            <p className="text-gray-500 text-xs font-medium">
              Already a member? 
              <a href="/login" className="text-emerald-400 hover:text-emerald-300 ml-1.5 font-bold transition-all hover:underline underline-offset-4">
                Login
              </a>
            </p>
          </div>
        </div>

        {/* Branding Subtext */}
        <p className="text-center mt-8 text-[10px] text-gray-700 font-bold uppercase tracking-[0.3em]">
          Synapse Protocol • v1.2
        </p>
      </div>
    </div>
  );
};

export default Register;
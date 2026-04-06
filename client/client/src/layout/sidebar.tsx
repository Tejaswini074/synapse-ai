import { useState } from "react";
import { Plus, MessageSquare, Settings, LogOut, PanelLeft, Sparkles, ShieldCheck, X } from "lucide-react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle - Improved with Glassmorphism */}
      {!open && (
        <button
          className="md:hidden fixed top-4 left-4 z-[60] p-2.5 bg-[#0f111a]/80 backdrop-blur-xl border border-white/10 rounded-xl text-white shadow-2xl transition-all active:scale-90"
          onClick={() => setOpen(true)}
        >
          <PanelLeft size={20} />
        </button>
      )}

      {/* Mobile Overlay */}
      {open && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] md:hidden transition-opacity duration-300"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar Container - Refined Obsidian Color */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-[280px] bg-[#090a0f] border-r border-white/[0.04] p-6 text-white transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-[55] flex flex-col`}
      >
        {/* Mobile Close Button */}
        <button className="md:hidden absolute top-4 right-4 p-2 text-gray-500 hover:text-white transition-colors" onClick={() => setOpen(false)}>
            <X size={20} />
        </button>

        {/* Branding - Premium Minimalist with Multi-layer Glow */}
        <div className="flex items-center gap-3.5 px-1 mb-12 mt-2">
          <div className="relative group">
            <div className="absolute -inset-1.5 bg-blue-600 blur-md opacity-20 group-hover:opacity-40 transition duration-500 rounded-lg"></div>
            <div className="relative bg-gradient-to-br from-blue-600 to-indigo-700 p-2.5 rounded-xl shadow-2xl border border-white/10">
              <Sparkles size={18} className="text-white" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-black text-sm tracking-[0.15em] uppercase bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
              Synapse
            </span>
            <span className="text-[10px] text-blue-500 font-bold tracking-widest uppercase -mt-1">Intelligence</span>
          </div>
        </div>

        {/* New Chat Button - The "Action" Card */}
        <button className="group relative flex items-center justify-center gap-2.5 w-full py-3.5 mb-10 bg-white text-black hover:bg-gray-100 rounded-[18px] transition-all duration-300 font-bold text-[13px] shadow-[0_10px_30px_rgba(255,255,255,0.05)] active:scale-[0.97]">
          <Plus size={16} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-300" />
          New Chat
          <div className="absolute inset-0 rounded-[18px] ring-1 ring-inset ring-black/5" />
        </button>

        {/* History Section - Better Typography & Scannability */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
          <div className="flex items-center gap-3 mb-6 px-2">
            <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.25em]">Recent Activity</span>
            <div className="h-[1px] flex-1 bg-white/[0.03]"></div>
          </div>
          
          <div className="space-y-1.5">
            {[
              "Modern UI Design Tips",
              "React Performance Audit",
              "FastAPI Backend Logic",
              "Tailwind Glassmorphism"
            ].map((title, i) => (
              <button 
                key={i}
                className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-[14px] text-sm transition-all group relative
                ${i === 0 
                  ? "bg-white/[0.05] text-white border border-white/[0.05] shadow-lg" 
                  : "text-gray-500 hover:text-gray-200 hover:bg-white/[0.03]"}`}
              >
                <MessageSquare size={16} className={`${i === 0 ? "text-blue-500" : "text-gray-600 group-hover:text-gray-400"} transition-colors`} />
                <span className="truncate flex-1 text-left font-semibold tracking-tight opacity-80 group-hover:opacity-100">{title}</span>
                {i === 0 && (
                   <div className="absolute right-3 w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Actions - Premium Card Style */}
        <div className="mt-auto pt-6 space-y-2">
          {/* Status Indicator - Professional Badge Style */}
          <div className="flex items-center gap-3 px-4 py-3.5 bg-white/[0.02] border border-white/[0.05] rounded-[20px] mb-4 shadow-inner group cursor-default">
            <div className="bg-blue-600/10 p-1.5 rounded-lg border border-blue-500/20 group-hover:border-blue-500/40 transition-colors">
              <ShieldCheck size={16} className="text-blue-500" />
            </div>
            <div className="flex flex-col">
                <span className="text-[10px] font-black text-white/90 uppercase tracking-widest">Premium Tier</span>
                <span className="text-[9px] text-gray-500 font-bold">Professional Access</span>
            </div>
          </div>

          <button className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm text-gray-500 hover:bg-white/[0.05] hover:text-white transition-all group">
            <Settings size={18} className="group-hover:rotate-45 transition-transform duration-500 opacity-60 group-hover:opacity-100" />
            <span className="font-semibold">Settings</span>
          </button>
          
          <button 
            onClick={() => { localStorage.clear(); window.location.reload(); }}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl text-sm text-red-500/60 hover:bg-red-500/10 hover:text-red-400 transition-all font-bold"
          >
            <LogOut size={18} className="opacity-60" />
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
import { useState } from "react";
import { Plus, MessageSquare, Settings, LogOut, PanelLeft, Sparkles, ShieldCheck, X, Search } from "lucide-react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      {!open && (
        <button
          className="md:hidden fixed top-5 left-5 z-[60] p-2 bg-[#090a0f] border border-white/10 rounded-xl text-white shadow-2xl transition-all"
          onClick={() => setOpen(true)}
        >
          <PanelLeft size={18} />
        </button>
      )}

      {/* Sidebar Container - Ultra Slim & Minimalist */}
      <div
        className={`fixed md:static top-0 left-0 h-screen w-[260px] bg-[#05060a] border-r border-white/[0.03] p-5 text-white transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] z-[55] flex flex-col`}
      >
        {/* Header: Logo & New Chat side-by-side */}
        <div className="flex items-center justify-between mb-10 px-1">
          <div className="flex items-center gap-2.5">
            <div className="relative bg-blue-600/10 p-2 rounded-lg border border-blue-500/20">
              <Sparkles size={14} className="text-blue-400" />
            </div>
            <span className="font-bold text-sm tracking-tight text-white/90">Synapse</span>
          </div>
          
          {/* Small, Iconic New Chat Button */}
          <button className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition-all active:scale-95 group relative">
            <Plus size={16} strokeWidth={2.5} className="group-hover:rotate-90 transition-transform" />
            {/* Tooltip for small button */}
            <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-gray-800 text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap">
              New Chat
            </span>
          </button>
        </div>

        {/* Search Bar - Adds to the "Utility" feel */}
        <div className="relative mb-8 group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-blue-500 transition-colors" size={14} />
          <input 
            type="text" 
            placeholder="Search threads..." 
            className="w-full bg-white/[0.02] border border-white/[0.05] rounded-xl py-2 pl-9 pr-4 text-[11px] outline-none focus:border-blue-500/30 transition-all placeholder:text-gray-700 font-medium"
          />
        </div>

        {/* History Section - Scannable & Elegant */}
        <div className="flex-1 overflow-y-auto custom-scrollbar -mx-1 px-1">
          <div className="flex items-center gap-3 mb-4 px-2">
            <span className="text-[9px] font-black text-gray-700 uppercase tracking-[0.3em]">Recent Activity</span>
            <div className="h-[1px] flex-1 bg-white/[0.02]"></div>
          </div>
          
          <div className="space-y-0.5">
            {[
              "Modern UI Design Tips",
              "React Performance Audit",
              "FastAPI Backend Logic",
              "Tailwind Glassmorphism"
            ].map((title, i) => (
              <button 
                key={i}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[12.5px] transition-all group relative
                ${i === 0 
                  ? "bg-blue-500/5 text-blue-400 border border-blue-500/10" 
                  : "text-gray-500 hover:text-gray-200 hover:bg-white/[0.03]"}`}
              >
                <MessageSquare size={13} className="opacity-60" />
                <span className="truncate flex-1 text-left font-medium tracking-tight">{title}</span>
                {i === 0 && (
                   <div className="w-1 h-1 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,1)]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Footer actions - Fixed to bottom */}
        <div className="mt-auto pt-6 space-y-1">
          <div className="flex items-center justify-between px-3 py-3 bg-white/[0.02] border border-white/[0.04] rounded-2xl mb-4">
             <div className="flex items-center gap-2.5">
                <ShieldCheck size={14} className="text-blue-500" />
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Premium</span>
             </div>
             <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
          </div>

          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[12px] text-gray-500 hover:bg-white/[0.05] hover:text-white transition-all group">
            <Settings size={15} className="opacity-50 group-hover:opacity-100 transition-opacity" />
            <span className="font-semibold">Workspace Settings</span>
          </button>
          
          <button 
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[12px] text-red-500/60 hover:bg-red-500/5 hover:text-red-500 transition-all font-bold"
          >
            <LogOut size={15} className="opacity-50" />
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
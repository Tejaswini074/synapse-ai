import { useState } from "react";
import { Plus, Folder, MoreVertical, Calendar, Zap, LayoutGrid, List, X, ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const [projects, setProjects] = useState<any[]>([
    { id: 1, name: "E-commerce Redesign", date: "2 mins ago" },
    { id: 2, name: "Internal POS System", date: "Yesterday" }
  ]);
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const createProject = () => {
    if (!name.trim()) return;
    setProjects([{ id: Date.now(), name, date: "Just now" }, ...projects]);
    setName("");
  };

  return (
    <div className="fixed inset-0 min-h-screen bg-[#05060a] text-white z-[60] overflow-y-auto custom-scrollbar selection:bg-blue-500/30">
      
      {/* TOP NAVIGATION BAR - Fixed for easy exit */}
      <nav className="sticky top-0 z-10 bg-[#05060a]/80 backdrop-blur-xl border-b border-white/[0.03] px-8 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-500 hover:text-white transition-all group font-bold text-xs uppercase tracking-widest"
          >
            <div className="p-2 bg-white/[0.03] rounded-lg group-hover:bg-white/[0.08] transition-colors">
              <ChevronLeft size={16} />
            </div>
            Back to Dashboard
          </button>

          <button 
            onClick={() => navigate("/")}
            className="p-2.5 bg-red-500/5 hover:bg-red-500/10 text-red-500/50 hover:text-red-500 rounded-xl transition-all border border-transparent hover:border-red-500/20"
          >
            <X size={20} />
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-8 md:p-12 pb-24">
        
        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 animate-fade-in">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Project Management</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Your Workspace</h1>
          </div>

          <div className="flex items-center gap-3 bg-white/[0.02] border border-white/[0.05] p-1.5 rounded-2xl">
             <button className="p-2 bg-white/[0.05] rounded-xl text-blue-400 shadow-xl"><LayoutGrid size={18} /></button>
             <button className="p-2 text-gray-600 hover:text-gray-300 transition-colors"><List size={18} /></button>
          </div>
        </header>

        {/* CREATE PROJECT BAR */}
        <div className="group relative mb-12 max-w-2xl animate-slide-up">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-[26px] blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
          <div className="relative flex gap-3 p-2 bg-[#0c0d12] border border-white/[0.05] rounded-[24px] shadow-2xl">
            <input
              className="bg-transparent px-5 py-3 rounded-xl flex-1 outline-none text-sm font-medium placeholder:text-gray-700"
              placeholder="Start a new architectural project..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && createProject()}
            />
            <button 
              onClick={createProject} 
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-[18px] font-bold text-sm transition-all active:scale-95 flex items-center gap-2 shadow-lg shadow-blue-900/20"
            >
              <Plus size={18} strokeWidth={3} />
              Create
            </button>
          </div>
        </div>

        {/* PROJECTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-delayed">
          {projects.map((p, i) => (
            <div 
              key={p.id} 
              className="group relative bg-[#0c0d12] border border-white/[0.05] rounded-[32px] p-8 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]"
            >
              {/* Card Decoration */}
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-gray-600 hover:text-white transition-colors"><MoreVertical size={20} /></button>
              </div>

              <div className="inline-flex p-4 bg-white/[0.03] rounded-2xl mb-6 group-hover:bg-blue-500/10 group-hover:text-blue-400 transition-all duration-300">
                <Folder size={24} strokeWidth={1.5} />
              </div>

              <h3 className="text-xl font-bold text-white/90 mb-2 truncate group-hover:text-white transition-colors">
                {p.name}
              </h3>

              <div className="flex items-center gap-4 text-gray-600 text-[11px] font-bold uppercase tracking-widest">
                 <div className="flex items-center gap-1.5">
                   <Calendar size={12} />
                   {p.date || "Just now"}
                 </div>
                 <div className="flex items-center gap-1.5 text-emerald-500/70">
                   <Zap size={12} />
                   Active
                 </div>
              </div>

              {/* Decorative background glow */}
              <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-blue-600/5 blur-[60px] group-hover:bg-blue-600/10 transition-all pointer-events-none" />
            </div>
          ))}

          {/* New Project Placeholder */}
          <button className="border-2 border-dashed border-white/[0.02] rounded-[32px] flex flex-col items-center justify-center p-12 text-gray-800 hover:border-white/[0.1] hover:text-gray-500 transition-all cursor-pointer group bg-transparent">
             <Plus size={32} className="mb-2 transition-transform group-hover:scale-110" />
             <span className="text-[10px] font-black uppercase tracking-[0.2em]">Add Module</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Projects;
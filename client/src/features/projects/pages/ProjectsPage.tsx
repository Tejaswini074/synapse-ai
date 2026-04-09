import { useState } from "react";
import {
  Plus,
  Folder,
  MoreVertical,
  Calendar,
  LayoutGrid,
  List,
  X,
  ChevronLeft,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import WorkspaceShell from "../../../shared/layout/WorkspaceShell";
import { useApp } from "../../workspace/context/AppContext";

const Projects = () => {
  const {
    projects,
    createProject,
    currentProjectId,
    setCurrentProjectId,
    deleteProject,
  } = useApp();

  const [name, setName] = useState("");
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");
  const navigate = useNavigate();

  const handleCreate = () => {
    if (!name.trim()) return;
    createProject(name);
    setName("");
  };

  const openProject = (id: number) => {
    if (currentProjectId === id) {
      navigate("/");
      return;
    }
    setCurrentProjectId(id);
    setTimeout(() => {
      navigate("/");
    }, 0);
  };
  return (
    <WorkspaceShell
      title="Projects"
      subtitle="Organize chats, notes, and docs into focused workspaces."
      actions={
        <>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 hover:bg-white/5"
          >
            <ChevronLeft size={16} />
            Back To Chat
          </button>
          <button
            onClick={() => navigate("/")}
            className="rounded-lg border border-white/10 p-2 text-red-400 hover:bg-red-500/10"
          >
            <X size={18} />
          </button>
        </>
      }
    >
      <div className="min-w-0 flex-1 overflow-y-auto custom-scrollbar bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.06),_transparent_24%)]">
        <div className="mx-auto max-w-6xl p-8 md:p-12 pb-24">

        {/* HEADER */}
        <header className="flex justify-between mb-12">
          <h1 className="text-4xl font-bold">Your Workspace</h1>

          <div className="flex gap-2 bg-white/[0.03] p-1 rounded-xl border border-white/5">

            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded-lg transition ${view === "grid"
                  ? "bg-blue-500/20 text-blue-400"
                  : "text-gray-500 hover:text-white"
                }`}
            >
              <LayoutGrid size={18} />
            </button>

            <button
              onClick={() => setView("list")}
              className={`p-2 rounded-lg transition ${view === "list"
                  ? "bg-blue-500/20 text-blue-400"
                  : "text-gray-500 hover:text-white"
                }`}
            >
              <List size={18} />
            </button>

          </div>
        </header>

        {/* CREATE */}
        <div className="mb-10 flex gap-3">
          <input
            className="bg-[#0c0d12] p-3 rounded-xl flex-1"
            placeholder="New project..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
          />
          <button onClick={handleCreate} className="bg-blue-600 px-4 rounded-xl">
            <Plus />
          </button>
        </div>

        {/* PROJECTS VIEW */}
        {view === "grid" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects?.map((p: any) => (
              <div
                key={p.id}
                className="relative bg-[#0c0d12] p-6 rounded-2xl border border-white/5 hover:border-blue-500/30 transition"
              >
                {/* CLICK AREA */}
                <div
                  onClick={() => openProject(p.id)}
                  className="cursor-pointer"
                >
                  <Folder className="mb-4 text-blue-400" />
                  <h3 className="text-lg font-bold">{p.name}</h3>

                  <div className="text-xs text-gray-500 mt-2 flex gap-2">
                    <Calendar size={12} />
                    Just now
                  </div>
                </div>

                {/* MENU */}
                <div className="absolute top-3 right-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // ✅ prevent openProject
                      setMenuOpen(menuOpen === p.id ? null : p.id);
                    }}
                  >
                    <MoreVertical size={18} />
                  </button>

                  {menuOpen === p.id && (
                    <div className="absolute right-0 mt-2 bg-[#111] border border-white/10 rounded-lg shadow-xl z-50">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteProject(p.id);
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/10 w-full"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* ADD NEW */}
            <button
              onClick={() => setName("New Project")}
              className="border border-dashed border-white/10 rounded-2xl flex items-center justify-center p-10 text-gray-500 hover:text-white transition"
            >
              <Plus size={30} />
            </button>
          </div>
        ) : (
          /* LIST VIEW */
          <div className="space-y-3">
            {projects?.map((p: any) => (
              <div
                key={p.id}
                onClick={() => openProject(p.id)}
                className="flex items-center justify-between bg-[#0c0d12] p-4 rounded-xl border border-white/5 hover:border-blue-500/30 transition cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Folder className="text-blue-400" size={18} />
                  <div>
                    <h3 className="text-sm font-semibold">{p.name}</h3>
                    <p className="text-xs text-gray-500">Active</p>
                  </div>
                </div>

                {/* MENU */}
                <div className="relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMenuOpen(menuOpen === p.id ? null : p.id);
                    }}
                  >
                    <MoreVertical size={18} />
                  </button>

                  {menuOpen === p.id && (
                    <div className="absolute right-0 mt-2 bg-[#111] border border-white/10 rounded-lg shadow-xl z-50">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteProject(p.id);
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-red-500/10 w-full"
                      >
                        <Trash2 size={14} />
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </WorkspaceShell>
  );
};

export default Projects;

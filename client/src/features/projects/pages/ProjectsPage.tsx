import { useEffect, useMemo, useRef, useState } from "react";
import {
  Archive,
  BookOpen,
  Bot,
  Calendar,
  CheckCircle2,
  ChevronLeft,
  Code2,
  FileSearch,
  FileText,
  Folder,
  FolderLock,
  Image,
  LayoutGrid,
  List,
  LockKeyhole,
  MoreVertical,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
  X,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import WorkspaceShell from "../../../shared/layout/WorkspaceShell";
import { useApp } from "../../workspace/context/AppContext";

const projectModules = [
  { icon: Bot, label: "Chats" },
  { icon: BookOpen, label: "Notes" },
  { icon: FileText, label: "Docs" },
  { icon: Image, label: "Images" },
  { icon: FileSearch, label: "Research" },
  { icon: Code2, label: "Code" },
];

const roadmap = [
  "MVP workspace: projects, chat, notes, docs, local persistence",
  "AI studio: comparison mode, research reports, image generation",
  "Enterprise: team permissions, audit logs, encrypted knowledge bases",
];

const Projects = () => {
  const {
    projects,
    chats,
    notes,
    docs,
    createProject,
    currentProjectId,
    setCurrentProjectId,
    deleteProject,
  } = useApp();

  const [name, setName] = useState("");
  const [menuOpen, setMenuOpen] = useState<number | null>(null);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const createInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!location.state?.focusCreate) return;

    createInputRef.current?.focus();
    navigate(location.pathname, { replace: true, state: null });
  }, [location.pathname, location.state, navigate]);

  const enrichedProjects = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return (projects || [])
      .filter((project: any) =>
        normalizedQuery
          ? project.name.toLowerCase().includes(normalizedQuery)
          : true
      )
      .map((project: any) => {
        const projectChats = chats.filter(
          (chat: any) => chat.projectId === project.id
        );
        const projectNotes = notes.filter(
          (note: any) => note.projectId === project.id
        );
        const projectDocs = docs.filter(
          (doc: any) => doc.projectId === project.id
        );

        return {
          ...project,
          counts: {
            chats: projectChats.length,
            notes: projectNotes.length,
            docs: projectDocs.length,
          },
          total: projectChats.length + projectNotes.length + projectDocs.length,
        };
      });
  }, [chats, docs, notes, projects, query]);

  const handleCreate = () => {
    if (!name.trim()) return;
    createProject(name.trim());
    setName("");
  };

  const openProject = (id: number) => {
    setCurrentProjectId(id);
    navigate("/");
  };

  return (
    <WorkspaceShell
      title="Projects"
      subtitle="Organize AI chats, notes, docs, research, code, images, and private folders."
      actions={
        <>
          <button
            onClick={() => navigate("/")}
            className="hidden items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-bold text-gray-300 transition hover:bg-white/5 md:flex"
          >
            <ChevronLeft size={16} />
            Chat
          </button>
          <button
            onClick={() => navigate("/")}
            className="rounded-lg border border-white/10 p-2 text-red-400 transition hover:bg-red-500/10"
            title="Close"
          >
            <X size={18} />
          </button>
        </>
      }
    >
      <div className="custom-scrollbar min-w-0 flex-1 overflow-y-auto bg-[linear-gradient(180deg,_rgba(13,17,26,0.95),_#050609)]">
        <div className="mx-auto max-w-7xl p-5 pb-24 md:p-8 lg:p-10">
          <div className="mb-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/[0.06] bg-[#0b0f17] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Total Projects</p>
              <p className="mt-4 text-4xl font-black text-white">{projects.length}</p>
              <p className="mt-2 text-sm text-gray-400">Active workspaces ready for AI collaboration.</p>
            </div>
            <div className="rounded-3xl border border-white/[0.06] bg-[#0b0f17] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Saved Items</p>
              <p className="mt-4 text-4xl font-black text-white">{chats.length + notes.length + docs.length}</p>
              <p className="mt-2 text-sm text-gray-400">Chats, notes, and documents in your workspace.</p>
            </div>
            <div className="rounded-3xl border border-white/[0.06] bg-[#0b0f17] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
              <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Workspace Mode</p>
              <p className="mt-4 text-4xl font-black text-white">{view === "grid" ? "Board" : "List"}</p>
              <p className="mt-2 text-sm text-gray-400">Switch layouts for project organization.</p>
            </div>
          </div>

          <section className="mb-6 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(320px,0.85fr)]">
            <div className="rounded-2xl border border-white/[0.07] bg-[#0a0d14] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] md:p-6">
              <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-gray-600">
                    <ShieldCheck size={14} className="text-emerald-300" />
                    Workspace Structure
                  </p>
                  <h1 className="mt-2 text-3xl font-black tracking-tight text-white">
                    Project Command Center
                  </h1>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                    Each project can hold AI chats, notes, documents, images,
                    research files, tasks, code snippets, bookmarks, and attachments.
                  </p>
                </div>

                <div className="flex gap-2 rounded-xl border border-white/[0.06] bg-white/[0.03] p-1">
                  <button
                    onClick={() => setView("grid")}
                    className={`rounded-lg p-2 transition ${
                      view === "grid"
                        ? "bg-blue-500/20 text-blue-300"
                        : "text-gray-500 hover:text-white"
                    }`}
                    title="Grid view"
                  >
                    <LayoutGrid size={18} />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={`rounded-lg p-2 transition ${
                      view === "list"
                        ? "bg-blue-500/20 text-blue-300"
                        : "text-gray-500 hover:text-white"
                    }`}
                    title="List view"
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-[minmax(0,1fr)_auto]">
                <div className="relative">
                  <Search
                    size={16}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                  />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    className="h-12 w-full rounded-xl border border-white/[0.06] bg-white/[0.025] pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-blue-400/30"
                    placeholder="Search projects..."
                  />
                </div>

                <div className="flex gap-2">
                  <input
                    ref={createInputRef}
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    onKeyDown={(event) =>
                      event.key === "Enter" && handleCreate()
                    }
                    className="h-12 min-w-0 rounded-xl border border-white/[0.06] bg-white/[0.025] px-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-blue-400/30"
                    placeholder="New project..."
                  />
                  <button
                    onClick={handleCreate}
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-black transition hover:bg-gray-200 disabled:opacity-50"
                    disabled={!name.trim()}
                    title="Create project"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>

            <aside className="rounded-2xl border border-white/[0.07] bg-[#0a0d14] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.2)] md:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-600">
                    Roadmap
                  </p>
                  <h2 className="mt-1 text-lg font-black text-white">
                    MVP to Enterprise
                  </h2>
                </div>
                <Archive size={18} className="text-gray-500" />
              </div>

              <div className="space-y-3">
                {roadmap.map((item, index) => (
                  <div
                    key={item}
                    className="flex gap-3 rounded-xl border border-white/[0.05] bg-white/[0.025] p-3"
                  >
                    <CheckCircle2
                      size={16}
                      className={
                        index === 0 ? "mt-0.5 text-emerald-300" : "mt-0.5 text-gray-600"
                      }
                    />
                    <p className="text-sm leading-6 text-gray-400">{item}</p>
                  </div>
                ))}
              </div>
            </aside>
          </section>

          <section className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {projectModules.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-white/[0.06] bg-white/[0.025] p-4"
              >
                <item.icon size={18} className="mb-3 text-blue-300" />
                <p className="text-sm font-black text-white">{item.label}</p>
              </div>
            ))}
          </section>

          {enrichedProjects.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-10 text-center">
              <Folder size={38} className="mx-auto mb-4 text-blue-300" />
              <h2 className="text-xl font-black text-white">
                Create your first workspace project
              </h2>
              <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-gray-500">
                Start with a product, class, client, research topic, or coding
                project. Synapse will keep the project memory together.
              </p>
            </div>
          ) : view === "grid" ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {enrichedProjects.map((project: any) => (
                <article
                  key={project.id}
                  className="group relative overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0a0d14] p-5 transition hover:border-blue-400/25 hover:bg-[#0d111b]"
                >
                  <button
                    onClick={() => openProject(project.id)}
                    className="block w-full text-left"
                  >
                    <div className="mb-5 flex items-start justify-between gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-200">
                        {project.privacy === "locked" ? (
                          <FolderLock size={22} />
                        ) : (
                          <Folder size={22} />
                        )}
                      </div>
                      <span className="flex items-center gap-1 rounded-full border border-emerald-400/15 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-emerald-200">
                        <LockKeyhole size={11} />
                        Private-ready
                      </span>
                    </div>

                    <h3 className="truncate text-lg font-black text-white">
                      {project.name}
                    </h3>
                    <p className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                      <Calendar size={12} />
                      Created {new Date(project.createdAt).toLocaleDateString()}
                    </p>

                    <div className="mt-5 grid grid-cols-3 gap-2">
                      <div className="rounded-lg border border-white/[0.05] bg-white/[0.025] p-3">
                        <p className="text-lg font-black text-white">
                          {project.counts.chats}
                        </p>
                        <p className="text-[10px] font-bold uppercase text-gray-600">
                          Chats
                        </p>
                      </div>
                      <div className="rounded-lg border border-white/[0.05] bg-white/[0.025] p-3">
                        <p className="text-lg font-black text-white">
                          {project.counts.notes}
                        </p>
                        <p className="text-[10px] font-bold uppercase text-gray-600">
                          Notes
                        </p>
                      </div>
                      <div className="rounded-lg border border-white/[0.05] bg-white/[0.025] p-3">
                        <p className="text-lg font-black text-white">
                          {project.counts.docs}
                        </p>
                        <p className="text-[10px] font-bold uppercase text-gray-600">
                          Docs
                        </p>
                      </div>
                    </div>
                  </button>

                  <div className="absolute right-3 top-3">
                    <button
                      onClick={(event) => {
                        event.stopPropagation();
                        setMenuOpen(menuOpen === project.id ? null : project.id);
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-600 transition hover:bg-white/[0.06] hover:text-white"
                      title="Project menu"
                    >
                      <MoreVertical size={17} />
                    </button>

                    {menuOpen === project.id && (
                      <div className="absolute right-0 z-50 mt-2 w-36 rounded-xl border border-white/10 bg-[#11131a] p-1 shadow-xl">
                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            deleteProject(project.id);
                            setMenuOpen(null);
                          }}
                          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-red-400 transition hover:bg-red-500/10"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {enrichedProjects.map((project: any) => (
                <button
                  key={project.id}
                  onClick={() => openProject(project.id)}
                  className={`flex w-full items-center justify-between gap-4 rounded-xl border p-4 text-left transition ${
                    currentProjectId === project.id
                      ? "border-blue-400/25 bg-blue-500/10"
                      : "border-white/[0.06] bg-white/[0.025] hover:bg-white/[0.04]"
                  }`}
                >
                  <span className="flex min-w-0 items-center gap-3">
                    <Folder className="shrink-0 text-blue-300" size={19} />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-black text-white">
                        {project.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {project.total} workspace items
                      </span>
                    </span>
                  </span>
                  <span className="text-xs font-bold text-gray-500">
                    Open
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </WorkspaceShell>
  );
};

export default Projects;

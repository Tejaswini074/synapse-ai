import { useMemo, useState } from "react";
import {
  CircleUserRound,
  BookOpen,
  ChevronDown,
  FileText,
  Folder,
  LogOut,
  MessageSquare,
  PanelLeft,
  Search,
  Settings,
  Sparkles,
  X,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../../features/workspace/context/AppContext";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [generalExpanded, setGeneralExpanded] = useState(true);
  const [projectsExpanded, setProjectsExpanded] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const {
    currentUser,
    setCurrentUser,
    projects = [],
    chats = [],
    notes = [],
    docs = [],
    globalChats = [],
    globalNotes = [],
    globalDocs = [],
    currentProjectId,
    setCurrentProjectId,
    selectChat,
    currentChatId,
    createNote,
    selectNote,
    currentNoteId,
    createDoc,
    selectDoc,
    currentDocId,
  } = useApp();

  const query = search.trim().toLowerCase();

  const closeSidebar = () => setOpen(false);

  const isVisible = (value?: string) =>
    !query || (value || "").toLowerCase().includes(query);

  const getProjectChats = (projectId: number) =>
    chats.filter((chat: any) => chat.projectId === projectId);
  const getProjectNotes = (projectId: number) =>
    notes.filter((note: any) => note.projectId === projectId);
  const getProjectDocs = (projectId: number) =>
    docs.filter((doc: any) => doc.projectId === projectId);

  const openGeneralChat = () => {
    setCurrentProjectId(null);
    navigate("/");
    closeSidebar();
  };

  const openProjectChat = (projectId: number) => {
    setCurrentProjectId(projectId);
    navigate("/");
    closeSidebar();
  };

  const openNotesWorkspace = () => {
    if (currentProjectId !== null) {
      const projectNotes = getProjectNotes(currentProjectId);
      if (projectNotes.length > 0) {
        selectNote(projectNotes[0].id);
      } else {
        createNote("Untitled Note", "", currentProjectId);
      }
    } else if (globalNotes.length > 0) {
      selectNote(globalNotes[0].id);
    } else {
      createNote("Untitled Note", "", null);
    }

    navigate("/notes");
    closeSidebar();
  };

  const openDocsWorkspace = () => {
    if (currentProjectId !== null) {
      const projectDocs = getProjectDocs(currentProjectId);
      if (projectDocs.length > 0) {
        selectDoc(projectDocs[0].id);
      } else {
        createDoc("Untitled Doc", "", currentProjectId);
      }
    } else if (globalDocs.length > 0) {
      selectDoc(globalDocs[0].id);
    } else {
      createDoc("Untitled Doc", "", null);
    }

    navigate("/docs");
    closeSidebar();
  };

  const filteredGeneralChats = globalChats.filter((chat: any) =>
    isVisible(chat.title)
  );
  const filteredProjects = useMemo(() => {
    return projects
      .map((project: any) => {
        const projectChats = getProjectChats(project.id).filter((chat: any) =>
          isVisible(chat.title)
        );
        const projectNotes = getProjectNotes(project.id).filter((note: any) =>
          isVisible(note.title)
        );
        const projectDocs = getProjectDocs(project.id).filter((doc: any) =>
          isVisible(doc.title)
        );
        const matchesProject = isVisible(project.name);

        if (
          !matchesProject &&
          projectChats.length === 0 &&
          projectNotes.length === 0 &&
          projectDocs.length === 0
        ) {
          return null;
        }

        return {
          project,
          projectChats,
          projectNotes,
          projectDocs,
        };
      })
      .filter(Boolean) as Array<{
      project: any;
      projectChats: any[];
      projectNotes: any[];
      projectDocs: any[];
    }>;
  }, [projects, chats, notes, docs, query]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    window.location.href = "/login";
  };

  const openSettings = () => {
    navigate("/settings");
    closeSidebar();
  };

  const userName = currentUser?.name || "User";
  const userInitials = userName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part: string) => part[0]?.toUpperCase())
    .join("");

  const renderWorkspaceItem = (
    item: any,
    type: "chat" | "note" | "doc",
  ) => {
    const active =
      (type === "chat" && currentChatId === item.id) ||
      (type === "note" && currentNoteId === item.id) ||
      (type === "doc" && currentDocId === item.id);

    const icon =
      type === "chat" ? (
        <MessageSquare size={13} />
      ) : type === "note" ? (
        <BookOpen size={13} />
      ) : (
        <FileText size={13} />
      );

    const openItem = () => {
      if (type === "chat") {
        selectChat(item.id);
        navigate("/");
      } else if (type === "note") {
        selectNote(item.id);
        navigate("/notes");
      } else {
        selectDoc(item.id);
        navigate("/docs");
      }

      closeSidebar();
    };

    return (
      <button
        key={`${type}-${item.id}`}
        onClick={openItem}
        className={`group relative w-full rounded-lg px-3 py-1.5 text-left transition-all duration-200 active:scale-[0.98] ${
          active
            ? "bg-blue-500/10 text-blue-300"
            : "text-gray-500 hover:bg-white/[0.04] hover:text-gray-200"
        }`}
      >
        <div className="flex items-center gap-2.5">
          <span className={active ? "text-blue-400" : "text-gray-600 group-hover:text-gray-400"}>
            {icon}
          </span>
          <span className="truncate text-[12.5px] font-medium leading-relaxed tracking-tight">{item.title}</span>
        </div>
        {active && (
          <div className="absolute left-0 top-1.5 h-4 w-[2px] rounded-r-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.6)]" />
        )}
      </button>
    );
  };

  const routeButtonClass = (active: boolean) =>
    `w-full rounded-lg px-3 py-2 text-left text-[12.5px] font-semibold transition-all duration-300 active:scale-[0.98] ${
      active
        ? "bg-white/[0.06] text-white ring-1 ring-white/10"
        : "text-gray-500 hover:text-gray-200 hover:bg-white/[0.02]"
    }`;

  const sectionHeaderClass =
    "flex w-full items-center justify-between px-2 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-gray-600 hover:text-gray-400 transition-colors";

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-40 bg-black/80 backdrop-blur-sm md:hidden" onClick={closeSidebar} />
      )}

      {!open && (
        <button
          className="fixed top-5 left-5 z-[60] flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#0c0d12]/90 backdrop-blur-xl text-white shadow-2xl transition-all active:scale-90 md:hidden"
          onClick={() => setOpen(true)}
        >
          <PanelLeft size={18} />
        </button>
      )}

      <aside
        className={`fixed top-0 left-0 z-[55] flex h-screen w-[min(85vw,280px)] flex-col border-r border-white/[0.05] bg-[#08090d] text-white transition-all duration-500 ease-in-out md:static md:w-[280px] md:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="px-5 py-8">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-[0_0_15px_rgba(59,130,246,0.3)] ring-1 ring-white/10">
                <Sparkles size={18} className="text-white" />
              </div>
              <h1 className="text-[14px] font-black tracking-tight text-white">Synapse AI</h1>
            </div>

            <button
              onClick={closeSidebar}
              className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.03] text-gray-600 hover:text-white md:hidden"
            >
              <X size={16} />
            </button>
          </div>

          <div className="relative group">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 transition-colors group-focus-within:text-blue-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-white/[0.05] bg-white/[0.02] py-2 pl-9 pr-4 text-[12px] text-white transition-all placeholder:text-gray-700 focus:border-blue-500/30 focus:outline-none focus:ring-1 focus:ring-blue-500/10"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Navigation Content */}
        <div className="custom-scrollbar flex-1 overflow-y-auto px-4 py-2">
          <div className="mb-6">
            <button
              onClick={() => { navigate("/projects"); closeSidebar(); }}
              className={routeButtonClass(location.pathname === "/projects")}
            >
              <span className="flex items-center justify-between">
                <span className="flex items-center gap-3">
                  <Folder size={14} className={location.pathname === "/projects" ? "text-blue-400" : "text-gray-600"} />
                  Projects Hub
                </span>
                <span className="text-[10px] font-bold text-gray-600">{projects.length}</span>
              </span>
            </button>
          </div>

          {/* Section: Core */}
          <section className="mb-8">
            <button onClick={() => setGeneralExpanded(!generalExpanded)} className={sectionHeaderClass}>
              <span>Navigation</span>
              <ChevronDown size={10} className={`transition-transform ${generalExpanded ? "" : "-rotate-90"}`} />
            </button>

            {generalExpanded && (
              <div className="mt-1 space-y-1">
                <div className="rounded-xl border border-white/[0.03] bg-white/[0.01] p-1">
                  <button
                    onClick={openGeneralChat}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-[12.5px] font-bold transition-all ${
                      currentProjectId === null && location.pathname === "/" ? "bg-blue-500/10 text-blue-400" : "text-gray-500 hover:text-gray-200"
                    }`}
                  >
                    <MessageSquare size={13} />
                    Main Chat
                  </button>
                  <div className="mt-1 space-y-0.5 border-t border-white/[0.03] pt-1.5">
                    {filteredGeneralChats.slice(0, 3).map((chat: any) => renderWorkspaceItem(chat, "chat"))}
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Section: Workspaces */}
          <section className="mb-6">
            <button onClick={() => setProjectsExpanded(!projectsExpanded)} className={sectionHeaderClass}>
              <span>Workspaces</span>
              <ChevronDown size={10} className={`transition-transform ${projectsExpanded ? "" : "-rotate-90"}`} />
            </button>

            {projectsExpanded && (
              <div className="mt-3 space-y-3">
                {filteredProjects.map(({ project, projectChats }) => {
                  const isActive = currentProjectId === project.id;
                  return (
                    <div key={project.id} className={`rounded-xl border transition-all ${isActive ? "border-blue-500/20 bg-blue-500/[0.03]" : "border-white/[0.03] hover:bg-white/[0.01]"}`}>
                      <div className="p-3">
                        <button onClick={() => openProjectChat(project.id)} className="mb-2 block w-full text-left">
                          <span className={`block text-[12px] font-bold ${isActive ? "text-white" : "text-gray-400"}`}>{project.name}</span>
                        </button>
                        <div className="space-y-0.5">
                          {projectChats.slice(0, 2).map((chat: any) => renderWorkspaceItem(chat, "chat"))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        {/* Premium Footer - Redesigned for Compact Professionalism */}
        <div className="mt-auto border-t border-white/[0.05] bg-[#050609]/80 p-4">
          
          {/* Quick Access Grid */}
          <div className="mb-4 grid grid-cols-2 gap-2">
            {[
              { icon: BookOpen, label: "Notes", action: openNotesWorkspace },
              { icon: FileText, label: "Docs", action: openDocsWorkspace }
            ].map((btn, i) => (
              <button key={i} onClick={btn.action} className="flex items-center justify-center gap-2 rounded-lg border border-white/[0.03] bg-white/[0.02] py-2 text-gray-500 hover:bg-white/[0.05] hover:text-gray-300 active:scale-95 transition-all">
                <btn.icon size={13} />
                <span className="text-[10px] font-bold uppercase tracking-wider">{btn.label}</span>
              </button>
            ))}
          </div>

          {/* Compact User & Logout Bar */}
          <div className="flex items-center gap-2">
            <div 
              onClick={openSettings}
              className="flex flex-1 cursor-pointer items-center gap-2.5 rounded-xl border border-white/[0.06] bg-[#0c0d12] p-2 ring-1 ring-white/5 hover:bg-white/[0.04] transition-all"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 text-[11px] font-black text-white ring-1 ring-white/10 shadow-lg">
                {userInitials || <CircleUserRound size={14} />}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[11px] font-bold text-white leading-tight">{userName}</p>
                <p className="truncate text-[9px] font-medium text-gray-600 uppercase tracking-tighter">Pro Tier</p>
              </div>
              <Settings size={12} className="text-gray-700" />
            </div>

            <button 
              onClick={handleLogout}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/[0.06] bg-red-500/[0.03] text-gray-600 hover:bg-red-500/20 hover:text-red-400 transition-all group"
              title="Logout"
            >
              <LogOut size={16} className="transition-transform group-hover:scale-110" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

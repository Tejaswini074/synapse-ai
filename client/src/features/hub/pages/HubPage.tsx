import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bot,
  Calculator,
  CalendarDays,
  CheckCircle2,
  FileSearch,
  FolderLock,
  GitBranch,
  Grid3X3,
  Kanban,
  LockKeyhole,
  Network,
  Search,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react";
import WorkspaceShell from "../../../shared/layout/WorkspaceShell";
import { useApp } from "../../workspace/context/AppContext";

const agents = [
  { name: "Research Agent", role: "Find sources, compare facts, draft reports" },
  { name: "Coding Agent", role: "Explain code, fix bugs, refactor modules" },
  { name: "Study Agent", role: "Create quizzes, summaries, flashcards" },
  { name: "Finance Agent", role: "Track budgets, expenses, market notes" },
];

const apps = [
  { icon: Calculator, label: "Calculator" },
  { icon: CalendarDays, label: "Calendar" },
  { icon: Kanban, label: "Kanban" },
  { icon: Network, label: "Mind Maps" },
  { icon: Grid3X3, label: "Whiteboard" },
  { icon: GitBranch, label: "Workflows" },
];

const securityItems = [
  "Password protected folders",
  "PIN and biometric-ready locks",
  "Hidden secret chats",
  "Private knowledge base controls",
];

const Hub = () => {
  const navigate = useNavigate();
  const { projects, chats, notes, docs, selectChat, selectNote, selectDoc } =
    useApp();
  const [query, setQuery] = useState("");

  const searchResults = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const items = [
      ...projects.map((item: any) => ({
        id: `project-${item.id}`,
        type: "Project",
        title: item.name,
        body: "Project workspace",
        action: () => {
          navigate("/projects");
        },
      })),
      ...chats.map((item: any) => ({
        id: `chat-${item.id}`,
        type: "Chat",
        title: item.title,
        body: item.messages?.[0]?.content || "AI conversation",
        action: () => {
          selectChat(item.id);
          navigate("/");
        },
      })),
      ...notes.map((item: any) => ({
        id: `note-${item.id}`,
        type: "Note",
        title: item.title,
        body: item.content || "Offline markdown note",
        action: () => {
          selectNote(item.id);
          navigate("/notes");
        },
      })),
      ...docs.map((item: any) => ({
        id: `doc-${item.id}`,
        type: "Doc",
        title: item.title,
        body: item.content || "Structured document",
        action: () => {
          selectDoc(item.id);
          navigate("/docs");
        },
      })),
    ];

    if (!normalized) return items.slice(0, 8);

    return items
      .filter(
        (item) =>
          item.title?.toLowerCase().includes(normalized) ||
          item.body?.toLowerCase().includes(normalized) ||
          item.type.toLowerCase().includes(normalized)
      )
      .slice(0, 10);
  }, [chats, docs, notes, projects, query, selectChat, selectDoc, selectNote]);

  return (
    <WorkspaceShell
      title="Synapse Hub"
      subtitle="Universal search, agents, private knowledge, and mini apps."
      actions={
        <button className="flex items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-500/10 px-3 py-2 text-sm font-bold text-emerald-200">
          <ShieldCheck size={15} />
          Protected
        </button>
      }
    >
      <div className="custom-scrollbar min-w-0 flex-1 overflow-y-auto bg-[linear-gradient(180deg,_rgba(12,16,24,0.96),_#050609)] p-5 md:p-8">
        <div className="mx-auto max-w-7xl space-y-5">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/[0.06] bg-[#0b0f15] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
              <div className="mb-3 flex items-center gap-3 text-sm font-semibold text-white">
                <Search size={18} className="text-blue-300" />
                Quick Search
              </div>
              <p className="text-sm text-gray-400">Search across notes, docs, chats, and projects instantly.</p>
            </div>
            <div className="rounded-3xl border border-white/[0.06] bg-[#0b0f15] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
              <div className="mb-3 flex items-center gap-3 text-sm font-semibold text-white">
                <Bot size={18} className="text-emerald-300" />
                Agent Studio
              </div>
              <p className="text-sm text-gray-400">Launch ready-made agents for research, code, or planning.</p>
            </div>
            <div className="rounded-3xl border border-white/[0.06] bg-[#0b0f15] p-5 shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
              <div className="mb-3 flex items-center gap-3 text-sm font-semibold text-white">
                <ShieldCheck size={18} className="text-cyan-300" />
                Secure Vault
              </div>
              <p className="text-sm text-gray-400">Manage private folders, secret chats, and encrypted content.</p>
            </div>
          </div>

          <section className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.8fr)]">
            <div className="rounded-2xl border border-white/[0.07] bg-[#0a0d14] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.25)] md:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-200">
                  <Search size={21} />
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-600">
                    Universal Search
                  </p>
                  <h2 className="text-xl font-black text-white">
                    Search every workspace item
                  </h2>
                </div>
              </div>

              <div className="relative mb-5">
                <Search
                  size={17}
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-600"
                />
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="h-13 w-full rounded-xl border border-white/[0.06] bg-white/[0.025] py-4 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-blue-400/30"
                  placeholder="Search chats, notes, docs, projects, research..."
                />
              </div>

              <div className="space-y-2">
                {searchResults.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-white/10 p-5 text-sm text-gray-500">
                    No matching workspace items yet.
                  </div>
                ) : (
                  searchResults.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => item.action?.()}
                      className="flex w-full items-center justify-between gap-3 rounded-xl border border-white/[0.05] bg-white/[0.025] p-3 text-left transition hover:border-blue-400/20 hover:bg-blue-500/[0.05]"
                    >
                      <span className="min-w-0">
                        <span className="mb-1 block text-[10px] font-black uppercase tracking-[0.18em] text-blue-300">
                          {item.type}
                        </span>
                        <span className="block truncate text-sm font-bold text-white">
                          {item.title}
                        </span>
                        <span className="mt-1 block truncate text-xs text-gray-500">
                          {item.body}
                        </span>
                      </span>
                      <FileSearch size={16} className="shrink-0 text-gray-600" />
                    </button>
                  ))
                )}
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-[#0a0d14] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.2)] md:p-6">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-600">
                    AI Agent Builder
                  </p>
                  <h2 className="mt-1 text-xl font-black text-white">
                    Ready-made agents
                  </h2>
                </div>
                <Bot size={20} className="text-blue-300" />
              </div>

              <div className="grid gap-3">
                {agents.map((agent) => (
                  <div
                    key={agent.name}
                    className="rounded-xl border border-white/[0.05] bg-white/[0.025] p-4"
                  >
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <p className="font-black text-white">{agent.name}</p>
                      <span className="rounded-full bg-blue-500/10 px-2 py-1 text-[10px] font-black uppercase tracking-wider text-blue-200">
                        Draft
                      </span>
                    </div>
                    <p className="text-sm leading-6 text-gray-500">{agent.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid gap-5 lg:grid-cols-3">
            <div className="rounded-2xl border border-white/[0.07] bg-[#0a0d14] p-5 md:p-6">
              <div className="mb-5 flex items-center gap-3">
                <Sparkles size={18} className="text-amber-300" />
                <h3 className="text-lg font-black text-white">Apps Hub</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {apps.map((app) => (
                  <button
                    key={app.label}
                    className="rounded-xl border border-white/[0.05] bg-white/[0.025] p-4 text-left transition hover:border-amber-400/20 hover:bg-amber-500/[0.05]"
                  >
                    <app.icon size={18} className="mb-3 text-amber-300" />
                    <p className="text-sm font-black text-white">{app.label}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-[#0a0d14] p-5 md:p-6">
              <div className="mb-5 flex items-center gap-3">
                <FolderLock size={18} className="text-emerald-300" />
                <h3 className="text-lg font-black text-white">Folder Locks</h3>
              </div>
              <div className="space-y-3">
                {securityItems.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.025] p-3"
                  >
                    <LockKeyhole size={15} className="text-emerald-300" />
                    <p className="text-sm font-semibold text-gray-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-white/[0.07] bg-[#0a0d14] p-5 md:p-6">
              <div className="mb-5 flex items-center gap-3">
                <Workflow size={18} className="text-cyan-300" />
                <h3 className="text-lg font-black text-white">Automation</h3>
              </div>
              <div className="space-y-3">
                {[
                  "Save chat to note",
                  "Summarize notes to docs",
                  "Generate research report",
                  "Create tasks from meetings",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-xl border border-white/[0.05] bg-white/[0.025] p-3"
                  >
                    <span className="text-sm font-semibold text-gray-300">
                      {item}
                    </span>
                    <CheckCircle2
                      size={15}
                      className={index === 0 ? "text-emerald-300" : "text-gray-600"}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </WorkspaceShell>
  );
};

export default Hub;

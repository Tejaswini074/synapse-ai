import { lazy, Suspense } from "react";
import {
  Archive,
  BookOpen,
  BookPlus,
  Bot,
  Brain,
  CheckCircle2,
  Code2,
  CornerDownLeft,
  Database,
  FileSearch,
  FileText,
  FolderLock,
  Image,
  Layers3,
  LockKeyhole,
  MessageSquare,
  PanelRight,
  Search,
  ShieldCheck,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import WorkspaceShell from "../../../shared/layout/WorkspaceShell";
import ThemeToggle from "../../../shared/ui/ThemeToggle";
import { useChatPage } from "../hooks/useChatPage";

const Message = lazy(() => import("../../../shared/ui/Message"));

const modelOptions = ["GPT-4o", "Claude", "Gemini", "DeepSeek"];

const workspaceModules = [
  {
    icon: MessageSquare,
    label: "AI Chat",
    value: "Multi-model",
    tone: "text-blue-300 bg-blue-500/10 border-blue-400/15",
  },
  {
    icon: BookOpen,
    label: "Notes",
    value: "Offline",
    tone: "text-emerald-300 bg-emerald-500/10 border-emerald-400/15",
  },
  {
    icon: FileText,
    label: "Docs",
    value: "PDF Q&A",
    tone: "text-amber-300 bg-amber-500/10 border-amber-400/15",
  },
  {
    icon: Code2,
    label: "Code",
    value: "Terminal",
    tone: "text-cyan-300 bg-cyan-500/10 border-cyan-400/15",
  },
  {
    icon: Image,
    label: "Image Studio",
    value: "Generate",
    tone: "text-rose-300 bg-rose-500/10 border-rose-400/15",
  },
  {
    icon: FileSearch,
    label: "Research",
    value: "Citations",
    tone: "text-violet-300 bg-violet-500/10 border-violet-400/15",
  },
];

const promptStarters = [
  "Compare GPT, Claude, Gemini, and DeepSeek responses for this idea.",
  "Create an encrypted project workspace plan with notes, docs, code, and research.",
  "Summarize my knowledge library and turn it into an executive report.",
  "Draft a product roadmap for Synapse AI from MVP to enterprise.",
];

const activityItems = [
  { icon: FolderLock, label: "Private folders", state: "Encrypted" },
  { icon: Archive, label: "Chat archive", state: "Ready" },
  { icon: Search, label: "Universal search", state: "Indexed" },
  { icon: Workflow, label: "Agent builder", state: "Draft" },
];

const Chat = () => {
  const {
    bottomRef,
    currentChatId,
    dark,
    handleKeyDown,
    handleSaveToNotes,
    handleSend,
    input,
    loading,
    messages,
    setInput,
    toggleTheme,
  } = useChatPage();

  const quickFill = (prompt: string) => setInput(prompt);

  return (
    <WorkspaceShell
      title="Synapse AI"
      subtitle="Chat, notes, docs, research, images, and code in one secure workspace."
      actions={
        <>
          <button
            className="hidden items-center gap-2 rounded-lg border border-emerald-400/20 bg-emerald-500/10 px-3 py-2 text-sm font-semibold text-emerald-200 transition hover:bg-emerald-500/15 lg:flex"
            title="Security status"
          >
            <ShieldCheck size={15} />
            Secure
          </button>
          <button
            onClick={handleSaveToNotes}
            disabled={!currentChatId || messages.length === 0}
            className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-gray-300 transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <BookPlus size={15} />
            Save
          </button>
          <ThemeToggle toggle={toggleTheme} dark={dark} />
        </>
      }
      contentClassName={
        dark
          ? "overflow-hidden"
          : "overflow-hidden bg-gray-50 text-gray-900"
      }
    >
      <div
        className={`flex min-h-0 flex-1 flex-col ${
          dark
            ? "bg-[linear-gradient(180deg,_rgba(12,16,24,0.92),_#050609_44%,_#050609)]"
            : "bg-white text-gray-900"
        }`}
      >
        <div className="min-h-0 flex-1 overflow-y-auto px-4 pt-5 pb-2 custom-scrollbar md:px-6 lg:px-8">
          {messages.length === 0 ? (
            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-5 pb-6">
              <section className="grid gap-4 lg:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.55fr)]">
                <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0a0d14] shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
                  <div className="border-b border-white/[0.06] px-5 py-4 md:px-7">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-400/20 bg-blue-500/10 text-blue-200">
                          <Brain size={22} />
                        </div>
                        <div className="min-w-0">
                          <h2 className="truncate text-xl font-black tracking-tight text-white md:text-2xl">
                            Next Generation AI Workspace
                          </h2>
                          <p className="truncate text-sm font-medium text-gray-500">
                            Project memory, private knowledge, and professional AI workflows.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.03] px-3 py-1.5 text-xs font-bold text-gray-300">
                        <LockKeyhole size={13} className="text-emerald-300" />
                        E2E-ready
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-0 md:grid-cols-[minmax(0,0.95fr)_minmax(280px,0.55fr)]">
                    <div className="p-5 md:p-7">
                      <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                        {workspaceModules.map((item) => {
                          const Icon = item.icon;
                          return (
                            <button
                              key={item.label}
                              onClick={() =>
                                quickFill(`Open ${item.label} mode and help me organize this workspace.`)
                              }
                              className={`group min-h-[104px] rounded-xl border p-4 text-left transition hover:-translate-y-0.5 hover:bg-white/[0.04] ${item.tone}`}
                            >
                              <div className="mb-4 flex items-center justify-between gap-3">
                                <Icon size={18} />
                                <span className="rounded-full bg-black/20 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-white/70">
                                  {item.value}
                                </span>
                              </div>
                              <p className="text-sm font-black text-white">
                                {item.label}
                              </p>
                            </button>
                          );
                        })}
                      </div>

                      <div className="grid gap-3 md:grid-cols-3">
                        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
                          <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                            <Layers3 size={14} className="text-blue-300" />
                            Compare
                          </div>
                          <p className="text-2xl font-black text-white">4</p>
                          <p className="text-xs text-gray-500">models side by side</p>
                        </div>
                        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
                          <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                            <Database size={14} className="text-emerald-300" />
                            Library
                          </div>
                          <p className="text-2xl font-black text-white">All</p>
                          <p className="text-xs text-gray-500">content searchable</p>
                        </div>
                        <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
                          <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500">
                            <Zap size={14} className="text-amber-300" />
                            Agents
                          </div>
                          <p className="text-2xl font-black text-white">Auto</p>
                          <p className="text-xs text-gray-500">workflow builder</p>
                        </div>
                      </div>
                    </div>

                    <aside className="border-t border-white/[0.06] bg-black/15 p-5 md:border-l md:border-t-0 md:p-6">
                      <div className="mb-5 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-600">
                            Models
                          </p>
                          <h3 className="mt-1 text-base font-black text-white">
                            AI Council
                          </h3>
                        </div>
                        <Bot size={18} className="text-blue-300" />
                      </div>

                      <div className="mb-6 grid grid-cols-2 gap-2">
                        {modelOptions.map((model, index) => (
                          <button
                            key={model}
                            onClick={() =>
                              quickFill(`Ask ${model} to analyze this and prepare a useful workspace response.`)
                            }
                            className={`rounded-lg border px-3 py-2 text-left text-xs font-bold transition ${
                              index === 0
                                ? "border-blue-400/25 bg-blue-500/10 text-blue-100"
                                : "border-white/[0.06] bg-white/[0.025] text-gray-400 hover:text-white"
                            }`}
                          >
                            {model}
                          </button>
                        ))}
                      </div>

                      <div className="space-y-2">
                        {activityItems.map((item) => {
                          const Icon = item.icon;
                          return (
                            <div
                              key={item.label}
                              className="flex items-center justify-between rounded-lg border border-white/[0.05] bg-white/[0.025] px-3 py-2.5"
                            >
                              <span className="flex min-w-0 items-center gap-2 text-sm font-semibold text-gray-300">
                                <Icon size={14} className="shrink-0 text-gray-500" />
                                <span className="truncate">{item.label}</span>
                              </span>
                              <span className="rounded-full bg-white/[0.04] px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-gray-500">
                                {item.state}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </aside>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/[0.07] bg-[#0a0d14] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.25)] md:p-6">
                  <div className="mb-5 flex items-center justify-between">
                    <div>
                      <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-600">
                        Command Center
                      </p>
                      <h3 className="mt-1 text-lg font-black text-white">
                        Start From Intent
                      </h3>
                    </div>
                    <PanelRight size={18} className="text-gray-500" />
                  </div>

                  <div className="space-y-3">
                    {promptStarters.map((prompt, index) => (
                      <button
                        key={prompt}
                        onClick={() => quickFill(prompt)}
                        className="group w-full rounded-xl border border-white/[0.06] bg-white/[0.025] p-4 text-left transition hover:border-blue-400/25 hover:bg-blue-500/[0.06]"
                      >
                        <div className="mb-3 flex items-center justify-between gap-3">
                          <span className="text-[11px] font-black uppercase tracking-[0.18em] text-gray-600">
                            0{index + 1}
                          </span>
                          <CheckCircle2
                            size={15}
                            className="text-gray-700 transition group-hover:text-blue-300"
                          />
                        </div>
                        <p className="text-sm font-semibold leading-relaxed text-gray-300">
                          {prompt}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          ) : (
            <div className="mx-auto w-full max-w-4xl">
              <Suspense
                fallback={
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-4 text-sm font-semibold text-gray-400">
                    Loading conversation...
                  </div>
                }
              >
                {messages.map((msg, i) => (
                  <Message key={i} role={msg.role} content={msg.content} />
                ))}
              </Suspense>
            </div>
          )}

          {loading && (
            <div className="mx-auto mt-4 flex w-full max-w-4xl items-center gap-2 text-sm font-semibold text-blue-300 animate-pulse">
              <Sparkles size={15} />
              Synapse is thinking...
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <footer className="sticky bottom-0 border-t border-white/5 bg-[#06080c]/95 backdrop-blur-xl">
          <div className="mx-auto max-w-5xl px-4 pt-3 pb-5">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              {["Research", "Secret Chat", "Image Studio", "Code"].map((mode) => (
                <button
                  key={mode}
                  onClick={() => quickFill(`Switch to ${mode} mode and help me continue.`)}
                  className="rounded-full border border-white/[0.07] bg-white/[0.03] px-3 py-1.5 text-xs font-bold text-gray-400 transition hover:border-blue-400/25 hover:text-white"
                >
                  {mode}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
            <input
              className="h-12 min-w-0 flex-1 rounded-xl border border-white/10 bg-[#0c0d12] px-4 text-white outline-none transition placeholder:text-gray-600 focus:border-blue-500/40 focus:ring-2 focus:ring-blue-500/10"
              placeholder="Ask Synapse to chat, research, write, code, organize, or generate..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-black shadow-lg shadow-white/10 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50"
              title="Send"
            >
              <CornerDownLeft size={16} />
            </button>
            </div>
          </div>
        </footer>
      </div>
    </WorkspaceShell>
  );
};

export default Chat;

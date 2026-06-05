import {
  BookOpen,
  CheckSquare,
  FileText,
  Mic,
  PenLine,
  Plus,
  Sparkles,
  Table2,
  WifiOff,
} from "lucide-react";
import WorkspaceShell from "../../../shared/layout/WorkspaceShell";
import { useNotesPage } from "../hooks/useNotesPage";

const aiActions = [
  { icon: Sparkles, label: "Summarize" },
  { icon: PenLine, label: "Rewrite" },
  { icon: FileText, label: "PDF" },
  { icon: CheckSquare, label: "Study" },
];

const noteFormats = [
  { icon: Table2, label: "Tables" },
  { icon: CheckSquare, label: "Tasks" },
  { icon: Mic, label: "Voice" },
];

const Notes = () => {
  const { activeNotes, currentNote, handleCreate, selectNote, updateNote } =
    useNotesPage();

  return (
    <WorkspaceShell
      title="Notes"
      subtitle="Offline markdown notes with AI summaries, study material, and saved chat memory."
      actions={
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-bold text-black transition hover:bg-gray-200"
        >
          <Plus size={15} />
          New Note
        </button>
      }
    >
      <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
        <section className="hidden w-[330px] shrink-0 border-r border-white/5 bg-[#07090d] p-5 md:block">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-500">
                <WifiOff size={13} className="text-emerald-300" />
                Offline Notes
              </p>
              <h1 className="mt-1 text-lg font-black">Knowledge Capture</h1>
            </div>

            <button
              onClick={handleCreate}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-300 transition hover:bg-white/10 hover:text-white"
              title="New note"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="mb-5 grid grid-cols-3 gap-2">
            {noteFormats.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-white/[0.05] bg-white/[0.02] p-3 text-center text-gray-500"
              >
                <item.icon size={15} className="mx-auto mb-1 text-blue-300" />
                <p className="text-[10px] font-black uppercase tracking-wider">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <div className="custom-scrollbar max-h-[calc(100vh-230px)] space-y-2 overflow-y-auto pr-1">
            {activeNotes.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/10 p-4 text-sm text-gray-500">
                No notes yet. Create one to start building your private library.
              </div>
            ) : (
              activeNotes.map((note: any) => (
                <button
                  key={note.id}
                  onClick={() => selectNote(note.id)}
                  className={`w-full rounded-xl border px-3 py-3 text-left transition ${
                    currentNote?.id === note.id
                      ? "border-blue-500/25 bg-blue-500/10 text-blue-200"
                      : "border-white/5 bg-white/[0.02] text-gray-300 hover:bg-white/[0.04]"
                  }`}
                >
                  <p className="truncate text-sm font-bold">{note.title}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                    {note.content || "Start writing..."}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-gray-600">
                    <BookOpen size={12} />
                    Markdown
                  </div>
                </button>
              ))
            )}
          </div>
        </section>

        <section className="min-w-0 flex-1 overflow-y-auto bg-[linear-gradient(180deg,_rgba(14,18,28,0.9),_#06080c)] p-5 md:p-8">
          {currentNote ? (
            <div className="mx-auto max-w-4xl">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-gray-500">
                  <Sparkles size={14} className="text-blue-300" />
                  AI Assisted Note
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {aiActions.map((action) => (
                    <button
                      key={action.label}
                      className="flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-xs font-bold text-gray-400 transition hover:border-blue-400/25 hover:text-white"
                    >
                      <action.icon size={13} />
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>

              <input
                value={currentNote.title}
                onChange={(e) =>
                  updateNote(currentNote.id, { title: e.target.value })
                }
                className="mb-4 w-full bg-transparent text-3xl font-black tracking-tight text-white outline-none"
                placeholder="Untitled Note"
              />

              <textarea
                value={currentNote.content}
                onChange={(e) =>
                  updateNote(currentNote.id, { content: e.target.value })
                }
                className="min-h-[68vh] w-full resize-none rounded-2xl border border-white/[0.06] bg-[#0b0e15] p-6 text-sm leading-7 text-gray-200 outline-none shadow-[0_18px_60px_rgba(0,0,0,0.22)] transition focus:border-blue-400/25"
                placeholder="Capture ideas, meeting notes, markdown, study plans, code blocks, or AI outputs here..."
              />
            </div>
          ) : (
            <div className="mx-auto mt-24 max-w-2xl rounded-2xl border border-white/5 bg-white/[0.02] p-10 text-center text-gray-400">
              <Sparkles size={36} className="mx-auto mb-4 text-blue-300" />
              <h2 className="mb-2 text-xl font-black text-white">
                No note selected
              </h2>
              <p>Create a note from the sidebar or from a chat session.</p>
              <button
                onClick={handleCreate}
                className="mt-6 rounded-xl bg-white px-4 py-2 text-sm font-bold text-black"
              >
                Create Note
              </button>
            </div>
          )}
        </section>
      </div>
    </WorkspaceShell>
  );
};

export default Notes;

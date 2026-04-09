import WorkspaceShell from "../../../shared/layout/WorkspaceShell";
import { useNotesPage } from "../hooks/useNotesPage";

const Notes = () => {
  const { activeNotes, currentNote, handleCreate, selectNote, updateNote } =
    useNotesPage();

  return (
    <WorkspaceShell
      title="Notes"
      subtitle="Capture ideas, summaries, meeting notes, and saved chat output in a focused writing space."
    >
      <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
        <section className="hidden w-[320px] shrink-0 border-r border-white/5 bg-[#07090d] p-5 md:block">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500">
                Notes
              </p>
              <h1 className="mt-1 text-lg font-semibold">Workspace Notes</h1>
            </div>

            <button
              onClick={handleCreate}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
            >
              New
            </button>
          </div>

          <div className="space-y-2">
            {activeNotes.length === 0 ? (
              <p className="text-sm text-gray-500">No notes yet.</p>
            ) : (
              activeNotes.map((note: any) => (
                <button
                  key={note.id}
                  onClick={() => selectNote(note.id)}
                  className={`w-full rounded-xl border px-3 py-3 text-left ${
                    currentNote?.id === note.id
                      ? "border-blue-500/20 bg-blue-500/10 text-blue-300"
                      : "border-white/5 bg-white/[0.02] text-gray-300"
                  }`}
                >
                  <p className="truncate text-sm font-medium">{note.title}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                    {note.content || "Start writing..."}
                  </p>
                </button>
              ))
            )}
          </div>
        </section>

        <section className="min-w-0 flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.05),_transparent_24%)] p-6 md:p-8">
          {currentNote ? (
            <div className="mx-auto max-w-4xl">
              <input
                value={currentNote.title}
                onChange={(e) =>
                  updateNote(currentNote.id, { title: e.target.value })
                }
                className="mb-4 w-full bg-transparent text-3xl font-bold outline-none"
                placeholder="Untitled Note"
              />

              <textarea
                value={currentNote.content}
                onChange={(e) =>
                  updateNote(currentNote.id, { content: e.target.value })
                }
                className="min-h-[70vh] w-full rounded-3xl border border-white/5 bg-white/[0.02] p-6 text-sm leading-7 text-gray-200 outline-none shadow-[0_18px_60px_rgba(0,0,0,0.22)]"
                placeholder="Capture ideas, meeting notes, plans, or AI outputs here..."
              />
            </div>
          ) : (
            <div className="mx-auto mt-24 max-w-2xl rounded-3xl border border-white/5 bg-white/[0.02] p-10 text-center text-gray-400">
              <h2 className="mb-2 text-xl font-semibold text-white">
                No note selected
              </h2>
              <p>Create a note from the sidebar or from a chat session.</p>
              <button
                onClick={handleCreate}
                className="mt-6 rounded-xl bg-white px-4 py-2 text-sm text-black"
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

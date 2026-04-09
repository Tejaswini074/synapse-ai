import WorkspaceShell from "../../../shared/layout/WorkspaceShell";
import { useDocsPage } from "../hooks/useDocsPage";

const Docs = () => {
  const { activeDocs, currentDoc, handleCreate, selectDoc, updateDoc } =
    useDocsPage();

  return (
    <WorkspaceShell
      title="Docs"
      subtitle="Turn notes and chat output into structured plans, specs, and knowledge pages."
    >
      <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
        <section className="hidden w-[320px] shrink-0 border-r border-white/5 bg-[#07090d] p-5 md:block">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-500">
                Docs
              </p>
              <h1 className="mt-1 text-lg font-semibold">Structured Docs</h1>
            </div>

            <button
              onClick={handleCreate}
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
            >
              New
            </button>
          </div>

          <div className="space-y-2">
            {activeDocs.length === 0 ? (
              <p className="text-sm text-gray-500">No docs yet.</p>
            ) : (
              activeDocs.map((doc: any) => (
                <button
                  key={doc.id}
                  onClick={() => selectDoc(doc.id)}
                  className={`w-full rounded-xl border px-3 py-3 text-left ${
                    currentDoc?.id === doc.id
                      ? "border-blue-500/20 bg-blue-500/10 text-blue-300"
                      : "border-white/5 bg-white/[0.02] text-gray-300"
                  }`}
                >
                  <p className="truncate text-sm font-medium">{doc.title}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                    {doc.content || "Outline a spec, plan, or draft..."}
                  </p>
                </button>
              ))
            )}
          </div>
        </section>

        <section className="min-w-0 flex-1 overflow-y-auto bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.05),_transparent_24%)] p-6 md:p-8">
          {currentDoc ? (
            <div className="mx-auto max-w-5xl">
              <input
                value={currentDoc.title}
                onChange={(e) =>
                  updateDoc(currentDoc.id, { title: e.target.value })
                }
                className="mb-4 w-full bg-transparent text-3xl font-bold outline-none"
                placeholder="Untitled Doc"
              />

              <textarea
                value={currentDoc.content}
                onChange={(e) =>
                  updateDoc(currentDoc.id, { content: e.target.value })
                }
                className="min-h-[70vh] w-full rounded-3xl border border-white/5 bg-white/[0.02] p-6 text-sm leading-7 text-gray-200 outline-none shadow-[0_18px_60px_rgba(0,0,0,0.22)]"
                placeholder="Turn rough notes into polished docs, specs, or knowledge pages..."
              />
            </div>
          ) : (
            <div className="mx-auto mt-24 max-w-2xl rounded-3xl border border-white/5 bg-white/[0.02] p-10 text-center text-gray-400">
              <h2 className="mb-2 text-xl font-semibold text-white">
                No doc selected
              </h2>
              <p>Create a doc for plans, documentation, prompts, or specs.</p>
              <button
                onClick={handleCreate}
                className="mt-6 rounded-xl bg-white px-4 py-2 text-sm text-black"
              >
                Create Doc
              </button>
            </div>
          )}
        </section>
      </div>
    </WorkspaceShell>
  );
};

export default Docs;

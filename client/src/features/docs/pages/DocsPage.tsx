import {
  Download,
  FileArchive,
  FileQuestion,
  FileText,
  PanelTop,
  Plus,
  Presentation,
  Search,
  Sparkles,
  Upload,
} from "lucide-react";
import WorkspaceShell from "../../../shared/layout/WorkspaceShell";
import { useDocsPage } from "../hooks/useDocsPage";

const docTypes = ["PDF", "DOCX", "TXT", "XLSX", "PPTX", "MD"];

const docActions = [
  { icon: Sparkles, label: "Summarize" },
  { icon: FileQuestion, label: "Ask AI" },
  { icon: Presentation, label: "Slides" },
  { icon: Download, label: "Export" },
];

const Docs = () => {
  const { activeDocs, currentDoc, handleCreate, selectDoc, updateDoc } =
    useDocsPage();

  return (
    <WorkspaceShell
      title="Docs"
      subtitle="Manage documents, specs, research reports, AI Q&A, and polished exports."
      actions={
        <>
          <button className="hidden items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-bold text-gray-300 transition hover:bg-white/5 md:flex">
            <Upload size={15} />
            Upload
          </button>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-bold text-black transition hover:bg-gray-200"
          >
            <Plus size={15} />
            New Doc
          </button>
        </>
      }
    >
      <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
        <section className="hidden w-[340px] shrink-0 border-r border-white/5 bg-[#07090d] p-5 md:block">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <p className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-500">
                <FileArchive size={13} className="text-amber-300" />
                Documents
              </p>
              <h1 className="mt-1 text-lg font-black">Knowledge Files</h1>
            </div>

            <button
              onClick={handleCreate}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-gray-300 transition hover:bg-white/10 hover:text-white"
              title="New doc"
            >
              <Plus size={16} />
            </button>
          </div>

          <div className="mb-5 rounded-xl border border-white/[0.06] bg-white/[0.025] p-3">
            <div className="mb-3 flex items-center gap-2 text-xs font-bold text-gray-500">
              <Search size={13} />
              AI-readable formats
            </div>
            <div className="flex flex-wrap gap-2">
              {docTypes.map((type) => (
                <span
                  key={type}
                  className="rounded-md border border-white/[0.06] bg-black/20 px-2 py-1 text-[10px] font-black text-gray-400"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>

          <div className="custom-scrollbar max-h-[calc(100vh-230px)] space-y-2 overflow-y-auto pr-1">
            {activeDocs.length === 0 ? (
              <div className="rounded-xl border border-dashed border-white/10 p-4 text-sm text-gray-500">
                No docs yet. Create a spec, report, brief, or upload-ready draft.
              </div>
            ) : (
              activeDocs.map((doc: any) => (
                <button
                  key={doc.id}
                  onClick={() => selectDoc(doc.id)}
                  className={`w-full rounded-xl border px-3 py-3 text-left transition ${
                    currentDoc?.id === doc.id
                      ? "border-amber-500/25 bg-amber-500/10 text-amber-100"
                      : "border-white/5 bg-white/[0.02] text-gray-300 hover:bg-white/[0.04]"
                  }`}
                >
                  <p className="truncate text-sm font-bold">{doc.title}</p>
                  <p className="mt-1 line-clamp-2 text-xs text-gray-500">
                    {doc.content || "Outline a spec, plan, or draft..."}
                  </p>
                  <div className="mt-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-gray-600">
                    <FileText size={12} />
                    Editable Doc
                  </div>
                </button>
              ))
            )}
          </div>
        </section>

        <section className="min-w-0 flex-1 overflow-y-auto bg-[linear-gradient(180deg,_rgba(16,18,26,0.9),_#06080c)] p-5 md:p-8">
          {currentDoc ? (
            <div className="mx-auto max-w-5xl">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-3">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-gray-500">
                  <PanelTop size={14} className="text-amber-300" />
                  Document Studio
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {docActions.map((action) => (
                    <button
                      key={action.label}
                      className="flex items-center gap-1.5 rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2 text-xs font-bold text-gray-400 transition hover:border-amber-400/25 hover:text-white"
                    >
                      <action.icon size={13} />
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>

              <input
                value={currentDoc.title}
                onChange={(e) =>
                  updateDoc(currentDoc.id, { title: e.target.value })
                }
                className="mb-4 w-full bg-transparent text-3xl font-black tracking-tight text-white outline-none"
                placeholder="Untitled Doc"
              />

              <textarea
                value={currentDoc.content}
                onChange={(e) =>
                  updateDoc(currentDoc.id, { content: e.target.value })
                }
                className="min-h-[68vh] w-full resize-none rounded-2xl border border-white/[0.06] bg-[#0b0e15] p-6 text-sm leading-7 text-gray-200 outline-none shadow-[0_18px_60px_rgba(0,0,0,0.22)] transition focus:border-amber-400/25"
                placeholder="Turn rough notes into polished docs, specs, reports, literature reviews, market analysis, or knowledge pages..."
              />
            </div>
          ) : (
            <div className="mx-auto mt-24 max-w-2xl rounded-2xl border border-white/5 bg-white/[0.02] p-10 text-center text-gray-400">
              <FileText size={36} className="mx-auto mb-4 text-amber-300" />
              <h2 className="mb-2 text-xl font-black text-white">
                No doc selected
              </h2>
              <p>Create a doc for plans, documentation, prompts, or specs.</p>
              <button
                onClick={handleCreate}
                className="mt-6 rounded-xl bg-white px-4 py-2 text-sm font-bold text-black"
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

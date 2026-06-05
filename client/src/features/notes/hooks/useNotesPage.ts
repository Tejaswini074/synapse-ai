import { useEffect } from "react";
import { useApp } from "../../workspace/context/AppContext";

export const useNotesPage = () => {
  const {
    notes,
    currentProjectId,
    currentNoteId,
    createNote,
    selectNote,
    updateNote,
  } = useApp();

  const activeNotes = notes.filter(
    (note: any) => note.projectId === (currentProjectId ?? null)
  );
  const currentNote =
    notes.find((note: any) => note.id === currentNoteId) || activeNotes[0];

  const handleCreate = () => {
    createNote("Untitled Note", "", currentProjectId);
  };

  const handleDuplicateNote = (noteId: string) => {
    const note = notes.find((item: any) => item.id === noteId);
    if (!note) return;
    createNote(`Copy of ${note.title}`, note.content, note.projectId);
  };

  const handleExportNote = (note: any) => {
    if (!note) return;
    const content = `# ${note.title}\n\n${note.content || ""}`;
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${note.title?.replace(/\s+/g, "_") || "note"}.md`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (activeNotes.length === 0 || currentNoteId) return;
    selectNote(activeNotes[0].id);
  }, [activeNotes, currentNoteId, selectNote]);

  return {
    activeNotes,
    currentNote,
    handleCreate,
    handleDuplicateNote,
    handleExportNote,
    selectNote,
    updateNote,
  };
};

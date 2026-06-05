import { useEffect, useMemo } from "react";
import { useApp } from "../../workspace/context/AppContext";

const sanitizeFileName = (value: string) =>
  value
    .replace(/[^a-zA-Z0-9-_\.\s]/g, "")
    .trim()
    .replace(/\s+/g, "_")
    .slice(0, 80) || "note";

export const useNotesPage = () => {
  const {
    notes,
    currentProjectId,
    currentNoteId,
    createNote,
    selectNote,
    updateNote,
  } = useApp();

  const activeNotes = useMemo(
    () =>
      notes.filter((note: any) => note.projectId === (currentProjectId ?? null)),
    [notes, currentProjectId]
  );

  const currentNote = useMemo(
    () =>
      notes.find((note: any) => note.id === currentNoteId) || activeNotes[0] || null,
    [notes, activeNotes, currentNoteId]
  );

  const handleCreate = () => {
    return createNote("Untitled Note", "", currentProjectId);
  };

  const handleDuplicateNote = (noteId: string) => {
    const note = notes.find((item: any) => item.id === noteId);
    if (!note) return null;

    const newId = createNote(`Copy of ${note.title || "Note"}`, note.content, note.projectId);
    return newId;
  };

  const handleExportNote = (note: any) => {
    if (!note) return;

    const filename = sanitizeFileName(note.title || "note");
    const content = `# ${note.title || "Untitled Note"}\n\n${note.content || ""}`;
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${filename}.md`;
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

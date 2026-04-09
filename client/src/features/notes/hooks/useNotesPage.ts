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

  useEffect(() => {
    if (activeNotes.length === 0 || currentNoteId) return;
    selectNote(activeNotes[0].id);
  }, [activeNotes, currentNoteId, selectNote]);

  return {
    activeNotes,
    currentNote,
    handleCreate,
    selectNote,
    updateNote,
  };
};

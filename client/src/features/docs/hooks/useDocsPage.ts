import { useEffect } from "react";
import { useApp } from "../../workspace/context/AppContext";

export const useDocsPage = () => {
  const {
    docs,
    currentProjectId,
    currentDocId,
    createDoc,
    selectDoc,
    updateDoc,
  } = useApp();

  const activeDocs = docs.filter(
    (doc: any) => doc.projectId === (currentProjectId ?? null)
  );
  const currentDoc =
    docs.find((doc: any) => doc.id === currentDocId) || activeDocs[0];

  const handleCreate = () => {
    createDoc("Untitled Doc", "", currentProjectId);
  };

  useEffect(() => {
    if (activeDocs.length === 0 || currentDocId) return;
    selectDoc(activeDocs[0].id);
  }, [activeDocs, currentDocId, selectDoc]);

  return {
    activeDocs,
    currentDoc,
    handleCreate,
    selectDoc,
    updateDoc,
  };
};

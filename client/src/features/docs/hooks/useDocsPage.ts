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

  const handleExportDoc = () => {
    if (!currentDoc) return;
    const json = JSON.stringify(currentDoc, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentDoc.title || "doc"}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDuplicateDoc = () => {
    if (!currentDoc) return;
    createDoc(
      `${currentDoc.title} (copy)`,
      currentDoc.content,
      currentProjectId
    );
  };

  useEffect(() => {
    if (activeDocs.length === 0 || currentDocId) return;
    selectDoc(activeDocs[0].id);
  }, [activeDocs, currentDocId, selectDoc]);

  return {
    activeDocs,
    currentDoc,
    handleCreate,
    handleExportDoc,
    handleDuplicateDoc,
    selectDoc,
    updateDoc,
  };
};

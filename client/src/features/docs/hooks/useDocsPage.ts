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

  const handleDuplicateDoc = (docId: string) => {
    const doc = docs.find((item: any) => item.id === docId);
    if (!doc) return;
    createDoc(`Copy of ${doc.title}`, doc.content, doc.projectId);
  };

  const handleExportDoc = (doc: any) => {
    if (!doc) return;
    const content = `# ${doc.title}\n\n${doc.content || ""}`;
    const blob = new Blob([content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${doc.title?.replace(/\s+/g, "_") || "doc"}.md`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (activeDocs.length === 0 || currentDocId) return;
    selectDoc(activeDocs[0].id);
  }, [activeDocs, currentDocId, selectDoc]);

  return {
    activeDocs,
    currentDoc,
    handleCreate,
    handleDuplicateDoc,
    handleExportDoc,
    selectDoc,
    updateDoc,
  };
};

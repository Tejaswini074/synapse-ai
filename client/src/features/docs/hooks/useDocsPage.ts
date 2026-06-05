import { useEffect, useMemo } from "react";
import { useApp } from "../../workspace/context/AppContext";

const sanitizeFileName = (value: string) =>
  value
    .replace(/[^a-zA-Z0-9-_\.\s]/g, "")
    .trim()
    .replace(/\s+/g, "_")
    .slice(0, 80) || "doc";

export const useDocsPage = () => {
  const {
    docs,
    currentProjectId,
    currentDocId,
    createDoc,
    selectDoc,
    updateDoc,
  } = useApp();

  const activeDocs = useMemo(
    () => docs.filter((doc: any) => doc.projectId === (currentProjectId ?? null)),
    [docs, currentProjectId]
  );

  const currentDoc = useMemo(
    () => docs.find((doc: any) => doc.id === currentDocId) || activeDocs[0] || null,
    [docs, activeDocs, currentDocId]
  );

  const handleCreate = () => {
    return createDoc("Untitled Doc", "", currentProjectId);
  };

  const handleDuplicateDoc = (docId: string) => {
    const doc = docs.find((item: any) => item.id === docId);
    if (!doc) return null;

    const newId = createDoc(`Copy of ${doc.title || "Doc"}`, doc.content, doc.projectId);
    return newId;
  };

  const handleExportDoc = (doc: any) => {
    if (!doc) return;

    const filename = sanitizeFileName(doc.title || "doc");
    const content = `# ${doc.title || "Untitled Doc"}\n\n${doc.content || ""}`;
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

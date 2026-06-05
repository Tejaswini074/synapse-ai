import { createContext, useContext, useEffect, useMemo, useState } from "react";

const AppContext = createContext<any>(null);
const WORKSPACE_STORAGE_KEY = "synapseWorkspace";

const createTimestamp = () => new Date().toISOString();

const getStoredUser = () => {
  try {
    const stored = localStorage.getItem("currentUser");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
};

const getStoredWorkspace = () => {
  try {
    const stored = localStorage.getItem(WORKSPACE_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
};

export const AppProvider = ({ children }: any) => {
  const storedWorkspace = getStoredWorkspace();
  const [currentUser, setCurrentUserState] = useState<any>(getStoredUser);
  const [projects, setProjects] = useState<any[]>(
    storedWorkspace.projects || []
  );
  const [currentProjectId, setCurrentProjectId] = useState<any>(
    storedWorkspace.currentProjectId ?? null
  );

  const [chats, setChats] = useState<any[]>(storedWorkspace.chats || []);
  const [currentChatId, setCurrentChatId] = useState<any>(
    storedWorkspace.currentChatId ?? null
  );

  const [notes, setNotes] = useState<any[]>(storedWorkspace.notes || []);
  const [currentNoteId, setCurrentNoteId] = useState<any>(
    storedWorkspace.currentNoteId ?? null
  );

  const [docs, setDocs] = useState<any[]>(storedWorkspace.docs || []);
  const [currentDocId, setCurrentDocId] = useState<any>(
    storedWorkspace.currentDocId ?? null
  );

  useEffect(() => {
    localStorage.setItem(
      WORKSPACE_STORAGE_KEY,
      JSON.stringify({
        projects,
        currentProjectId,
        chats,
        currentChatId,
        notes,
        currentNoteId,
        docs,
        currentDocId,
      })
    );
  }, [
    projects,
    currentProjectId,
    chats,
    currentChatId,
    notes,
    currentNoteId,
    docs,
    currentDocId,
  ]);

  const createProject = (name: string) => {
    const newProject = {
      id: Date.now(),
      name,
      privacy: "normal",
      status: "active",
      createdAt: createTimestamp(),
    };

    setProjects((prev) => [newProject, ...prev]);
    setCurrentProjectId(newProject.id);
    return newProject.id;
  };

  const deleteProject = (projectId: number) => {
    setProjects((prev) => prev.filter((project) => project.id !== projectId));
    setChats((prev) => prev.filter((chat) => chat.projectId !== projectId));
    setNotes((prev) => prev.filter((note) => note.projectId !== projectId));
    setDocs((prev) => prev.filter((doc) => doc.projectId !== projectId));

    if (currentProjectId === projectId) {
      setCurrentProjectId(null);
      setCurrentChatId(null);
      setCurrentNoteId(null);
      setCurrentDocId(null);
    }
  };

  const createChat = (
    initialMessages: any[] = [],
    targetProjectId: any = currentProjectId
  ) => {
    const newChat = {
      id: Date.now().toString(),
      title: initialMessages[0]?.content?.slice(0, 25) || "New Chat",
      messages: initialMessages,
      projectId: targetProjectId ?? null,
      mode: "standard",
      archived: false,
      secret: false,
      createdAt: createTimestamp(),
      updatedAt: createTimestamp(),
    };

    setChats((prev) => [newChat, ...prev]);
    setCurrentProjectId(targetProjectId ?? null);
    setCurrentChatId(newChat.id);
    setCurrentNoteId(null);
    setCurrentDocId(null);

    return newChat.id;
  };

  const selectChat = (id: string) => {
    const chat = chats.find((entry) => entry.id === id);
    setCurrentProjectId(chat?.projectId ?? null);
    setCurrentChatId(id);
    setCurrentNoteId(null);
    setCurrentDocId(null);
  };

  const updateChatMessages = (chatId: string, messages: any[]) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages,
              title: messages[0]?.content?.slice(0, 25) || chat.title,
              updatedAt: createTimestamp(),
            }
          : chat
      )
    );
  };

  const sendMessage = (message: any, chatId = currentChatId) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId
          ? {
              ...chat,
              messages: [...chat.messages, message],
              title:
                chat.messages.length === 0
                  ? message.content.slice(0, 25)
                  : chat.title,
              updatedAt: createTimestamp(),
            }
          : chat
      )
    );
  };

  const createNote = (
    title = "Untitled Note",
    content = "",
    targetProjectId: any = currentProjectId
  ) => {
    const newNote = {
      id: Date.now().toString(),
      title,
      content,
      projectId: targetProjectId ?? null,
      format: "markdown",
      encrypted: false,
      createdAt: createTimestamp(),
      updatedAt: createTimestamp(),
    };

    setNotes((prev) => [newNote, ...prev]);
    setCurrentProjectId(targetProjectId ?? null);
    setCurrentNoteId(newNote.id);
    setCurrentChatId(null);
    setCurrentDocId(null);

    return newNote.id;
  };

  const selectNote = (id: string) => {
    const note = notes.find((entry) => entry.id === id);
    setCurrentProjectId(note?.projectId ?? null);
    setCurrentNoteId(id);
    setCurrentChatId(null);
    setCurrentDocId(null);
  };

  const updateNote = (id: string, updates: any) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, ...updates, updatedAt: createTimestamp() }
          : note
      )
    );
  };

  const createDoc = (
    title = "Untitled Doc",
    content = "",
    targetProjectId: any = currentProjectId
  ) => {
    const newDoc = {
      id: Date.now().toString(),
      title,
      content,
      projectId: targetProjectId ?? null,
      type: "document",
      encrypted: false,
      createdAt: createTimestamp(),
      updatedAt: createTimestamp(),
    };

    setDocs((prev) => [newDoc, ...prev]);
    setCurrentProjectId(targetProjectId ?? null);
    setCurrentDocId(newDoc.id);
    setCurrentChatId(null);
    setCurrentNoteId(null);

    return newDoc.id;
  };

  const selectDoc = (id: string) => {
    const doc = docs.find((entry) => entry.id === id);
    setCurrentProjectId(doc?.projectId ?? null);
    setCurrentDocId(id);
    setCurrentChatId(null);
    setCurrentNoteId(null);
  };

  const updateDoc = (id: string, updates: any) => {
    setDocs((prev) =>
      prev.map((doc) =>
        doc.id === id
          ? { ...doc, ...updates, updatedAt: createTimestamp() }
          : doc
      )
    );
  };

  const saveChatAsNote = (
    chatId = currentChatId,
    targetProjectId: any = currentProjectId
  ) => {
    const chat = chats.find((entry) => entry.id === chatId);
    if (!chat) return null;

    const content = chat.messages
      .map((message: any) => `${message.role.toUpperCase()}\n${message.content}`)
      .join("\n\n");

    return createNote(chat.title || "Chat Note", content, targetProjectId);
  };

  const globalChats = useMemo(
    () => chats.filter((chat) => chat.projectId === null),
    [chats]
  );
  const projectChats = useMemo(
    () => chats.filter((chat) => chat.projectId === currentProjectId),
    [chats, currentProjectId]
  );
  const globalNotes = useMemo(
    () => notes.filter((note) => note.projectId === null),
    [notes]
  );
  const projectNotes = useMemo(
    () => notes.filter((note) => note.projectId === currentProjectId),
    [notes, currentProjectId]
  );
  const globalDocs = useMemo(
    () => docs.filter((doc) => doc.projectId === null),
    [docs]
  );
  const projectDocs = useMemo(
    () => docs.filter((doc) => doc.projectId === currentProjectId),
    [docs, currentProjectId]
  );

  const setCurrentUser = (user: any) => {
    setCurrentUserState(user);

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
      localStorage.removeItem("currentUser");
    }
  };

  const updateCurrentUser = (updates: any) => {
    setCurrentUserState((prev: any) => {
      const nextUser = { ...(prev || {}), ...updates };
      localStorage.setItem("currentUser", JSON.stringify(nextUser));
      return nextUser;
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        updateCurrentUser,

        projects,
        currentProjectId,
        setCurrentProjectId,
        createProject,
        deleteProject,

        chats,
        globalChats,
        projectChats,
        currentChatId,
        createChat,
        selectChat,
        sendMessage,
        updateChatMessages,

        notes,
        globalNotes,
        projectNotes,
        currentNoteId,
        createNote,
        selectNote,
        updateNote,

        docs,
        globalDocs,
        projectDocs,
        currentDocId,
        createDoc,
        selectDoc,
        updateDoc,

        saveChatAsNote,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

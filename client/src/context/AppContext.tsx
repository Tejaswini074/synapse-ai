import { createContext, useContext, useState } from "react";

const AppContext = createContext<any>(null);

export const AppProvider = ({ children }: any) => {
  // ================= PROJECT =================
  const [projects, setProjects] = useState<any[]>([]);
  const [currentProjectId, setCurrentProjectId] = useState<any>(null);

  const createProject = (name: string) => {
    const newProject = {
      id: Date.now(),
      name,
    };

    setProjects((prev) => [newProject, ...prev]);
    setCurrentProjectId(newProject.id);
  };

  // ================= CHAT =================
  const [chats, setChats] = useState<any[]>([]);
  const [currentChatId, setCurrentChatId] = useState<any>(null);

const createChat = () => {
  const existing = chats.find(
    (c) =>
      c.projectId === currentProjectId &&
      c.messages.length === 0
  );

  if (existing) {
    setCurrentChatId(existing.id);
    return; // ❌ prevent duplicate empty chat
  }

  const newChat = {
    id: Date.now().toString(),
    title: "New Chat",
    messages: [],
    projectId: currentProjectId || null,
  };

  setChats((prev) => [newChat, ...prev]);
  setCurrentChatId(newChat.id);
};
  const selectChat = (id: string) => {
    setCurrentChatId(id);
  };

  const sendMessage = (message: any) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === currentChatId
          ? {
              ...chat,
              messages: [...chat.messages, message],
              title:
                chat.messages.length === 0
                  ? message.content.slice(0, 25)
                  : chat.title,
            }
          : chat
      )
    );
  };

  // ================= FILTER =================
  const projectChats = chats.filter(
    (chat) => chat.projectId === currentProjectId
  );

  // ================= RETURN =================
  return (
    <AppContext.Provider
      value={{
        // Projects
        projects,
        currentProjectId,
        setCurrentProjectId,
        createProject,

        // Chats
        chats,
        projectChats,
        currentChatId,
        createChat,
        selectChat,
        sendMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
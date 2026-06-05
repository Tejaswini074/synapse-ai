import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../../workspace/context/AppContext";

export const useChatPage = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(true);
  const [selectedModel, setSelectedModel] = useState("GPT-4o");
  const [temperature, setTemperature] = useState(0.7);
  const [currentChatTitle, setCurrentChatTitle] = useState("New Conversation");

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";

  const {
    chats,
    currentProjectId,
    currentChatId,
    createChat,
    sendMessage,
    updateChatMessages,
    saveChatAsNote,
  } = useApp();

  const globalChats = chats.filter((chat: any) => chat.projectId === null);
  const projectChats = chats.filter(
    (chat: any) => chat.projectId === currentProjectId
  );
  const activeChats = currentProjectId ? projectChats : globalChats;
  const messageCount = messages.length;
  const assistantMessageCount = messages.filter(
    (message) => message.role === "assistant"
  ).length;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const chat = activeChats.find((entry: any) => entry.id === currentChatId);
    setMessages(chat?.messages || []);
    setCurrentChatTitle(chat?.title || "New Conversation");
  }, [activeChats, currentChatId]);

  const toggleTheme = () => setDark((prev) => !prev);

  const handleNewChat = () => {
    createChat([]);
    setMessages([]);
    setInput("");
    setCurrentChatTitle("New Conversation");
  };

  const handleClearConversation = () => {
    if (currentChatId) {
      updateChatMessages(currentChatId, []);
    }
    setMessages([]);
    setInput("");
  };

  const handleDownloadTranscript = () => {
    if (messages.length === 0) return;

    const transcript = messages
      .map((message) => `${message.role.toUpperCase()}\n${message.content}`)
      .join("\n\n");

    const blob = new Blob([transcript], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `${currentChatTitle
      .replace(/\s+/g, "_")
      .toLowerCase() || "synapse-chat"}.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
  };

  const handleTemperatureChange = (value: number) => {
    setTemperature(value);
  };

  const handleQuickAction = (prompt: string) => {
    setInput(prompt);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  const handleSaveToNotes = () => {
    if (!currentChatId || messages.length === 0) return;

    saveChatAsNote(currentChatId, currentProjectId);
    navigate("/notes");
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: "user", content: input };
    const chatId = currentChatId || createChat([userMessage]);
    const updatedMessages =
      currentChatId ? [...messages, userMessage] : [userMessage];

    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    if (currentChatId) {
      sendMessage(userMessage, chatId);
    }

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          messages: updatedMessages,
          model: selectedModel,
          temperature,
        }),
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let aiText = "";
      let conversation = [
        ...updatedMessages,
        { role: "assistant", content: "" },
      ];

      setMessages(conversation);
      updateChatMessages(chatId, conversation);

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;

        aiText += decoder.decode(value);
        conversation = [
          ...updatedMessages,
          { role: "assistant", content: aiText },
        ];

        setMessages(conversation);
        updateChatMessages(chatId, conversation);
      }
    } catch (err) {
      console.error("Chat error:", err);
    } finally {
      setLoading(false);
    }
  };

  return {
    assistantMessageCount,
    bottomRef,
    currentChatId,
    currentChatTitle,
    dark,
    handleClearConversation,
    handleDownloadTranscript,
    handleKeyDown,
    handleModelSelect,
    handleNewChat,
    handleQuickAction,
    handleSaveToNotes,
    handleSend,
    handleTemperatureChange,
    input,
    loading,
    messageCount,
    messages,
    selectedModel,
    setInput,
    temperature,
    toggleTheme,
  };
};

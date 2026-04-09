import { useEffect, useRef, useState } from "react";
import Message from "../components/message";
import Sidebar from "../layout/sidebar";
import ThemeToggle from "../layout/ThemeToggle";
import {
  CornerDownLeft,
  Sparkles,
  Wand2,
  Terminal,
  PenTool,
  Zap,
} from "lucide-react";
import { useApp } from "../context/AppContext";

const Chat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(true);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const token = localStorage.getItem("token") || "";

  const {
    chats,
    currentProjectId,
    currentChatId,
    createChat,
    selectChat,
    sendMessage,
  } = useApp();

  // ✅ SAFE CHAT FILTERING
  const globalChats = chats.filter((c: any) => c.projectId === null);
  const projectChats = chats.filter(
    (c: any) => c.projectId === currentProjectId
  );

  const activeChats = currentProjectId
    ? projectChats || []
    : globalChats || [];

  // ✅ AUTO SCROLL
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ SYNC MESSAGES
  useEffect(() => {
    const chat = activeChats.find((c: any) => c.id === currentChatId);
    if (chat) {
      setMessages(chat.messages || []);
    } else {
      setMessages([]);
    }
  }, [currentChatId, chats]);

  // ✅ PREVENT DOUBLE CHAT
  useEffect(() => {
    if (!currentChatId && activeChats.length === 0) {
      createChat();
    }
  }, [currentProjectId]);

  const toggleTheme = () => setDark(!dark);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    let chatId = currentChatId;

    // ✅ create chat safely
    if (!chatId) {
      createChat();
      return;
    }

    const userMessage = { role: "user", content: input };
    const updated = [...messages, userMessage];

    setMessages(updated);
    setInput("");
    setLoading(true);

    sendMessage(userMessage);

    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ messages: updated }),
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      let aiText = "";

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "" },
      ]);

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;

        aiText += decoder.decode(value);

        setMessages((prev) => {
          const copy = [...prev];
          copy[copy.length - 1].content = aiText;
          return copy;
        });
      }
    } catch (err) {
      console.error("Chat error:", err);
    }

    setLoading(false);
  };

  return (
    <div className={`${dark ? "bg-[#05060a] text-white" : "bg-gray-50 text-gray-900"} flex h-screen w-full`}>
      
      <Sidebar />

      <main className="flex-1 flex flex-col">
        {/* HEADER */}
        <header className="flex justify-between items-center px-6 py-4 border-b border-white/5">
          <h1 className="text-xs uppercase tracking-widest text-gray-500">
            Synapse Engine
          </h1>
          <ThemeToggle toggle={toggleTheme} dark={dark} />
        </header>

        {/* CHAT AREA */}
        <div className="flex-1 overflow-y-auto px-6 py-10">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-20">
              <Sparkles size={40} className="mx-auto mb-4" />
              <p>Start your AI conversation</p>
            </div>
          ) : (
            messages.map((msg, i) => (
              <Message key={i} role={msg.role} content={msg.content} />
            ))
          )}

          {loading && (
            <div className="text-blue-400 mt-4 text-sm animate-pulse">
              Processing...
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* INPUT */}
        <div className="p-4">
          <div className="flex items-center bg-[#0c0d12] rounded-xl p-2">
            <input
              className="flex-1 bg-transparent outline-none px-3 text-white"
              placeholder="Ask anything..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="bg-white text-black p-2 rounded-lg"
            >
              <CornerDownLeft size={16} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
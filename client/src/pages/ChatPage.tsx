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
  Box,
  Database,
  ShieldCheck,
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
    projectChats,
    currentProjectId,
    currentChatId,
    createChat,
    selectChat,
    sendMessage,
  } = useApp();

  const activeChats = currentProjectId ? projectChats : chats;
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const chat = activeChats.find((c: any) => c.id === currentChatId);
    if (chat) {
      setMessages(chat.messages || []);
    } else {
      setMessages([]);
    }
  }, [currentChatId, chats]);

  const toggleTheme = () => setDark(!dark);
  useEffect(() => {
    if (!currentChatId && activeChats.length === 0) {
      createChat();
    }
  }, [currentProjectId]);
  
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    let chatId = currentChatId;
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
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

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
    <div className={`${dark ? "bg-[#05060a] text-white" : "bg-gray-50 text-gray-900"} flex h-screen w-full font-sans transition-colors duration-500 overflow-hidden`}>
      <Sidebar chats={activeChats} onNewChat={createChat} onSelectChat={selectChat} currentChatId={currentChatId} />

      <main className="flex-1 flex flex-col relative">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-blue-600/5 blur-[120px] pointer-events-none" />

        {/* Header - Ultra Minimalist */}
        <header className="flex justify-between items-center px-6 py-4 backdrop-blur-xl bg-transparent border-b border-white/[0.03] z-10">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]" />
            <h1 className="text-[10px] font-black tracking-[0.3em] uppercase text-gray-500">
              Synapse Engine <span className="text-blue-500/50">v3.0</span>
            </h1>
          </div>
          <ThemeToggle toggle={toggleTheme} dark={dark} />
        </header>

        {/* Chat Content Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar relative">
          <div className="max-w-3xl mx-auto px-6 py-12">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[65vh] animate-fade-in">
                <div className="p-5 rounded-[2rem] bg-blue-600/5 border border-blue-500/10 mb-8">
                  <Sparkles size={42} className="text-blue-500" />
                </div>
                <h2 className="text-4xl font-bold mb-4 tracking-tight text-center">
                  Design the <span className="text-blue-500 italic">Future</span>
                </h2>
                <p className="text-gray-500 text-sm max-w-sm text-center mb-10 leading-relaxed">
                  Welcome back, Tejaswini. Your AI workspace is synchronized and ready for deployment.
                </p>

                {/* Quick Action Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-xl">
                  {[
                    { icon: Terminal, label: "Debug Code", desc: "Scan for vulnerabilities" },
                    { icon: PenTool, label: "Technical Doc", desc: "Generate documentation" },
                  ].map((item, idx) => (
                    <button key={idx} className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-all text-left group">
                      <item.icon size={18} className="text-blue-500 mb-3" />
                      <div className="text-xs font-bold text-white mb-1">{item.label}</div>
                      <div className="text-[10px] text-gray-600">{item.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-8 animate-fade-in">
                {messages.map((msg, i) => (
                  <Message key={i} role={msg.role} content={msg.content} />
                ))}
              </div>
            )}

            {loading && (
              <div className="flex items-center gap-3 text-blue-500/80 text-[11px] font-bold tracking-widest uppercase mt-8 animate-pulse">
                <Zap size={14} />
                Processing Stream...
              </div>
            )}

            <div ref={bottomRef} className="h-20" />
          </div>
        </div>

        {/* Input Container - Elevated Floating Design */}
        <div className="px-6 pb-8 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="relative group">
              {/* Outer Glow on Focus */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-[24px] blur opacity-0 group-focus-within:opacity-100 transition duration-500" />

              <div className="relative flex items-center bg-[#0c0d12] border border-white/[0.08] rounded-[22px] p-2.5 shadow-2xl transition-all group-focus-within:border-blue-500/30">
                <div className="flex items-center gap-2 pl-2 pr-4 border-r border-white/5 mr-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-600/10 flex items-center justify-center">
                    <Wand2 size={16} className="text-blue-500" />
                  </div>
                </div>

                <input
                  className="flex-1 bg-transparent outline-none py-3 text-sm text-white placeholder:text-gray-700 font-medium"
                  placeholder="Query Synapse AI..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                />

                <button
                  onClick={handleSend}
                  disabled={!input.trim() || loading}
                  className="bg-white text-black p-3 rounded-[16px] hover:bg-gray-200 disabled:opacity-10 disabled:grayscale transition-all active:scale-95 shadow-lg shadow-white/5"
                >
                  <CornerDownLeft size={18} strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Input Footer Note */}
            <p className="text-center text-[10px] text-gray-700 mt-4 font-medium tracking-tight">
              Synapse can make mistakes. Verify important information.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
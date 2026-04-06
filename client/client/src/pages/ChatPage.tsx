import { useEffect, useRef, useState } from "react";
import Message from "../components/message";
import Sidebar from "../layout/sidebar";
import ThemeToggle from "../layout/ThemeToggle";
import { CornerDownLeft, Sparkles, Wand2, Terminal, PenTool, Box, Database } from "lucide-react";

const Chat = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [dark, setDark] = useState(true);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const token = localStorage.getItem("token") || "";
  const [chats, setChats] = useState<any[]>([]);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const createNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: "New Chat",
      messages: [],
    };

    setChats((prev) => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
    setMessages([]);
  }; 
  const loadChat = (id: string) => {
    const chat = chats.find((c) => c.id === id);
    if (!chat) return;

    setCurrentChatId(id);
    setMessages(chat.messages);
  };
  const toggleTheme = () => setDark(!dark);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = async () => {
    if (!currentChatId) {
  createNewChat();
}
    if (!input.trim() || loading) return;
    const updated = [...messages, { role: "user", content: input }];
    setMessages(updated);
    setInput("");
    setLoading(true);
   setChats((prev) =>
  prev.map((chat) =>
    chat.id === currentChatId
      ? {
          ...chat,
          messages: updated,
          title: updated[0]?.content.slice(0, 25) || "New Chat",
        }
      : chat
  )
);
    try {
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
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
    } catch (err) { console.error("Chat error:", err); }
    setLoading(false);
  };

  return (
    <div className={`${dark ? "bg-[#08090d] text-white" : "bg-gray-50 text-gray-900"} flex h-screen w-full font-sans transition-colors duration-300`}>
   <Sidebar
  chats={chats}
  onNewChat={createNewChat}
  onSelectChat={loadChat}
  currentChatId={currentChatId}
/>
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header: Medium height, glass effect */}
        <header className="flex justify-between items-center px-4 md:px-8 py-4 backdrop-blur-xl bg-white/70 dark:bg-[#08090d]/80 z-20 border-b border-gray-200 dark:border-white/5 sticky top-0">
          <div className="flex items-center gap-3">
            <div className="hidden sm:block w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            <h1 className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase text-gray-500 dark:text-gray-400">
              Synapse <span className="text-blue-500">Intelligence</span>
            </h1>
          </div>
          <ThemeToggle toggle={toggleTheme} dark={dark} />
        </header>

        {/* Chat Scroll Area */}
        <div className="flex-1 overflow-y-auto custom-scrollbar px-4">
          <div className="max-w-3xl mx-auto py-8 md:py-12">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center animate-fade-in">
                {/* Hero Icon Section */}
                <div className="relative mb-6">
                  <div className="absolute -inset-4 bg-blue-500/10 rounded-full blur-2xl" />
                  <div className="relative p-4 bg-blue-600/10 rounded-2xl border border-blue-500/20 shadow-xl">
                    <Sparkles size={40} className="text-blue-500" />
                  </div>
                </div>

                <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight bg-gradient-to-b from-gray-900 to-gray-600 dark:from-white dark:to-gray-500 bg-clip-text text-transparent">
                  Unlock Possibilities.
                </h2>
                <p className="text-gray-500 dark:text-gray-400 max-w-sm text-base md:text-lg mb-10">
                  Your premium AI collaborator for code and creative analysis.
                </p>

                {/* Medium Card Suggestions: Responsive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                  {[
                    { title: "Code Python FastAPI", icon: <Terminal size={18} /> },
                    { title: "Draft UI Trends blog", icon: <PenTool size={18} /> },
                    { title: "Explain Docker containers", icon: <Box size={18} /> },
                    { title: "Optimize SQL query", icon: <Database size={18} /> }
                  ].map((s) => (
                    <button
                      key={s.title}
                      onClick={() => setInput(s.title)}
                      className="group flex items-center gap-3 p-4 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-xl hover:border-blue-500/50 hover:bg-blue-50/50 dark:hover:bg-white/10 transition-all text-left shadow-sm active:scale-95"
                    >
                      <span className="p-2 bg-gray-100 dark:bg-white/5 rounded-lg text-gray-500 group-hover:text-blue-500 transition-colors">
                        {s.icon}
                      </span>
                      <span className="text-sm font-medium opacity-80 group-hover:opacity-100">{s.title}</span>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((msg, i) => <Message key={i} role={msg.role} content={msg.content} />)}
              </div>
            )}

            {loading && (
              <div className="flex gap-2 items-center text-blue-500/70 text-[10px] font-black uppercase tracking-widest ml-14 mt-4 animate-pulse">
                <span className="flex gap-1">
                  <span className="w-1 h-1 bg-current rounded-full" />
                  <span className="w-1 h-1 bg-current rounded-full" />
                  <span className="w-1 h-1 bg-current rounded-full" />
                </span>
                Analyzing Context
              </div>
            )}
            <div ref={bottomRef} className="h-20 md:h-32" />
          </div>
        </div>

        {/* Input Footer: Floating Medium Size */}
        <div className="px-4 pb-6 pt-2 bg-transparent relative z-20">
          <div className="max-w-3xl mx-auto relative group">
            {/* Glow effect on focus */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-[22px] blur-lg opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />

            <div className="relative flex items-center bg-white dark:bg-[#12141c] border border-gray-200 dark:border-white/10 rounded-2xl px-2 py-1.5 shadow-2xl transition-all duration-300 focus-within:border-blue-500/50">
              <button className="p-2.5 text-gray-400 hover:text-blue-500 transition hidden sm:block">
                <Wand2 size={18} />
              </button>

              <input
                className="flex-1 bg-transparent border-none outline-none px-3 py-2 text-sm md:text-base placeholder-gray-500"
                placeholder="Ask Synapse AI anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
              />

              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className="bg-blue-600 text-white flex gap-2 items-center px-4 py-2.5 rounded-xl hover:bg-blue-700 disabled:opacity-20 disabled:grayscale transition-all font-bold text-xs shadow-lg shadow-blue-500/20 active:scale-95"
              >
                <span className="hidden sm:inline">Send</span>
                <CornerDownLeft size={14} />
              </button>
            </div>

            <p className="text-[9px] md:text-[10px] text-center mt-3 text-gray-400 dark:text-gray-500 uppercase tracking-widest font-medium">
              Enterprise Security Active • 256-bit Encrypted
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
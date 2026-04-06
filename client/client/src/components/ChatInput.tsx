import { useState } from "react";
import { SendHorizontal, Wand2 } from "lucide-react";

const ChatInput = ({ onSend }: any) => {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter" && input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  const handleAction = () => {
    if (input.trim()) {
      onSend(input);
      setInput("");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 md:px-0">
      {/* Container with Glassmorphism & Subtle Glow */}
      <div className="relative group">
        {/* Animated Focus Glow (Invisible until focused) */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[22px] blur-md opacity-0 group-focus-within:opacity-20 transition duration-500"></div>
        
        <div className="relative flex items-center bg-[#111218] border border-white/10 rounded-[20px] p-2 shadow-2xl transition-all duration-300 focus-within:border-blue-500/40">
          
          {/* Action Icon (Visual Only) */}
          <div className="p-2.5 text-gray-500 hover:text-blue-400 transition-colors cursor-pointer hidden sm:block">
            <Wand2 size={19} strokeWidth={1.5} />
          </div>

          <input
            className="flex-1 bg-transparent border-none outline-none px-3 py-2.5 text-[15px] text-gray-100 placeholder-gray-500 font-medium"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          {/* Premium Send Button */}
          <button
            onClick={handleAction}
            disabled={!input.trim()}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 disabled:text-gray-600 text-white px-5 py-2.5 rounded-[14px] transition-all duration-300 shadow-lg shadow-blue-900/20 active:scale-95 group"
          >
            <span className="text-sm font-bold tracking-tight hidden sm:block">Send</span>
            <SendHorizontal size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Small Disclaimer for that "Real App" feel */}
        <p className="text-[10px] text-center mt-3 text-gray-600 font-medium uppercase tracking-widest">
           Synapse AI • Secure Session
        </p>
      </div>
    </div>
  );
};

export default ChatInput;
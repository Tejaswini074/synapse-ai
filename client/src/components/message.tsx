// message.tsx
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Copy, Bot, User, Check } from "lucide-react";
import { useState } from "react";

type Props = {
  role: string;
  content: string;
};

const Message = ({ role, content }: Props) => {
  const isUser = role === "user";
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex w-full mb-8 animate-in fade-in slide-in-from-bottom-2 duration-500 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      {/* Refined Avatar Icons */}
      <div className={`flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl border transition-all duration-300
        ${isUser 
          ? "ml-3 md:ml-4 bg-[#1a1d24] border-white/5 shadow-inner" 
          : "mr-3 md:mr-4 bg-blue-600/10 border-blue-500/20 shadow-lg shadow-blue-500/5"}`}>
        {isUser 
          ? <User size={16} className="text-gray-500" /> 
          : <Bot size={18} className="text-blue-500" />}
      </div>

      <div className={`relative group max-w-[85%] md:max-w-[75%] px-4 md:px-6 py-3.5 rounded-[20px] text-[15px] leading-relaxed transition-all
        ${isUser 
          ? "bg-blue-600 text-white rounded-tr-none shadow-xl shadow-blue-600/10 font-medium" 
          : "bg-[#0f111a] border border-white/[0.06] text-gray-200 rounded-tl-none shadow-sm hover:border-white/10"}`}>
        
        {/* Floating Utility Bar for Assistant Messages */}
        {!isUser && (
          <div className="absolute -top-4 right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 flex gap-1">
            <button
              onClick={copyToClipboard}
              className="p-1.5 bg-[#1a1d24] border border-white/10 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 shadow-xl transition-all"
            >
              {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
            </button>
          </div>
        )}

        {/* Markdown Content */}
        <div className="prose prose-sm dark:prose-invert max-w-none 
          prose-p:leading-relaxed prose-p:mb-4 last:prose-p:mb-0 
          prose-code:text-blue-400 prose-code:bg-blue-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({ inline, className, children, ...props }: any) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <div className="rounded-xl overflow-hidden my-4 border border-white/5 shadow-2xl bg-[#010101]">
                    {/* Code Header */}
                    <div className="bg-[#1a1d24]/50 px-4 py-2 text-[11px] text-gray-500 font-bold font-mono flex justify-between items-center border-b border-white/5 uppercase tracking-widest">
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500/20" />
                        {match[1]}
                      </span>
                      <button 
                        onClick={() => navigator.clipboard.writeText(String(children))}
                        className="hover:text-blue-400 transition-colors flex items-center gap-1"
                      >
                        <Copy size={12} /> Copy
                      </button>
                    </div>
                    {/* Highlighter */}
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      customStyle={{ 
                        margin: 0, 
                        padding: '1.25rem', 
                        fontSize: '0.85rem', 
                        lineHeight: '1.6',
                        background: 'transparent' 
                      }}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code {...props} className="font-mono text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded-md">
                    {children}
                  </code>
                );
              },
            }}
          >
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default Message;
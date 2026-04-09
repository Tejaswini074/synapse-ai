import { BookPlus, CornerDownLeft, Sparkles } from "lucide-react";
import WorkspaceShell from "../../../shared/layout/WorkspaceShell";
import Message from "../../../shared/ui/Message";
import ThemeToggle from "../../../shared/ui/ThemeToggle";
import { useChatPage } from "../hooks/useChatPage";

const Chat = () => {
  const {
    bottomRef,
    currentChatId,
    dark,
    handleKeyDown,
    handleSaveToNotes,
    handleSend,
    input,
    loading,
    messages,
    setInput,
    toggleTheme,
  } = useChatPage();

  return (
    <WorkspaceShell
      title="AI Chat"
      subtitle="Think in chat, store in notes, and shape useful output into docs."
      actions={
        <>
          <button
            onClick={handleSaveToNotes}
            disabled={!currentChatId || messages.length === 0}
            className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-300 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <BookPlus size={15} />
            Save To Note
          </button>
          <ThemeToggle toggle={toggleTheme} dark={dark} />
        </>
      }
      contentClassName={
        dark
          ? "overflow-hidden"
          : "overflow-hidden bg-gray-50 text-gray-900"
      }
    >
      <div className="flex min-h-0 flex-1 flex-col bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_28%)]">
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-8">
          {messages.length === 0 ? (
            <div className="mx-auto mt-20 max-w-2xl rounded-3xl border border-white/5 bg-white/[0.03] p-10 text-center text-gray-500 shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
              <Sparkles size={40} className="mx-auto mb-4 text-blue-400" />
              <h2 className="mb-2 text-xl font-semibold text-white">
                Start a working session
              </h2>
              <p>
                Ask questions, draft ideas, then save the useful parts into
                notes or docs.
              </p>
            </div>
          ) : (
            messages.map((msg, i) => (
              <Message key={i} role={msg.role} content={msg.content} />
            ))
          )}

          {loading && (
            <div className="mt-4 text-sm text-blue-400 animate-pulse">
              Processing...
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        <div className="mt-auto border-t border-white/5 bg-[#06080c] backdrop-blur-xl">
          <div className="flex items-center gap-2 px-4 py-3">
            <input
              className="h-12 flex-1 rounded-xl border border-white/10 bg-[#0c0d12] px-4 text-white outline-none transition focus:border-blue-500/30"
              placeholder="Ask, plan, brainstorm, or draft..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />

            <button
              onClick={handleSend}
              disabled={!input.trim()}
              className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CornerDownLeft size={16} />
            </button>
          </div>
        </div>
      </div>
    </WorkspaceShell>
  );
};

export default Chat;

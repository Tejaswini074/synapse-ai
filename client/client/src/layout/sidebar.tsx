import { useState } from "react";
import { Plus, MessageSquare, Settings, LogOut, PanelLeft, Sparkles, ShieldCheck, Search, Folder, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ chats = [], onNewChat, onSelectChat, currentChatId }: any) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false); // close sidebar on mobile
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <>
      {/* Mobile Toggle */}
      {!open && (
        <button
          className="md:hidden fixed top-5 left-5 z-[60] p-2 bg-[#090a0f] border border-white/10 rounded-xl text-white shadow-2xl"
          onClick={() => setOpen(true)}
        >
          <PanelLeft size={18} />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-screen w-[260px] bg-[#05060a] border-r border-white/[0.03] p-5 text-white transform ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-all duration-500 z-[55] flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-10 px-1">
          <div className="flex items-center gap-2.5">
            <div className="bg-blue-600/10 p-2 rounded-lg border border-blue-500/20">
              <Sparkles size={14} className="text-blue-400" />
            </div>
            <span className="font-bold text-sm text-white/90">Synapse</span>
          </div>

          {/* New Chat */}
          <button
            onClick={() => {
              onNewChat();
              setOpen(false);
            }}
            className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all active:scale-95 group"
          >
            <Plus size={16} className="group-hover:rotate-90 transition-transform" />
          </button>
        </div>

        {/* Navigation */}
        <div className="space-y-1 mb-6">
          <button
            onClick={() => handleNavigate("/projects")}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-400 hover:text-white hover:bg-white/[0.05]"
          >
            <Folder size={14} /> Projects
          </button>

        
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search size={14} className="absolute left-3 top-2 text-gray-500" />
          <input
            className="w-full pl-8 p-2 bg-white/[0.03] rounded-xl text-xs"
            placeholder="Search..."
          />
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto -mx-1 px-1">
          <div className="text-[9px] text-gray-600 mb-3 px-2 uppercase">
            Recent Chats
          </div>

          <div className="space-y-1">
            {chats.length === 0 ? (
              <div className="text-center text-gray-600 text-xs mt-4">
                No chats yet
              </div>
            ) : (
              chats.map((chat: any) => (
                <button
                  key={chat.id}
                  onClick={() => {
                    onSelectChat(chat.id);
                    setOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition
                    ${
                      currentChatId === chat.id
                        ? "bg-blue-500/10 text-blue-400"
                        : "text-gray-400 hover:bg-white/[0.05]"
                    }`}
                >
                  <MessageSquare size={14} />
                  <span className="truncate">{chat.title || "New Chat"}</span>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-4 space-y-2">
          <button
            onClick={() => handleNavigate("/settings")}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-gray-400 hover:bg-white/[0.05]"
          >
            <Settings size={14} /> Settings
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm text-red-400 hover:bg-red-500/10"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
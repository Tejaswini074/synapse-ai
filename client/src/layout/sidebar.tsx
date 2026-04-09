import { useState } from "react";
import {
  Plus,
  MessageSquare,
  Settings,
  LogOut,
  PanelLeft,
  Sparkles,
  Search,
  Folder,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const {
    projects,
    globalChats,
    projectChats,
    currentProjectId,
    setCurrentProjectId,
    createChat,
    selectChat,
    currentChatId,
  } = useApp();

  const activeChats = currentProjectId ? projectChats : globalChats;

  const handleNavigate = (path: string) => {
    navigate(path);
    setOpen(false);
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
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600/10 p-2 rounded-lg border border-blue-500/20">
              <Sparkles size={14} className="text-blue-400" />
            </div>
            <span className="font-bold text-sm">Synapse</span>
          </div>

          <button
            onClick={() => {
              createChat();
              setOpen(false);
            }}
            className="p-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* NAV */}
        <button
          onClick={() => handleNavigate("/projects")}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-white/5 mb-4"
        >
          <Folder size={14} /> Projects
        </button>

        {/* SEARCH */}
        <div className="relative mb-5">
          <Search size={14} className="absolute left-3 top-2 text-gray-500" />
          <input
            className="w-full pl-8 p-2 bg-white/[0.03] rounded-lg text-xs"
            placeholder="Search..."
          />
        </div>

        {/* GLOBAL CHAT SWITCH */}
        <button
          onClick={() => setCurrentProjectId(null)}
          className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-4 ${
            !currentProjectId
              ? "bg-blue-500/20 text-blue-400"
              : "text-gray-400 hover:bg-white/5"
          }`}
        >
          💬 General Chat
        </button>

        {/* PROJECTS */}
        <div className="mb-5">
          <p className="text-xs text-gray-500 mb-2">Projects</p>

          {projects.map((p: any) => (
            <button
              key={p.id}
              onClick={() => setCurrentProjectId(p.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                currentProjectId === p.id
                  ? "bg-blue-500/20 text-blue-400"
                  : "text-gray-400 hover:bg-white/5"
              }`}
            >
              📁 {p.name}
            </button>
          ))}
        </div>

        {/* CHATS */}
        <div className="flex-1 overflow-y-auto">
          <p className="text-xs text-gray-500 mb-2">
            {currentProjectId ? "Project Chats" : "Chats"}
          </p>

          {activeChats.length === 0 ? (
            <p className="text-xs text-gray-600">No chats</p>
          ) : (
            activeChats.map((chat: any) => (
              <button
                key={chat.id}
                onClick={() => {
                  selectChat(chat.id);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                  currentChatId === chat.id
                    ? "bg-blue-500/20 text-blue-400"
                    : "text-gray-400 hover:bg-white/5"
                }`}
              >
                <MessageSquare size={14} />
                <span className="truncate">
                  {chat.title || "New Chat"}
                </span>
              </button>
            ))
          )}
        </div>

        {/* FOOTER */}
        <div className="mt-auto pt-4 space-y-2">
          <button
            onClick={() => handleNavigate("/settings")}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-400 hover:bg-white/5"
          >
            <Settings size={14} /> Settings
          </button>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10"
          >
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
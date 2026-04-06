import { Moon, Sun } from "lucide-react";

const ThemeToggle = ({ toggle, dark }: any) => {
  return (
    <button
      onClick={toggle}
      className={`
        relative flex items-center w-[68px] h-[34px] rounded-full p-1 
        transition-all duration-500 ease-in-out border
        ${dark 
          ? "bg-[#0f111a] border-white/10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]" 
          : "bg-gray-200 border-gray-300 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]"}
      `}
    >
      {/* Sliding Background Circle */}
      <div
        className={`
          absolute w-[26px] h-[26px] rounded-full shadow-lg transform transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
          ${dark 
            ? "translate-x-[34px] bg-gradient-to-tr from-blue-600 to-indigo-500 shadow-blue-500/20" 
            : "translate-x-0 bg-white shadow-gray-400/50"}
        `}
      />

      {/* Icons Container */}
      <div className="flex justify-between items-center w-full px-1.5 z-10 pointer-events-none">
        <Sun
          size={14}
          className={`transition-all duration-500 ${
            dark ? "text-gray-600 opacity-50" : "text-amber-500 opacity-100 scale-110"
          }`}
          strokeWidth={2.5}
        />
        <Moon
          size={14}
          className={`transition-all duration-500 ${
            dark ? "text-white opacity-100 scale-110" : "text-gray-400 opacity-50"
          }`}
          strokeWidth={2.5}
        />
      </div>

      {/* Subtle Outer Glow (Dark Mode Only) */}
      {dark && (
        <div className="absolute inset-0 rounded-full bg-blue-500/5 blur-md -z-10" />
      )}
    </button>
  );
};

export default ThemeToggle;
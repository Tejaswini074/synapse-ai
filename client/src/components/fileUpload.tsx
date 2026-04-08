import { Paperclip } from "lucide-react";

const FileUpload = () => {
  return (
    <label className="group relative cursor-pointer flex items-center justify-center p-2.5 rounded-xl transition-all duration-300 hover:bg-white/5 active:scale-90">
      {/* Tooltip - Hidden on mobile, visible on desktop hover */}
      <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-all duration-200 bg-gray-900 text-white text-[10px] font-bold py-1.5 px-3 rounded-lg border border-white/10 shadow-xl pointer-events-none uppercase tracking-widest whitespace-nowrap">
        Attach File
      </span>

      {/* Premium Icon */}
      <Paperclip 
        size={20} 
        strokeWidth={1.5} 
        className="text-gray-500 group-hover:text-blue-500 group-hover:rotate-12 transition-all duration-300" 
      />
      
      {/* Native Input - Hidden */}
      <input 
        type="file" 
        className="hidden" 
        onChange={(e) => {
          // Logic can be added here later
          console.log(e.target.files?.[0]);
        }}
      />
    </label>
  );
};

export default FileUpload;
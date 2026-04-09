import { type ReactNode } from "react";
import Sidebar from "./Sidebar";

type WorkspaceShellProps = {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
  contentClassName?: string;
};

const WorkspaceShell = ({
  title,
  subtitle,
  actions,
  children,
  contentClassName = "",
}: WorkspaceShellProps) => {
  return (
    <div className="flex h-screen w-full bg-[#040508] text-white overflow-hidden">
      <Sidebar />

      <main className="flex min-w-0 flex-1 flex-col relative bg-[radial-gradient(circle_at_20%_0%,_rgba(59,130,246,0.05),_transparent_40%)]">
        {/* Sleek, High-Density Header */}
        <header className="z-10 border-b border-white/[0.05] bg-[#07090d]/80 px-6 py-4 backdrop-blur-2xl">
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-4 min-w-0">
              <div className="hidden items-center gap-2 md:flex">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-600">
                  Synapse
                </span>
                <span className="h-3 w-[1px] bg-white/10" />
              </div>
              
              <div className="min-w-0">
                <h1 className="truncate text-lg font-bold tracking-tight text-white">
                  {title}
                </h1>
                {subtitle && (
                  <p className="truncate text-[11px] font-medium text-gray-500">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* Compact Action Area */}
            {actions && (
              <div className="flex shrink-0 items-center gap-2 ml-4">
                {actions}
              </div>
            )}
          </div>
        </header>

        {/* Content Area */}
        <div className={`relative min-h-0 flex-1 overflow-y-auto custom-scrollbar ${contentClassName}`}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default WorkspaceShell;
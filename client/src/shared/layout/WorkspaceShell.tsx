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

      <main className="flex min-w-0 flex-1 flex-col relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(59,130,246,0.16),transparent_20%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.12),transparent_18%),radial-gradient(circle_at_50%_80%,rgba(14,165,233,0.08),transparent_22%)]" />

        {/* Sleek, High-Density Header */}
        <header className="relative z-10 border-b border-white/[0.05] bg-[#07090d]/90 px-6 py-4 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.18)]">
          <div className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4 min-w-0">
              <div className="hidden items-center gap-2 md:flex">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
                  Synapse
                </span>
                <span className="h-3 w-[1px] bg-white/10" />
              </div>
              <div className="min-w-0">
                <h1 className="truncate text-xl font-bold tracking-tight text-white sm:text-2xl">
                  {title}
                </h1>
                {subtitle && (
                  <p className="truncate text-sm font-medium text-gray-400">
                    {subtitle}
                  </p>
                )}
              </div>
            </div>

            {/* Compact Action Area */}
            {actions && (
              <div className="flex flex-wrap items-center gap-2">
                {actions}
              </div>
            )}
          </div>
        </header>

        {/* Content Area */}
        <div className={`relative z-0 flex min-h-0 flex-1 flex-col overflow-y-auto custom-scrollbar ${contentClassName}`}>
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white/5 to-transparent" />
          {children}
        </div>
      </main>
    </div>
  );
};

export default WorkspaceShell;

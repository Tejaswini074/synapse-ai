import { useEffect, useMemo, useState } from "react";
import {
  X,
  User,
  Lock,
  ImagePlus,
  Bell,
  Monitor,
  Sparkles,
  CreditCard,
  AlertTriangle,
  ShieldCheck,
  Mail,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import WorkspaceShell from "../../../shared/layout/WorkspaceShell";
import { useApp } from "../../workspace/context/AppContext";

const Settings = () => {
  const navigate = useNavigate();
  const { currentUser, updateCurrentUser, setCurrentUser } = useApp();

  const [tab, setTab] = useState("general");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    const safeName = currentUser?.name || "Workspace User";
    const safeEmail = currentUser?.email || "local@workspace";

    setName(safeName);
    setUsername(
      safeEmail.split("@")[0]?.replace(/[^a-zA-Z0-9_]/g, "_") || "workspace_user"
    );
    setImage(currentUser?.avatarUrl || null);
  }, [currentUser]);

  const navItems = [
    { id: "general", label: "General", icon: Monitor },
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "appearance", label: "Appearance", icon: Sparkles },
    { id: "ai", label: "AI Settings", icon: ShieldCheck },
    { id: "billing", label: "Billing", icon: CreditCard },
    { id: "sessions", label: "Sessions", icon: ShieldCheck },
  ];

  const initials = useMemo(
    () =>
      (name || "Workspace User")
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join(""),
    [name]
  );

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setImage(url);
    updateCurrentUser({ avatarUrl: url });
  };

  const handleSaveProfile = () => {
    updateCurrentUser({
      name,
      username,
      avatarUrl: image || "",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    window.location.href = "/login";
  };

  return (
    <WorkspaceShell
      title="Settings"
      subtitle="Manage your profile, preferences, and account access from one clean workspace panel."
      contentClassName="overflow-hidden"
      actions={
        <>
          <button
            onClick={handleSaveProfile}
            className="hidden items-center gap-2 rounded-lg border border-blue-400/20 bg-blue-500/10 px-3 py-2 text-sm font-semibold text-blue-100 transition hover:bg-blue-500/15 md:flex"
          >
            Save changes
          </button>
          <button
            onClick={() => navigate("/")}
            className="rounded-lg border border-white/10 p-2 text-gray-400 transition hover:bg-white/5 hover:text-white"
          >
            <X size={18} />
          </button>
        </>
      }
    >
      <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
        <div className="flex w-[260px] shrink-0 flex-col border-r border-white/[0.03] bg-[#05060a] p-6">
          <div className="mb-8 px-2">
            <h1 className="text-xs font-black uppercase tracking-[0.3em] text-gray-600">
              Settings
            </h1>
          </div>

          <nav className="flex-1 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                  tab === item.id
                    ? "border border-white/5 bg-white/[0.05] text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
                    : "text-gray-500 hover:bg-white/[0.02] hover:text-gray-300"
                }`}
              >
                <item.icon
                  size={16}
                  className={tab === item.id ? "text-blue-500" : "opacity-50"}
                />
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setTab("danger")}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-bold transition-all ${
              tab === "danger"
                ? "bg-red-500/10 text-red-500"
                : "text-red-500/40 hover:bg-red-500/5 hover:text-red-500"
            }`}
          >
            <AlertTriangle size={16} />
            Danger Zone
          </button>
        </div>

        <div className="custom-scrollbar min-w-0 flex-1 overflow-y-auto bg-gradient-to-br from-[#090a0f] to-[#05060a] p-10 text-white">
          {tab === "general" && (
            <div>
              <header className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight">General</h2>
                <p className="text-sm text-gray-500">
                  Adjust your workspace behavior and review your active account.
                </p>
              </header>

              <div className="mb-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-3xl border border-white/[0.05] bg-[#0b0f17] p-5 text-white shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Theme</p>
                  <p className="mt-4 text-2xl font-black">Dark Obsidian</p>
                  <p className="mt-2 text-sm text-gray-400">Optimized for long AI sessions and low glare.</p>
                </div>
                <div className="rounded-3xl border border-white/[0.05] bg-[#0b0f17] p-5 text-white shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Workspace</p>
                  <p className="mt-4 text-2xl font-black">Pro Flow</p>
                  <p className="mt-2 text-sm text-gray-400">Quick access, notes, docs, and AI in one place.</p>
                </div>
                <div className="rounded-3xl border border-white/[0.05] bg-[#0b0f17] p-5 text-white shadow-[0_18px_50px_rgba(0,0,0,0.2)]">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-500">Security</p>
                  <p className="mt-4 text-2xl font-black">Protected</p>
                  <p className="mt-2 text-sm text-gray-400">Save chats to notes and keep private folders secure.</p>
                </div>
              </div>

              <div className="grid max-w-4xl gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-6 rounded-[28px] border border-white/[0.05] bg-white/[0.02] p-6">
                  <div className="space-y-2">
                    <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-gray-500">
                      Default Theme
                    </label>
                    <select className="w-full cursor-pointer appearance-none rounded-xl border border-white/[0.05] bg-white/[0.03] p-3 text-sm outline-none transition-all focus:border-blue-500/30">
                      <option className="bg-[#090a0f]">Dark Obsidian</option>
                      <option className="bg-[#090a0f]">Minimal Light</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-gray-500">
                      Workspace Mode
                    </label>
                    <div className="grid gap-3 md:grid-cols-2">
                      <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-4">
                        <p className="font-semibold text-white">Focused</p>
                        <p className="mt-1 text-sm text-gray-400">
                          Clean layout for writing, chats, and notes.
                        </p>
                      </div>
                      <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4">
                        <p className="font-semibold text-white">Expanded</p>
                        <p className="mt-1 text-sm text-gray-400">
                          More room for controls, activity, and quick access.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-[28px] border border-white/[0.05] bg-white/[0.02] p-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.24em] text-gray-500">
                    Logged In User
                  </p>
                  <div className="mt-5 flex items-center gap-4">
                    <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-[24px] bg-gradient-to-br from-blue-600 to-indigo-600 text-lg font-black shadow-2xl">
                      {image ? (
                        <img src={image} alt={name} className="h-full w-full object-cover" />
                      ) : (
                        initials
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-lg font-semibold">{name}</p>
                      <p className="truncate text-sm text-gray-400">
                        {currentUser?.email || "local@workspace"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {tab === "profile" && (
            <div>
              <header className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight">Public Profile</h2>
                <p className="text-sm text-gray-500">
                  Update the name, username, and image shown across the workspace.
                </p>
              </header>

              <div className="mb-10 flex items-center gap-6 rounded-[24px] border border-white/[0.05] bg-white/[0.02] p-6">
                <label className="group relative cursor-pointer">
                  <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-[24px] border border-white/10 bg-gradient-to-tr from-blue-600 to-indigo-600 text-2xl font-black shadow-2xl">
                    {image ? (
                      <img src={image} alt={name} className="h-full w-full object-cover" />
                    ) : (
                      initials
                    )}
                  </div>
                  <div className="absolute -bottom-2 -right-2 rounded-xl bg-white p-2 text-black shadow-xl transition-transform group-hover:scale-110">
                    <ImagePlus size={14} />
                  </div>
                  <input type="file" className="hidden" onChange={handleImageUpload} />
                </label>

                <div className="min-w-0">
                  <p className="truncate text-lg font-bold text-white/90">{name}</p>
                  <p className="truncate text-xs font-bold tracking-wider text-blue-500">
                    @{username}
                  </p>
                  <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
                    <Mail size={13} />
                    {currentUser?.email || "local@workspace"}
                  </div>
                </div>
              </div>

              <div className="max-w-md space-y-5">
                <div className="space-y-2">
                  <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-gray-500">
                    Full Name
                  </label>
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    className="w-full rounded-2xl border border-white/[0.05] bg-white/[0.03] p-4 text-sm outline-none transition-all focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/5"
                    placeholder="Enter your name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="ml-1 text-[10px] font-black uppercase tracking-widest text-gray-500">
                    Username
                  </label>
                  <input
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    className="w-full rounded-2xl border border-white/[0.05] bg-white/[0.03] p-4 text-sm outline-none transition-all focus:border-blue-500/30"
                    placeholder="workspace_user"
                  />
                </div>

                <button
                  onClick={handleSaveProfile}
                  className="rounded-2xl bg-white px-8 py-4 text-xs font-black uppercase tracking-widest text-black shadow-xl shadow-white/5 transition-all hover:bg-gray-200 active:scale-95"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {tab === "security" && (
            <div>
              <header className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight">Security</h2>
                <p className="text-sm text-gray-500">
                  Keep your account safe with a strong password and secure session habits.
                </p>
              </header>

              <div className="max-w-md space-y-5">
                <input
                  type="password"
                  placeholder="Current Password"
                  value={oldPassword}
                  onChange={(event) => setOldPassword(event.target.value)}
                  className="w-full rounded-2xl border border-white/[0.05] bg-white/[0.03] p-4 text-sm outline-none transition-all focus:border-blue-500/30"
                />

                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  className="w-full rounded-2xl border border-white/[0.05] bg-white/[0.03] p-4 text-sm outline-none transition-all focus:border-blue-500/30"
                />

                <button className="rounded-2xl border border-emerald-500/20 bg-emerald-600/10 px-8 py-4 text-xs font-bold uppercase tracking-widest text-emerald-500 transition-all hover:bg-emerald-600 hover:text-white">
                  Update Password
                </button>
              </div>
            </div>
          )}

          {tab === "notifications" && (
            <div>
              <header className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight">Notifications</h2>
                <p className="text-sm text-gray-500">
                  Decide how Synapse should notify you about workspace activity.
                </p>
              </header>
              <div className="max-w-2xl space-y-4">
                <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-5">
                  <p className="font-semibold">Email summaries</p>
                  <p className="mt-1 text-sm text-gray-400">
                    Get a digest of project updates and AI output highlights.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/[0.05] bg-white/[0.02] p-5">
                  <p className="font-semibold">In-app reminders</p>
                  <p className="mt-1 text-sm text-gray-400">
                    Surface pending notes, drafts, and follow-up tasks in the app.
                  </p>
                </div>
              </div>
            </div>
          )}

          {tab === "appearance" && (
            <div>
              <header className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight">Appearance</h2>
                <p className="text-sm text-gray-500">
                  Fine-tune the look and feel of your workspace.
                </p>
              </header>
              <div className="grid max-w-3xl gap-4 md:grid-cols-2">
                <div className="rounded-3xl border border-blue-500/20 bg-blue-500/[0.06] p-6">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-blue-400">
                    Active Theme
                  </p>
                  <p className="mt-3 text-xl font-semibold">Dark Obsidian</p>
                </div>
                <div className="rounded-3xl border border-white/[0.05] bg-white/[0.02] p-6">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-gray-500">
                    Sidebar Style
                  </p>
                  <p className="mt-3 text-xl font-semibold">Clean Workspace</p>
                </div>
              </div>
            </div>
          )}

          {tab === "ai" && (
            <div>
              <header className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight">AI Settings</h2>
                <p className="text-sm text-gray-500">
                  Manage how the assistant behaves across chats, notes, and docs.
                </p>
              </header>
              <div className="max-w-2xl rounded-[28px] border border-white/[0.05] bg-white/[0.02] p-6">
                <p className="font-semibold">Workspace assistant mode</p>
                <p className="mt-2 text-sm text-gray-400">
                  Keep answers concise, structured, and ready to move into notes or docs.
                </p>
              </div>
            </div>
          )}

          {tab === "billing" && (
            <div>
              <header className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight">Billing & Plan</h2>
              </header>

              <div className="group relative overflow-hidden rounded-[32px] bg-gradient-to-br from-blue-600 to-indigo-700 p-8 shadow-2xl">
                <div className="relative z-10">
                  <p className="mb-2 text-xs font-black uppercase tracking-[0.2em] text-white/60">
                    Current Active Plan
                  </p>
                  <h3 className="mb-6 text-4xl font-black italic">Synapse Pro</h3>
                  <button className="rounded-xl border border-white/20 bg-white/20 px-6 py-2.5 text-sm font-bold backdrop-blur-md transition-all hover:bg-white/30">
                    Manage Subscription
                  </button>
                </div>
                <Sparkles className="absolute -bottom-4 -right-4 h-32 w-32 rotate-12 text-white/10" />
              </div>
            </div>
          )}

          {tab === "sessions" && (
            <div>
              <header className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight">Active Sessions</h2>
                <p className="text-sm text-gray-500">
                  Manage devices where you are logged in.
                </p>
              </header>

              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-2xl border border-white/[0.05] bg-white/[0.03] p-5">
                  <div>
                    <p className="font-semibold">Current Browser Session</p>
                    <p className="text-xs text-gray-500">This device • Active now</p>
                  </div>
                  <span className="text-xs font-bold text-green-400">CURRENT</span>
                </div>

                <button
                  onClick={handleLogout}
                  className="mt-6 rounded-xl border border-red-500/20 bg-red-500/10 px-6 py-3 text-sm font-bold text-red-500 transition-all hover:bg-red-500 hover:text-white"
                >
                  Logout from all devices
                </button>
              </div>
            </div>
          )}

          {tab === "danger" && (
            <div>
              <header className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight text-red-500">Danger Zone</h2>
                <p className="text-sm text-gray-500">
                  Irreversible actions regarding your account.
                </p>
              </header>

              <div className="space-y-4">
                <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-6">
                  <h4 className="mb-2 font-bold">Delete this account</h4>
                  <p className="mb-4 text-sm text-gray-500">
                    Once you delete your account, there is no going back.
                  </p>
                  <button className="rounded-xl bg-red-500 px-6 py-3 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-red-600">
                    Delete Account
                  </button>
                </div>

                <button
                  onClick={handleLogout}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/[0.05] bg-white/[0.02] p-4 text-sm font-bold text-red-500 transition-all hover:bg-red-500/10"
                >
                  <LogOut size={16} />
                  Logout from Synapse
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </WorkspaceShell>
  );
};

export default Settings;

import { useState } from "react";
import { X, User, Lock, ImagePlus, Bell, Monitor, Sparkles, CreditCard, AlertTriangle, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [tab, setTab] = useState("general");
  const [name, setName] = useState("Tejaswini Shinde");
  const [username, setUsername] = useState("tejaswini532");
  const [image, setImage] = useState<string | null>(null);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const navigate = useNavigate();

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
    }
  };

  // Nav Items helper for cleaner code
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

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      {/* MODAL CONTAINER */}
      <div className="bg-[#090a0f] w-full max-w-[900px] h-[620px] rounded-[32px] flex overflow-hidden border border-white/[0.05] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]">

        {/* LEFT MENU - Obsidian Style */}
        <div className="w-[260px] bg-[#05060a] border-r border-white/[0.03] p-6 flex flex-col">
          <div className="mb-8 px-2">
            <h1 className="text-xs font-black uppercase tracking-[0.3em] text-gray-600">Settings</h1>
          </div>

          <nav className="space-y-1 flex-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${tab === item.id
                    ? "bg-white/[0.05] text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] border border-white/5"
                    : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]"
                  }`}
              >
                <item.icon size={16} className={tab === item.id ? "text-blue-500" : "opacity-50"} />
                {item.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setTab("danger")}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${tab === "danger" ? "bg-red-500/10 text-red-500" : "text-red-500/40 hover:text-red-500 hover:bg-red-500/5"
              }`}
          >
            <AlertTriangle size={16} />
            Danger Zone
          </button>
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex-1 p-10 overflow-y-auto relative bg-gradient-to-br from-[#090a0f] to-[#05060a] text-white custom-scrollbar">

          <button onClick={() => navigate("/")}
            className="absolute top-6 right-6 p-2 text-gray-500 hover:text-white hover:bg-white/5 rounded-full transition-all">
            <X size={20} />
          </button>

          {/* ================= GENERAL ================= */}
          {tab === "general" && (
            <div className="animate-fade-in">
              <header className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight">General</h2>
                <p className="text-gray-500 text-sm">Update your basic workspace settings.</p>
              </header>

              <div className="space-y-6 max-w-sm">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Default Theme</label>
                  <select className="w-full bg-white/[0.03] border border-white/[0.05] p-3 rounded-xl text-sm outline-none focus:border-blue-500/30 transition-all appearance-none cursor-pointer">
                    <option className="bg-[#090a0f]">Dark Obsidian</option>
                    <option className="bg-[#090a0f]">Minimal Light</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* ================= PROFILE ================= */}
          {tab === "profile" && (
            <div className="animate-fade-in">
              <header className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight">Public Profile</h2>
                <p className="text-gray-500 text-sm">How others will see you in the workspace.</p>
              </header>

              <div className="flex items-center gap-6 mb-10 p-6 bg-white/[0.02] border border-white/[0.05] rounded-[24px]">
                <label className="relative cursor-pointer group">
                  <div className="w-20 h-20 rounded-[24px] bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-2xl font-black italic shadow-2xl overflow-hidden border border-white/10">
                    {image ? <img src={image} className="w-full h-full object-cover" /> : "TS"}
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-white text-black p-2 rounded-xl shadow-xl group-hover:scale-110 transition-transform">
                    <ImagePlus size={14} />
                  </div>
                  <input type="file" className="hidden" onChange={handleImageUpload} />
                </label>

                <div>
                  <p className="font-bold text-lg text-white/90">{name}</p>
                  <p className="text-xs text-blue-500 font-bold tracking-wider">@{username}</p>
                </div>
              </div>

              <div className="space-y-5 max-w-md">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                  <input value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full p-4 bg-white/[0.03] border border-white/[0.05] rounded-2xl text-sm outline-none focus:border-blue-500/30 focus:ring-4 focus:ring-blue-500/5 transition-all"
                    placeholder="Enter your name" />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Username</label>
                  <input value={username} onChange={(e) => setUsername(e.target.value)}
                    className="w-full p-4 bg-white/[0.03] border border-white/[0.05] rounded-2xl text-sm outline-none focus:border-blue-500/30 transition-all"
                    placeholder="tejaswini_shinde" />
                </div>

                <button className="bg-white text-black font-black text-xs uppercase tracking-widest px-8 py-4 rounded-2xl hover:bg-gray-200 transition-all active:scale-95 shadow-xl shadow-white/5">
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* ================= SECURITY ================= */}
          {tab === "security" && (
            <div className="animate-fade-in">
              <header className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight">Security</h2>
                <p className="text-gray-500 text-sm">Keep your account safe with a strong password.</p>
              </header>

              <div className="space-y-5 max-w-md">
                <input type="password" placeholder="Current Password" value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full p-4 bg-white/[0.03] border border-white/[0.05] rounded-2xl text-sm outline-none focus:border-blue-500/30 transition-all" />

                <input type="password" placeholder="New Password" value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full p-4 bg-white/[0.03] border border-white/[0.05] rounded-2xl text-sm outline-none focus:border-blue-500/30 transition-all" />

                <button className="bg-emerald-600/10 text-emerald-500 border border-emerald-500/20 font-bold text-xs uppercase tracking-widest px-8 py-4 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all">
                  Update Password
                </button>
              </div>
            </div>
          )}

          {/* ================= BILLING ================= */}
          {tab === "billing" && (
            <div className="animate-fade-in">
              <header className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight">Billing & Plan</h2>
              </header>

              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[32px] shadow-2xl relative overflow-hidden group">
                <div className="relative z-10">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-white/60 mb-2">Current Active Plan</p>
                  <h3 className="text-4xl font-black italic mb-6">Synapse Pro</h3>
                  <button className="bg-white/20 backdrop-blur-md border border-white/20 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-white/30 transition-all">
                    Manage Subscription
                  </button>
                </div>
                <Sparkles className="absolute -bottom-4 -right-4 w-32 h-32 text-white/10 rotate-12" />
              </div>
            </div>
          )}
          {/* ================= SESSIONS ================= */}
          {tab === "sessions" && (
            <div className="animate-fade-in">
              <header className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight">Active Sessions</h2>
                <p className="text-gray-500 text-sm">
                  Manage devices where you are logged in.
                </p>
              </header>

              <div className="space-y-4">

                {/* Current Device */}
                <div className="p-5 bg-white/[0.03] border border-white/[0.05] rounded-2xl flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Chrome • Windows</p>
                    <p className="text-xs text-gray-500">Sangli, India • Active now</p>
                  </div>
                  <span className="text-green-400 text-xs font-bold">CURRENT</span>
                </div>

                {/* Other Device */}
                <div className="p-5 bg-white/[0.02] border border-white/[0.05] rounded-2xl flex justify-between items-center">
                  <div>
                    <p className="font-semibold">Mobile • Android</p>
                    <p className="text-xs text-gray-500">Mumbai, India • 2 hours ago</p>
                  </div>

                  <button className="text-red-400 text-xs hover:underline">
                    Logout
                  </button>
                </div>

                {/* Logout All */}
                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                  }}
                  className="mt-6 bg-red-500/10 text-red-500 border border-red-500/20 px-6 py-3 rounded-xl text-sm font-bold hover:bg-red-500 hover:text-white transition-all"
                >
                  Logout from all devices
                </button>

              </div>
            </div>
          )}
          {/* ================= DANGER ================= */}
          {tab === "danger" && (
            <div className="animate-fade-in">
              <header className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight text-red-500">Danger Zone</h2>
                <p className="text-gray-500 text-sm">Irreversible actions regarding your account.</p>
              </header>

              <div className="space-y-4">
                <div className="p-6 border border-red-500/20 bg-red-500/5 rounded-3xl">
                  <h4 className="font-bold mb-2">Delete this account</h4>
                  <p className="text-sm text-gray-500 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                  <button className="bg-red-500 text-white font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-red-600 transition-all">
                    Delete Account
                  </button>
                </div>

                <button
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/login";
                  }}
                  className="w-full p-4 bg-white/[0.02] border border-white/[0.05] rounded-2xl text-red-500 text-sm font-bold hover:bg-red-500/10 transition-all"
                >
                  Logout from Synapse
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default Settings;
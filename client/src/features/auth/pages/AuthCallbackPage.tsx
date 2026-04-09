import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { useApp } from "../../workspace/context/AppContext";

const AuthCallbackPage = () => {
  const { setCurrentUser } = useApp();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    const name = searchParams.get("name");
    const avatarUrl = searchParams.get("avatarUrl");
    const error = searchParams.get("error");

    if (error || !token || !email) {
      navigate("/login", {
        replace: true,
        state: { error: "Social login failed. Please try again." },
      });
      return;
    }

    localStorage.setItem("token", token);
    setCurrentUser({
      email,
      name: name || email,
      avatarUrl: avatarUrl || "",
    });

    navigate("/", { replace: true });
  }, [navigate, searchParams, setCurrentUser]);

  return (
    <div className="flex h-screen items-center justify-center bg-[#050505] px-4 text-white">
      <div className="flex max-w-sm flex-col items-center text-center">
        <div className="mb-5 rounded-[22px] border border-white/10 bg-gradient-to-br from-blue-600 to-indigo-700 p-3.5 shadow-2xl">
          <Sparkles size={28} className="text-white" />
        </div>
        <h1 className="text-2xl font-bold">Finishing sign in</h1>
        <p className="mt-3 text-sm text-gray-400">
          We are connecting your account and opening your workspace.
        </p>
      </div>
    </div>
  );
};

export default AuthCallbackPage;

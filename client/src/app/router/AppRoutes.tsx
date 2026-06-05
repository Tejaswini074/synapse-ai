import { lazy, Suspense, type ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const Chat = lazy(() => import("../../features/chat/pages/ChatPage"));
const Login = lazy(() => import("../../features/auth/pages/LoginPage"));
const Register = lazy(() => import("../../features/auth/pages/RegisterPage"));
const AuthCallbackPage = lazy(
  () => import("../../features/auth/pages/AuthCallbackPage")
);
const Settings = lazy(() => import("../../features/settings/pages/SettingsPage"));
const Projects = lazy(() => import("../../features/projects/pages/ProjectsPage"));
const Notes = lazy(() => import("../../features/notes/pages/NotesPage"));
const Docs = lazy(() => import("../../features/docs/pages/DocsPage"));
const Hub = lazy(() => import("../../features/hub/pages/HubPage"));

const RouteLoader = () => (
  <div className="flex h-screen w-full items-center justify-center bg-[#040508] text-white">
    <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-gray-300">
      Loading Synapse...
    </div>
  </div>
);

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<RouteLoader />}>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auth/callback" element={<AuthCallbackPage />} />

          {/* Private */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Chat />
              </PrivateRoute>
            }
          />
          <Route
            path="/notes"
            element={
              <PrivateRoute>
                <Notes />
              </PrivateRoute>
            }
          />
          <Route
            path="/docs"
            element={
              <PrivateRoute>
                <Docs />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            path="/projects"
            element={
              <PrivateRoute>
                <Projects />
              </PrivateRoute>
            }
          />
          <Route
            path="/hub"
            element={
              <PrivateRoute>
                <Hub />
              </PrivateRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;

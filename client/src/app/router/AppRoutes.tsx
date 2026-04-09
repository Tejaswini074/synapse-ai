import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Chat from "../../features/chat/pages/ChatPage";
import Login from "../../features/auth/pages/LoginPage";
import Register from "../../features/auth/pages/RegisterPage";
import AuthCallbackPage from "../../features/auth/pages/AuthCallbackPage";
import Settings from "../../features/settings/pages/SettingsPage";
import Projects from "../../features/projects/pages/ProjectsPage";
import Notes from "../../features/notes/pages/NotesPage";
import Docs from "../../features/docs/pages/DocsPage";

const PrivateRoute = ({ children }: any) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />

        {/* Private */}
        <Route path="/" element={<PrivateRoute><Chat /></PrivateRoute>} />
        <Route path="/notes" element={<PrivateRoute><Notes /></PrivateRoute>} />
        <Route path="/docs" element={<PrivateRoute><Docs /></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
        <Route path="/projects" element={<PrivateRoute><Projects /></PrivateRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

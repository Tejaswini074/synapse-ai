import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Chat from "../pages/ChatPage";
import Login from "../pages/login";
import Register from "../pages/Register";
import Settings from "../pages/setting";
import Projects from "../pages/projects";

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

        {/* Private */}
        <Route path="/" element={<PrivateRoute><Chat /></PrivateRoute>} />
        <Route path="/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
        <Route path="/projects" element={<PrivateRoute><Projects /></PrivateRoute>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
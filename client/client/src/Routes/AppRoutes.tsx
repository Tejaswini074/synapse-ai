import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "../pages/ChatPage";
import Login from "../pages/login";
import Register from "../pages/Register";
import Profile from "../pages/profile";
import Settings from "../pages/setting";
import Projects from "../pages/projects";

const AppRoutes = () => {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {!token ? (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        ) : (
          <>
            <Route path="/" element={<Chat />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/projects" element={<Projects />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
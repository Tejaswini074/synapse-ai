import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import ChatPage from "./components/ChatPage";

function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        {!token ? (
          <Route path="*" element={<Login />} />
        ) : (
          <Route path="*" element={<ChatPage />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
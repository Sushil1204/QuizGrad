import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/ui/shared/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import QuizPage from "./pages/QuizPage";

function App() {
  let location = useLocation();

  return (
    <div className="min-h-screen md:h-screen bg-background overflow-y-scroll no-scrollbar">
      {location?.pathname !== "/login" &&
        location?.pathname !== "/register" && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/quiz" element={<QuizPage />} />
      </Routes>
    </div>
  );
}

export default App;

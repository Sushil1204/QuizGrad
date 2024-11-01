import { Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/ui/shared/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

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
      </Routes>
    </div>
  );
}

export default App;

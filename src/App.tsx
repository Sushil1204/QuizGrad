import { Route, Routes } from "react-router-dom";
import Navbar from "./components/ui/shared/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

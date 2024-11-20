import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="container mx-auto">
        <Outlet />
      </main>
    </>
  );
}

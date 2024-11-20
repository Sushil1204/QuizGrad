import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex h-min items-center justify-center no-scrollbar">
      <Outlet />
    </div>
  );
}

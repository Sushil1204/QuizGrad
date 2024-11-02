import { MenuIcon } from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useGetCurrentAccount } from "@/lib/react-query";

const Navbar = () => {
  const { data: loggedInUser } = useGetCurrentAccount();
  loggedInUser && localStorage?.setItem("user", JSON.stringify(loggedInUser));
  const navigate = useNavigate();
  return (
    <header className="container mx-auto flex h-24 items-center justify-between px-4 md:px-8 border-b-2 border-b-slate-100">
      <a href="/" className="flex items-center space-x-2">
        <img src={logo} alt="QuizGrad" className="w-36 md:w-44 h-auto" />
      </a>
      <div className="flex gap-28">
        <nav className="hidden md:flex items-center space-x-6">
          <a
            href="#how-it-works"
            className="font-poppins text-base font-medium text-muted-foreground hover:text-primary cursor-pointer"
          >
            How it works?
          </a>
          <a
            href="#features"
            className="font-poppins text-base font-medium text-muted-foreground hover:text-primary cursor-pointer"
          >
            Features
          </a>
          <a
            href="#about"
            className="font-poppins text-base font-medium text-muted-foreground hover:text-primary cursor-pointer"
          >
            About us
          </a>
        </nav>
        <div className="flex items-center space-x-4">
          {loggedInUser ? (
            <p className="font-poppins text-base font-medium text-muted-foreground hover:text-primary cursor-pointer">
              {loggedInUser?.name}
            </p>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              variant="outline"
              className="hidden md:inline-flex border-yellow-400 text-yellow-600 hover:bg-yellow-50"
            >
              Login
            </Button>
          )}
          <Button
            variant="outline"
            size="icon"
            className="md:hidden border-yellow-400"
          >
            <MenuIcon className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

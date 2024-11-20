import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useGetCurrentAccount } from "@/lib/react-query";
import { useState, useEffect } from "react";

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    className="font-poppins lg:text-base text-sm font-medium text-muted-foreground hover:text-primary transition-colors duration-200"
  >
    {children}
  </a>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { data: loggedInUser, isLoading } = useGetCurrentAccount();
  const navigate = useNavigate();

  // Handle mobile menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navItems: { href: string; label: string }[] = [
    { href: "#how-it-works", label: "How it works?" },
    { href: "#features", label: "Features" },
    { href: "#about", label: "About us" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-slate-200">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <a href="/" className="flex items-center space-x-2">
          <img src={logo} alt="QuizGrad" className="w-32 md:w-44 h-auto" />
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center text-center lg:space-x-8 space-x-2">
          {navItems.map((item) => (
            <NavLink key={item.href} href={item.href}>
              {item.label}
            </NavLink>
          ))}

          {isLoading ? (
            <div className="h-10 w-20 animate-pulse bg-slate-200 rounded" />
          ) : loggedInUser ? (
            <div className="flex items-center gap-3">
              <span className="font-medium text-primary">
                {loggedInUser.name}
              </span>
              <Button
                onClick={() => {
                  localStorage.removeItem("user");
                  navigate("/login");
                }}
                variant="outline"
                className="border-yellow-400 text-yellow-600 hover:bg-yellow-50"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              variant="outline"
              className="border-yellow-400 text-yellow-600 hover:bg-yellow-50"
            >
              Login
            </Button>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <Button
          variant="outline"
          size="icon"
          className="md:hidden border-yellow-400"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-slate-200 md:hidden">
            <nav className="flex flex-col space-y-4 p-4">
              {navItems.map((item) => (
                <NavLink key={item.href} href={item.href}>
                  {item.label}
                </NavLink>
              ))}
              {!isLoading &&
                (loggedInUser ? (
                  <div className="flex flex-col gap-3">
                    <span className="font-medium text-primary">
                      {loggedInUser.name}
                    </span>
                    <Button
                      onClick={() => {
                        localStorage.removeItem("user");
                        navigate("/login");
                        setIsMenuOpen(false);
                      }}
                      variant="outline"
                      className="border-yellow-400 text-yellow-600 hover:bg-yellow-50"
                    >
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => {
                      navigate("/login");
                      setIsMenuOpen(false);
                    }}
                    variant="outline"
                    className="border-yellow-400 text-yellow-600 hover:bg-yellow-50"
                  >
                    Login
                  </Button>
                ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

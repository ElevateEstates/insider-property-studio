import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export const Navigation = () => {
  const location = useLocation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "HOME" },
    { href: "/about", label: "ABOUT" },
    { href: "/portfolio", label: "PORTFOLIO" },
    { href: "/contact", label: "CONTACT" },
  ];

  const navOpacity = Math.max(0, 1 - scrollY / 300);

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{ 
        backdropFilter: `blur(12px)`,
        background: 'rgba(0, 0, 0, 0.1)',
        maskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 50%, transparent 100%)'
      }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <img 
              src="/lovable-uploads/688cf447-cf8b-4cd1-b791-83e7bf665470.png" 
              alt="Elevate Properties" 
              className="h-8 w-auto filter invert"
            />
          </Link>

          {/* Navigation Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "text-sm font-medium tracking-wide transition-colors hover:text-accent-gold",
                  location.pathname === item.href
                    ? "text-accent-gold"
                    : "text-white/80"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button className="text-white p-2">
              <div className="w-6 h-0.5 bg-white mb-1"></div>
              <div className="w-6 h-0.5 bg-white mb-1"></div>
              <div className="w-6 h-0.5 bg-white"></div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
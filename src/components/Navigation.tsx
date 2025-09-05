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
    { href: "/get-new-leads", label: "GET NEW LEADS" },
    { href: "/client-feedback", label: "CLIENT FEEDBACK" },
  ];

  const navOpacity = Math.max(0, 1 - scrollY / 300);

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{ 
        background: `linear-gradient(to bottom, rgba(0, 0, 0, ${0.9 * navOpacity}), rgba(0, 0, 0, ${0.6 * navOpacity}), transparent)`,
        backdropFilter: scrollY > 0 ? 'blur(8px)' : 'blur(12px)',
        borderBottom: `1px solid rgba(255, 255, 255, ${0.1 * navOpacity})`
      }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="flex items-center space-x-2">
              {/* House icon with camera aperture */}
              <div className="relative w-12 h-12">
                <svg viewBox="0 0 48 48" className="w-full h-full text-white">
                  {/* House outline */}
                  <path 
                    d="M6 20L24 4L42 20V42H30V30H18V42H6V20Z" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                  />
                  {/* Camera aperture in center */}
                  <circle cx="24" cy="22" r="6" fill="currentColor"/>
                  <circle cx="24" cy="22" r="4" fill="black"/>
                  <circle cx="24" cy="22" r="2" fill="currentColor"/>
                </svg>
              </div>
            </div>
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
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export const Navigation = () => {
  const location = useLocation();
  const [scrollY, setScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { href: "/", label: "HOME" },
    { href: "/about", label: "ABOUT" },
    { href: "/portfolio", label: "PORTFOLIO" },
    { href: "/contact", label: "CONTACT" },
  ];

  // Dynamic opacity based on scroll position
  const scrollOpacity = Math.min(scrollY / 200, 0.95); // Gradually increase opacity up to 95%
  const blurIntensity = Math.min(scrollY / 100, 1); // Gradually increase blur

  return (
    <>
      <nav 
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: `linear-gradient(to bottom, 
            rgba(0, 0, 0, ${0.6 + scrollOpacity * 0.3}) 0%, 
            rgba(0, 0, 0, ${0.4 + scrollOpacity * 0.4}) 50%, 
            transparent 100%)`,
          backdropFilter: `blur(${8 + blurIntensity * 8}px)`,
          borderBottom: scrollY > 50 ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
        }}
      >
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold rounded-lg p-1"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              aria-label="Insider Property Studio - Home"
            >
              <img 
                src="/lovable-uploads/688cf447-cf8b-4cd1-b791-83e7bf665470.png" 
                alt="Insider Property Studio" 
                className="h-8 md:h-10 w-auto filter invert transition-transform group-hover:scale-105"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all duration-300",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold",
                    location.pathname === item.href
                      ? "text-accent-gold bg-white/10"
                      : "text-white/90 hover:text-accent-gold hover:bg-white/5"
                  )}
                  aria-current={location.pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-white hover:bg-white/10 focus-visible:ring-accent-gold"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
            aria-hidden="true"
          />
          
          {/* Mobile Menu Content */}
          <div 
            className="absolute top-16 md:top-20 left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 px-4 py-6"
            onClick={(e) => e.stopPropagation()}
          >
            <nav className="flex flex-col space-y-2" role="navigation" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={cn(
                    "px-6 py-4 rounded-xl text-lg font-semibold tracking-wide transition-all duration-300",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-gold",
                    "min-h-[48px] flex items-center", // Apple's 44pt minimum touch target
                    location.pathname === item.href
                      ? "text-accent-gold bg-white/20"
                      : "text-white hover:text-accent-gold hover:bg-white/10"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-current={location.pathname === item.href ? "page" : undefined}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};
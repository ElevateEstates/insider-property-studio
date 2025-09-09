import { useEffect, useState } from "react";

export const Footer = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="relative py-32 px-4 md:px-6 glass-card overflow-hidden border-t border-white/10 rounded-none min-h-[80vh]">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url(/assets/hero-costa-del-sol.jpg)`,
          transform: `translateY(${scrollY * 0.3}px)`
        }}
      />
      
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 z-5 bg-gradient-to-t from-black/95 via-black/80 to-black/60"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col items-center justify-center space-y-12 min-h-[60vh]">
          {/* Logo */}
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/3883c264-9908-46ec-88d3-d7647feeb35b.png" 
              alt="Elevate Properties" 
              className="h-32 w-auto filter invert opacity-80 drop-shadow-2xl"
            />
          </div>
          
          {/* Property Image */}
          <div className="flex justify-center">
            <img 
              src="/lovable-uploads/4ea57a85-e502-45e4-8fd2-a1702b491f62.png" 
              alt="Luxury Villa with Pool" 
              className="w-full max-w-2xl rounded-2xl shadow-2xl opacity-90"
            />
          </div>
          
          {/* Copyright */}
          <div className="text-center">
            <p className="text-white/60 text-lg">
              © 2024 Elevate Properties. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
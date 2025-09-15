import { useEffect, useState } from "react";
import elevateLogoWhite from "@/assets/elevate-logo.png";

export const Footer = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className="relative py-8 px-4 md:px-6 glass-card overflow-hidden border-t border-white/10 rounded-none min-h-[35vh]">
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url(/lovable-uploads/1b35db94-4dd0-4d9d-bd6a-95c0a645c0b9.png)`,
          transform: `translateY(${scrollY * 0.3}px)`
        }}
      />
      
      {/* 50% Opaque Overlay */}
      <div className="absolute inset-0 z-5 bg-black/50 backdrop-blur-sm"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="flex flex-col items-center justify-center space-y-6 min-h-[25vh]">
          {/* Logo */}
          <div className="flex justify-center">
            <img 
              src={elevateLogoWhite} 
              alt="Elevate Properties" 
              className="h-32 w-auto opacity-90 drop-shadow-2xl"
            />
          </div>
          
          {/* Copyright */}
          <div className="text-center">
            <p className="text-white/80 text-lg">
              © 2024 Elevate Properties. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
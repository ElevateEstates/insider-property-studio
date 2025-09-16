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
    <footer className="relative py-8 px-4 md:px-6 overflow-hidden border-t border-white/10 rounded-none min-h-[35vh] z-10">
      {/* Black background with 50% opacity */}
      <div className="absolute inset-0 bg-black/50 z-0" />
      
      {/* Remove the image background and blend mode overlay */}
      
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
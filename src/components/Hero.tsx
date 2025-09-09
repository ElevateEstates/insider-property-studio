import { useEffect, useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";

export const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={heroRef} className="relative min-h-screen text-white overflow-hidden transparent-section">
      {/* Content */}
      <div className="relative z-30 flex flex-col items-center justify-center min-h-screen px-4 md:px-8 lg:px-16 section-content">
        <div className="max-w-6xl w-full text-center space-y-8 py-20">
          <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
            Professional Real Estate Media
          </Badge>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light">
            Let's Create Something
            <span className="block text-gradient-gold">Extraordinary</span>
          </h1>
          <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
            Ready to showcase your property with stunning visuals? Get in touch today 
            and let's discuss how we can help you achieve your goals.
          </p>
        </div>
      </div>
    </section>
  );
};
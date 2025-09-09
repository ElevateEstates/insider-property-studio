import { useEffect, useState } from "react";

export const About = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="py-32 px-4 md:px-6 relative overflow-hidden z-10">
      <div 
        className="container mx-auto max-w-4xl relative z-20 section-content py-8 px-4 md:px-8"
        style={{ transform: `translateY(${scrollY * 0.03}px)` }}
      >
        <div className="mb-16 animate-fade-up">
          <h2 className="text-5xl md:text-6xl font-light mb-8 border-b border-white/20 pb-4 text-white">
            About
          </h2>
        </div>
        
        <div className="space-y-8 text-lg md:text-xl leading-relaxed text-white/80 font-light animate-slide-in glass-card p-8 rounded-2xl">
          <p className="transition-colors hover:text-white/90">
            Geir is a creative services provider specializing in Costa del Sol properties and businesses.
          </p>
          
          <p className="transition-colors hover:text-white/90">
            We are building visual content that transforms how businesses present themselves and connect with their audience.
          </p>
          
          <p className="transition-colors hover:text-white/90">
            We work with real estate agents, personal trainers, and businesses to create compelling photo, video, and digital marketing content that drives real results.
          </p>
        </div>
      </div>
    </section>
  );
};
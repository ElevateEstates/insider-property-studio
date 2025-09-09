import { useEffect, useState } from "react";

export const About = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="py-32 px-4 md:px-6 bg-black-grainy relative overflow-hidden z-10">
      {/* Subtle Star Background */}
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 15% 85%, rgba(255,255,255,0.03) 1px, transparent 1px),
                           radial-gradient(circle at 85% 15%, rgba(255,255,255,0.02) 1px, transparent 1px),
                           radial-gradient(circle at 50% 50%, rgba(255,255,255,0.025) 1px, transparent 1px)`,
          backgroundSize: '90px 90px, 130px 130px, 170px 170px'
        }}></div>
      </div>
      
      <div 
        className="container mx-auto max-w-4xl relative z-20 section-content py-8 px-4 md:px-8"
        style={{ transform: `translateY(${scrollY * 0.03}px)` }}
      >
        <div className="mb-16 animate-fade-up">
          <h2 className="text-5xl md:text-6xl font-light mb-8 border-b border-white/20 pb-4 text-white">
            About
          </h2>
        </div>
        
        <div className="space-y-8 text-lg md:text-xl leading-relaxed text-white/80 font-light animate-slide-in">
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
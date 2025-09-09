import { useEffect, useState } from "react";

export const About = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="pt-2 pb-12 px-4 md:px-6 relative overflow-hidden z-30">
      <div 
        className="container mx-auto max-w-4xl relative z-40 section-content px-4 md:px-8"
        style={{ transform: `translateY(${scrollY * 0.03}px)` }}
      >
        <div className="space-y-6 text-lg md:text-xl leading-relaxed text-white/90 font-light text-center max-w-4xl mx-auto relative z-50">
          <p className="transition-colors hover:text-white bg-black/20 backdrop-blur-sm rounded-lg p-4">
            We are creating visual content that transforms how businesses present themselves and connect with their audience.
          </p>
          
          <p className="transition-colors hover:text-white bg-black/20 backdrop-blur-sm rounded-lg p-4">
            We work with real estate agents, developers, home owners and service providers to create compelling photo, video, and digital marketing content that drives results, generates real leads and drives value.
          </p>
        </div>
      </div>
    </section>
  );
};
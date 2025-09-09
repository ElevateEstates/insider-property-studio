import { useEffect, useState } from "react";

export const About = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="py-4 px-4 md:px-6 relative overflow-hidden z-10">
      <div 
        className="container mx-auto max-w-4xl relative z-20 section-content py-2 px-4 md:px-8"
        style={{ transform: `translateY(${scrollY * 0.03}px)` }}
      >
        <div className="space-y-6 text-lg md:text-xl leading-relaxed text-white/90 font-light text-center max-w-4xl mx-auto mb-8">
          <p className="transition-colors hover:text-white">
            We are creating visual content that transforms how businesses present themselves and connect with their audience.
          </p>
          
          <p className="transition-colors hover:text-white">
            We work with real estate agents, developers, home owners and service providers to create compelling photo, video, and digital marketing content that drives results, generates real leads and drives value.
          </p>
        </div>
      </div>
    </section>
  );
};
import { useEffect, useState } from "react";
export const About = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <section className="pt-6 md:pt-8 pb-12 md:pb-16 px-4 md:px-6 relative overflow-visible z-10">
      <div className="container mx-auto max-w-4xl relative z-10 section-content px-4 md:px-8" style={{
      transform: `translateY(${scrollY * 0.03}px)`
    }}>
        <div className="space-y-4 md:space-y-6 text-base md:text-lg lg:text-xl leading-relaxed text-white font-light text-center max-w-4xl mx-auto relative z-10">
          <p className="transition-colors hover:text-white">We are creating visual content that transforms how properties are presented.</p>
          
          <p className="transition-colors hover:text-white">We work with real estate agents, developers and home owners to create compelling photo, video, and digital marketing content that drives results and generates real leads.</p>
        </div>
      </div>
    </section>;
};
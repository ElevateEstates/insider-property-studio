import { useEffect, useState } from "react";
import heroImage from "@/assets/hero-costa-del-sol.jpg";

export const Hero = () => {
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setAnimationStep(1), 500),
      setTimeout(() => setAnimationStep(2), 1500),
      setTimeout(() => setAnimationStep(3), 2500),
      setTimeout(() => setAnimationStep(4), 3500),
      setTimeout(() => setAnimationStep(5), 4500),
    ];

    return () => timers.forEach(timer => clearTimeout(timer));
  }, []);

  return (
    <section className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-start justify-center min-h-screen px-8 lg:px-16">
        <div className="max-w-7xl w-full space-y-8">
          {/* YOUR */}
          <div className="text-left">
            <h1 className={`text-5xl md:text-7xl lg:text-9xl font-thin tracking-wider transition-all duration-1000 ${
              animationStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <span className="inline-block overflow-hidden">
                <span className={`inline-block transition-transform duration-1000 delay-200 ${
                  animationStep >= 1 ? 'translate-x-0' : '-translate-x-full'
                }`}>
                  YOUR
                </span>
              </span>
            </h1>
          </div>

          {/* LUXURY */}
          <div className="text-center ml-12 lg:ml-24">
            <h1 className={`text-6xl md:text-8xl lg:text-10xl font-light tracking-widest transition-all duration-1000 delay-500 ${
              animationStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <span className="inline-block overflow-hidden">
                <span className={`inline-block bg-gradient-to-r from-blue-400 via-blue-300 to-white bg-clip-text text-transparent transition-transform duration-1000 delay-700 ${
                  animationStep >= 2 ? 'translate-x-0' : 'translate-x-full'
                }`}>
                  LUXURY
                </span>
              </span>
            </h1>
          </div>

          {/* EXCLUSIVE */}
          <div className="text-right mr-8 lg:mr-16">
            <h1 className={`text-4xl md:text-6xl lg:text-7xl font-extralight tracking-wide transition-all duration-1000 delay-1000 ${
              animationStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <span className="inline-block overflow-hidden">
                <span className={`inline-block transition-transform duration-1000 delay-1200 ${
                  animationStep >= 3 ? 'translate-x-0' : 'translate-x-full'
                }`}>
                  EXCLUSIVE
                </span>
              </span>
            </h1>
          </div>

          {/* BESPOKE PARTNER */}
          <div className="text-left ml-8 lg:ml-32">
            <h1 className={`text-5xl md:text-7xl lg:text-8xl font-medium tracking-wide transition-all duration-1000 delay-1500 ${
              animationStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <span className="inline-block overflow-hidden mr-4">
                <span className={`inline-block transition-transform duration-1000 delay-1700 ${
                  animationStep >= 4 ? 'translate-x-0' : '-translate-x-full'
                }`}>
                  BESPOKE
                </span>
              </span>
              <span className="inline-block overflow-hidden">
                <span className={`inline-block transition-transform duration-1000 delay-1900 ${
                  animationStep >= 4 ? 'translate-x-0' : 'translate-x-full'
                }`}>
                  PARTNER
                </span>
              </span>
              <span className="text-6xl md:text-8xl lg:text-9xl">.</span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="text-center mt-16">
            <h2 className={`text-xl md:text-2xl lg:text-3xl font-light text-white/80 tracking-wide transition-all duration-1000 delay-2000 ${
              animationStep >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <span className="inline-block overflow-hidden">
                <span className={`inline-block transition-transform duration-1000 delay-2200 ${
                  animationStep >= 5 ? 'translate-y-0' : 'translate-y-full'
                }`}>
                  Luxury real estate media to impress
                </span>
              </span>
            </h2>
          </div>
        </div>
      </div>

    </section>
  );
};
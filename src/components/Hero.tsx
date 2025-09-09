import { useEffect, useState, useRef } from "react";
import heroImage from "@/assets/hero-costa-del-sol.jpg";

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  onComplete?: () => void;
}

const TypewriterText = ({ text, className = "", delay = 0, speed = 100, onComplete }: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (hasStarted) return; // Prevent multiple starts
    
    const timer = setTimeout(() => {
      setHasStarted(true);
      setIsVisible(true);
      let currentIndex = 0;
      const typeInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay, speed, onComplete, hasStarted]);

  // Reset when text changes
  useEffect(() => {
    setHasStarted(false);
    setDisplayText("");
    setIsVisible(false);
    setIsComplete(false);
  }, [text]);

  return (
    <span className={`${className} ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {displayText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </span>
  );
};

export const Hero = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          setCurrentStep(0);
          // Start the animation sequence
          setTimeout(() => setCurrentStep(1), 300);
        } else if (!entry.isIntersecting && isVisible) {
          setIsVisible(false);
          setCurrentStep(0);
        }
      },
      { threshold: 0.3 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <section ref={heroRef} className="relative min-h-screen bg-black-grainy text-white overflow-hidden z-10">
      {/* Subtle Star Background */}
      <div className="absolute inset-0 opacity-30 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 1px, transparent 1px),
                           radial-gradient(circle at 50% 10%, rgba(255,255,255,0.08) 1px, transparent 1px)`,
          backgroundSize: '50px 50px, 80px 80px, 120px 120px'
        }}></div>
      </div>
      
      {/* Background Image with Parallax */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          transform: `translateY(${scrollY * 0.5}px)`
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content with Parallax */}
      <div 
        className="relative z-30 flex flex-col items-center justify-center min-h-screen px-8 lg:px-16 section-content"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      >
        <div className="max-w-6xl w-full text-center space-y-6 py-20">
          
          {/* YOUR */}
          <div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-thin tracking-wider">
              {currentStep >= 1 && (
                <TypewriterText
                  text="YOUR"
                  className="inline-block"
                  delay={0}
                  speed={75}
                  onComplete={() => setCurrentStep(2)}
                />
              )}
            </h1>
          </div>

          {/* LUXURY */}
          <div>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-light tracking-widest">
              {currentStep >= 1 && (
                <TypewriterText
                  text="LUXURY"
                  className="inline-block bg-gradient-to-r from-blue-400 via-blue-300 to-white bg-clip-text text-transparent"
                  delay={400}
                  speed={60}
                  onComplete={() => setCurrentStep(3)}
                />
              )}
            </h1>
          </div>

          {/* EXCLUSIVE */}
          <div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight tracking-wide">
              {currentStep >= 1 && (
                <TypewriterText
                  text="EXCLUSIVE"
                  className="inline-block"
                  delay={800}
                  speed={65}
                  onComplete={() => setCurrentStep(4)}
                />
              )}
            </h1>
          </div>

          {/* BESPOKE PARTNER */}
          <div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-wide">
              {currentStep >= 1 && (
                <TypewriterText
                  text="BESPOKE PARTNER"
                  className="inline-block"
                  delay={1200}
                  speed={70}
                  onComplete={() => setCurrentStep(5)}
                />
              )}
              <span className="text-6xl md:text-8xl lg:text-9xl">.</span>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="mt-12">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-white/80 tracking-wide">
              {currentStep >= 1 && (
                <TypewriterText
                  text="Luxury real estate media to impress"
                  className="inline-block"
                  delay={2000}
                  speed={40}
                />
              )}
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};
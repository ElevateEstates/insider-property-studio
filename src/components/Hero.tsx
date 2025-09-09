import { useEffect, useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  onComplete?: () => void;
}
const TypewriterText = ({
  text,
  className = "",
  delay = 0,
  speed = 100,
  onComplete
}: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  useEffect(() => {
    if (hasStarted) return;
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
  useEffect(() => {
    setHasStarted(false);
    setDisplayText("");
    setIsVisible(false);
    setIsComplete(false);
  }, [text]);
  return <span className={`${className} ${isVisible ? 'opacity-100' : 'opacity-0'} block pb-2`}>
      {displayText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </span>;
};
export const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [animatedWordIndex, setAnimatedWordIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  
  const animatedWords = ["results.", "connections.", "commissions."];
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Start animation on mount
  useEffect(() => {
    if (!isVisible && !hasCompleted) {
      setIsVisible(true);
      setCurrentStep(0);
      setTimeout(() => setCurrentStep(1), 300);
    }
  }, [isVisible, hasCompleted]);

  // Animate word rotation for "results"
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedWordIndex(prev => (prev + 1) % animatedWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [animatedWords.length]);
  return <section ref={heroRef} className="relative min-h-screen text-white transparent-section">
      <div className="relative z-30 flex flex-col items-center justify-center min-h-screen px-4 md:px-8 lg:px-16 section-content">
        <div className="max-w-6xl w-full text-center space-y-8 py-20 pb-24">
          
          
          <div className="space-y-6">
            {/* First line: Your partner in */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
              {currentStep >= 1 && <TypewriterText text="Your partner in" className="inline-block" delay={0} speed={50} onComplete={() => setCurrentStep(2)} />}
            </h1>
            
            {/* Second line: property marketing, */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
              {currentStep >= 2 && <TypewriterText text="property marketing," className="inline-block text-gradient-gold" delay={100} speed={40} onComplete={() => setCurrentStep(3)} />}
            </h1>

            {/* Third line: turning listings into [animated word] */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
              {currentStep >= 3 && (
                <span className="inline-block">
                  <TypewriterText text="turning listings into " className="inline-block" delay={200} speed={43} onComplete={() => setCurrentStep(4)} />
                  {currentStep >= 4 && (
                    <span className="text-gradient-gold inline-block relative min-w-[200px]">
                      {animatedWords.map((word, index) => (
                        <span 
                          key={`${word}-${index}`}
                          className={`absolute left-0 top-0 transition-all duration-700 ease-in-out transform ${
                            index === animatedWordIndex 
                              ? 'opacity-100 translate-y-0' 
                              : 'opacity-0 translate-y-2'
                          }`}
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          {word}
                        </span>
                      ))}
                      {/* Invisible placeholder for longest word to maintain layout */}
                      <span className="invisible" style={{ whiteSpace: 'nowrap' }}>
                        commissions.
                      </span>
                    </span>
                  )}
                </span>
              )}
            </h1>
          </div>

          {/* Tagline with better spacing */}
          <div className="mt-12 space-y-2">
            <p className={`text-lg md:text-xl text-white/80 leading-relaxed max-w-4xl mx-auto transition-all duration-700 delay-1000 ${currentStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Presentation matters — we combine striking visuals,
            </p>
            <p className={`text-lg md:text-xl text-white/80 leading-relaxed max-w-4xl mx-auto transition-all duration-700 delay-1200 ${currentStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              proven marketing strategies, and local connections
            </p>
            <p className={`text-lg md:text-xl text-white/80 leading-relaxed max-w-4xl mx-auto transition-all duration-700 delay-1400 ${currentStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              to bring buyers, sellers, and agents together for success.
            </p>
          </div>
        </div>
      </div>
    </section>;
};
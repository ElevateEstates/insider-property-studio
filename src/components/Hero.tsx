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
  const heroRef = useRef<HTMLElement>(null);
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
  return <section ref={heroRef} className="relative min-h-screen text-white transparent-section">
      <div className="relative z-30 flex flex-col items-center justify-center min-h-screen px-4 md:px-8 lg:px-16 section-content">
        <div className="max-w-6xl w-full text-center space-y-8 py-20 pb-24">
          
          
          <div className="space-y-4">
            {/* First segment: Your partner in property marketing */}
            <div className="space-y-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight pb-1">
                {currentStep >= 1 && <TypewriterText text="Your partner in" className="inline-block" delay={0} speed={50} onComplete={() => setCurrentStep(2)} />}
              </h1>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight pb-1">
                {currentStep >= 2 && <TypewriterText text="property marketing" className="inline-block text-gradient-gold" delay={100} speed={40} onComplete={() => setCurrentStep(3)} />}
              </h1>
            </div>

            {/* Second segment: turning listings into results */}
            <div className="space-y-1">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight pb-1">
                {currentStep >= 3 && <TypewriterText text="turning listings" className="inline-block" delay={200} speed={43} onComplete={() => setCurrentStep(4)} />}
              </h1>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight pb-1">
                {currentStep >= 4 && <TypewriterText text="into results." className="inline-block" delay={200} speed={47} onComplete={() => setCurrentStep(5)} />}
              </h1>
            </div>
          </div>

          {/* Multi-line tagline */}
          <div className="mt-8 space-y-1">
            <p className="text-xl text-white/80 leading-relaxed max-w-5xl mx-auto">
              {currentStep >= 3 && (
                <TypewriterText 
                  text="Presentation matters — we combine striking visuals," 
                  className="inline-block" 
                  delay={400} 
                  speed={12} 
                  onComplete={() => setCurrentStep(6)} 
                />
              )}
            </p>
            <p className="text-xl text-white/80 leading-relaxed max-w-5xl mx-auto">
              {currentStep >= 6 && (
                <TypewriterText 
                  text="proven marketing strategies, and local connections" 
                  className="inline-block" 
                  delay={100} 
                  speed={12} 
                  onComplete={() => setCurrentStep(7)} 
                />
              )}
            </p>
            <p className="text-xl text-white/80 leading-relaxed max-w-5xl mx-auto pb-8">
              {currentStep >= 7 && (
                <TypewriterText 
                  text="to bring buyers, sellers, and agents together for success." 
                  className="inline-block" 
                  delay={100} 
                  speed={12} 
                  onComplete={() => setHasCompleted(true)} 
                />
              )}
            </p>
          </div>
        </div>
      </div>
    </section>;
};
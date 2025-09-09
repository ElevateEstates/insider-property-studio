import { useEffect, useState, useRef } from "react";
import { useAnimations } from "@/contexts/AnimationContext";

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  onComplete?: () => void;
  animationKey: string;
}

const TypewriterText = ({
  text,
  className = "",
  delay = 0,
  speed = 100,
  onComplete,
  animationKey
}: TypewriterTextProps) => {
  const { hasAnimated, markAsAnimated, isMobile, prefersReducedMotion } = useAnimations();
  const [displayText, setDisplayText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const alreadyAnimated = hasAnimated(animationKey);

  useEffect(() => {
    // If already animated, show immediately
    if (alreadyAnimated) {
      setDisplayText(text);
      setIsVisible(true);
      setIsComplete(true);
      onComplete?.();
      return;
    }

    // Skip typewriter on mobile or reduced motion preference
    if (isMobile || prefersReducedMotion) {
      const timer = setTimeout(() => {
        setDisplayText(text);
        setIsVisible(true);
        setIsComplete(true);
        markAsAnimated(animationKey);
        onComplete?.();
      }, Math.max(delay / 3, 100)); // Reduce delay for mobile
      return () => clearTimeout(timer);
    }

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
          markAsAnimated(animationKey);
          onComplete?.();
        }
      }, speed);
      return () => clearInterval(typeInterval);
    }, delay);
    return () => clearTimeout(timer);
  }, [text, delay, speed, onComplete, hasStarted, animationKey, alreadyAnimated, markAsAnimated, isMobile, prefersReducedMotion]);

  useEffect(() => {
    if (!alreadyAnimated) {
      setHasStarted(false);
      setDisplayText("");
      setIsVisible(false);
      setIsComplete(false);
    }
  }, [text, alreadyAnimated]);

  return (
    <span className={`${className} ${isVisible ? 'opacity-100' : 'opacity-0'} block pb-2`}>
      {displayText}
      {!isComplete && !alreadyAnimated && !isMobile && !prefersReducedMotion && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
};

export const Hero = () => {
  const { hasAnimated, isMobile } = useAnimations();
  const [scrollY, setScrollY] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [animatedWordIndex, setAnimatedWordIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  
  const animatedWords = ["results.", "connections.", "commissions."];
  
  const heroAnimated = hasAnimated('hero-complete');

  useEffect(() => {
    const handleScroll = () => {
      // Throttle scroll for mobile performance
      if (isMobile) {
        requestAnimationFrame(() => setScrollY(window.scrollY));
      } else {
        setScrollY(window.scrollY);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Start animation on mount or show immediately if already animated
  useEffect(() => {
    if (heroAnimated) {
      setIsVisible(true);
      setCurrentStep(4);
      setHasCompleted(true);
    } else if (!isVisible && !hasCompleted) {
      setIsVisible(true);
      setCurrentStep(0);
      setTimeout(() => setCurrentStep(1), isMobile ? 100 : 300);
    }
  }, [isVisible, hasCompleted, heroAnimated, isMobile]);

  // Animate word rotation for "results"
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedWordIndex(prev => (prev + 1) % animatedWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [animatedWords.length]);

  return (
    <section ref={heroRef} className="relative min-h-screen text-white transparent-section">
      <div className="relative z-30 flex flex-col items-center justify-center min-h-screen px-4 md:px-8 lg:px-16 section-content">
        <div className="max-w-6xl w-full text-center space-y-8 py-20 pb-24">
          <div className="space-y-6">
            {/* First line: Your partner in */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light leading-tight">
              {currentStep >= 1 && (
                <TypewriterText 
                  text="Your partner in" 
                  className="inline-block" 
                  delay={0} 
                  speed={50} 
                  animationKey="hero-line-1"
                  onComplete={() => setCurrentStep(2)} 
                />
              )}
            </h1>
            
            {/* Second line: property marketing, */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight">
              {currentStep >= 2 && (
                <TypewriterText 
                  text="property marketing," 
                  className="inline-block text-gradient-gold" 
                  delay={100} 
                  speed={40} 
                  animationKey="hero-line-2"
                  onComplete={() => setCurrentStep(3)} 
                />
              )}
            </h1>

            {/* Third line: turning listings into [animated word] */}
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-light leading-tight">
              {currentStep >= 3 && (
                <span className="inline-block">
                  <TypewriterText 
                    text="turning listings into" 
                    className="inline-block" 
                    delay={200} 
                    speed={43} 
                    animationKey="hero-line-3"
                    onComplete={() => setCurrentStep(4)} 
                  />
                  {currentStep >= 4 && (
                    <>
                      <span> </span>
                      <span className="text-gradient-gold inline-block">
                        {animatedWords[animatedWordIndex]}
                      </span>
                    </>
                  )}
                </span>
              )}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};
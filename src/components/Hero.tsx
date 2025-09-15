import { useEffect, useState, useRef } from "react";
import { useAnimations } from "@/contexts/AnimationContext";

interface FadeInTextProps {
  text: string;
  className?: string;
  delay?: number;
  animationKey: string;
  onComplete?: () => void;
}

const FadeInText = ({
  text,
  className = "",
  delay = 0,
  animationKey,
  onComplete
}: FadeInTextProps) => {
  const { hasAnimated, markAsAnimated } = useAnimations();
  const [isVisible, setIsVisible] = useState(false);

  const alreadyAnimated = hasAnimated(animationKey);

  useEffect(() => {
    if (alreadyAnimated) {
      setIsVisible(true);
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
      markAsAnimated(animationKey);
      onComplete?.();
    }, delay);

    return () => clearTimeout(timer);
  }, [delay, animationKey, alreadyAnimated, markAsAnimated, onComplete]);

  return (
    <span className={`${className} transition-all duration-700 ease-out ${
      isVisible || alreadyAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
    } block pb-2`}>
      {text}
    </span>
  );
};

export const Hero = () => {
  const { hasAnimated, isMobile } = useAnimations();
  const [scrollY, setScrollY] = useState(0);
  const [animatedWordIndex, setAnimatedWordIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  
  const animatedWords = ["results.", "connections.", "commissions."];

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
              <FadeInText 
                text="Your partner in" 
                className="inline-block" 
                delay={0} 
                animationKey="hero-line-1"
              />
            </h1>
            
            {/* Second line: property marketing, */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light leading-tight">
              <FadeInText 
                text="property marketing," 
                className="inline-block text-gradient-gold" 
                delay={300} 
                animationKey="hero-line-2"
              />
            </h1>

            {/* Third line: turning listings into [animated word] - 50% smaller */}
            <h1 className="text-xl md:text-2xl lg:text-3xl font-light leading-tight">
              <span className="inline-block">
                <FadeInText 
                  text="turning listings into" 
                  className="inline-block" 
                  delay={600} 
                  animationKey="hero-line-3"
                />
                <span className="text-gradient-gold inline-block ml-2">
                  {animatedWords[animatedWordIndex]}
                </span>
              </span>
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};
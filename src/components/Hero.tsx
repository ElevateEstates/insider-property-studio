import { useEffect, useState, useRef } from "react";
import { useAnimations } from "@/contexts/AnimationContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

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
  const heroRef = useRef<HTMLElement>(null);

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

  return (
    <header ref={heroRef} className="relative min-h-screen text-white transparent-section">
      <div className="relative z-30 flex flex-col items-center justify-center min-h-screen px-6 md:px-8 lg:px-16 section-content">
        <div className="max-w-7xl w-full text-center space-y-12 py-20 pb-32">
          <div className="space-y-8 md:space-y-12">
            {/* Main Heading */}
            <div className="space-y-6">
              <FadeInText 
                text="Your partner in" 
                className="block text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light leading-[0.9] tracking-tight" 
                delay={0} 
                animationKey="hero-line-1"
              />
              
              <FadeInText 
                text="property marketing" 
                className="block text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light leading-[0.9] tracking-tight text-gradient-gold" 
                delay={400} 
                animationKey="hero-line-2"
              />
            </div>


            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center items-center pt-8">
              <div className={`transition-all duration-700 ${hasAnimated('hero-cta-1') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <Button 
                  variant="primary" 
                  size="lg"
                  className="w-full sm:w-auto text-base md:text-lg px-8 md:px-12 py-4 md:py-6 h-auto min-h-[48px]"
                  aria-label="View our portfolio of property marketing work"
                  asChild
                >
                  <Link to="/portfolio">View Our Work</Link>
                </Button>
              </div>
              
              <div className={`transition-all duration-700 delay-200 ${hasAnimated('hero-cta-2') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <Button 
                  variant="secondary" 
                  size="lg"
                  className="w-full sm:w-auto text-base md:text-lg px-8 md:px-12 py-4 md:py-6 h-auto min-h-[48px]"
                  aria-label="Get started with our property marketing services"
                  asChild
                >
                  <Link to="/contact">Get Started</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
    </header>
  );
};
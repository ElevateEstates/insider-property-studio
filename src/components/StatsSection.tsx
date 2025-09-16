import { useEffect, useState, useRef } from "react";
import { usePersistedAnimation } from "@/hooks/usePersistedAnimation";

interface DynamicTextProps {
  children: string;
  className?: string;
}

const DynamicText = ({ children, className = "" }: DynamicTextProps) => {
  const textRef = useRef<HTMLParagraphElement>(null);
  const [fontSize, setFontSize] = useState(14);

  useEffect(() => {
    const adjustFontSize = () => {
      if (!textRef.current) return;
      
      const container = textRef.current;
      const containerWidth = container.parentElement?.offsetWidth || window.innerWidth - 32; // Account for padding
      
      // Create a temporary span to measure text width
      const span = document.createElement('span');
      span.style.visibility = 'hidden';
      span.style.position = 'absolute';
      span.style.whiteSpace = 'nowrap';
      span.style.fontSize = '14px';
      span.textContent = children;
      document.body.appendChild(span);
      
      const textWidth = span.offsetWidth;
      document.body.removeChild(span);
      
      // Calculate the scale needed
      if (textWidth > containerWidth) {
        const scale = containerWidth / textWidth;
        const newFontSize = Math.max(10, 14 * scale * 0.9); // 0.9 for some margin
        setFontSize(newFontSize);
      } else {
        setFontSize(14);
      }
    };

    // Use timeout to ensure DOM is ready
    const timer = setTimeout(adjustFontSize, 100);
    window.addEventListener('resize', adjustFontSize);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', adjustFontSize);
    };
  }, [children]);

  return (
    <p 
      ref={textRef}
      className={`${className} whitespace-nowrap overflow-hidden`}
      style={{ fontSize: `${fontSize}px` }}
    >
      {children}
    </p>
  );
};

interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
  isVisible: boolean;
  isMobile?: boolean;
}

const CountUp = ({ end, suffix = "", duration = 2000, isVisible, isMobile = false }: CountUpProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setCount(0);
      return;
    }

    let startTime: number;
    let animationFrame: number;

    // Faster animation on mobile
    const effectiveDuration = isMobile ? duration * 0.7 : duration;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / effectiveDuration, 1);
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(end * easeOutCubic));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible, isMobile]);

  return <span>{count}{suffix}</span>;
};

export const StatsSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [animatedWordIndex, setAnimatedWordIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  
  const animatedWords = ["results.", "connections.", "commissions."];
  
  // Get mobile detection first
  const animationData = usePersistedAnimation({ 
    key: 'stats-section-main',  // Make it critical content
    threshold: 0.1,
    delay: 0  // No delay for immediate trigger
  });
  
  const { 
    ref: animationRef,
    isVisible, 
    shouldAnimate, 
    hasAnimated: alreadyAnimated, 
    isMobile 
  } = animationData;

  // Combine refs
  const combinedRef = (el: HTMLElement | null) => {
    if (sectionRef.current !== el) sectionRef.current = el;
    if (animationRef.current !== el) animationRef.current = el;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (isMobile) {
        requestAnimationFrame(() => setScrollY(window.scrollY));
      } else {
        setScrollY(window.scrollY);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  // Animate word rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedWordIndex(prev => (prev + 1) % animatedWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [animatedWords.length]);

  const stats = [
    { label: "views generated", value: 2, suffix: "m+", color: "text-blue-400", prefix: "" },
    { label: "properties shot", value: 250, suffix: "+", color: "text-white", prefix: "" },
    { label: "partner agents", value: 20, suffix: "+", color: "text-blue-400", prefix: "" },
    { label: "ad spend in 2025", value: 10, suffix: "k+", color: "text-white", prefix: "€" }
  ];

  return (
    <section ref={combinedRef} className="py-12 md:py-16 px-4 md:px-6 relative overflow-hidden z-10">
      {/* Subtle Star Background */}
      <div className="absolute inset-0 opacity-15 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 30% 70%, rgba(255,255,255,0.04) 1px, transparent 1px),
                           radial-gradient(circle at 70% 30%, rgba(255,255,255,0.02) 1px, transparent 1px),
                           radial-gradient(circle at 10% 90%, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '70px 70px, 110px 110px, 160px 160px'
        }}></div>
      </div>
      
      <div 
        className="container mx-auto max-w-6xl relative z-20 section-content py-4 md:py-8 px-4 md:px-8"
        style={{ transform: `translateY(${scrollY * 0.05}px)` }}
      >
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-light mb-6 md:mb-8 text-white leading-tight">
            turning listings into{" "}
            <span className="text-gradient-gold transition-all duration-500">
              {animatedWords[animatedWordIndex]}
            </span>
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="glass-card text-center rounded-2xl p-4 md:p-8">
              <div className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light ${stat.color} mb-2 md:mb-4`}>
                {stat.prefix}<CountUp 
                  end={stat.value} 
                  suffix={stat.suffix}
                  duration={2000}
                  isVisible={shouldAnimate || alreadyAnimated}
                  isMobile={isMobile}
                />
              </div>
              <div className="text-white/70 text-xs md:text-sm uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tagline moved from Hero section */}
        <div className="mt-12 md:mt-20 space-y-2 text-center">
          {/* Mobile version - 4 rows equally distributed */}
          <div className="block md:hidden px-4 text-white/80 leading-relaxed pb-12">
            <div className="text-sm sm:text-base space-y-1">
              <div>Presentation matters — we combine</div>
              <div>striking visuals, proven marketing</div>
              <div>strategies, and local connections to</div>
              <div>bring buyers, sellers, and agents together for success</div>
            </div>
          </div>
          
          {/* Desktop version - unchanged */}
          <p className="hidden md:block text-lg lg:text-xl text-white/80 leading-relaxed max-w-4xl mx-auto">
            Presentation matters — we combine striking visuals, proven marketing strategies,
          </p>
          <p className="hidden md:block text-lg lg:text-xl text-white/80 leading-relaxed max-w-4xl mx-auto pb-12 md:pb-16">
            and local connections to bring buyers, sellers, and agents together for success.
          </p>
        </div>
      </div>
    </section>
  );
};
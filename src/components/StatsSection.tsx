import { useEffect, useState, useRef } from "react";

interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
  isVisible: boolean;
}

const CountUp = ({ end, suffix = "", duration = 2000, isVisible }: CountUpProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) {
      setCount(0);
      return;
    }

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(end * easeOutCubic));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isVisible]);

  return <span>{count}{suffix}</span>;
};

export const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { label: "views generated", value: 2, suffix: "m+", color: "text-blue-400", prefix: "" },
    { label: "properties shot", value: 250, suffix: "+", color: "text-white", prefix: "" },
    { label: "partner agents", value: 20, suffix: "+", color: "text-blue-400", prefix: "" },
    { label: "ad spend in 2024", value: 10, suffix: "k+", color: "text-white", prefix: "€" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsVisible(true);
          setHasAnimated(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  return (
    <section ref={sectionRef} className="py-16 px-4 md:px-6 relative overflow-hidden z-10">
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
        className="container mx-auto max-w-6xl relative z-20 section-content py-8 px-4 md:px-8"
        style={{ transform: `translateY(${scrollY * 0.05}px)` }}
      >
        <div className="text-center mb-16">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl font-light mb-8 text-white leading-tight">
            Helping buyers find the homes they truly want
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="glass-card text-center rounded-2xl p-8">
              <div className={`text-4xl md:text-5xl lg:text-6xl font-light ${stat.color} mb-4`}>
                {stat.prefix}<CountUp 
                  end={stat.value} 
                  suffix={stat.suffix}
                  duration={2000}
                  isVisible={isVisible}
                />
              </div>
              <div className="text-white/70 text-sm uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Tagline moved from Hero section */}
        <div className="mt-20 space-y-2 text-center">
          <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-4xl mx-auto">
            Presentation matters — we combine striking visuals,
          </p>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-4xl mx-auto">
            proven marketing strategies, and local connections
          </p>
          <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-4xl mx-auto pb-16">
            to bring buyers, sellers, and agents together for success.
          </p>
        </div>
      </div>
    </section>
  );
};
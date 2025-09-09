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
  const [scrollY, setScrollY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const stats = [
    { label: "Views Generated", value: 5, suffix: "M+", color: "text-blue-400" },
    { label: "Shot in 2024", value: 50, suffix: "B+", color: "text-white" },
    { label: "5 Star Reviews", value: 50, suffix: "+", color: "text-blue-400" },
    { label: "Commissions Earned", value: 33, suffix: "M+", color: "text-white" }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-black relative overflow-hidden">
      {/* Subtle Star Background */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 30% 70%, rgba(255,255,255,0.04) 1px, transparent 1px),
                           radial-gradient(circle at 70% 30%, rgba(255,255,255,0.02) 1px, transparent 1px),
                           radial-gradient(circle at 10% 90%, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '70px 70px, 110px 110px, 160px 160px'
        }}></div>
      </div>
      
      <div 
        className="container mx-auto max-w-6xl relative z-10"
        style={{ transform: `translateY(${scrollY * 0.05}px)` }}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 text-white">
            Reflecting the aspirations of the modern buyer
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-sm md:text-base text-white/70 mb-2 uppercase tracking-wide">
                {stat.label}
              </div>
              <div className={`text-4xl md:text-5xl lg:text-6xl font-light ${stat.color}`}>
                $<CountUp 
                  end={stat.value} 
                  suffix={stat.suffix}
                  duration={2000}
                  isVisible={isVisible}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
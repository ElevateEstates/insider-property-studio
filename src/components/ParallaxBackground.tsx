import { useEffect, useState } from "react";

interface ParallaxBackgroundProps {
  className?: string;
  speed?: number;
  opacity?: number;
}

export const ParallaxBackground = ({ 
  className = "", 
  speed = 8, 
  opacity = 1 
}: ParallaxBackgroundProps) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <div 
        className={`absolute inset-0 bg-black-grainy ${className}`}
        style={{
          transform: `translateY(${scrollY * speed}px)`,
          opacity: opacity
        }}
      />
      {/* Independent grain parallax layer */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * (speed * 1.5)}px) translateX(${scrollY * 0.1}px)`,
          background: `
            radial-gradient(circle at ${13 + scrollY * 0.05}% ${23 + scrollY * 0.04}%, rgba(255,255,255,0.53) 1.2px, transparent 3px),
            radial-gradient(circle at ${87 - scrollY * 0.04}% ${17 + scrollY * 0.06}%, rgba(200,220,255,0.45) 0.8px, transparent 2.5px),
            radial-gradient(circle at ${47 + scrollY * 0.03}% ${73 - scrollY * 0.05}%, rgba(255,255,255,0.70) 1.5px, transparent 3.5px),
            radial-gradient(circle at ${91 - scrollY * 0.035}% ${83 + scrollY * 0.025}%, rgba(255,240,200,0.39) 0.6px, transparent 2px),
            radial-gradient(circle at ${73 + scrollY * 0.045}% ${43 - scrollY * 0.04}%, rgba(220,200,255,0.34) 0.9px, transparent 2.8px)
          `,
          backgroundSize: `
            ${890 + scrollY * 0.5}px ${1050 + scrollY * 0.6}px,
            ${1205 - scrollY * 0.4}px ${1425 + scrollY * 0.5}px,
            ${1080 + scrollY * 0.3}px ${1250 - scrollY * 0.35}px,
            ${1635 - scrollY * 0.25}px ${1795 + scrollY * 0.4}px,
            ${765 + scrollY * 0.2}px ${885 - scrollY * 0.3}px
          `,
          opacity: opacity * 0.8
        }}
      />
    </div>
  );
};
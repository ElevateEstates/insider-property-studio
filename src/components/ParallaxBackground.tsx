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
          transform: `translateY(${scrollY * (speed * 0.3)}px) translateX(${scrollY * 0.02}px)`,
          background: `
            radial-gradient(circle at ${13 + scrollY * 0.01}% ${23 + scrollY * 0.008}%, rgba(255,255,255,0.76) 1.2px, transparent 3px),
            radial-gradient(circle at ${87 - scrollY * 0.008}% ${17 + scrollY * 0.012}%, rgba(200,220,255,0.64) 0.8px, transparent 2.5px),
            radial-gradient(circle at ${47 + scrollY * 0.006}% ${73 - scrollY * 0.01}%, rgba(255,255,255,0.72) 1.5px, transparent 3.5px),
            radial-gradient(circle at ${91 - scrollY * 0.007}% ${83 + scrollY * 0.005}%, rgba(255,240,200,0.56) 0.6px, transparent 2px),
            radial-gradient(circle at ${73 + scrollY * 0.009}% ${43 - scrollY * 0.008}%, rgba(220,200,255,0.48) 0.9px, transparent 2.8px)
          `,
          backgroundSize: `
            ${580 + scrollY * 0.1}px ${690 + scrollY * 0.12}px,
            ${785 - scrollY * 0.08}px ${925 + scrollY * 0.1}px,
            ${700 + scrollY * 0.06}px ${810 - scrollY * 0.07}px,
            ${1055 - scrollY * 0.05}px ${1160 + scrollY * 0.08}px,
            ${1290 + scrollY * 0.04}px ${1385 - scrollY * 0.06}px
          `,
          opacity: opacity * 0.8
        }}
      />
    </div>
  );
};
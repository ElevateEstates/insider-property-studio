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
      {/* Base parallax layer - moves much faster than content */}
      <div 
        className={`absolute inset-0 bg-black-grainy ${className}`}
        style={{
          transform: `translateY(${scrollY * speed * 5}px)`,
          opacity: opacity
        }}
      />
      {/* Independent grain parallax layer - extreme speed difference */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * (speed * 8)}px) translateX(${scrollY * 1.2}px) rotate(${scrollY * 0.05}deg)`,
          background: `
            radial-gradient(circle at ${13 + scrollY * 0.5}% ${23 + scrollY * 0.4}%, rgba(255,255,255,0.53) 1.2px, transparent 3px),
            radial-gradient(circle at ${87 - scrollY * 0.3}% ${17 + scrollY * 0.6}%, rgba(200,220,255,0.45) 0.8px, transparent 2.5px),
            radial-gradient(circle at ${47 + scrollY * 0.25}% ${73 - scrollY * 0.35}%, rgba(255,255,255,0.70) 1.5px, transparent 3.5px),
            radial-gradient(circle at ${91 - scrollY * 0.4}% ${83 + scrollY * 0.2}%, rgba(255,240,200,0.39) 0.6px, transparent 2px),
            radial-gradient(circle at ${73 + scrollY * 0.45}% ${43 - scrollY * 0.3}%, rgba(220,200,255,0.34) 0.9px, transparent 2.8px)
          `,
          backgroundSize: `
            ${890 + scrollY * 4}px ${1050 + scrollY * 5}px,
            ${1205 - scrollY * 3}px ${1425 + scrollY * 4}px,
            ${1080 + scrollY * 2.5}px ${1250 - scrollY * 3.5}px,
            ${1635 - scrollY * 2}px ${1795 + scrollY * 3}px,
            ${765 + scrollY * 1.5}px ${885 - scrollY * 2.5}px
          `,
          opacity: opacity * 0.8
        }}
      />
      {/* Additional layer for even more dramatic effect */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * (speed * 12)}px) translateX(${scrollY * -0.8}px) scale(${1 + scrollY * 0.001})`,
          background: `
            radial-gradient(circle at ${25 + scrollY * 0.8}% ${67 - scrollY * 0.6}%, rgba(255,255,255,0.35) 0.5px, transparent 2px),
            radial-gradient(circle at ${75 - scrollY * 0.4}% ${33 + scrollY * 0.7}%, rgba(180,200,255,0.25) 0.3px, transparent 1.5px),
            radial-gradient(circle at ${55 + scrollY * 0.3}% ${15 - scrollY * 0.4}%, rgba(255,220,180,0.30) 0.4px, transparent 1.8px)
          `,
          backgroundSize: `
            ${1200 + scrollY * 6}px ${1400 + scrollY * 7}px,
            ${800 - scrollY * 2}px ${950 + scrollY * 3}px,
            ${1500 + scrollY * 4}px ${1100 - scrollY * 2}px
          `,
          opacity: opacity * 0.6
        }}
      />
    </div>
  );
};
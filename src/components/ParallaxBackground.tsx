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
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Base parallax layer - extreme speed difference */}
      <div 
        className={`absolute inset-0 bg-black-grainy ${className}`}
        style={{
          transform: `translateY(${scrollY * speed * 50}px)`,
          opacity: opacity,
          height: '300vh' // Extended height for full coverage
        }}
      />
      
      {/* Top section parallax layer - extreme movement */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * (speed * 80)}px) translateX(${scrollY * 12}px) rotate(${scrollY * 0.5}deg)`,
          height: '300vh',
          background: `
            radial-gradient(circle at ${13 + scrollY * 5}% ${23 + scrollY * 4}%, rgba(255,255,255,0.53) 1.2px, transparent 3px),
            radial-gradient(circle at ${87 - scrollY * 3}% ${17 + scrollY * 6}%, rgba(200,220,255,0.45) 0.8px, transparent 2.5px),
            radial-gradient(circle at ${47 + scrollY * 2.5}% ${73 - scrollY * 3.5}%, rgba(255,255,255,0.70) 1.5px, transparent 3.5px),
            radial-gradient(circle at ${91 - scrollY * 4}% ${83 + scrollY * 2}%, rgba(255,240,200,0.39) 0.6px, transparent 2px),
            radial-gradient(circle at ${73 + scrollY * 4.5}% ${43 - scrollY * 3}%, rgba(220,200,255,0.34) 0.9px, transparent 2.8px)
          `,
          backgroundSize: `
            ${890 + scrollY * 40}px ${1050 + scrollY * 50}px,
            ${1205 - scrollY * 30}px ${1425 + scrollY * 40}px,
            ${1080 + scrollY * 25}px ${1250 - scrollY * 35}px,
            ${1635 - scrollY * 20}px ${1795 + scrollY * 30}px,
            ${765 + scrollY * 15}px ${885 - scrollY * 25}px
          `,
          opacity: opacity * 0.8
        }}
      />
      
      {/* Middle section parallax layer - different speed */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * (speed * 120)}px) translateX(${scrollY * -8}px) scale(${1 + scrollY * 0.01})`,
          height: '300vh',
          background: `
            radial-gradient(circle at ${25 + scrollY * 8}% ${67 - scrollY * 6}%, rgba(255,255,255,0.35) 0.5px, transparent 2px),
            radial-gradient(circle at ${75 - scrollY * 4}% ${33 + scrollY * 7}%, rgba(180,200,255,0.25) 0.3px, transparent 1.5px),
            radial-gradient(circle at ${55 + scrollY * 3}% ${15 - scrollY * 4}%, rgba(255,220,180,0.30) 0.4px, transparent 1.8px)
          `,
          backgroundSize: `
            ${1200 + scrollY * 60}px ${1400 + scrollY * 70}px,
            ${800 - scrollY * 20}px ${950 + scrollY * 30}px,
            ${1500 + scrollY * 40}px ${1100 - scrollY * 20}px
          `,
          opacity: opacity * 0.6
        }}
      />
      
      {/* Bottom section extreme parallax layer */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * (speed * -60)}px) translateX(${scrollY * 15}px) rotate(${scrollY * -0.3}deg)`,
          height: '300vh',
          background: `
            radial-gradient(circle at ${35 - scrollY * 6}% ${85 + scrollY * 5}%, rgba(255,255,255,0.45) 1.0px, transparent 2.5px),
            radial-gradient(circle at ${65 + scrollY * 7}% ${45 - scrollY * 4}%, rgba(200,255,220,0.30) 0.6px, transparent 2px),
            radial-gradient(circle at ${15 + scrollY * 4}% ${25 + scrollY * 8}%, rgba(255,200,255,0.35) 0.8px, transparent 2.2px),
            radial-gradient(circle at ${85 - scrollY * 5}% ${75 - scrollY * 6}%, rgba(255,255,255,0.40) 0.4px, transparent 1.8px)
          `,
          backgroundSize: `
            ${950 + scrollY * 45}px ${1150 + scrollY * 55}px,
            ${750 - scrollY * 25}px ${900 + scrollY * 35}px,
            ${1300 + scrollY * 30}px ${1050 - scrollY * 15}px,
            ${600 + scrollY * 10}px ${700 - scrollY * 20}px
          `,
          opacity: opacity * 0.7
        }}
      />
      
      {/* Ultra-fast parallax layer for maximum effect */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * (speed * 150)}px) translateX(${scrollY * -20}px) rotate(${scrollY * 0.8}deg) scale(${1 + scrollY * 0.015})`,
          height: '300vh',
          background: `
            radial-gradient(circle at ${50 + scrollY * 10}% ${20 - scrollY * 8}%, rgba(255,255,255,0.25) 0.3px, transparent 1.5px),
            radial-gradient(circle at ${20 - scrollY * 6}% ${80 + scrollY * 9}%, rgba(180,220,255,0.20) 0.2px, transparent 1.2px),
            radial-gradient(circle at ${80 + scrollY * 5}% ${60 - scrollY * 7}%, rgba(255,180,200,0.15) 0.4px, transparent 1.8px),
            radial-gradient(circle at ${40 - scrollY * 3}% ${40 + scrollY * 6}%, rgba(200,255,200,0.18) 0.25px, transparent 1.3px)
          `,
          backgroundSize: `
            ${400 + scrollY * 80}px ${500 + scrollY * 90}px,
            ${600 - scrollY * 35}px ${750 + scrollY * 45}px,
            ${350 + scrollY * 20}px ${400 - scrollY * 25}px,
            ${800 + scrollY * 50}px ${950 - scrollY * 30}px
          `,
          opacity: opacity * 0.5
        }}
      />
      
      {/* Counter-directional parallax layer */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * (speed * -90)}px) translateX(${scrollY * 25}px) rotate(${scrollY * -0.6}deg)`,
          height: '300vh',
          background: `
            radial-gradient(circle at ${60 - scrollY * 8}% ${30 + scrollY * 10}%, rgba(255,255,255,0.30) 0.6px, transparent 2px),
            radial-gradient(circle at ${30 + scrollY * 12}% ${70 - scrollY * 5}%, rgba(255,230,180,0.25) 0.3px, transparent 1.5px),
            radial-gradient(circle at ${90 - scrollY * 4}% ${10 + scrollY * 7}%, rgba(200,200,255,0.20) 0.5px, transparent 1.9px)
          `,
          backgroundSize: `
            ${1100 + scrollY * 70}px ${1300 + scrollY * 80}px,
            ${650 - scrollY * 40}px ${800 + scrollY * 50}px,
            ${1400 + scrollY * 60}px ${900 - scrollY * 35}px
          `,
          opacity: opacity * 0.4
        }}
      />
    </div>
  );
};
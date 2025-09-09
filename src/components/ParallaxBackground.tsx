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
      {/* Base black background */}
      <div 
        className={`absolute inset-0 bg-black ${className}`}
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
          opacity: opacity
        }}
      />
      
      {/* Layer 1 - Slow moving white dots */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 2}px) translateX(${scrollY * 0.3}px)`,
          background: `
            radial-gradient(circle at 15% 25%, rgba(255,255,255,0.8) 1px, transparent 3px),
            radial-gradient(circle at 85% 15%, rgba(255,255,255,0.6) 0.8px, transparent 2.5px),
            radial-gradient(circle at 45% 75%, rgba(255,255,255,0.9) 1.2px, transparent 3.5px),
            radial-gradient(circle at 75% 85%, rgba(255,255,255,0.7) 0.6px, transparent 2px),
            radial-gradient(circle at 25% 45%, rgba(255,255,255,0.5) 0.9px, transparent 2.8px)
          `,
          backgroundSize: `400px 500px, 600px 700px, 350px 450px, 800px 900px, 300px 400px`,
          opacity: 0.9
        }}
      />
      
      {/* Layer 2 - Medium speed dots */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 4}px) translateX(${scrollY * -0.5}px)`,
          background: `
            radial-gradient(circle at 35% 65%, rgba(255,255,255,0.7) 0.8px, transparent 2.5px),
            radial-gradient(circle at 65% 35%, rgba(200,220,255,0.6) 0.6px, transparent 2px),
            radial-gradient(circle at 85% 75%, rgba(255,255,255,0.8) 1px, transparent 3px),
            radial-gradient(circle at 20% 20%, rgba(255,240,200,0.5) 0.7px, transparent 2.2px)
          `,
          backgroundSize: `500px 600px, 450px 550px, 700px 800px, 350px 400px`,
          opacity: 0.8
        }}
      />
      
      {/* Layer 3 - Fast moving dots */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 6}px) translateX(${scrollY * 0.8}px) rotate(${scrollY * 0.1}deg)`,
          background: `
            radial-gradient(circle at 55% 15%, rgba(255,255,255,0.9) 1.2px, transparent 3px),
            radial-gradient(circle at 15% 85%, rgba(220,200,255,0.6) 0.5px, transparent 2px),
            radial-gradient(circle at 90% 45%, rgba(255,255,255,0.7) 0.8px, transparent 2.5px),
            radial-gradient(circle at 40% 60%, rgba(180,200,255,0.5) 0.6px, transparent 2.2px)
          `,
          backgroundSize: `300px 400px, 550px 650px, 400px 500px, 600px 700px`,
          opacity: 0.7
        }}
      />
      
      {/* Layer 4 - Very fast dots with counter movement */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * -3}px) translateX(${scrollY * 1.2}px) rotate(${scrollY * -0.05}deg)`,
          background: `
            radial-gradient(circle at 70% 30%, rgba(255,255,255,0.8) 1px, transparent 2.8px),
            radial-gradient(circle at 30% 70%, rgba(255,200,220,0.6) 0.7px, transparent 2.3px),
            radial-gradient(circle at 80% 80%, rgba(255,255,255,0.5) 0.4px, transparent 1.8px),
            radial-gradient(circle at 10% 10%, rgba(200,255,200,0.7) 0.9px, transparent 2.5px)
          `,
          backgroundSize: `450px 550px, 350px 450px, 250px 300px, 500px 600px`,
          opacity: 0.6
        }}
      />
      
      {/* Layer 5 - Ultra fast dots */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 8}px) translateX(${scrollY * -1}px) rotate(${scrollY * 0.15}deg)`,
          background: `
            radial-gradient(circle at 50% 20%, rgba(255,255,255,0.9) 0.6px, transparent 2px),
            radial-gradient(circle at 20% 80%, rgba(255,230,180,0.7) 0.4px, transparent 1.5px),
            radial-gradient(circle at 80% 60%, rgba(255,255,255,0.6) 0.8px, transparent 2.3px),
            radial-gradient(circle at 60% 40%, rgba(200,200,255,0.5) 0.3px, transparent 1.8px)
          `,
          backgroundSize: `200px 250px, 400px 500px, 300px 350px, 150px 200px`,
          opacity: 0.5
        }}
      />
      
      {/* Layer 6 - Extreme counter-directional movement */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * -5}px) translateX(${scrollY * 1.5}px) rotate(${scrollY * -0.2}deg)`,
          background: `
            radial-gradient(circle at 60% 10%, rgba(255,255,255,0.8) 0.5px, transparent 2px),
            radial-gradient(circle at 10% 90%, rgba(180,220,255,0.6) 0.7px, transparent 2.2px),
            radial-gradient(circle at 90% 70%, rgba(255,255,255,0.7) 0.4px, transparent 1.6px)
          `,
          backgroundSize: `600px 700px, 250px 300px, 400px 500px`,
          opacity: 0.4
        }}
      />
    </div>
  );
};
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
      {/* Extended background to cover beyond viewport */}
      <div 
        className={`absolute bg-black ${className}`}
        style={{
          transform: `translateY(${scrollY * 1}px)`,
          opacity: opacity,
          top: '-100vh',
          left: '-50vw',
          right: '-50vw',
          bottom: '-100vh',
          width: '200vw',
          height: '400vh'
        }}
      />
      
      {/* Layer 1 - Slow moving white dots - Extended coverage */}
      <div 
        className="absolute"
        style={{
          transform: `translateY(${scrollY * 4}px) translateX(${scrollY * 0.6}px)`,
          top: '-150vh',
          left: '-75vw',
          right: '-75vw',
          bottom: '-150vh',
          width: '250vw',
          height: '500vh',
          background: `
            radial-gradient(circle at 15% 25%, rgba(255,255,255,0.8) 1px, transparent 3px),
            radial-gradient(circle at 85% 15%, rgba(255,255,255,0.6) 0.8px, transparent 2.5px),
            radial-gradient(circle at 45% 75%, rgba(255,255,255,0.9) 1.2px, transparent 3.5px),
            radial-gradient(circle at 75% 85%, rgba(255,255,255,0.7) 0.6px, transparent 2px),
            radial-gradient(circle at 25% 45%, rgba(255,255,255,0.5) 0.9px, transparent 2.8px),
            radial-gradient(circle at 60% 10%, rgba(255,255,255,0.7) 0.8px, transparent 2.3px),
            radial-gradient(circle at 10% 60%, rgba(255,255,255,0.6) 1px, transparent 3px),
            radial-gradient(circle at 90% 90%, rgba(255,255,255,0.8) 0.7px, transparent 2.4px)
          `,
          backgroundSize: `400px 500px, 600px 700px, 350px 450px, 800px 900px, 300px 400px, 500px 600px, 450px 550px, 350px 400px`,
          opacity: 0.9
        }}
      />
      
      {/* Layer 2 - Medium speed dots - Extended coverage */}
      <div 
        className="absolute"
        style={{
          transform: `translateY(${scrollY * 8}px) translateX(${scrollY * -1}px)`,
          top: '-150vh',
          left: '-75vw',
          right: '-75vw',
          bottom: '-150vh',
          width: '250vw',
          height: '500vh',
          background: `
            radial-gradient(circle at 35% 65%, rgba(255,255,255,0.7) 0.8px, transparent 2.5px),
            radial-gradient(circle at 65% 35%, rgba(200,220,255,0.6) 0.6px, transparent 2px),
            radial-gradient(circle at 85% 75%, rgba(255,255,255,0.8) 1px, transparent 3px),
            radial-gradient(circle at 20% 20%, rgba(255,240,200,0.5) 0.7px, transparent 2.2px),
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.6) 0.9px, transparent 2.6px),
            radial-gradient(circle at 80% 10%, rgba(220,200,255,0.7) 0.5px, transparent 2px)
          `,
          backgroundSize: `500px 600px, 450px 550px, 700px 800px, 350px 400px, 600px 700px, 400px 500px`,
          opacity: 0.8
        }}
      />
      
      {/* Layer 3 - Fast moving dots - Extended coverage */}
      <div 
        className="absolute"
        style={{
          transform: `translateY(${scrollY * 12}px) translateX(${scrollY * 1.6}px) rotate(${scrollY * 0.2}deg)`,
          top: '-150vh',
          left: '-75vw',
          right: '-75vw',
          bottom: '-150vh',
          width: '250vw',
          height: '500vh',
          background: `
            radial-gradient(circle at 55% 15%, rgba(255,255,255,0.9) 1.2px, transparent 3px),
            radial-gradient(circle at 15% 85%, rgba(220,200,255,0.6) 0.5px, transparent 2px),
            radial-gradient(circle at 90% 45%, rgba(255,255,255,0.7) 0.8px, transparent 2.5px),
            radial-gradient(circle at 40% 60%, rgba(180,200,255,0.5) 0.6px, transparent 2.2px),
            radial-gradient(circle at 70% 70%, rgba(255,255,255,0.8) 0.4px, transparent 1.8px),
            radial-gradient(circle at 30% 30%, rgba(255,220,180,0.6) 1px, transparent 2.8px)
          `,
          backgroundSize: `300px 400px, 550px 650px, 400px 500px, 600px 700px, 250px 300px, 450px 550px`,
          opacity: 0.7
        }}
      />
      
      {/* Layer 4 - Very fast dots with counter movement - Extended coverage */}
      <div 
        className="absolute"
        style={{
          transform: `translateY(${scrollY * -6}px) translateX(${scrollY * 2.4}px) rotate(${scrollY * -0.1}deg)`,
          top: '-150vh',
          left: '-75vw',
          right: '-75vw',
          bottom: '-150vh',
          width: '250vw',
          height: '500vh',
          background: `
            radial-gradient(circle at 70% 30%, rgba(255,255,255,0.8) 1px, transparent 2.8px),
            radial-gradient(circle at 30% 70%, rgba(255,200,220,0.6) 0.7px, transparent 2.3px),
            radial-gradient(circle at 80% 80%, rgba(255,255,255,0.5) 0.4px, transparent 1.8px),
            radial-gradient(circle at 10% 10%, rgba(200,255,200,0.7) 0.9px, transparent 2.5px),
            radial-gradient(circle at 90% 20%, rgba(255,255,255,0.6) 0.6px, transparent 2.1px),
            radial-gradient(circle at 20% 90%, rgba(180,180,255,0.5) 0.8px, transparent 2.4px)
          `,
          backgroundSize: `450px 550px, 350px 450px, 250px 300px, 500px 600px, 400px 480px, 320px 380px`,
          opacity: 0.6
        }}
      />
      
      {/* Layer 5 - Ultra fast dots - Extended coverage */}
      <div 
        className="absolute"
        style={{
          transform: `translateY(${scrollY * 16}px) translateX(${scrollY * -2}px) rotate(${scrollY * 0.3}deg)`,
          top: '-150vh',
          left: '-75vw',
          right: '-75vw',
          bottom: '-150vh',
          width: '250vw',
          height: '500vh',
          background: `
            radial-gradient(circle at 50% 20%, rgba(255,255,255,0.9) 0.6px, transparent 2px),
            radial-gradient(circle at 20% 80%, rgba(255,230,180,0.7) 0.4px, transparent 1.5px),
            radial-gradient(circle at 80% 60%, rgba(255,255,255,0.6) 0.8px, transparent 2.3px),
            radial-gradient(circle at 60% 40%, rgba(200,200,255,0.5) 0.3px, transparent 1.8px),
            radial-gradient(circle at 40% 80%, rgba(255,255,255,0.7) 0.5px, transparent 1.9px),
            radial-gradient(circle at 10% 40%, rgba(220,255,220,0.6) 0.7px, transparent 2.2px)
          `,
          backgroundSize: `200px 250px, 400px 500px, 300px 350px, 150px 200px, 350px 420px, 280px 330px`,
          opacity: 0.5
        }}
      />
      
      {/* Layer 6 - Extreme counter-directional movement - Extended coverage */}
      <div 
        className="absolute"
        style={{
          transform: `translateY(${scrollY * -10}px) translateX(${scrollY * 3}px) rotate(${scrollY * -0.4}deg)`,
          top: '-150vh',
          left: '-75vw',
          right: '-75vw',
          bottom: '-150vh',
          width: '250vw',
          height: '500vh',
          background: `
            radial-gradient(circle at 60% 10%, rgba(255,255,255,0.8) 0.5px, transparent 2px),
            radial-gradient(circle at 10% 90%, rgba(180,220,255,0.6) 0.7px, transparent 2.2px),
            radial-gradient(circle at 90% 70%, rgba(255,255,255,0.7) 0.4px, transparent 1.6px),
            radial-gradient(circle at 40% 40%, rgba(255,200,255,0.5) 0.6px, transparent 2px),
            radial-gradient(circle at 70% 90%, rgba(255,255,255,0.8) 0.3px, transparent 1.4px)
          `,
          backgroundSize: `600px 700px, 250px 300px, 400px 500px, 500px 580px, 180px 220px`,
          opacity: 0.4
        }}
      />
    </div>
  );
};
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
          opacity: opacity
        }}
      />
      
      {/* Background layer: smallest dots, slowest movement */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.3) 0.3px, transparent 0.3px)',
          backgroundSize: '80px 80px',
          backgroundRepeat: 'repeat',
          willChange: 'transform'
        }}
      />
      
      {/* Mid-background layer: small dots, slow movement */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 0.3}px) translateX(${scrollY * 0.05}px)`,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.4) 0.5px, transparent 0.5px)',
          backgroundSize: '120px 120px',
          backgroundRepeat: 'repeat',
          willChange: 'transform'
        }}
      />
      
      {/* Mid layer: medium dots, medium speed */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 0.6}px) translateX(${scrollY * -0.1}px)`,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.6) 0.8px, transparent 0.8px)',
          backgroundSize: '100px 100px',
          backgroundRepeat: 'repeat',
          willChange: 'transform'
        }}
      />
      
      {/* Mid-foreground layer: larger dots, faster movement */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 1.2}px) translateX(${scrollY * 0.15}px)`,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.7) 1.2px, transparent 1.2px)',
          backgroundSize: '150px 150px',
          backgroundRepeat: 'repeat',
          willChange: 'transform'
        }}
      />
      
      {/* Foreground layer: largest dots, fastest movement */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 2}px) translateX(${scrollY * -0.2}px)`,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1.5px, transparent 1.5px)',
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat',
          willChange: 'transform'
        }}
      />
      
      {/* Ultra-foreground layer: very large dots, very fast movement */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * 3.5}px) translateX(${scrollY * 0.3}px)`,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 2px, transparent 2px)',
          backgroundSize: '300px 300px',
          backgroundRepeat: 'repeat',
          willChange: 'transform'
        }}
      />
      
      {/* Counter-direction layer for dramatic effect */}
      <div 
        className="absolute inset-0"
        style={{
          transform: `translateY(${scrollY * -1.5}px) translateX(${scrollY * 0.4}px)`,
          backgroundImage: 'radial-gradient(circle, rgba(200,220,255,0.4) 1px, transparent 1px)',
          backgroundSize: '180px 180px',
          backgroundRepeat: 'repeat',
          willChange: 'transform'
        }}
      />
      
      {/* Scratch texture overlay */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(/lovable-uploads/e4fc5374-2e03-4b03-bdea-1c9e31937aae.png)`,
          backgroundSize: '300px 300px',
          backgroundRepeat: 'repeat',
          mixBlendMode: 'overlay',
          opacity: 0.4,
          pointerEvents: 'none'
        }}
      />
      
      {/* Additional scratch layer with different blend mode */}
      <div 
        className="absolute inset-0"
        style={{
          backgroundImage: `url(/lovable-uploads/e4fc5374-2e03-4b03-bdea-1c9e31937aae.png)`,
          backgroundSize: '200px 200px',
          backgroundRepeat: 'repeat',
          mixBlendMode: 'soft-light',
          opacity: 0.25,
          pointerEvents: 'none',
          transform: 'rotate(45deg) scale(1.2)'
        }}
      />
    </div>
  );
};
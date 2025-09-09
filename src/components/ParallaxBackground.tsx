import { useEffect, useState } from "react";

interface ParallaxBackgroundProps {
  className?: string;
  speed?: number;
  opacity?: number;
  reduced?: boolean; // New prop for reduced intensity
}

export const ParallaxBackground = ({ 
  className = "", 
  speed = 8, 
  opacity = 1,
  reduced = false 
}: ParallaxBackgroundProps) => {
  const [scrollY, setScrollY] = useState(0);
  
  // Much less intense for other pages to prevent dots disappearing
  const multiplier = reduced ? 0.15 : 1; // Reduced from 1/3 to 0.15

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Generate varying opacities for dots
  const generateDotLayers = () => {
    const layers = [];
    const baseOpacities = [0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75];
    
    for (let i = 0; i < 12; i++) {
      const opacity = baseOpacities[i];
      const size = 20 + (i * 15); // Varying sizes from 20px to 185px
      const dotSize = 0.2 + (i * 0.1); // Varying dot sizes from 0.2px to 1.3px
      const speed = 0.05 + (i * 0.15); // Varying speeds
      const xSpeed = (i % 2 === 0 ? 1 : -1) * (0.02 + i * 0.01);
      
      layers.push(
        <div 
          key={i}
          className="absolute"
          style={{
            transform: `translateY(${scrollY * speed * multiplier}px) translateX(${scrollY * xSpeed * multiplier}px)`,
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,${opacity}) ${dotSize}px, transparent ${dotSize}px)`,
            backgroundSize: `${size}px ${size}px`,
            backgroundRepeat: 'repeat',
            willChange: 'transform',
            top: 0,
            left: 0,
            right: 0,
            height: '500vh' // Much larger height to prevent disappearing
          }}
        />
      );
    }
    
    // Add some colored accent dots for variety
    for (let i = 0; i < 4; i++) {
      const colors = ['200,220,255', '220,200,255', '255,220,200', '200,255,220'];
      const color = colors[i];
      const opacity = 0.3 + (i * 0.1);
      const size = 60 + (i * 40);
      const dotSize = 0.8 + (i * 0.3);
      const speed = 0.3 + (i * 0.2);
      const xSpeed = (i % 2 === 0 ? 1 : -1) * (0.05 + i * 0.02);
      
      layers.push(
        <div 
          key={`colored-${i}`}
          className="absolute"
          style={{
            transform: `translateY(${scrollY * speed * multiplier}px) translateX(${scrollY * xSpeed * multiplier}px)`,
            backgroundImage: `radial-gradient(circle, rgba(${color},${opacity}) ${dotSize}px, transparent ${dotSize}px)`,
            backgroundSize: `${size}px ${size}px`,
            backgroundRepeat: 'repeat',
            willChange: 'transform',
            top: 0,
            left: 0,
            right: 0,
            height: '500vh'
          }}
        />
      );
    }
    
    return layers;
  };

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ height: '100vh' }}>
      {/* Base dark gray background */}
      <div 
        className={`absolute ${className}`}
        style={{
          backgroundColor: '#0f0f0f', // Dark grayish instead of pitch black
          opacity: opacity,
          top: 0,
          left: 0,
          right: 0,
          height: '100vh'
        }}
      />
      
      {/* Generate multiple dot layers with varying opacity and sizes */}
      {generateDotLayers()}
      
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
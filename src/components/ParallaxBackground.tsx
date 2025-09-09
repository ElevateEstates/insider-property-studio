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
    const baseOpacities = [0.6, 0.7, 0.8, 0.9, 1.0, 0.8]; // Reduced from 12 to 6 layers
    
    for (let i = 0; i < 6; i++) { // Reduced from 12 to 6 layers
      const opacity = baseOpacities[i];
      const size = 30 + (i * 25); // Increased spacing between sizes
      const dotSize = 0.3 + (i * 0.15); // Slightly larger dots
      const speed = 0.05 + (i * 0.2); // More varied speeds
      // Much more subtle X movement that oscillates instead of accumulating
      const xSpeed = Math.sin(i) * 0.005; // Very subtle oscillating movement
      
      // Create infinite loop effect by using modulo on scroll position
      const loopHeight = 3000; // Increased loop height for more natural spacing
      const yOffset = (scrollY * speed * multiplier) % loopHeight;
      const xOffset = Math.sin(scrollY * 0.001 + i) * 20; // Gentle sine wave movement, max 20px offset
      
      layers.push(
        <div 
          key={i}
          className="absolute"
          style={{
            transform: `translateY(${yOffset}px) translateX(${xOffset}px)`,
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,${opacity}) ${dotSize}px, transparent ${dotSize}px)`,
            backgroundSize: `${size}px ${size}px`,
            backgroundRepeat: 'repeat',
            willChange: 'transform',
            top: 0,
            left: 0,
            right: 0,
            height: '400vh' // Adjusted height
          }}
        />
      );
      
      // Add a second layer offset for seamless looping - but only for every other layer to reduce density
      if (i % 2 === 0) {
        layers.push(
          <div 
            key={`loop-${i}`}
            className="absolute"
            style={{
              transform: `translateY(${yOffset - loopHeight}px) translateX(${xOffset}px)`,
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,${opacity * 0.7}) ${dotSize}px, transparent ${dotSize}px)`, // Slightly less opacity for loop layers
              backgroundSize: `${size}px ${size}px`,
              backgroundRepeat: 'repeat',
              willChange: 'transform',
              top: 0,
              left: 0,
              right: 0,
              height: '400vh'
            }}
          />
        );
      }
    }
    
    // Reduced colored accent dots from 4 to 2
    for (let i = 0; i < 2; i++) {
      const colors = ['200,220,255', '255,220,200'];
      const color = colors[i];
      const opacity = 0.7 + (i * 0.15);
      const size = 80 + (i * 60);
      const dotSize = 1.0 + (i * 0.4);
      const speed = 0.4 + (i * 0.3);
      // Gentle oscillating movement for colored dots too
      const xOffset = Math.sin(scrollY * 0.0008 + i * 2) * 30; // Slightly more movement for accent dots
      
      const loopHeight = 3500;
      const yOffset = (scrollY * speed * multiplier) % loopHeight;
      
      layers.push(
        <div 
          key={`colored-${i}`}
          className="absolute"
          style={{
            transform: `translateY(${yOffset}px) translateX(${xOffset}px)`,
            backgroundImage: `radial-gradient(circle, rgba(${color},${opacity}) ${dotSize}px, transparent ${dotSize}px)`,
            backgroundSize: `${size}px ${size}px`,
            backgroundRepeat: 'repeat',
            willChange: 'transform',
            top: 0,
            left: 0,
            right: 0,
            height: '400vh'
          }}
        />
      );
      
      // Only one loop layer for colored dots
      layers.push(
        <div 
          key={`colored-loop-${i}`}
          className="absolute"
          style={{
            transform: `translateY(${yOffset - loopHeight}px) translateX(${xOffset}px)`,
            backgroundImage: `radial-gradient(circle, rgba(${color},${opacity * 0.6}) ${dotSize}px, transparent ${dotSize}px)`,
            backgroundSize: `${size}px ${size}px`,
            backgroundRepeat: 'repeat',
            willChange: 'transform',
            top: 0,
            left: 0,
            right: 0,
            height: '400vh'
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
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
    const baseOpacities = [0.5, 0.6, 0.7, 0.8, 0.9]; // Reduced from 6 to 5 layers (17% reduction)
    
    for (let i = 0; i < 5; i++) { // Reduced from 6 to 5 layers
      const opacity = baseOpacities[i];
      const size = 35 + (i * 30); // Increased spacing between sizes
      const dotSize = 0.3 + (i * 0.2); // Slightly larger dots
      const speed = 0.05 + (i * 0.25); // More varied speeds
      
      // Create more interesting trajectories - some go diagonally, some horizontally
      const direction = i % 4; // 4 different movement patterns
      let xMovement, yMovement;
      
      switch (direction) {
        case 0: // Vertical up
          xMovement = Math.sin(scrollY * 0.0005 + i) * 15;
          yMovement = scrollY * speed * multiplier;
          break;
        case 1: // Diagonal right-up
          xMovement = (scrollY * speed * 0.3 * multiplier) + Math.sin(scrollY * 0.0008 + i) * 10;
          yMovement = scrollY * speed * multiplier;
          break;
        case 2: // Horizontal right with slight vertical drift
          xMovement = (scrollY * speed * 0.5 * multiplier) + Math.cos(scrollY * 0.0006 + i) * 20;
          yMovement = (scrollY * speed * 0.2 * multiplier) + Math.sin(scrollY * 0.0004 + i) * 25;
          break;
        case 3: // Diagonal left-up
          xMovement = -(scrollY * speed * 0.3 * multiplier) + Math.sin(scrollY * 0.0007 + i) * 15;
          yMovement = scrollY * speed * multiplier;
          break;
      }
      
      // Create infinite loop effect
      const loopHeight = 3500;
      const loopWidth = 2000;
      const yOffset = yMovement % loopHeight;
      const xOffset = xMovement % loopWidth;
      
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
            height: '400vh'
          }}
        />
      );
      
      // Add a second layer for seamless looping - reduced frequency
      if (i % 3 === 0) { // Only every third layer gets a loop duplicate
        layers.push(
          <div 
            key={`loop-${i}`}
            className="absolute"
            style={{
              transform: `translateY(${yOffset - loopHeight}px) translateX(${xOffset - (direction === 1 || direction === 2 ? loopWidth : 0)}px)`,
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,${opacity * 0.6}) ${dotSize}px, transparent ${dotSize}px)`,
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
    
    // Reduced colored accent dots from 2 to 1 (50% reduction)
    for (let i = 0; i < 1; i++) {
      const colors = ['200,220,255'];
      const color = colors[i];
      const opacity = 0.8;
      const size = 100;
      const dotSize = 1.2;
      const speed = 0.5;
      
      // Give colored dots spiral movement
      const spiralRadius = 40;
      const spiralSpeed = scrollY * 0.001;
      const xOffset = Math.cos(spiralSpeed + i * Math.PI) * spiralRadius + (scrollY * 0.1 * multiplier);
      const yOffset = (scrollY * speed * multiplier) % 4000;
      
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
      
      // Loop layer for colored dot
      layers.push(
        <div 
          key={`colored-loop-${i}`}
          className="absolute"
          style={{
            transform: `translateY(${yOffset - 4000}px) translateX(${xOffset}px)`,
            backgroundImage: `radial-gradient(circle, rgba(${color},${opacity * 0.5}) ${dotSize}px, transparent ${dotSize}px)`,
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
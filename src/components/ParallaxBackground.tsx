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
    
    for (let i = 0; i < 5; i++) {
      const opacity = baseOpacities[i];
      // Completely randomize sizes to break grid pattern
      const size = 20 + Math.random() * 60; // Random sizes between 20-80px
      const dotSize = 0.2 + Math.random() * 0.5; // Random dot sizes
      const speed = 0.04 + Math.random() * 0.3; // Always ensure movement with random variation
      
      // Create more interesting trajectories with randomness
      const direction = i % 4;
      let xMovement, yMovement;
      
      // Add unique random offsets for each layer to completely break grid alignment
      const uniqueRandomX = (Math.sin(i * 73) * 0.5 + 0.5) * 400 - 200; // Deterministic but random-looking offset
      const uniqueRandomY = (Math.cos(i * 137) * 0.5 + 0.5) * 600 - 300;
      const timeOffset = i * 47; // Prime number for non-repeating patterns
      
      switch (direction) {
        case 0: // Vertical up with organic drift
          xMovement = Math.sin((scrollY + timeOffset) * (0.0003 + Math.sin(i) * 0.0002)) * (10 + Math.cos(i) * 8) + uniqueRandomX;
          yMovement = scrollY * speed * multiplier + uniqueRandomY;
          break;
        case 1: // Diagonal right-up with variation
          xMovement = (scrollY * speed * (0.2 + Math.sin(i) * 0.2) * multiplier) + 
                     Math.sin((scrollY + timeOffset) * (0.0006 + Math.cos(i) * 0.0003)) * (8 + Math.sin(i) * 12) + uniqueRandomX;
          yMovement = scrollY * speed * multiplier + uniqueRandomY;
          break;
        case 2: // Horizontal with organic vertical drift
          xMovement = (scrollY * speed * (0.3 + Math.cos(i) * 0.3) * multiplier) + 
                     Math.cos((scrollY + timeOffset) * (0.0005 + Math.sin(i) * 0.0004)) * (15 + Math.cos(i) * 10) + uniqueRandomX;
          yMovement = (scrollY * speed * (0.1 + Math.sin(i) * 0.1) * multiplier) + 
                     Math.sin((scrollY + timeOffset) * (0.0003 + Math.cos(i) * 0.0002)) * (20 + Math.sin(i) * 15) + uniqueRandomY;
          break;
        case 3: // Diagonal left-up with variation
          xMovement = -(scrollY * speed * (0.2 + Math.cos(i) * 0.2) * multiplier) + 
                     Math.sin((scrollY + timeOffset) * (0.0007 + Math.sin(i) * 0.0003)) * (12 + Math.cos(i) * 8) + uniqueRandomX;
          yMovement = scrollY * speed * multiplier + uniqueRandomY;
          break;
      }
      
      // Randomized loop parameters to break uniformity
      const loopHeight = 2800 + Math.sin(i * 89) * 800; // Random heights between 2000-3600
      const loopWidth = 1600 + Math.cos(i * 113) * 600; // Random widths between 1000-2200
      const yOffset = yMovement % loopHeight;
      const xOffset = xMovement % loopWidth;
      
      // Create organic, non-grid patterns with multiple overlays
      const patternSeed1 = Math.sin(i * 43) * size * 0.5;
      const patternSeed2 = Math.cos(i * 67) * size * 0.3;
      const backgroundSizeVar = size * (0.8 + Math.sin(i * 23) * 0.4); // Vary background size
      
      layers.push(
        <div 
          key={i}
          className="absolute"
          style={{
            transform: `translateY(${yOffset}px) translateX(${xOffset}px)`,
            backgroundImage: `
              radial-gradient(circle, rgba(255,255,255,${opacity}) ${dotSize}px, transparent ${dotSize * 1.5}px),
              radial-gradient(circle, rgba(255,255,255,${opacity * 0.4}) ${dotSize * 0.6}px, transparent ${dotSize}px)
            `,
            backgroundSize: `${backgroundSizeVar}px ${backgroundSizeVar}px, ${backgroundSizeVar * 1.4}px ${backgroundSizeVar * 1.4}px`,
            backgroundPosition: `${patternSeed1}px ${patternSeed2}px, ${-patternSeed2}px ${patternSeed1}px`,
            backgroundRepeat: 'repeat',
            willChange: 'transform',
            top: 0,
            left: 0,
            right: 0,
            height: '400vh'
          }}
        />
      );
      
      // Reduced loop layers with more variation
      if (i % 3 === 0) {
        const loopOpacity = opacity * (0.3 + Math.random() * 0.4);
        const loopSizeVar = backgroundSizeVar * (0.9 + Math.random() * 0.2);
        
        layers.push(
          <div 
            key={`loop-${i}`}
            className="absolute"
            style={{
              transform: `translateY(${yOffset - loopHeight}px) translateX(${xOffset - (direction === 1 || direction === 2 ? loopWidth * 0.3 : 0)}px)`,
              backgroundImage: `
                radial-gradient(circle, rgba(255,255,255,${loopOpacity}) ${dotSize * 0.8}px, transparent ${dotSize * 1.2}px)
              `,
              backgroundSize: `${loopSizeVar}px ${loopSizeVar}px`,
              backgroundPosition: `${-patternSeed1 * 0.7}px ${-patternSeed2 * 0.7}px`,
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
    
    // Single colored accent dot with completely random behavior 
    const color = '200,220,255';
    const opacity = 0.6 + Math.random() * 0.3;
    const size = 70 + Math.random() * 50;
    const dotSize = 0.8 + Math.random() * 0.6;
    const speed = 0.3 + Math.random() * 0.4;
    
    // Completely organic movement pattern
    const timeVariation = Date.now() * 0.00001; // Subtle time-based variation
    const spiralRadius = 25 + Math.sin(scrollY * 0.0003) * 15;
    const spiralSpeed = scrollY * (0.0006 + Math.sin(timeVariation) * 0.0002);
    const driftX = scrollY * 0.05 * multiplier + Math.cos(spiralSpeed * 0.7) * 30;
    const driftY = scrollY * speed * multiplier + Math.sin(spiralSpeed * 0.9) * 20;
    
    const xOffset = Math.cos(spiralSpeed) * spiralRadius + driftX + Math.sin(scrollY * 0.0004) * 40;
    const yOffset = (driftY + Math.sin(spiralSpeed) * (spiralRadius * 0.4)) % (3500 + Math.sin(timeVariation * 100) * 300);
    
    layers.push(
      <div 
        key="colored-organic"
        className="absolute"
        style={{
          transform: `translateY(${yOffset}px) translateX(${xOffset}px)`,
          backgroundImage: `radial-gradient(circle, rgba(${color},${opacity}) ${dotSize}px, transparent ${dotSize * 1.5}px)`,
          backgroundSize: `${size}px ${size}px`,
          backgroundPosition: `${Math.sin(timeVariation * 50) * size * 0.3}px ${Math.cos(timeVariation * 70) * size * 0.3}px`,
          backgroundRepeat: 'repeat',
          willChange: 'transform',
          top: 0,
          left: 0,
          right: 0,
          height: '400vh'
        }}
      />
    );
    
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
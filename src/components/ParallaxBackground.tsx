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
    const baseOpacities = [0.6, 0.7, 0.8, 0.9];
    
    for (let i = 0; i < 4; i++) {
      const opacity = baseOpacities[i];
      const size = 40 + (i * 35);
      const dotSize = 0.4 + (i * 0.15);
      const speed = 0.08 + (i * 0.2);
      
      // Screen dimensions for uniform distribution
      const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
      
      // Create uniform distribution across screen width
      const basePosition = (i * screenWidth / 3.5) + (screenWidth * 0.1); // Spread evenly from 10% to 90% screen width
      
      // Movement patterns - ensure uniform coverage
      const direction = i % 4;
      let xMovement, yMovement;
      
      switch (direction) {
        case 0: // Gentle drift from left-center
          xMovement = basePosition + Math.sin(scrollY * 0.0008 + i) * 30;
          yMovement = scrollY * speed * multiplier;
          break;
        case 1: // Diagonal movement from center-left
          xMovement = basePosition + (scrollY * speed * 0.2 * multiplier) + Math.sin(scrollY * 0.001 + i) * 25;
          yMovement = scrollY * speed * multiplier;
          break;
        case 2: // Horizontal drift from center
          xMovement = basePosition + (scrollY * speed * 0.3 * multiplier) + Math.cos(scrollY * 0.0009 + i) * 35;
          yMovement = (scrollY * speed * 0.3 * multiplier) + Math.sin(scrollY * 0.0006 + i) * 30;
          break;
        case 3: // Gentle drift from center-right
          xMovement = basePosition + (scrollY * speed * 0.1 * multiplier) + Math.sin(scrollY * 0.0012 + i) * 28;
          yMovement = scrollY * speed * multiplier;
          break;
      }
      
      // Smooth cycling that maintains screen coverage
      const loopHeight = 3000;
      const yOffset = yMovement % loopHeight;
      
      // Keep dots within screen bounds with gentle cycling
      const xOffset = (xMovement % (screenWidth * 1.2)) - (screenWidth * 0.1);
      
      layers.push(
        <div 
          key={i}
          className="absolute"
          style={{
            transform: `translateY(${yOffset}px) translateX(${xOffset}px)`,
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,${opacity}) ${dotSize}px, transparent ${dotSize * 2}px)`,
            backgroundSize: `${size}px ${size}px`,
            backgroundRepeat: 'repeat',
            willChange: 'transform',
            top: 0,
            left: 0,
            right: 0,
            height: '400vh',
            // Uniform opacity across screen
            opacity: xOffset < 0 || xOffset > screenWidth ? 0.5 : 1,
            transition: 'opacity 0.6s ease-out'
          }}
        />
      );
      
      // Add loop layer with balanced distribution
      if (i % 2 === 0) {
        const loopYOffset = yOffset - loopHeight;
        if (loopYOffset > -200) {
          layers.push(
            <div 
              key={`loop-${i}`}
              className="absolute"
              style={{
                transform: `translateY(${loopYOffset}px) translateX(${xOffset}px)`,
                backgroundImage: `radial-gradient(circle, rgba(255,255,255,${opacity * 0.8}) ${dotSize}px, transparent ${dotSize * 2}px)`,
                backgroundSize: `${size}px ${size}px`,
                backgroundRepeat: 'repeat',
                willChange: 'transform',
                top: 0,
                left: 0,
                right: 0,
                height: '400vh',
                opacity: xOffset < 0 || xOffset > screenWidth ? 0.4 : 0.8,
                transition: 'opacity 0.6s ease-out'
              }}
            />
          );
        }
      }
    }
    
    // Additional left-side accent dots for balance
    for (let i = 0; i < 2; i++) {
      const opacity = 0.7 + (i * 0.1);
      const size = 60 + (i * 30);
      const dotSize = 0.5 + (i * 0.2);
      const speed = 0.1 + (i * 0.15);
      const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
      
      // Position on left third of screen
      const leftBasePosition = screenWidth * (0.05 + i * 0.15);
      const xMovement = leftBasePosition + Math.sin(scrollY * (0.0007 + i * 0.0003)) * 40;
      const yMovement = scrollY * speed * multiplier;
      
      const yOffset = yMovement % 3200;
      const xOffset = xMovement % (screenWidth * 1.1) - (screenWidth * 0.05);
      
      layers.push(
        <div 
          key={`left-accent-${i}`}
          className="absolute"
          style={{
            transform: `translateY(${yOffset}px) translateX(${xOffset}px)`,
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,${opacity}) ${dotSize}px, transparent ${dotSize * 2}px)`,
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
    
    // Colored accent dot positioned for balance
    const color = '200,220,255';
    const opacity = 0.8;
    const size = 90;
    const dotSize = 1.0;
    const speed = 0.6;
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
    
    // Position in right third of screen for balance
    const spiralRadius = 35;
    const spiralSpeed = scrollY * 0.0012;
    const baseX = screenWidth * 0.65 + (scrollY * 0.05 * multiplier);
    const xOffset = (baseX + Math.cos(spiralSpeed) * spiralRadius) % (screenWidth * 1.1) - (screenWidth * 0.05);
    const yOffset = (scrollY * speed * multiplier) % 3800;
    
    layers.push(
      <div 
        key="colored-accent"
        className="absolute"
        style={{
          transform: `translateY(${yOffset}px) translateX(${xOffset}px)`,
          backgroundImage: `radial-gradient(circle, rgba(${color},${opacity}) ${dotSize}px, transparent ${dotSize * 2}px)`,
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
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
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
    
    for (let i = 0; i < 4; i++) {
      const baseOpacity = baseOpacities[i];
      const size = 40 + (i * 35);
      const dotSize = 0.4 + (i * 0.15);
      const speed = 0.08 + (i * 0.2);
      
      // Create uniform distribution across screen width
      const basePosition = (i * screenWidth / 3.5) + (screenWidth * 0.1);
      
      // Movement patterns with continuous flow
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
      
      // Continuous cycling without jumps
      const cycleHeight = screenHeight * 4;
      const normalizedY = ((yMovement % cycleHeight) + cycleHeight) % cycleHeight;
      const yOffset = normalizedY - screenHeight;
      
      // Smooth horizontal cycling
      const cycleWidth = screenWidth * 1.4;
      const normalizedX = ((xMovement % cycleWidth) + cycleWidth) % cycleWidth;
      const xOffset = normalizedX - (screenWidth * 0.2);
      
      // Calculate fade based on distance from screen edges
      const fadeMargin = 100;
      let opacityFactor = 1;
      
      if (xOffset < 0) {
        opacityFactor = Math.max(0, 1 + xOffset / fadeMargin);
      } else if (xOffset > screenWidth) {
        opacityFactor = Math.max(0, 1 - (xOffset - screenWidth) / fadeMargin);
      }
      
      if (yOffset < -fadeMargin) {
        opacityFactor *= Math.max(0, 1 + (yOffset + fadeMargin) / fadeMargin);
      } else if (yOffset > screenHeight + fadeMargin) {
        opacityFactor *= Math.max(0, 1 - (yOffset - screenHeight - fadeMargin) / fadeMargin);
      }
      
      layers.push(
        <div 
          key={i}
          className="absolute"
          style={{
            transform: `translateY(${yOffset}px) translateX(${xOffset}px)`,
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,${baseOpacity * opacityFactor}) ${dotSize}px, transparent ${dotSize * 2}px)`,
            backgroundSize: `${size}px ${size}px`,
            backgroundRepeat: 'repeat',
            willChange: 'transform',
            top: 0,
            left: 0,
            right: 0,
            height: '400vh',
            opacity: opacityFactor,
            transition: 'opacity 0.3s ease-out'
          }}
        />
      );
    }
    
    // Additional left-side accent dots for balance
    for (let i = 0; i < 2; i++) {
      const baseOpacity = 0.7 + (i * 0.1);
      const size = 60 + (i * 30);
      const dotSize = 0.5 + (i * 0.2);
      const speed = 0.1 + (i * 0.15);
      
      // Position on left third of screen
      const leftBasePosition = screenWidth * (0.05 + i * 0.15);
      const xMovement = leftBasePosition + Math.sin(scrollY * (0.0007 + i * 0.0003)) * 40;
      const yMovement = scrollY * speed * multiplier;
      
      // Continuous cycling
      const cycleHeight = screenHeight * 3.5;
      const normalizedY = ((yMovement % cycleHeight) + cycleHeight) % cycleHeight;
      const yOffset = normalizedY - screenHeight * 0.5;
      
      const cycleWidth = screenWidth * 1.2;
      const normalizedX = ((xMovement % cycleWidth) + cycleWidth) % cycleWidth;
      const xOffset = normalizedX - (screenWidth * 0.1);
      
      // Smooth fade based on position
      const fadeMargin = 120;
      let opacityFactor = 1;
      
      if (xOffset < 0) {
        opacityFactor = Math.max(0, 1 + xOffset / fadeMargin);
      } else if (xOffset > screenWidth) {
        opacityFactor = Math.max(0, 1 - (xOffset - screenWidth) / fadeMargin);
      }
      
      layers.push(
        <div 
          key={`left-accent-${i}`}
          className="absolute"
          style={{
            transform: `translateY(${yOffset}px) translateX(${xOffset}px)`,
            backgroundImage: `radial-gradient(circle, rgba(255,255,255,${baseOpacity * opacityFactor}) ${dotSize}px, transparent ${dotSize * 2}px)`,
            backgroundSize: `${size}px ${size}px`,
            backgroundRepeat: 'repeat',
            willChange: 'transform',
            top: 0,
            left: 0,
            right: 0,
            height: '400vh',
            opacity: opacityFactor,
            transition: 'opacity 0.3s ease-out'
          }}
        />
      );
    }
    
    // Colored accent dot positioned for balance
    const color = '200,220,255';
    const baseOpacity = 0.8;
    const size = 90;
    const dotSize = 1.0;
    const speed = 0.6;
    
    // Position in right third of screen for balance
    const spiralRadius = 35;
    const spiralSpeed = scrollY * 0.0012;
    const baseX = screenWidth * 0.65 + (scrollY * 0.05 * multiplier);
    const xMovement = baseX + Math.cos(spiralSpeed) * spiralRadius;
    const yMovement = scrollY * speed * multiplier;
    
    // Continuous cycling for colored accent
    const cycleHeight = screenHeight * 4.2;
    const normalizedY = ((yMovement % cycleHeight) + cycleHeight) % cycleHeight;
    const yOffset = normalizedY - screenHeight * 0.8;
    
    const cycleWidth = screenWidth * 1.3;
    const normalizedX = ((xMovement % cycleWidth) + cycleWidth) % cycleWidth;
    const xOffset = normalizedX - (screenWidth * 0.15);
    
    // Smooth fade for colored accent
    const fadeMargin = 100;
    let opacityFactor = 1;
    
    if (xOffset < 0) {
      opacityFactor = Math.max(0, 1 + xOffset / fadeMargin);
    } else if (xOffset > screenWidth) {
      opacityFactor = Math.max(0, 1 - (xOffset - screenWidth) / fadeMargin);
    }
    
    layers.push(
      <div 
        key="colored-accent"
        className="absolute"
        style={{
          transform: `translateY(${yOffset}px) translateX(${xOffset}px)`,
          backgroundImage: `radial-gradient(circle, rgba(${color},${baseOpacity * opacityFactor}) ${dotSize}px, transparent ${dotSize * 2}px)`,
          backgroundSize: `${size}px ${size}px`,
          backgroundRepeat: 'repeat',
          willChange: 'transform',
          top: 0,
          left: 0,
          right: 0,
          height: '400vh',
          opacity: opacityFactor,
          transition: 'opacity 0.3s ease-out'
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
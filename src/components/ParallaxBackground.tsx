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

  // Generate smooth flowing dots without any sudden appearances
  const generateDotLayers = () => {
    const layers = [];
    const baseOpacities = [0.6, 0.7, 0.8, 0.9];
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
    
    // Calculate smooth transitions with extended fade margins
    const createSmoothDot = (config: {
      id: string;
      baseOpacity: number;
      size: number;
      dotSize: number;
      xStart: number;
      ySpeed: number;
      xDrift: number;
      color?: string;
    }) => {
      const { id, baseOpacity, size, dotSize, xStart, ySpeed, xDrift, color = '255,255,255' } = config;
      
      // Calculate position with smooth continuous movement
      const rawY = scrollY * ySpeed * multiplier;
      const rawX = xStart + (scrollY * xDrift * multiplier);
      
      // Create infinite loop without modulo jumps - use smooth sine wave transitions
      const loopCycle = 8000; // Large cycle to prevent visible repetition
      const yProgress = (rawY % loopCycle) / loopCycle;
      const yOffset = (yProgress * screenHeight * 6) - (screenHeight * 2); // Start well off-screen
      
      const xProgress = (rawX % (screenWidth * 2)) / (screenWidth * 2);
      const xOffset = (xProgress * screenWidth * 1.6) - (screenWidth * 0.3); // Extended range
      
      // Calculate distance-based opacity with smooth falloff
      const fadeDistance = 200; // Extended fade distance
      const centerFadeDistance = 150;
      
      // Horizontal fade
      let horizontalFade = 1;
      if (xOffset < 0) {
        horizontalFade = Math.max(0, Math.min(1, 1 + (xOffset / fadeDistance)));
      } else if (xOffset > screenWidth) {
        horizontalFade = Math.max(0, Math.min(1, 1 - ((xOffset - screenWidth) / fadeDistance)));
      }
      
      // Vertical fade with smoother transitions
      let verticalFade = 1;
      if (yOffset < -centerFadeDistance) {
        verticalFade = Math.max(0, Math.min(1, 1 + ((yOffset + centerFadeDistance) / fadeDistance)));
      } else if (yOffset > screenHeight + centerFadeDistance) {
        verticalFade = Math.max(0, Math.min(1, 1 - ((yOffset - screenHeight - centerFadeDistance) / fadeDistance)));
      }
      
      // Combined smooth opacity
      const finalOpacity = baseOpacity * horizontalFade * verticalFade;
      
      // Only render if opacity is meaningful
      if (finalOpacity > 0.01) {
        return (
          <div 
            key={id}
            className="absolute"
            style={{
              transform: `translateY(${yOffset}px) translateX(${xOffset}px)`,
              backgroundImage: `radial-gradient(circle, rgba(${color},${finalOpacity}) ${dotSize}px, transparent ${dotSize * 2}px)`,
              backgroundSize: `${size}px ${size}px`,
              backgroundRepeat: 'repeat',
              willChange: 'transform',
              top: 0,
              left: 0,
              right: 0,
              height: '500vh', // Extended height
              pointerEvents: 'none'
            }}
          />
        );
      }
      return null;
    };
    
    // Main dot layers with staggered positions and speeds
    for (let i = 0; i < 4; i++) {
      const baseOpacity = baseOpacities[i];
      const size = 40 + (i * 35);
      const dotSize = 0.4 + (i * 0.15);
      const ySpeed = 0.08 + (i * 0.2);
      
      // Staggered starting positions across screen width
      const xStart = screenWidth * (0.1 + (i * 0.25));
      
      // Varied horizontal drift patterns
      const xDrift = (i % 2 === 0 ? 1 : -1) * (0.1 + (i * 0.05));
      
      // Add oscillating movement
      const oscillation = Math.sin(scrollY * (0.0008 + i * 0.0002)) * (30 + i * 10);
      
      const dot = createSmoothDot({
        id: `main-${i}`,
        baseOpacity,
        size,
        dotSize,
        xStart: xStart + oscillation,
        ySpeed,
        xDrift
      });
      
      if (dot) layers.push(dot);
    }
    
    // Left side accent dots
    for (let i = 0; i < 2; i++) {
      const baseOpacity = 0.7 + (i * 0.1);
      const size = 60 + (i * 30);
      const dotSize = 0.5 + (i * 0.2);
      const ySpeed = 0.1 + (i * 0.15);
      
      const xStart = screenWidth * (0.05 + i * 0.12);
      const xDrift = 0.02 + (i * 0.03);
      
      const oscillation = Math.sin(scrollY * (0.0007 + i * 0.0003)) * 40;
      
      const dot = createSmoothDot({
        id: `left-accent-${i}`,
        baseOpacity,
        size,
        dotSize,
        xStart: xStart + oscillation,
        ySpeed,
        xDrift
      });
      
      if (dot) layers.push(dot);
    }
    
    // Right side accent dots
    for (let i = 0; i < 2; i++) {
      const baseOpacity = 0.65 + (i * 0.1);
      const size = 55 + (i * 25);
      const dotSize = 0.45 + (i * 0.15);
      const ySpeed = 0.12 + (i * 0.18);
      
      const xStart = screenWidth * (0.7 + i * 0.15);
      const xDrift = -0.03 - (i * 0.02);
      
      const oscillation = Math.cos(scrollY * (0.0009 + i * 0.0004)) * 35;
      
      const dot = createSmoothDot({
        id: `right-accent-${i}`,
        baseOpacity,
        size,
        dotSize,
        xStart: xStart + oscillation,
        ySpeed,
        xDrift
      });
      
      if (dot) layers.push(dot);
    }
    
    // Colored accent dot with spiral movement
    const spiralRadius = 35;
    const spiralSpeed = scrollY * 0.0012;
    const baseX = screenWidth * 0.65;
    const spiralX = baseX + Math.cos(spiralSpeed) * spiralRadius;
    const spiralY = scrollY * 0.6 * multiplier;
    
    const coloredDot = createSmoothDot({
      id: 'colored-accent',
      baseOpacity: 0.8,
      size: 90,
      dotSize: 1.0,
      xStart: spiralX,
      ySpeed: 0.6,
      xDrift: 0.05,
      color: '200,220,255'
    });
    
    if (coloredDot) layers.push(coloredDot);
    
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
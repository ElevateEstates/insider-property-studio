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
      
      // Movement patterns with smooth off-screen transitions
      const direction = i % 4;
      let xMovement, yMovement;
      
      // Add screen buffer zones so dots appear from off-screen
      const screenBuffer = 200; // Extra space off-screen
      const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
      const totalWidth = screenWidth + (screenBuffer * 2);
      
      switch (direction) {
        case 0: // Vertical with gentle drift - starts from left edge
          xMovement = -screenBuffer + Math.sin(scrollY * 0.0008 + i) * 20;
          yMovement = scrollY * speed * multiplier;
          break;
        case 1: // Diagonal right-up - starts from left, moves right
          xMovement = -screenBuffer + (scrollY * speed * 0.3 * multiplier) + Math.sin(scrollY * 0.001 + i) * 15;
          yMovement = scrollY * speed * multiplier;
          break;
        case 2: // Horizontal right - starts from left edge
          xMovement = -screenBuffer + (scrollY * speed * 0.4 * multiplier) + Math.cos(scrollY * 0.0009 + i) * 25;
          yMovement = (scrollY * speed * 0.3 * multiplier) + Math.sin(scrollY * 0.0006 + i) * 30;
          break;
        case 3: // Diagonal left-up - starts from right, moves left
          xMovement = screenWidth + screenBuffer - (scrollY * speed * 0.3 * multiplier) + Math.sin(scrollY * 0.0012 + i) * 18;
          yMovement = scrollY * speed * multiplier;
          break;
      }
      
      // Smooth infinite transitions - dots cycle through screen smoothly
      const loopHeight = 3000;
      const yOffset = yMovement % loopHeight;
      
      // For X movement, create seamless horizontal transitions
      let xOffset;
      if (direction === 3) { // Right to left movement
        xOffset = (xMovement % totalWidth);
        if (xOffset < -screenBuffer) xOffset += totalWidth;
      } else { // Left to right movement
        xOffset = (xMovement % totalWidth) - screenBuffer;
        if (xOffset > screenWidth + screenBuffer) xOffset -= totalWidth;
      }
      
      // Only render dots that are approaching or on screen
      const isNearScreen = xOffset > -screenBuffer - 100 && xOffset < screenWidth + screenBuffer + 100;
      
      if (isNearScreen) {
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
              // Smooth opacity transition as dots enter/exit screen
              opacity: xOffset < -screenBuffer + 50 || xOffset > screenWidth + screenBuffer - 50 ? 0.3 : 1,
              transition: 'opacity 0.8s ease-out'
            }}
          />
        );
      }
      
      // Add loop layer for seamless vertical cycling
      const loopYOffset = yOffset - loopHeight;
      if (loopYOffset > -400 && isNearScreen) { // Only render if near screen
        layers.push(
          <div 
            key={`loop-${i}`}
            className="absolute"
            style={{
              transform: `translateY(${loopYOffset}px) translateX(${xOffset}px)`,
              backgroundImage: `radial-gradient(circle, rgba(255,255,255,${opacity * 0.7}) ${dotSize}px, transparent ${dotSize * 2}px)`,
              backgroundSize: `${size}px ${size}px`,
              backgroundRepeat: 'repeat',
              willChange: 'transform',
              top: 0,
              left: 0,
              right: 0,
              height: '400vh',
              opacity: xOffset < -screenBuffer + 50 || xOffset > screenWidth + screenBuffer - 50 ? 0.2 : 0.7,
              transition: 'opacity 0.8s ease-out'
            }}
          />
        );
      }
    }
    
    // Colored accent dot with smooth screen transitions
    const color = '200,220,255';
    const opacity = 0.8;
    const size = 90;
    const dotSize = 1.0;
    const speed = 0.6;
    
    const screenBuffer = 200;
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
    
    // Spiral movement starting from left edge
    const spiralRadius = 35;
    const spiralSpeed = scrollY * 0.0012;
    const baseX = -screenBuffer + (scrollY * 0.08 * multiplier);
    const xOffset = (baseX + Math.cos(spiralSpeed) * spiralRadius) % (screenWidth + screenBuffer * 2) - screenBuffer;
    const yOffset = (scrollY * speed * multiplier) % 3800;
    
    // Only render if near screen
    const isAccentNearScreen = xOffset > -screenBuffer - 100 && xOffset < screenWidth + screenBuffer + 100;
    
    if (isAccentNearScreen) {
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
            height: '400vh',
            opacity: xOffset < -screenBuffer + 50 || xOffset > screenWidth + screenBuffer - 50 ? 0.4 : 0.8,
            transition: 'opacity 0.8s ease-out'
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
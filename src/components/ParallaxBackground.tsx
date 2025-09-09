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

  // Generate smooth flowing stars with always-visible coverage
  const generateDotLayers = () => {
    const layers = [];
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 1080;
    
    // Create a smooth dot with star-like behavior
    const createStar = (config: {
      id: string;
      baseOpacity: number;
      size: number;
      dotSize: number;
      xStart: number;
      yStart: number;
      ySpeed: number;
      xDrift: number;
      oscillateSpeed: number;
      oscillateAmplitude: number;
      color?: string;
    }) => {
      const { 
        id, baseOpacity, size, dotSize, xStart, yStart, ySpeed, xDrift, 
        oscillateSpeed, oscillateAmplitude, color = '255,255,255' 
      } = config;
      
      // Calculate smooth continuous movement
      const baseY = yStart + (scrollY * ySpeed * multiplier);
      const baseX = xStart + (scrollY * xDrift * multiplier);
      
      // Add oscillating movement for star-like motion
      const oscillationX = Math.sin(scrollY * oscillateSpeed + parseFloat(id.split('-')[1] || '0')) * oscillateAmplitude;
      const oscillationY = Math.cos(scrollY * oscillateSpeed * 0.7 + parseFloat(id.split('-')[1] || '0')) * (oscillateAmplitude * 0.3);
      
      // Create continuous loop with large cycle to prevent visible repetition
      const cycleHeight = screenHeight * 8;
      const cycleWidth = screenWidth * 3;
      
      // Use smooth sine wave transitions for seamless looping
      const yProgress = (baseY % cycleHeight) / cycleHeight;
      const yOffset = (yProgress * cycleHeight) - (screenHeight * 2) + oscillationY;
      
      const xProgress = (baseX % cycleWidth) / cycleWidth;
      const xOffset = (xProgress * cycleWidth) - (screenWidth * 0.5) + oscillationX;
      
      // Extended smooth fade with generous margins
      const fadeMargin = 300;
      let horizontalFade = 1;
      let verticalFade = 1;
      
      // Horizontal fade
      if (xOffset < -fadeMargin) {
        horizontalFade = Math.max(0, Math.sin(Math.PI * (xOffset + fadeMargin) / (-fadeMargin * 2)) * 0.5 + 0.5);
      } else if (xOffset > screenWidth + fadeMargin) {
        horizontalFade = Math.max(0, Math.sin(Math.PI * (screenWidth + fadeMargin - xOffset) / (fadeMargin * 2)) * 0.5 + 0.5);
      }
      
      // Vertical fade - more lenient to keep stars visible
      if (yOffset < -fadeMargin) {
        verticalFade = Math.max(0.1, Math.sin(Math.PI * (yOffset + fadeMargin) / (-fadeMargin * 2)) * 0.5 + 0.5);
      } else if (yOffset > screenHeight + fadeMargin) {
        verticalFade = Math.max(0.1, Math.sin(Math.PI * (screenHeight + fadeMargin - yOffset) / (fadeMargin * 2)) * 0.5 + 0.5);
      }
      
      const finalOpacity = baseOpacity * horizontalFade * verticalFade;
      
      // Render if meaningfully visible
      if (finalOpacity > 0.05) {
        return (
          <div 
            key={id}
            className="absolute"
            style={{
              transform: `translateY(${yOffset}px) translateX(${xOffset}px)`,
              background: `radial-gradient(circle, rgba(${color},${finalOpacity}) ${dotSize}px, transparent ${dotSize * 2.5}px)`,
              width: `${dotSize * 5}px`,
              height: `${dotSize * 5}px`,
              willChange: 'transform',
              pointerEvents: 'none'
            }}
          />
        );
      }
      return null;
    };
    
    // Reduced star field - fewer, varied sizes, all moving
    const starConfigs = [
      // Small stars (90% of stars) - much smaller
      { opacity: 0.7, size: 45, dotSize: 0.15, speed: 0.12, oscillate: 0.0008, amplitude: 25 },
      { opacity: 0.6, size: 50, dotSize: 0.2, speed: 0.15, oscillate: 0.001, amplitude: 30 },
      { opacity: 0.8, size: 40, dotSize: 0.18, speed: 0.1, oscillate: 0.0006, amplitude: 20 },
      { opacity: 0.65, size: 55, dotSize: 0.25, speed: 0.14, oscillate: 0.0009, amplitude: 35 },
      
      // Medium-large stars (10% of stars) - much smaller
      { opacity: 0.9, size: 60, dotSize: 0.4, speed: 0.18, oscillate: 0.0012, amplitude: 40 },
      { opacity: 0.75, size: 65, dotSize: 0.6, speed: 0.16, oscillate: 0.0011, amplitude: 45 }
    ];
    
    starConfigs.forEach((config, i) => {
      // Only 2 stars per config instead of 3 for 50% reduction
      for (let j = 0; j < 2; j++) {
        const starId = `star-${i}-${j}`;
        
        // Distribute across screen width with better spacing
        const baseX = (screenWidth / 2) * j + (screenWidth * 0.2) + ((i * 47) % (screenWidth * 0.3));
        
        // Start some stars visible, others off-screen for continuous flow
        const initialY = (i + j) % 3 === 0 ? 
          (screenHeight * 0.1) + ((i * 29) % (screenHeight * 0.4)) : // On screen
          -(screenHeight * 0.3) - ((i * 19) % (screenHeight * 0.5)); // Off screen top
        
        const star = createStar({
          id: starId,
          baseOpacity: config.opacity,
          size: config.size,
          dotSize: config.dotSize,
          xStart: baseX,
          yStart: initialY,
          ySpeed: config.speed,
          xDrift: (i % 2 === 0 ? 1 : -1) * (0.02 + (i * 0.003)),
          oscillateSpeed: config.oscillate,
          oscillateAmplitude: config.amplitude
        });
        
        if (star) layers.push(star);
      }
    });
    
    // Reduced colored accent stars - only 1 instead of 3
    const coloredStarConfig = { color: '200,220,255', opacity: 0.8, size: 70, dotSize: 0.35 };
    
    const spiralRadius = 35;
    const spiralSpeed = 0.001;
    const baseX = screenWidth * 0.6;
    
    // Start colored star visible
    const initialY = screenHeight * 0.25;
    
    const spiralX = baseX + Math.cos(scrollY * spiralSpeed) * spiralRadius;
    const spiralY = initialY + (scrollY * 0.13 * multiplier);
    
    const coloredStar = createStar({
      id: 'colored-star-accent',
      baseOpacity: coloredStarConfig.opacity,
      size: coloredStarConfig.size,
      dotSize: coloredStarConfig.dotSize,
      xStart: spiralX,
      yStart: spiralY,
      ySpeed: 0.13,
      xDrift: 0.025,
      oscillateSpeed: spiralSpeed * 2,
      oscillateAmplitude: 30,
      color: coloredStarConfig.color
    });
    
    if (coloredStar) layers.push(coloredStar);
    
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
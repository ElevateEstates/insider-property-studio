import { useEffect, useState, useCallback } from "react";

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
  
  // Detect mobile devices and reduce motion preference
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Much less intense for other pages, mobile, or reduced motion preference
  const multiplier = (reduced || isMobile || prefersReducedMotion) ? 0.07 : 1;

  const handleScroll = useCallback(() => {
    // Throttle scroll updates for mobile performance
    if (isMobile) {
      requestAnimationFrame(() => setScrollY(window.scrollY));
    } else {
      setScrollY(window.scrollY);
    }
  }, [isMobile]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

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
      
      // Calculate smooth continuous movement with guaranteed variation
      const baseY = yStart + (scrollY * ySpeed * multiplier);
      const baseX = xStart + (scrollY * xDrift * multiplier);
      
      // Add strong oscillating movement with unique phase for each dot
      const uniquePhase = (parseFloat(id.split('-')[1] || '0') + parseFloat(id.split('-')[2] || '0')) * 1.5 + 1; // Ensure non-zero phase
      const oscillationX = Math.sin(scrollY * oscillateSpeed + uniquePhase) * oscillateAmplitude;
      const oscillationY = Math.cos(scrollY * oscillateSpeed * 0.7 + uniquePhase) * (oscillateAmplitude * 0.5);
      
      // Add secondary oscillation to prevent any static states
      const secondaryOscillationX = Math.cos(scrollY * oscillateSpeed * 1.3 + uniquePhase * 2) * (oscillateAmplitude * 0.3);
      const secondaryOscillationY = Math.sin(scrollY * oscillateSpeed * 0.9 + uniquePhase * 1.7) * (oscillateAmplitude * 0.2);
      
      // Create continuous loop with large cycle to prevent visible repetition
      const cycleHeight = screenHeight * 8;
      const cycleWidth = screenWidth * 3;
      
      const xProgress = (baseX % cycleWidth) / cycleWidth;
      const xOffset = (xProgress * cycleWidth) - (screenWidth * 0.5) + oscillationX + secondaryOscillationX;
      
      const yProgress = (baseY % cycleHeight) / cycleHeight;
      const yOffset = (yProgress * cycleHeight) - (screenHeight * 2) + oscillationY + secondaryOscillationY;
      
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
              transform: `translate3d(${xOffset}px, ${yOffset}px, 0)`,
              backgroundImage: `radial-gradient(circle, rgba(${color},${finalOpacity}) ${dotSize}px, transparent ${dotSize * 2.5}px)`,
              backgroundSize: `${size}px ${size}px`,
              backgroundRepeat: 'repeat',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              perspective: '1000px',
              top: 0,
              left: 0,
              right: 0,
              height: '200vh',
              pointerEvents: 'none'
            }}
          />
        );
      }
      return null;
    };
    
    // Reduced star field - fewer, varied sizes, all moving
    // Increased mobile stars for better visibility
    const starConfigs = isMobile || prefersReducedMotion ? [
      // Enhanced mobile stars - more visible
      { opacity: 0.8, size: 50, dotSize: 0.4, speed: 0.08, oscillate: 0.0005, amplitude: 15 },
      { opacity: 0.7, size: 60, dotSize: 0.5, speed: 0.1, oscillate: 0.0006, amplitude: 20 },
      { opacity: 0.6, size: 55, dotSize: 0.3, speed: 0.09, oscillate: 0.0007, amplitude: 18 },
      { opacity: 0.75, size: 65, dotSize: 0.4, speed: 0.11, oscillate: 0.0008, amplitude: 22 }
    ] : [
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
      // Increase mobile stars: 2 stars per config on mobile, 2 on desktop
      const starsPerConfig = isMobile || prefersReducedMotion ? 2 : 2;
      for (let j = 0; j < starsPerConfig; j++) {
        const starId = `star-${i}-${j}`;
        
        // Distribute across screen width with better spacing
        const baseX = (screenWidth / 2) * j + (screenWidth * 0.2) + ((i * 47) % (screenWidth * 0.3));
        
        // Start some stars visible, others off-screen for continuous flow
        const initialY = (i + j) % 3 === 0 ? 
          (screenHeight * 0.1) + ((i * 29) % (screenHeight * 0.4)) : // On screen
          -(screenHeight * 0.3) - ((i * 19) % (screenHeight * 0.5)); // Off screen top
        
        // Add strong randomization to prevent any dot from matching scroll speed exactly
        const speedVariation = 0.05 + (Math.abs(Math.sin(i * j * 2.5)) * 0.04);
        const driftVariation = 0.015 + (Math.abs(Math.cos(i * j * 1.7)) * 0.01);
        const oscillateVariation = 0.0008 + (Math.abs(Math.sin(i * j * 3.3)) * 0.0005);
        const amplitudeVariation = 20 + (Math.abs(Math.cos(i * j * 1.1)) * 15);
        
        const star = createStar({
          id: starId,
          baseOpacity: config.opacity,
          size: config.size,
          dotSize: config.dotSize,
          xStart: baseX,
          yStart: initialY,
          ySpeed: Math.max(0.12, config.speed + speedVariation), // Much higher minimum speed
          xDrift: (i % 2 === 0 ? 1 : -1) * Math.max(0.05, (0.03 + (i * 0.008) + driftVariation)), // Much higher minimum drift
          oscillateSpeed: Math.max(0.002, config.oscillate + oscillateVariation), // Much higher minimum oscillation
          oscillateAmplitude: Math.max(50, config.amplitude + amplitudeVariation) // Much higher minimum amplitude for guaranteed left/right movement
        });
        
        if (star) layers.push(star);
      }
    });
    
    // Skip colored accent stars on mobile for better performance
    if (!isMobile && !prefersReducedMotion) {
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
        ySpeed: Math.max(0.15, 0.13), // Higher minimum movement
        xDrift: Math.max(0.04, 0.025), // Higher minimum drift
        oscillateSpeed: Math.max(0.0015, spiralSpeed * 2), // Higher minimum oscillation
        oscillateAmplitude: Math.max(40, 30), // Higher minimum amplitude
        color: coloredStarConfig.color
      });
      
      if (coloredStar) layers.push(coloredStar);
    }
    
    return layers;
  };

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ height: '200vh' }}>
      {/* Base dark gray background */}
      <div 
        className={`absolute ${className}`}
        style={{
          backgroundColor: '#0f0f0f', // Dark grayish instead of pitch black
          opacity: opacity,
          top: 0,
          left: 0,
          right: 0,
          height: '200vh'
        }}
      />
      
      {/* Generate multiple dot layers with varying opacity and sizes */}
      {generateDotLayers()}
      
      {/* Footer enlarged dots effect */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[50vh] pointer-events-none z-1"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 75%, rgba(255,255,255,0.6) 6px, transparent 16px),
                           radial-gradient(circle at 75% 25%, rgba(255,255,255,0.4) 8px, transparent 24px),
                           radial-gradient(circle at 50% 50%, rgba(255,255,255,0.5) 7.2px, transparent 20px),
                           radial-gradient(circle at 20% 40%, rgba(255,255,255,0.3) 8.8px, transparent 28px),
                           radial-gradient(circle at 80% 80%, rgba(255,255,255,0.45) 6.8px, transparent 22px)`,
          backgroundSize: '120px 120px, 160px 160px, 140px 140px, 180px 180px, 130px 130px',
          transform: `translateY(${scrollY * 0.02}px) scale(5.2)`,
          transformOrigin: 'bottom center'
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
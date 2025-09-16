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
  
  // Much less intense for other pages but keep mobile stars visible
  const multiplier = reduced ? 0.07 : (isMobile || prefersReducedMotion) ? 0.8 : 1;

  const handleScroll = useCallback(() => {
    // Moderate throttling for mobile performance
    if (isMobile) {
      // Only update every 2nd frame on mobile (less aggressive than before)
      if (Math.floor(window.scrollY / 2) !== Math.floor(scrollY / 2)) {
        requestAnimationFrame(() => setScrollY(window.scrollY));
      }
    } else {
      setScrollY(window.scrollY);
    }
  }, [isMobile, scrollY]);

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
      
      // Calculate smooth continuous movement with simplified math for mobile
      const baseY = yStart + (scrollY * ySpeed * multiplier);
      const baseX = xStart + (scrollY * xDrift * multiplier);
      
      // Simplified oscillations for mobile performance
      if (isMobile) {
        // Much simpler oscillation on mobile
        const simplePhase = parseFloat(id.split('-')[1] || '0') * 0.5;
        const oscillationX = Math.sin(scrollY * oscillateSpeed + simplePhase) * oscillateAmplitude * 0.5;
        const oscillationY = Math.cos(scrollY * oscillateSpeed * 0.7 + simplePhase) * (oscillateAmplitude * 0.3);
        
        var finalOscillationX = oscillationX;
        var finalOscillationY = oscillationY;
      } else {
        // Full desktop oscillations
        const uniquePhase = (parseFloat(id.split('-')[1] || '0') + parseFloat(id.split('-')[2] || '0')) * 1.5 + 1;
        const oscillationX = Math.sin(scrollY * oscillateSpeed + uniquePhase) * oscillateAmplitude;
        const oscillationY = Math.cos(scrollY * oscillateSpeed * 0.7 + uniquePhase) * (oscillateAmplitude * 0.5);
        
        var finalOscillationX = oscillationX + Math.cos(scrollY * oscillateSpeed * 1.3 + uniquePhase * 2) * (oscillateAmplitude * 0.3);
        var finalOscillationY = oscillationY + Math.sin(scrollY * oscillateSpeed * 0.9 + uniquePhase * 1.7) * (oscillateAmplitude * 0.2);
      }
      
      // Cycle calculations optimized for top-to-bottom visibility
      const cycleHeight = isMobile ? screenHeight * 4 : screenHeight * 6; // Smaller cycles for better top coverage
      const cycleWidth = isMobile ? screenWidth * 2 : screenWidth * 3;
      
      const xProgress = (baseX % cycleWidth) / cycleWidth;
      const xOffset = (xProgress * cycleWidth) - (screenWidth * 0.5) + finalOscillationX;
      
      const yProgress = (baseY % cycleHeight) / cycleHeight;
      const yOffset = (yProgress * cycleHeight) - (screenHeight * 0.3) + finalOscillationY; // Start much higher for top visibility
      
      // Enhanced visibility calculations prioritizing top of page
      if (isMobile) {
        // More lenient visibility check on mobile, especially for top area
        const isVisible = xOffset > -300 && xOffset < screenWidth + 300 && 
                          yOffset > -400 && yOffset < screenHeight + 600; // Extended top margin
        var finalOpacity = isVisible ? baseOpacity * 0.9 : 0; // Higher opacity on mobile
      } else {
        // Desktop fade calculations with better top coverage
        const fadeMargin = 500;
        let horizontalFade = 1;
        let verticalFade = 1;
        
        if (xOffset < -fadeMargin) {
          horizontalFade = Math.max(0.2, Math.sin(Math.PI * (xOffset + fadeMargin) / (-fadeMargin * 2)) * 0.5 + 0.5);
        } else if (xOffset > screenWidth + fadeMargin) {
          horizontalFade = Math.max(0.2, Math.sin(Math.PI * (screenWidth + fadeMargin - xOffset) / (fadeMargin * 2)) * 0.5 + 0.5);
        }
        
        // Enhanced top visibility - much more lenient for top area
        if (yOffset < -fadeMargin * 1.5) {
          verticalFade = Math.max(0.3, Math.sin(Math.PI * (yOffset + fadeMargin * 1.5) / (-fadeMargin * 2)) * 0.5 + 0.5);
        } else if (yOffset > screenHeight + fadeMargin * 1.5) {
          verticalFade = Math.max(0.3, Math.sin(Math.PI * (screenHeight + fadeMargin * 1.5 - yOffset) / (fadeMargin * 2)) * 0.5 + 0.5);
        }
        
        var finalOpacity = baseOpacity * horizontalFade * verticalFade;
      }
      
      // Simplified scaling for mobile
      const footerStartY = screenHeight * 0.85;
      const isInFooterArea = yOffset > footerStartY;
      const footerScale = isInFooterArea ? 1 + ((yOffset - footerStartY) / (screenHeight * 0.3)) * 0.3 : 1; // Reduced scaling
      const scaledDotSize = dotSize * Math.min(footerScale, 1.3);
      const scaledSize = size * Math.min(footerScale, 1.2);
      
      // Lower visibility threshold for better coverage, especially at top
      if (finalOpacity > 0.01) {
        return (
          <div 
            key={id}
            className="absolute"
            style={{
              transform: `translate3d(${xOffset}px, ${yOffset}px, 0)`,
              backgroundImage: `radial-gradient(circle, rgba(${color},${finalOpacity}) ${scaledDotSize}px, transparent ${scaledDotSize * 2.5}px)`,
              backgroundSize: `${scaledSize}px ${scaledSize}px`,
              backgroundRepeat: 'repeat',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
              perspective: '1000px',
              top: 0,
              left: 0,
              right: 0,
              height: isMobile ? '150vh' : '200vh', // Reduced height on mobile
              pointerEvents: 'none'
            }}
          />
        );
      }
      return null;
    };
    
    // Balanced mobile stars - visible but optimized for performance
    const starConfigs = isMobile || prefersReducedMotion ? [
      // Optimized mobile stars - enough to be visible but not laggy
      { opacity: 0.8, size: 100, dotSize: 1.0, speed: 0.12, oscillate: 0.0008, amplitude: 25 },
      { opacity: 0.7, size: 120, dotSize: 0.8, speed: 0.15, oscillate: 0.001, amplitude: 30 },
      { opacity: 0.75, size: 110, dotSize: 0.9, speed: 0.13, oscillate: 0.0009, amplitude: 28 },
      { opacity: 0.6, size: 90, dotSize: 1.1, speed: 0.14, oscillate: 0.0007, amplitude: 22 }
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
      // Balanced star count: visible but performant on mobile
      const starsPerConfig = isMobile || prefersReducedMotion ? 2 : 2;
      for (let j = 0; j < starsPerConfig; j++) {
        const starId = `star-${i}-${j}`;
        
        // Distribute across screen width with better spacing
        const baseX = (screenWidth / 2) * j + (screenWidth * 0.2) + ((i * 47) % (screenWidth * 0.3));
        
        // Position stars to be visible from the very top of the page
        const initialY = isMobile ? 
          // On mobile, ensure even distribution starting from top of page
          (i * 60 + j * 90) % (screenHeight * 1.5) - (screenHeight * 0.2) : // Start above fold, spread across 1.5x viewport
          // Desktop behavior - spread across larger area
          (i * 80 + j * 120) % (screenHeight * 2) - (screenHeight * 0.3); // Start above fold, spread across 2x viewport
        
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
      
      // Simplified colored star for performance
      const baseX = screenWidth * 0.6;
      const initialY = screenHeight * 0.25;
      
      const coloredStar = createStar({
        id: 'colored-star-accent',
        baseOpacity: coloredStarConfig.opacity,
        size: coloredStarConfig.size,
        dotSize: coloredStarConfig.dotSize,
        xStart: baseX,
        yStart: initialY,
        ySpeed: 0.13,
        xDrift: 0.025,
        oscillateSpeed: 0.0015,
        oscillateAmplitude: 30,
        color: coloredStarConfig.color
      });
      
      if (coloredStar) layers.push(coloredStar);
    }
    
    return layers;
  };

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden" style={{ height: isMobile ? '150vh' : '200vh' }}>
      {/* Base dark gray background */}
      <div 
        className={`absolute ${className}`}
        style={{
          backgroundColor: '#0f0f0f',
          opacity: opacity,
          top: 0,
          left: 0,
          right: 0,
          height: isMobile ? '150vh' : '200vh' // Reduced height on mobile
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
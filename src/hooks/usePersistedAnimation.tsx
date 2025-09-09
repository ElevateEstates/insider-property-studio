import { useEffect, useState, useRef, useCallback } from 'react';
import { useAnimations } from '@/contexts/AnimationContext';

interface UsePersistedAnimationOptions {
  key: string;
  threshold?: number;
  delay?: number;
  once?: boolean;
}

export const usePersistedAnimation = ({ 
  key, 
  threshold = 0.1, 
  delay = 0,
  once = true 
}: UsePersistedAnimationOptions) => {
  const { hasAnimated, markAsAnimated, isMobile, prefersReducedMotion } = useAnimations();
  const [isVisible, setIsVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const elementRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  // If already animated, show immediately without animation
  const alreadyAnimated = hasAnimated(key);

  // Trigger animation immediately on mount for critical content
  useEffect(() => {
    if (alreadyAnimated) {
      setIsVisible(true);
      setShouldAnimate(true);
      return;
    }

    // For critical above-the-fold content, animate immediately
    const isCriticalContent = key.includes('hero') || key.includes('title') || key.includes('main');
    
    if (isCriticalContent) {
      setIsVisible(true);
      const effectiveDelay = (isMobile || prefersReducedMotion) ? 0 : Math.min(delay, 300);
      
      if (effectiveDelay > 0) {
        timeoutRef.current = setTimeout(() => {
          setShouldAnimate(true);
          markAsAnimated(key);
        }, effectiveDelay);
      } else {
        setShouldAnimate(true);
        markAsAnimated(key);
      }
    }
  }, [alreadyAnimated, key, delay, markAsAnimated, isMobile, prefersReducedMotion]);

  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries;
    
    if (entry.isIntersecting && !shouldAnimate && !alreadyAnimated) {
      setIsVisible(true);
      
      // Apply delay only if not on mobile or if user doesn't prefer reduced motion
      const effectiveDelay = (isMobile || prefersReducedMotion) ? 0 : delay;
      
      if (effectiveDelay > 0) {
        timeoutRef.current = setTimeout(() => {
          setShouldAnimate(true);
          markAsAnimated(key);
        }, effectiveDelay);
      } else {
        setShouldAnimate(true);
        markAsAnimated(key);
      }
    }
  }, [shouldAnimate, alreadyAnimated, delay, key, markAsAnimated, isMobile, prefersReducedMotion]);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || alreadyAnimated) return;

    // Skip intersection observer for critical content that already animated on mount
    const isCriticalContent = key.includes('hero') || key.includes('title') || key.includes('main');
    if (isCriticalContent && shouldAnimate) return;

    // Reduce threshold on mobile for better performance
    const effectiveThreshold = isMobile ? Math.max(0.05, threshold * 0.5) : threshold;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: effectiveThreshold,
      rootMargin: isMobile ? '50px' : '100px' // Larger root margin on mobile
    });

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [handleIntersection, alreadyAnimated, threshold, isMobile, key, shouldAnimate]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return {
    ref: elementRef,
    isVisible: alreadyAnimated || isVisible,
    shouldAnimate: alreadyAnimated || shouldAnimate,
    hasAnimated: alreadyAnimated,
    isMobile,
    prefersReducedMotion
  };
};
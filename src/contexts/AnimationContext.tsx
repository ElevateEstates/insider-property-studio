import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AnimationState {
  [key: string]: boolean;
}

interface AnimationContextType {
  hasAnimated: (key: string) => boolean;
  markAsAnimated: (key: string) => void;
  resetAnimations: () => void;
  isMobile: boolean;
  prefersReducedMotion: boolean;
}

const AnimationContext = createContext<AnimationContextType | undefined>(undefined);

const STORAGE_KEY = 'elevate-animations-state';

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const [animationState, setAnimationState] = useState<AnimationState>({});
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Load animation state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setAnimationState(JSON.parse(saved));
      }
    } catch (error) {
      console.warn('Failed to load animation state:', error);
    }

    // Detect mobile and reduced motion preferences
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    const checkReducedMotion = () => {
      setPrefersReducedMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    };

    checkMobile();
    checkReducedMotion();

    window.addEventListener('resize', checkMobile);
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', checkReducedMotion);

    return () => {
      window.removeEventListener('resize', checkMobile);
      mediaQuery.removeEventListener('change', checkReducedMotion);
    };
  }, []);

  // Save animation state to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(animationState));
    } catch (error) {
      console.warn('Failed to save animation state:', error);
    }
  }, [animationState]);

  const hasAnimated = (key: string): boolean => {
    return animationState[key] === true;
  };

  const markAsAnimated = (key: string): void => {
    setAnimationState(prev => ({ ...prev, [key]: true }));
  };

  const resetAnimations = (): void => {
    setAnimationState({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.warn('Failed to reset animation state:', error);
    }
  };

  return (
    <AnimationContext.Provider 
      value={{ 
        hasAnimated, 
        markAsAnimated, 
        resetAnimations, 
        isMobile, 
        prefersReducedMotion 
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimations = (): AnimationContextType => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error('useAnimations must be used within an AnimationProvider');
  }
  return context;
};
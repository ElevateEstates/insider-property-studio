import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { usePersistedAnimation } from "@/hooks/usePersistedAnimation";
import img001 from "@/assets/img-001.jpg";
import img002 from "@/assets/img-002.jpg";
import img003 from "@/assets/img-003.jpg";
interface PortfolioItem {
  type: 'image' | 'video';
  src?: string;
  vimeoId?: string;
  alt: string;
  size: 'small' | 'medium' | 'large';
  title: string;
}
const portfolioItems: PortfolioItem[] = [{
  type: 'video',
  vimeoId: '123456789',
  alt: 'Luxury estate tour video',
  size: 'large',
  title: 'Modern Villa Showcase'
}, {
  type: 'image',
  src: img001,
  alt: 'Luxury property exterior view',
  size: 'medium',
  title: 'Coastal Estate'
}, {
  type: 'image',
  src: img002,
  alt: 'Modern interior living space',
  size: 'small',
  title: 'Contemporary Interior'
}, {
  type: 'video',
  vimeoId: '987654321',
  alt: 'Property walkthrough video',
  size: 'medium',
  title: 'Downtown Penthouse'
}, {
  type: 'image',
  src: img003,
  alt: 'Stunning property landscape',
  size: 'small',
  title: 'Garden Views'
}, {
  type: 'image',
  src: img001,
  alt: 'Luxury property exterior view',
  size: 'large',
  title: 'Architectural Marvel'
}, {
  type: 'image',
  src: img002,
  alt: 'Modern interior living space',
  size: 'small',
  title: 'Minimalist Design'
}, {
  type: 'video',
  vimeoId: '456789123',
  alt: 'Drone footage of estate',
  size: 'medium',
  title: 'Aerial Estate Tour'
}, {
  type: 'image',
  src: img003,
  alt: 'Elegant outdoor space',
  size: 'small',
  title: 'Terrace Paradise'
}, {
  type: 'image',
  src: img001,
  alt: 'Premium property facade',
  size: 'medium',
  title: 'Urban Elegance'
}, {
  type: 'image',
  src: img002,
  alt: 'Luxury kitchen design',
  size: 'small',
  title: 'Culinary Excellence'
}, {
  type: 'image',
  src: img003,
  alt: 'Serene poolside view',
  size: 'large',
  title: 'Aquatic Retreat'
}, {
  type: 'image',
  src: img001,
  alt: 'Master bedroom suite',
  size: 'medium',
  title: 'Private Sanctuary'
}, {
  type: 'image',
  src: img002,
  alt: 'Grand entrance hall',
  size: 'small',
  title: 'First Impressions'
}, {
  type: 'image',
  src: img003,
  alt: 'Panoramic city views',
  size: 'large',
  title: 'Skyline Majesty'
}];
export const PortfolioSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Separate videos and photos
  const videoItems = portfolioItems.filter(item => item.type === 'video');
  const photoItems = portfolioItems.filter(item => item.type === 'image');

  // Use persistent animations
  const titleAnimation = usePersistedAnimation({
    key: 'portfolio-title',
    threshold: 0.1
  });
  const cardsAnimation = usePersistedAnimation({
    key: 'portfolio-cards',
    threshold: 0.1
  });
  useEffect(() => {
    const handleScroll = () => {
      if (titleAnimation.isMobile) {
        requestAnimationFrame(() => setScrollY(window.scrollY));
      } else {
        setScrollY(window.scrollY);
      }
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [titleAnimation.isMobile]);

  // If animations are already complete, show all content immediately
  useEffect(() => {
    if (titleAnimation.hasAnimated && cardsAnimation.hasAnimated) {
      setVisibleCards([...Array(videoItems.length + photoItems.length)].map((_, i) => i));
    }
  }, [titleAnimation.hasAnimated, cardsAnimation.hasAnimated, videoItems.length, photoItems.length]);
  useEffect(() => {
    if (titleAnimation.hasAnimated && cardsAnimation.hasAnimated) return;
    const observers: IntersectionObserver[] = [];
    const effectiveThreshold = titleAnimation.isMobile ? 0.05 : 0.2;

    // Card observers - only if not already animated
    if (!cardsAnimation.hasAnimated) {
      cardRefs.current.forEach((card, index) => {
        if (card) {
          const cardObserver = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
              setVisibleCards(prev => {
                if (!prev.includes(index)) {
                  return [...prev, index];
                }
                return prev;
              });
            }
          }, {
            threshold: effectiveThreshold,
            rootMargin: titleAnimation.isMobile ? '50px' : '100px'
          });
          cardObserver.observe(card);
          observers.push(cardObserver);
        }
      });
    }
    return () => observers.forEach(observer => observer.disconnect());
  }, [titleAnimation.hasAnimated, cardsAnimation.hasAnimated, titleAnimation.isMobile]);
  const getSizeClasses = (size: string) => {
    // Responsive card sizes with safe zones
    return 'w-full aspect-[4/3] max-w-[400px] mx-auto';
  };
  return <section ref={sectionRef} className="py-12 md:py-20 px-4 md:px-6 lg:px-8 relative overflow-hidden z-10">
      {/* Subtle Star Background */}
      <div className="absolute inset-0 opacity-20 z-0">
        <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.05) 1px, transparent 1px),
                           radial-gradient(circle at 80% 20%, rgba(255,255,255,0.03) 1px, transparent 1px),
                           radial-gradient(circle at 40% 40%, rgba(255,255,255,0.04) 1px, transparent 1px)`,
        backgroundSize: '60px 60px, 100px 100px, 140px 140px'
      }}></div>
      </div>
      
      <div className="container mx-auto max-w-7xl relative z-20 section-content py-4 md:py-8 px-2 md:px-4" style={{
      transform: `translateY(${scrollY * 0.05}px)`
    }}>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 text-white">
            {(titleAnimation.shouldAnimate || titleAnimation.hasAnimated) && <span className={`${titleAnimation.hasAnimated ? 'opacity-100' : 'animate-fade-in opacity-0 delay-200'} block`}>
                Grow your business and get noticed with our professional photography and videography.
              </span>}
          </h2>
          <p className="text-xl text-white/80 mb-12">
            {titleAnimation.shouldAnimate || titleAnimation.hasAnimated}
          </p>
        </div>

        {/* Video Gallery */}
        

        {/* Photo Gallery */}
        <div className="mb-16 px-4 md:px-8">
          <h3 className="text-2xl md:text-3xl font-light mb-8 text-white text-center">
            {titleAnimation.shouldAnimate || titleAnimation.hasAnimated}
          </h3>
          
        </div>

        
      </div>
    </section>;
};
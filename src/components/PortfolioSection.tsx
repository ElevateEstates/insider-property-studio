import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";

interface PortfolioItem {
  type: 'image' | 'video';
  src?: string;
  vimeoId?: string;
  alt: string;
  size: 'small' | 'medium' | 'large';
  title: string;
}

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

const TypewriterText = ({ text, className = "", delay = 0, speed = 100 }: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (hasStarted) return;
    
    const timer = setTimeout(() => {
      setHasStarted(true);
      setIsVisible(true);
      let currentIndex = 0;
      const typeInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
        }
      }, speed);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay, speed, hasStarted]);

  useEffect(() => {
    setHasStarted(false);
    setDisplayText("");
    setIsVisible(false);
  }, [text]);

  return (
    <span className={`${className} ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {displayText}
    </span>
  );
};

export const PortfolioSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [titleVisible, setTitleVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    // Title observer
    const titleObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTitleVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      titleObserver.observe(sectionRef.current);
      observers.push(titleObserver);
    }

    // Card observers
    cardRefs.current.forEach((card, index) => {
      if (card) {
        const cardObserver = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleCards(prev => [...prev, index]);
            }
          },
          { threshold: 0.2 }
        );
        cardObserver.observe(card);
        observers.push(cardObserver);
      }
    });

    return () => observers.forEach(observer => observer.disconnect());
  }, []);
  const portfolioItems: PortfolioItem[] = [
    {
      type: 'video',
      vimeoId: '123456789',
      alt: 'Luxury estate tour video',
      size: 'large',
      title: 'Modern Villa Showcase'
    },
    {
      type: 'image',
      src: portfolio1,
      alt: 'Luxury property exterior view',
      size: 'medium',
      title: 'Coastal Estate'
    },
    {
      type: 'image',
      src: portfolio2,
      alt: 'Modern interior living space',
      size: 'small',
      title: 'Contemporary Interior'
    },
    {
      type: 'video',
      vimeoId: '987654321',
      alt: 'Property walkthrough video',
      size: 'medium',
      title: 'Downtown Penthouse'
    },
    {
      type: 'image',
      src: portfolio3,
      alt: 'Stunning property landscape',
      size: 'small',
      title: 'Garden Views'
    },
    {
      type: 'image',
      src: portfolio1,
      alt: 'Luxury property exterior view',
      size: 'large',
      title: 'Architectural Marvel'
    },
    {
      type: 'image',
      src: portfolio2,
      alt: 'Modern interior living space',
      size: 'small',
      title: 'Minimalist Design'
    },
    {
      type: 'video',
      vimeoId: '456789123',
      alt: 'Drone footage of estate',
      size: 'medium',
      title: 'Aerial Estate Tour'
    }
  ];

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'small':
        return 'col-span-1 row-span-1 aspect-square';
      case 'medium':
        return 'col-span-1 md:col-span-2 row-span-1 aspect-[4/3]';
      case 'large':
        return 'col-span-1 md:col-span-2 lg:col-span-3 row-span-2 aspect-[16/9]';
      default:
        return 'col-span-1 row-span-1 aspect-[4/3]';
    }
  };

  return (
    <section ref={sectionRef} className="py-32 px-6 bg-black relative overflow-hidden z-10">
      {/* Subtle Star Background */}
      <div className="absolute inset-0 opacity-20 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(255,255,255,0.05) 1px, transparent 1px),
                           radial-gradient(circle at 80% 20%, rgba(255,255,255,0.03) 1px, transparent 1px),
                           radial-gradient(circle at 40% 40%, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: '60px 60px, 100px 100px, 140px 140px'
        }}></div>
      </div>
      
      <div 
        className="container mx-auto max-w-7xl relative z-20 section-content py-8"
        style={{ transform: `translateY(${scrollY * 0.05}px)` }}
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 text-white">
            {titleVisible && (
              <TypewriterText
                text="Grow your business with our real estate photography and videography."
                delay={200}
                speed={50}
              />
            )}
          </h2>
          <p className="text-xl text-white/80 mb-12">
            {titleVisible && (
              <TypewriterText
                text="An immersive way to experience real estate."
                delay={3000}
                speed={60}
              />
            )}
          </p>
        </div>

        {/* Dynamic Portfolio Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 auto-rows-[200px] gap-4 mb-16">
          {portfolioItems.map((item, index) => (
            <div 
              key={index} 
              ref={el => cardRefs.current[index] = el}
              className={`group relative overflow-hidden rounded-lg ${getSizeClasses(item.size)} transition-all duration-700 ${
                visibleCards.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
                transform: `translateY(${scrollY * 0.02}px)`
              }}
            >
              {item.type === 'image' ? (
                <img 
                  src={item.src} 
                  alt={item.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              ) : (
                <div className="relative w-full h-full bg-black">
                  <iframe
                    src={`https://player.vimeo.com/video/${item.vimeoId}?background=1&autoplay=0&loop=1&byline=0&title=0`}
                    className="w-full h-full object-cover"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                      <Play className="w-12 h-12 text-white" fill="white" />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Overlay with title */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-medium text-sm md:text-base mb-1">
                    {item.title}
                  </h3>
                  <p className="text-white/80 text-xs md:text-sm">
                    {item.type === 'video' ? 'Video Tour' : 'Photography'}
                  </p>
                </div>
              </div>
              
              {/* Base overlay for images */}
              {item.type === 'image' && (
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center" style={{ transform: `translateY(${scrollY * 0.03}px)` }}>
          <h3 className="text-2xl md:text-3xl font-light mb-6 text-white">
            {visibleCards.length > 4 && (
              <TypewriterText
                text="This is the pinnacle of real estate media."
                delay={500}
                speed={80}
              />
            )}
          </h3>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            {visibleCards.length > 4 && (
              <TypewriterText
                text="Discover the world of what real estate media was meant to be. Our work speaks for itself."
                delay={3000}
                speed={60}
              />
            )}
          </p>
          <Button 
            variant="outline" 
            size="lg"
            className="bg-transparent border-white/80 text-white hover:bg-white hover:text-black transition-all duration-300"
          >
            Our Portfolio
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};
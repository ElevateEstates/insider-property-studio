import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
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

export const PortfolioSection = () => {
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
    <section className="py-32 px-6 bg-black">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 text-white">
            Grow your business with our real estate photography and videography.
          </h2>
          <p className="text-xl text-white/80 mb-12">
            An immersive way to experience real estate.
          </p>
        </div>

        {/* Dynamic Portfolio Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 auto-rows-[200px] gap-4 mb-16">
          {portfolioItems.map((item, index) => (
            <div 
              key={index} 
              className={`group relative overflow-hidden rounded-lg ${getSizeClasses(item.size)}`}
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

        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-light mb-6 text-white">
            This is the pinnacle of real estate media.
          </h3>
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Discover the world of what real estate media was meant to be. Our work speaks for itself.
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
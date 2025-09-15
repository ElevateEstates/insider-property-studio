import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface LifestyleVideoListing {
  id: string;
  title: string;
  location: string;
  category: 'dining' | 'entertainment' | 'wellness' | 'outdoor';
  videoUrl: string;
  thumbnail: string;
  date: string;
  description: string;
  clientNotes: string;
  shootDetails: string;
}

interface LifestyleVideosProps {
  scrollY: number;
  onItemClick: (items: any[], index: number, type: 'lifestyle-videos') => void;
}

const LifestyleVideos = ({ scrollY, onItemClick }: LifestyleVideosProps) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const lifestyleVideos: LifestyleVideoListing[] = [
    {
      id: "vimeo-lifestyle-1",
      title: "Costa del Sol Luxury Lifestyle",
      location: "Marbella, Spain",
      category: 'outdoor',
      videoUrl: "https://player.vimeo.com/video/1029952959?badge=0&autopause=0&player_id=0&app_id=58479",
      thumbnail: "",
      date: "November 2024",
      description: "Experience the ultimate luxury lifestyle with breathtaking views of the Mediterranean coast. This exclusive showcase captures the essence of coastal living at its finest.",
      clientNotes: "Create an aspirational lifestyle video that captures the essence of luxury living with stunning coastal views and premium amenities.",
      shootDetails: "Professional cinematography featuring drone footage, golden hour lighting, and carefully curated scenes showcasing the property's premium features and surroundings."
    }
  ];

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((item, index) => {
      if (item) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleItems(prev => [...prev, index]);
            }
          },
          { threshold: 0.2 }
        );
        observer.observe(item);
        observers.push(observer);
      }
    });

    return () => observers.forEach(observer => observer.disconnect());
  }, []);

  return (
    <section className="py-16 md:py-24 lg:py-32 transparent-section">
      <div 
        className="container mx-auto max-w-7xl px-4 md:px-8 relative z-20"
        style={{ transform: `translateY(${scrollY * 0.03}px)` }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
          {lifestyleVideos.map((video, index) => (
            <div
              key={video.id}
              ref={el => itemRefs.current[index] = el}
              className={`group transition-all duration-700 ${
                visibleItems.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Card 
                className="glass-card overflow-hidden hover:border-white/20 transition-all duration-300 h-full flex flex-col"
              >
                {/* Video Embed - Fixed Height */}
                <div className="relative aspect-video flex-shrink-0">
                  <iframe
                    src={video.videoUrl}
                    title={video.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                {/* Content - Consistent Height */}
                <div className="p-4 md:p-6 flex-1 flex flex-col bg-gray-900/60 backdrop-blur-sm border-t border-white/10">
                  {/* Header Info */}
                  <div className="mb-3 md:mb-4">
                    <div className="flex items-center gap-2 text-xs md:text-sm text-white/60 mb-2">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                      {video.date}
                    </div>
                    
                    <h3 className="text-lg md:text-xl font-medium text-white mb-2 line-clamp-2">
                      {video.title}
                    </h3>
                    
                    <p className="text-white/70 text-xs md:text-sm mb-2 md:mb-3">
                      {video.location}
                    </p>
                    
                    <p className="text-white/60 text-xs md:text-sm leading-relaxed mb-3 md:mb-4 line-clamp-3">
                      {video.description}
                    </p>
                  </div>

                  {/* Content Details */}
                  <div className="space-y-2 md:space-y-3 flex-1">
                    <div>
                      <h4 className="text-white/80 text-xs font-medium mb-1">Production Details:</h4>
                      <p className="text-white/60 text-xs leading-relaxed line-clamp-3">
                        {video.shootDetails}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-white/80 text-xs font-medium mb-1">Creative Direction:</h4>
                      <p className="text-white/60 text-xs leading-relaxed line-clamp-3">
                        {video.clientNotes}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LifestyleVideos;
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
      id: '1',
      title: 'Mijas Location Introduction Video',
      location: 'Mijas, Spain',
      category: 'outdoor',
      videoUrl: 'https://player.vimeo.com/video/1118748157?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&muted=1&loop=1',
      thumbnail: '/lovable-uploads/0425939a-50c2-4776-81ad-2721b48c4585.png',
      date: '2025 - September',
      description: 'Cinematic video to showcase the convenient lifestyle in Mijas',
      clientNotes: 'Showcase Mijas as a potential place for living to our Northern Europe clients who are not very familiar with Spain.',
      shootDetails: '4-day shoot, 2 week post-production, professional voice-over'
    },
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
    <section className="py-32 transparent-section">
      <div 
        className="container mx-auto max-w-7xl px-4 md:px-8 relative z-20"
        style={{ transform: `translateY(${scrollY * 0.03}px)` }}
      >
        <div className="grid lg:grid-cols-2 gap-12">
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
                <div className="p-6 flex-1 flex flex-col bg-gray-900/60 backdrop-blur-sm border-t border-white/10">
                  {/* Header Info */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm text-white/60 mb-2">
                      <Calendar className="w-4 h-4" />
                      {video.date}
                    </div>
                    
                    <h3 className="text-xl font-medium text-white mb-2 line-clamp-2">
                      {video.title}
                    </h3>
                    
                    <p className="text-white/70 text-sm mb-3">
                      {video.location}
                    </p>
                    
                    <p className="text-white/60 text-sm leading-relaxed mb-4">
                      {video.description}
                    </p>
                  </div>

                  {/* Content Details */}
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-white/80 text-xs font-medium mb-1">Production Details:</h4>
                      <p className="text-white/60 text-xs leading-relaxed">
                        {video.shootDetails}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-white/80 text-xs font-medium mb-1">Creative Direction:</h4>
                      <p className="text-white/60 text-xs leading-relaxed">
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
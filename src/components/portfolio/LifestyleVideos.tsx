import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Play } from "lucide-react";

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
  const [expandedListing, setExpandedListing] = useState<string | null>(null);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const lifestyleVideos: LifestyleVideoListing[] = [
    {
      id: '1',
      title: 'Sunset Terrace Dining',
      location: 'Marbella Private Villa',
      category: 'dining',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: '/lovable-uploads/4ea57a85-e502-45e4-8fd2-a1702b491f62.png',
      date: '2024',
      description: 'Luxury outdoor dining experience with Mediterranean views',
      clientNotes: 'Capture the golden hour ambiance and sophisticated dining setup.',
      shootDetails: 'Evening shoot focusing on ambient lighting and luxury table settings'
    },
    {
      id: '2',
      title: 'Pool Party Lifestyle',
      location: 'Puerto Banus Penthouse',
      category: 'entertainment',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: '/lovable-uploads/688cf447-cf8b-4cd1-b791-83e7bf665470.png',
      date: '2024',
      description: 'Vibrant pool party atmosphere and entertainment spaces',
      clientNotes: 'Show the property as perfect for entertaining and social gatherings.',
      shootDetails: 'Day and evening shoot capturing party atmosphere and social spaces'
    },
    {
      id: '3',
      title: 'Spa & Wellness Journey',
      location: 'La Zagaleta Estate',
      category: 'wellness',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: '/lovable-uploads/e4fc5374-2e03-4b03-bdea-1c9e31937aae.png',
      date: '2024',
      description: 'Luxury spa and wellness facilities showcase',
      clientNotes: 'Emphasize relaxation, luxury amenities, and wellness lifestyle.',
      shootDetails: 'Spa session documentation with focus on luxury wellness amenities'
    },
    {
      id: '4',
      title: 'Garden & Outdoor Living',
      location: 'Estepona Villa',
      category: 'outdoor',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: '/lovable-uploads/f663db8d-bf8c-4981-84b5-ecc1997427e3.png',
      date: '2024',
      description: 'Beautiful garden spaces and outdoor lifestyle',
      clientNotes: 'Showcase the property\'s connection to nature and outdoor living spaces.',
      shootDetails: 'Full day shoot capturing gardens, outdoor kitchens, and landscape design'
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
                className="glass-card overflow-hidden hover:border-white/20 transition-all duration-300 cursor-pointer"
                onClick={() => onItemClick(lifestyleVideos, index, 'lifestyle-videos')}
              >
                {/* Video Embed */}
                <div className="relative aspect-video">
                  <iframe
                    src={video.videoUrl}
                    title={video.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className={`backdrop-blur-sm text-white font-medium ${
                      video.category === 'dining' ? 'bg-orange-600/80' :
                      video.category === 'entertainment' ? 'bg-purple-600/80' :
                      video.category === 'wellness' ? 'bg-green-600/80' :
                      'bg-blue-600/80'
                    }`}>
                      {video.category.charAt(0).toUpperCase() + video.category.slice(1)}
                    </Badge>
                  </div>

                  {/* Lifestyle Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className="backdrop-blur-sm text-white bg-pink-600/80">
                      Lifestyle Video
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-white/60 mb-2">
                    <Calendar className="w-4 h-4" />
                    {video.date}
                  </div>
                  
                  <h3 className="text-xl font-medium text-white mb-2">
                    {video.title}
                  </h3>
                  
                  <p className="text-white/70 text-sm mb-3">
                    {video.location}
                  </p>
                  
                  <p className="text-white/60 text-sm leading-relaxed mb-4">
                    {video.description}
                  </p>

                  {/* Shoot Details & Client Notes Preview */}
                  <div className="space-y-3 mb-4">
                    <div>
                      <h4 className="text-white/80 text-xs font-medium mb-1">Production Details:</h4>
                      <p className="text-white/60 text-xs leading-relaxed">
                        {expandedListing === video.id 
                          ? video.shootDetails 
                          : video.shootDetails.slice(0, 80) + (video.shootDetails.length > 80 ? '...' : '')
                        }
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-white/80 text-xs font-medium mb-1">Creative Direction:</h4>
                      <p className="text-white/60 text-xs leading-relaxed">
                        {expandedListing === video.id 
                          ? video.clientNotes 
                          : video.clientNotes.slice(0, 80) + (video.clientNotes.length > 80 ? '...' : '')
                        }
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setExpandedListing(
                        expandedListing === video.id ? null : video.id
                      )}
                      className="text-accent-gold hover:text-accent-gold-light hover:bg-accent-gold/10"
                    >
                      {expandedListing === video.id ? 'Show Less' : 'Show More'}
                      <ArrowRight className={`w-4 h-4 ml-2 transition-transform ${
                        expandedListing === video.id ? 'rotate-90' : ''
                      }`} />
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-white/60 hover:text-white hover:bg-white/10"
                    >
                      Watch Full Video
                      <Play className="w-4 h-4 ml-2" />
                    </Button>
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
import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Play, ExternalLink } from "lucide-react";

interface VideoListing {
  id: string;
  title: string;
  location: string;
  clientType: 'luxury' | 'residential' | 'airbnb' | 'commercial';
  videoUrl: string;
  thumbnail: string;
  packageType: 'video' | 'photo-video';
  date: string;
  description: string;
  clientNotes: string;
  shootDetails: string;
}

interface PropertyVideosProps {
  scrollY: number;
  onItemClick: (items: any[], index: number, type: 'property-videos') => void;
}

const PropertyVideos = ({ scrollY, onItemClick }: PropertyVideosProps) => {
  const [expandedListing, setExpandedListing] = useState<string | null>(null);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const videoListings: VideoListing[] = [
    {
      id: '1',
      title: 'Property Showcase Video',
      location: 'Coming Soon',
      clientType: 'luxury',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: '/placeholder.svg',
      packageType: 'video',
      date: 'Coming Soon',
      description: 'Professional property showcase video - placeholder content',
      clientNotes: 'High-end property video production with cinematic quality.',
      shootDetails: 'Full day shoot with drone footage and interior cinematography'
    }
  ];

  const filteredListings = videoListings;

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
  }, [filteredListings]);

  return (
    <section className="py-32 transparent-section">
      <div 
        className="container mx-auto max-w-7xl px-4 md:px-8 relative z-20"
        style={{ transform: `translateY(${scrollY * 0.03}px)` }}
      >
        <div className="grid lg:grid-cols-2 gap-12">
          {filteredListings.map((listing, index) => (
            <div
              key={listing.id}
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
                  <div style={{padding:"56.25% 0 0 0",position:"relative"}}>
                    <iframe 
                      src={listing.videoUrl} 
                      frameBorder="0" 
                      allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" 
                      referrerPolicy="strict-origin-when-cross-origin" 
                      style={{position:"absolute",top:0,left:0,width:"100%",height:"100%"}} 
                      title={listing.title}
                    />
                  </div>
                </div>

                {/* Content - Consistent Height */}
                <div className="p-6 flex-1 flex flex-col bg-gray-900/60 backdrop-blur-sm border-t border-white/10">
                  {/* Header Info - Fixed Space */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2 text-sm text-white/60 mb-2">
                      <Calendar className="w-4 h-4" />
                      {listing.date}
                    </div>
                    
                    <h3 className="text-xl font-medium text-white mb-2 line-clamp-2">
                      {listing.title}
                    </h3>
                    
                    <p className="text-white/70 text-sm mb-3">
                      {listing.location}
                    </p>
                    
                    <p className="text-white/60 text-sm leading-relaxed mb-4">
                      {listing.description}
                    </p>
                  </div>

                  {/* Content Details */}
                  <div className="space-y-3">
                    <div>
                      <h4 className="text-white/80 text-xs font-medium mb-1">Production Details:</h4>
                      <p className="text-white/60 text-xs leading-relaxed">
                        {listing.shootDetails}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-white/80 text-xs font-medium mb-1">Client Requirements:</h4>
                      <p className="text-white/60 text-xs leading-relaxed">
                        {listing.clientNotes}
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

export default PropertyVideos;
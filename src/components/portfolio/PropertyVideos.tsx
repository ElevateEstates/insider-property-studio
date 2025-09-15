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
      title: 'Mediterranean Villa Estate Tour',
      location: 'Marbella, Spain',
      clientType: 'luxury',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: '/lovable-uploads/0425939a-50c2-4776-81ad-2721b48c4585.png',
      packageType: 'photo-video',
      date: '2024',
      description: 'Cinematic walkthrough of luxury coastal villa',
      clientNotes: 'Client wanted dramatic sunset shots with emphasis on infinity pool and ocean views.',
      shootDetails: '2-day production with drone cinematography and interior flow sequences'
    },
    {
      id: '2',
      title: 'Penthouse Luxury Experience',
      location: 'Puerto Banus',
      clientType: 'luxury',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: '/lovable-uploads/111b5d7c-af39-4666-865d-874b4c80c29d.png',
      packageType: 'video',
      date: '2024',
      description: 'Premium penthouse with panoramic marina views',
      clientNotes: 'High-end production for international marketing campaign.',
      shootDetails: 'Single-day shoot with professional voice-over and luxury lifestyle sequences'
    },
    {
      id: '3',
      title: 'Family Home Showcase',
      location: 'Estepona',
      clientType: 'residential',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: '/lovable-uploads/1b35db94-4dd0-4d9d-bd6a-95c0a645c0b9.png',
      packageType: 'video',
      date: '2024',
      description: 'Warm family-focused home tour',
      clientNotes: 'Emphasis on natural lighting and family spaces.',
      shootDetails: 'Half-day video production highlighting functionality and comfort'
    },
    {
      id: '4',
      title: 'Vacation Rental Experience',
      location: 'Nueva Andalucia',
      clientType: 'airbnb',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: '/lovable-uploads/3883c264-9908-46ec-88d3-d7647feeb35b.png',
      packageType: 'photo-video',
      date: '2024',
      description: 'Guest experience journey and amenities showcase',
      clientNotes: 'Focus on lifestyle amenities and guest comfort for booking platform.',
      shootDetails: 'Full-day production documenting complete guest experience'
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
                className="glass-card overflow-hidden hover:border-white/20 transition-all duration-300 cursor-pointer h-full flex flex-col"
                onClick={() => onItemClick(filteredListings, index, 'property-videos')}
              >
                {/* Video Embed - Fixed Height */}
                <div className="relative aspect-video flex-shrink-0">
                  <iframe
                    src={listing.videoUrl}
                    title={listing.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />

                  {/* Client Type Badge */}
                  <div className="absolute top-4 left-4">
                    <Badge className={`backdrop-blur-sm text-white font-medium ${
                      listing.clientType === 'luxury' ? 'bg-yellow-600/80' :
                      listing.clientType === 'commercial' ? 'bg-blue-600/80' :
                      listing.clientType === 'airbnb' ? 'bg-green-600/80' :
                      'bg-purple-600/80'
                    }`}>
                      {listing.clientType.charAt(0).toUpperCase() + listing.clientType.slice(1)}
                    </Badge>
                  </div>

                  {/* Package Type Badge */}
                  <div className="absolute top-4 right-4">
                    <Badge className={`backdrop-blur-sm text-white ${
                      listing.packageType === 'photo-video' ? 'bg-red-500/80' : 'bg-red-600/80'
                    }`}>
                      {listing.packageType === 'photo-video' ? 'Photo + Video' : 'Video Package'}
                    </Badge>
                  </div>
                </div>

                {/* Content - Consistent Height */}
                <div className="p-6 flex-1 flex flex-col justify-between bg-gray-900/60 backdrop-blur-sm border-t border-white/10">
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
                    
                    <p className="text-white/60 text-sm leading-relaxed">
                      {listing.description}
                    </p>
                  </div>

                  {/* Expandable Content */}
                  <div className="flex-1">
                    <div className="space-y-3 mb-4">
                      <div>
                        <h4 className="text-white/80 text-xs font-medium mb-1">Production Details:</h4>
                        <p className="text-white/60 text-xs leading-relaxed">
                          {expandedListing === listing.id 
                            ? listing.shootDetails 
                            : listing.shootDetails.slice(0, 80) + (listing.shootDetails.length > 80 ? '...' : '')
                          }
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="text-white/80 text-xs font-medium mb-1">Client Requirements:</h4>
                        <p className="text-white/60 text-xs leading-relaxed">
                          {expandedListing === listing.id 
                            ? listing.clientNotes 
                            : listing.clientNotes.slice(0, 80) + (listing.clientNotes.length > 80 ? '...' : '')
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Actions - Fixed at Bottom */}
                  <div className="flex gap-2 mt-auto">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedListing(
                          expandedListing === listing.id ? null : listing.id
                        );
                      }}
                      className="text-accent-gold hover:text-accent-gold-light hover:bg-accent-gold/10"
                    >
                      {expandedListing === listing.id ? 'Show Less' : 'Show More'}
                      <ArrowRight className={`w-4 h-4 ml-2 transition-transform ${
                        expandedListing === listing.id ? 'rotate-90' : ''
                      }`} />
                    </Button>
                    
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={(e) => e.stopPropagation()}
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

export default PropertyVideos;
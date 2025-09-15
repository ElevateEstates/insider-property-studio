import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, ExternalLink } from "lucide-react";
import img001 from "@/assets/img-001.jpg";
import img002 from "@/assets/img-002.jpg";
import img003 from "@/assets/img-003.jpg";
import img004 from "@/assets/img-004.jpg";
import img005 from "@/assets/img-005.jpg";
import img006 from "@/assets/img-006.jpg";
import img007 from "@/assets/img-007.jpg";
import img008 from "@/assets/img-008.jpg";
import img009 from "@/assets/img-009.jpg";
import img013 from "@/assets/img-013.jpg";
import img014 from "@/assets/img-014.jpg";
import img015 from "@/assets/img-015.jpg";
import img016 from "@/assets/img-016.jpg";
import img017 from "@/assets/img-017.jpg";
import img018 from "@/assets/img-018.jpg";
import img019 from "@/assets/img-019.jpg";
import img020 from "@/assets/img-020.jpg";
import img021 from "@/assets/img-021.jpg";
import img022 from "@/assets/img-022.jpg";
import img023 from "@/assets/img-023.jpg";
import img024 from "@/assets/img-024.jpg";
import img025 from "@/assets/img-025.jpg";
import img026 from "@/assets/img-026.jpg";
import img027 from "@/assets/img-027.jpg";
import img028 from "@/assets/img-028.jpg";
import img029 from "@/assets/img-029.jpg";
import img030 from "@/assets/img-030.jpg";
import img031 from "@/assets/img-031.jpg";
import img032 from "@/assets/img-032.jpg";
import img034 from "@/assets/img-034.jpg";
import img035 from "@/assets/img-035.jpg";
import img036 from "@/assets/img-036.jpg";
import img037 from "@/assets/img-037.jpg";
import img038 from "@/assets/img-038.jpg";
import img039 from "@/assets/img-039.jpg";
import img040 from "@/assets/img-040.jpg";
import img041 from "@/assets/img-041.jpg";
import img042 from "@/assets/img-042.jpg";
import img043 from "@/assets/img-043.jpg";
import img044 from "@/assets/img-044.jpg";
import img045 from "@/assets/img-045.jpg";
import img046 from "@/assets/img-046.jpg";
import img047 from "@/assets/img-047.jpg";
import img048 from "@/assets/img-048.jpg";
import img049 from "@/assets/img-049.jpg";
import img050 from "@/assets/img-050.jpg";
import img051 from "@/assets/img-051.jpg";
import img052 from "@/assets/img-052.jpg";
import img053 from "@/assets/img-053.jpg";
import img054 from "@/assets/img-054.jpg";
import img055 from "@/assets/img-055.jpg";
import img056 from "@/assets/img-056.jpg";
import img057 from "@/assets/img-057.jpg";
import img058 from "@/assets/img-058.jpg";
import img059 from "@/assets/img-059.jpg";
import img060 from "@/assets/img-060.jpg";
import img061 from "@/assets/img-061.jpg";
import img062 from "@/assets/img-062.jpg";

interface PortfolioListing {
  id: string;
  title: string;
  location: string;
  clientType: 'luxury' | 'residential' | 'airbnb' | 'commercial';
  images: string[];
  packageType: 'photo' | 'video' | 'photo-video';
  date: string;
  description: string;
  clientNotes: string;
  shootDetails: string;
}

interface PropertyListingsProps {
  scrollY: number;
  onItemClick: (items: any[], index: number, type: 'property-listings') => void;
}

const PropertyListings = ({ scrollY, onItemClick }: PropertyListingsProps) => {
  const [expandedListing, setExpandedListing] = useState<string | null>(null);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const portfolioListings: PortfolioListing[] = [];

  const filteredListings = portfolioListings;

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
    <section className="py-16 md:py-24 lg:py-32 transparent-section">
      <div 
        className="container mx-auto max-w-7xl px-4 md:px-8 relative z-20"
        style={{ transform: `translateY(${scrollY * 0.03}px)` }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
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
                onClick={() => onItemClick(filteredListings, index, 'property-listings')}
              >
                {/* Image Collage - Fixed Height */}
                <div className="relative flex-shrink-0">
                  <div className="grid grid-cols-3 gap-1 aspect-[16/10]">
                    {/* Main large image */}
                    <div className="col-span-2 row-span-2 overflow-hidden">
                      <img
                        src={listing.images[0]}
                        alt={`${listing.title} main`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    
                    {/* Smaller images */}
                    {listing.images.slice(1, 5).map((image, imgIndex) => (
                      <div key={imgIndex} className="overflow-hidden">
                        <img
                          src={image}
                          alt={`${listing.title} ${imgIndex + 2}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    ))}
                    
                    {/* Expand overlay on last image if more images */}
                    {listing.images.length > 5 && (
                      <div className="relative overflow-hidden">
                        <img
                          src={listing.images[5] || listing.images[1]}
                          alt={`${listing.title} more`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                          <span className="text-white font-medium text-xs md:text-sm">
                            +{listing.images.length - 5}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content - Consistent Height */}
                <div className="p-4 md:p-6 flex-1 flex flex-col bg-gray-900/60 backdrop-blur-sm border-t border-white/10">
                  {/* Header Info - Fixed Space */}
                  <div className="mb-3 md:mb-4">
                    <div className="flex items-center gap-2 text-xs md:text-sm text-white/60 mb-2">
                      <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                      {listing.date}
                    </div>
                    
                    <h3 className="text-lg md:text-xl font-medium text-white mb-2 line-clamp-2">
                      {listing.title}
                    </h3>
                    
                    <p className="text-white/70 text-xs md:text-sm mb-2 md:mb-3">
                      {listing.location}
                    </p>
                    
                    <p className="text-white/60 text-xs md:text-sm leading-relaxed line-clamp-3">
                      {listing.description}
                    </p>
                  </div>

                  {/* Expandable Content */}
                  <div className="flex-1">
                    <div className="space-y-2 md:space-y-3 mb-3 md:mb-4">
                      <div>
                        <h4 className="text-white/80 text-xs font-medium mb-1">Shoot Details:</h4>
                        <p className="text-white/60 text-xs leading-relaxed line-clamp-2">
                          {expandedListing === listing.id 
                            ? listing.shootDetails 
                            : listing.shootDetails.slice(0, 60) + (listing.shootDetails.length > 60 ? '...' : '')
                          }
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="text-white/80 text-xs font-medium mb-1">Client Requirements:</h4>
                        <p className="text-white/60 text-xs leading-relaxed line-clamp-2">
                          {expandedListing === listing.id 
                            ? listing.clientNotes 
                            : listing.clientNotes.slice(0, 60) + (listing.clientNotes.length > 60 ? '...' : '')
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
                      className="text-accent-gold hover:text-accent-gold-light hover:bg-accent-gold/10 text-xs md:text-sm"
                    >
                      {expandedListing === listing.id ? 'Show Less' : 'Show More'}
                      <ArrowRight className={`w-3 h-3 md:w-4 md:h-4 ml-1 md:ml-2 transition-transform ${
                        expandedListing === listing.id ? 'rotate-90' : ''
                      }`} />
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

export default PropertyListings;
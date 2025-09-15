import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, ExternalLink } from "lucide-react";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import property6 from "@/assets/property-6.jpg";

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

  const portfolioListings: PortfolioListing[] = [
    {
      id: '1',
      title: 'Mediterranean Villa Estate',
      location: 'Marbella, Spain',
      clientType: 'luxury',
      images: [portfolio1, property1, property2, property3, property4, property5],
      packageType: 'photo-video',
      date: '2024',
      description: 'Stunning coastal villa with panoramic sea views',
      clientNotes: 'Client requested golden hour shots and emphasis on outdoor living spaces. Premium marketing package for international buyers.',
      shootDetails: '2-day shoot including drone footage, interior/exterior photography, and lifestyle shots'
    },
    {
      id: '2',
      title: 'Modern Penthouse Collection',
      location: 'Puerto Banus',
      clientType: 'luxury',
      images: [portfolio2, property6, property1, property3, property4],
      packageType: 'video',
      date: '2024',
      description: 'Cinematic tour of luxury penthouse apartment',
      clientNotes: 'High-end client targeting luxury market. Requested cinematic walkthrough with professional narration.',
      shootDetails: 'Single-day video production with 4K drone shots and interior cinematography'
    },
    {
      id: '3',
      title: 'Contemporary Family Home',
      location: 'Estepona',
      clientType: 'residential',
      images: [portfolio3, property2, property5, property6, property1, property4],
      packageType: 'photo',
      date: '2024',
      description: 'Modern interior design photography',
      clientNotes: 'Family-focused marketing targeting local buyers. Emphasis on functionality and comfort.',
      shootDetails: 'Half-day interior photography session with natural lighting'
    },
    {
      id: '4',
      title: 'Vacation Rental Paradise',
      location: 'Nueva Andalucia',
      clientType: 'airbnb',
      images: [property1, property3, property5, portfolio1, property2],
      packageType: 'photo-video',
      date: '2024',
      description: 'Beautiful garden and outdoor living spaces',
      clientNotes: 'Airbnb property requiring lifestyle shots for booking platform. Focus on amenities and ambiance.',
      shootDetails: 'Full-day shoot with guest experience documentation and amenity highlights'
    },
    {
      id: '5',
      title: 'Commercial Office Complex',
      location: 'Malaga Center',
      clientType: 'commercial',
      images: [property2, portfolio2, property4, property6],
      packageType: 'photo-video',
      date: '2024',
      description: 'Professional commercial property showcase',
      clientNotes: 'Corporate client requiring professional imagery for leasing brochures and website.',
      shootDetails: 'Business hours shoot capturing workspace functionality and professional atmosphere'
    },
    {
      id: '6',
      title: 'Luxury Spa Retreat',
      location: 'La Zagaleta',
      clientType: 'luxury',
      images: [property3, property5, portfolio1, property1, property6, property2],
      packageType: 'photo',
      date: '2024',
      description: 'High-end bathroom and wellness spaces',
      clientNotes: 'Ultra-luxury property requiring magazine-quality imagery for international marketing.',
      shootDetails: 'Multi-day architectural photography focusing on luxury finishes and spa amenities'
    }
  ];

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
                          <span className="text-white font-medium">
                            +{listing.images.length - 5}
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

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
                      listing.packageType === 'photo-video' ? 'bg-red-500/80' :
                      listing.packageType === 'video' ? 'bg-red-600/80' :
                      'bg-blue-500/80'
                    }`}>
                      {listing.packageType === 'photo-video' ? 'Photo + Video' :
                       listing.packageType === 'video' ? 'Video Package' : 'Photo Package'}
                    </Badge>
                  </div>
                </div>

                {/* Content - Consistent Height */}
                <div className="p-6 flex-1 flex flex-col bg-black/40 backdrop-blur-sm border-t border-white/10">
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
                        <h4 className="text-white/80 text-xs font-medium mb-1">Shoot Details:</h4>
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
                      View Gallery
                      <ExternalLink className="w-4 h-4 ml-2" />
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
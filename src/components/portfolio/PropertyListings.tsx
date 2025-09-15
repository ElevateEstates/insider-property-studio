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
import maisonAmani1 from "@/assets/maison-amani-1.jpg";
import maisonAmani2 from "@/assets/maison-amani-2.jpg";
import maisonAmani3 from "@/assets/maison-amani-3.jpg";
import maisonAmani4 from "@/assets/maison-amani-4.jpg";
import maisonAmani5 from "@/assets/maison-amani-5.jpg";
import maisonAmani6 from "@/assets/maison-amani-6.jpg";
import maisonAmani7 from "@/assets/maison-amani-7.jpg";
import maisonAmani8 from "@/assets/maison-amani-8.jpg";
import maisonAmani9 from "@/assets/maison-amani-9.jpg";
import maisonAmani10 from "@/assets/maison-amani-10.jpg";
import maisonAmani11 from "@/assets/maison-amani-11.jpg";
import maisonAmani12 from "@/assets/maison-amani-12.jpg";
import maisonAmani13 from "@/assets/maison-amani-13.jpg";
import maisonAmani14 from "@/assets/maison-amani-14.jpg";
import maisonAmani15 from "@/assets/maison-amani-15.jpg";
import maisonAmani16 from "@/assets/maison-amani-16.jpg";
import maisonAmani17 from "@/assets/maison-amani-17.jpg";
import maisonAmani18 from "@/assets/maison-amani-18.jpg";
import maisonAmani19 from "@/assets/maison-amani-19.jpg";
import maisonAmani20 from "@/assets/maison-amani-20.jpg";
import maisonAmani21 from "@/assets/maison-amani-21.jpg";
import maisonAmani22 from "@/assets/maison-amani-22.jpg";
import maisonAmani23 from "@/assets/maison-amani-23.jpg";
import maisonAmani24 from "@/assets/maison-amani-24.jpg";
import maisonAmani25 from "@/assets/maison-amani-25.jpg";
import maisonAmani26 from "@/assets/maison-amani-26.jpg";
import maisonAmani27 from "@/assets/maison-amani-27.jpg";
import maisonAmani28 from "@/assets/maison-amani-28.jpg";
import maisonAmani29 from "@/assets/maison-amani-29.jpg";

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
      title: 'Maison Amani - Luxury 3-Bedroom Residence',
      location: 'Las Lomas del Marbella Club, Golden Mile',
      clientType: 'luxury',
      images: [maisonAmani1, maisonAmani2, maisonAmani3, maisonAmani4, maisonAmani5, maisonAmani6, maisonAmani7, maisonAmani8, maisonAmani9, maisonAmani10, maisonAmani11, maisonAmani13, maisonAmani14, maisonAmani15, maisonAmani16, maisonAmani17, maisonAmani18, maisonAmani19, maisonAmani20, maisonAmani21, maisonAmani22, maisonAmani23, maisonAmani24, maisonAmani25, maisonAmani26, maisonAmani27, maisonAmani28, maisonAmani29],
      packageType: 'photo-video',
      date: '2024',
      description: 'Newly renovated Japandi-style residence with breathtaking sea, city & mountain views. €1,350,000',
      clientNotes: 'Create standout before and after photos of this development to showcase its beauty and transformation.',
      shootDetails: 'High quality before and after photos of the development, drone photos of the urbanisation, some detail shots of amenities and a short reel for social media. Limited by tight budget and short shoot time.'
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
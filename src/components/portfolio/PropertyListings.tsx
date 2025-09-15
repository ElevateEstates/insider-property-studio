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

  const portfolioListings: PortfolioListing[] = [
    {
      id: '1',
      title: 'Maison Amani - Luxury 3-Bedroom Residence',
      location: 'Las Lomas del Marbella Club, Golden Mile',
      clientType: 'luxury',
      images: [img022, img023, img024, img025, img026, img027, img028, img029, img030, img031, img032, img034, img035, img036, img037, img038, img039, img040, img041, img042, img043, img044, img045, img046, img047, img048, img049, img050],
      packageType: 'photo-video',
      date: '2025',
      description: 'Newly renovated Japandi-style residence with breathtaking sea, city & mountain views. €1,350,000',
      clientNotes: 'Create standout before and after photos of this development to showcase its beauty and transformation.',
      shootDetails: 'High quality before and after photos of the development, drone photos of the urbanisation, some detail shots of amenities and a short reel for social media. Limited by tight budget and short shoot time.'
    },
    {
      id: '2',
      title: 'Modern Middle-Floor 2-Bedroom Apartment',
      location: 'Costa del Sol',
      clientType: 'airbnb',
      images: [
        img013, // Aerial development view
        img014, // Living room wide angle
        img015, // Living room different angle
        img051, // Living room with terrace access
        img055, // Living room detail with red cushions
        img017, // Kitchen island view
        img018, // Kitchen detail with appliances
        img019, // Kitchen with integrated fridge
        img020, // Kitchen full galley view
        img054, // Kitchen sink detail
        img016, // Dining area with round table
        img056, // Dining table setup with wine
        img052, // Terrace dining with sea view
        img053, // Terrace lounge with coastal view
        img060, // Master bedroom with grey headboard
        img057, // Second bedroom with garden view
        img061, // Master bedroom with wardrobe view
        img058, // Bathroom with floating vanity
        img059, // En-suite with glass shower
        img062, // Master bathroom with bathtub
        img021  // Additional interior view
      ],
      packageType: 'photo',
      date: '2025',
      description: 'Contemporary open-plan apartment with stunning mountain views, modern kitchen with integrated appliances, and spacious terrace access',
      clientNotes: '45 photo package with 5 drone shots for Airbnb listing.',
      shootDetails: 'High quality wide angle HDR photos and some detail shots for rental listing.'
    },
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
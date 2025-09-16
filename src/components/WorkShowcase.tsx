import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Camera, Video, MapPin, Bed, Bath } from "lucide-react";
import img001 from "@/assets/img-001.jpg";
import img002 from "@/assets/img-002.jpg";
import img003 from "@/assets/img-003.jpg";
import img004 from "@/assets/img-004.jpg";
import img005 from "@/assets/img-005.jpg";
import img006 from "@/assets/img-006.jpg";
import img007 from "@/assets/img-007.jpg";
import img008 from "@/assets/img-008.jpg";
import img009 from "@/assets/img-009.jpg";
import img010 from "@/assets/img-010.jpg";
import img011 from "@/assets/img-011.jpg";
import img012 from "@/assets/img-012.jpg";

const workItems = [
  {
    id: 1,
    title: "Luxury Villa Photography",
    description: "Professional interior and exterior photography showcasing modern Mediterranean architecture",
    image: img001,
    type: "Photography",
    icon: Camera,
    badge: "Featured Work"
  },
  {
    id: 2,
    title: "Aerial Cinematic Tour",
    description: "Stunning drone footage and video walkthrough highlighting ocean views and luxury amenities",
    image: img002,
    type: "Video Production",
    icon: Video,
    badge: "Video Tour"
  },
  {
    id: 3,
    title: "Staged Interior Design",
    description: "Professional staging and photography that resulted in 3x more viewing requests",
    image: img003,
    type: "Staging + Photo",
    icon: Camera,
    badge: "Success Story"
  }
];

const propertyListings = [
  {
    id: 1,
    title: "Modern Mediterranean Villa",
    location: "Marbella, Costa del Sol",
    status: "Sold",
    beds: 5,
    baths: 4,
    image: img004,
    badge: "Video + Photos"
  },
  {
    id: 2,
    title: "Luxury Sea View Apartment",
    location: "Puerto Banús, Marbella",
    status: "Sold",
    beds: 3,
    baths: 2,
    image: img005,
    badge: "Drone Tour"
  },
  {
    id: 3,
    title: "Penthouse with Terrace",
    location: "Estepona, Costa del Sol",
    status: "Sold",
    beds: 4,
    baths: 3,
    image: img006,
    badge: "Staging + Video"
  },
  {
    id: 4,
    title: "Traditional Spanish Villa",
    location: "Benahavís, Málaga",
    status: "Sold",
    beds: 4,
    baths: 3,
    image: img007,
    badge: "Photography"
  },
  {
    id: 5,
    title: "Beachfront Apartment",
    location: "Fuengirola, Costa del Sol",
    status: "Sold",
    beds: 2,
    baths: 2,
    image: img008,
    badge: "Virtual Tour"
  },
  {
    id: 6,
    title: "Golf Course Villa",
    location: "Nueva Andalucía, Marbella",
    status: "Sold",
    beds: 4,
    baths: 4,
    image: img009,
    badge: "Cinematic Video"
  },
  {
    id: 7,
    title: "Renovated Finca",
    location: "Countryside, Málaga",
    status: "Sold",
    beds: 6,
    baths: 4,
    image: img010,
    badge: "Before/After"
  },
  {
    id: 8,
    title: "Smart Home Villa",
    location: "Mijas, Costa del Sol",
    status: "Sold",
    beds: 5,
    baths: 5,
    image: img011,
    badge: "Tech Showcase"
  },
  {
    id: 9,
    title: "Charming Townhouse",
    location: "Casares, Costa del Sol",
    status: "Sold",
    beds: 3,
    baths: 2,
    image: img012,
    badge: "Lifestyle Video"
  }
];

export const WorkShowcase = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-up">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            Our Portfolio
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Showcasing <span className="text-gradient-gold">Excellence</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how our professional content and marketing strategies deliver results
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-7xl mx-auto mb-12 md:mb-16">
          {workItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card 
                key={item.id}
                className="card-luxury overflow-hidden border-0 group"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Play Button for Videos */}
                  {item.type.includes("Video") && (
                    <Button 
                      size="lg"
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full w-16 h-16 bg-white/20 backdrop-blur-md border border-white/30 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110"
                    >
                      <Play className="w-6 h-6 text-white" />
                    </Button>
                  )}
                  
                  {/* Badge */}
                  <Badge 
                    variant="secondary" 
                    className="absolute top-4 left-4 glass-effect text-white border-white/30"
                  >
                    {item.badge}
                  </Badge>
                </div>
                
                {/* Content */}
                <div className="p-4 md:p-6">
                  <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                    <div className="w-8 h-8 md:w-10 md:h-10 bg-accent-gold/10 rounded-xl flex items-center justify-center">
                      <Icon className="w-4 h-4 md:w-5 md:h-5 text-accent-gold" />
                    </div>
                    <span className="text-xs md:text-sm font-medium text-accent-gold">
                      {item.type}
                    </span>
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 md:mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
        
        {/* Property Listings Section */}
        <div className="text-center mb-12 animate-fade-up">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            Successfully Sold Properties
          </Badge>
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Properties <span className="text-gradient-gold">We've Marketed</span>
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional photo and video content that helped these properties sell faster
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 max-w-7xl mx-auto">
          {propertyListings.map((property, index) => (
            <Card 
              key={property.id}
              className="card-luxury overflow-hidden border-0 group"
              style={{ animationDelay: `${(index + 3) * 150}ms` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={property.image}
                  alt={property.title}
                  className="w-full h-48 sm:h-56 md:h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Badge */}
                <Badge 
                  variant="secondary" 
                  className="absolute top-4 left-4 glass-effect text-white border-white/30"
                >
                  {property.badge}
                </Badge>
                
                {/* Status */}
                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1">
                  <span className="text-sm font-medium text-green-600">{property.status}</span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4 md:p-6">
                <div className="flex items-center gap-1 md:gap-2 mb-2 md:mb-3">
                  <MapPin className="w-3 h-3 md:w-4 md:h-4 text-accent-gold" />
                  <span className="text-xs md:text-sm text-muted-foreground">
                    {property.location}
                  </span>
                </div>
                
                <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 md:mb-3">
                  {property.title}
                </h3>
                
                <div className="flex items-center gap-3 md:gap-4 text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Bed className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="text-xs md:text-sm">{property.beds} beds</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Bath className="w-3 h-3 md:w-4 md:h-4" />
                    <span className="text-xs md:text-sm">{property.baths} baths</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
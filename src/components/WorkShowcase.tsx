import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Camera, Video } from "lucide-react";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";

const workItems = [
  {
    id: 1,
    title: "Luxury Villa Photography",
    description: "Professional interior and exterior photography showcasing modern Mediterranean architecture",
    image: portfolio1,
    type: "Photography",
    icon: Camera,
    badge: "Featured Work"
  },
  {
    id: 2,
    title: "Aerial Cinematic Tour",
    description: "Stunning drone footage and video walkthrough highlighting ocean views and luxury amenities",
    image: portfolio2,
    type: "Video Production",
    icon: Video,
    badge: "Video Tour"
  },
  {
    id: 3,
    title: "Staged Interior Design",
    description: "Professional staging and photography that resulted in 3x more viewing requests",
    image: portfolio3,
    type: "Staging + Photo",
    icon: Camera,
    badge: "Success Story"
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
        
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
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
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
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
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-accent-gold/10 rounded-xl flex items-center justify-center">
                      <Icon className="w-5 h-5 text-accent-gold" />
                    </div>
                    <span className="text-sm font-medium text-accent-gold">
                      {item.type}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Home, 
  Search, 
  Building2, 
  Store,
  ArrowRight 
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const clientTypes = [
  {
    id: "sellers",
    title: "Home Sellers",
    description: "Cinematic marketing that makes your property stand out and sell faster",
    icon: Home,
    color: "bg-gradient-to-br from-blue-500 to-blue-600",
    route: "/sellers"
  },
  {
    id: "buyers",
    title: "Home Buyers", 
    description: "Private previews, video walkthroughs, and trusted agent introductions",
    icon: Search,
    color: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    route: "/buyers"
  },
  {
    id: "agents",
    title: "Real Estate Agents",
    description: "We bring the attention and qualified buyers. You close. We share success",
    icon: Building2,
    color: "bg-gradient-to-br from-purple-500 to-purple-600", 
    route: "/agents"
  },
  {
    id: "businesses",
    title: "Small Businesses",
    description: "Professional content creation for your business marketing needs",
    icon: Store,
    color: "bg-gradient-to-br from-orange-500 to-orange-600",
    route: "/businesses"
  }
];

export const ClientTypeSelector = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-up">
          <Badge variant="outline" className="mb-4 px-4 py-2">
            Who Are You?
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Choose Your <span className="text-gradient-gold">Journey</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Tell us who you are so we can provide the most relevant experience for your needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {clientTypes.map((type, index) => {
            const Icon = type.icon;
            return (
              <Card 
                key={type.id}
                className="card-luxury p-6 cursor-pointer group border-0 overflow-hidden relative"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => navigate(type.route)}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 ${type.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-16 h-16 ${type.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {type.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {type.description}
                  </p>
                  
                  {/* CTA */}
                  <Button 
                    variant="ghost" 
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300"
                  >
                    Explore Benefits
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
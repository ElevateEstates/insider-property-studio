import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Camera, Video, Palette, Megaphone, Store, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-costa-del-sol.jpg";
import { Footer } from "@/components/Footer";

export default function Businesses() {
  const navigate = useNavigate();

  const services = [
    {
      icon: Camera,
      title: "Professional Photography",
      description: "High-quality product, service, and brand photography that elevates your business image"
    },
    {
      icon: Video,
      title: "Video Content Creation", 
      description: "Engaging promotional videos, testimonials, and brand stories that convert"
    },
    {
      icon: Palette,
      title: "Creative Direction",
      description: "Strategic visual storytelling that aligns with your brand and marketing goals"
    },
    {
      icon: Megaphone,
      title: "Marketing Materials",
      description: "Complete content packages for social media, websites, and advertising campaigns"
    }
  ];

  const businessTypes = [
    { type: "Restaurants & Cafes", icon: Store },
    { type: "Retail Stores", icon: Store },
    { type: "Professional Services", icon: Store },
    { type: "Hotels & Tourism", icon: Store },
    { type: "Fashion & Beauty", icon: Store },
    { type: "Tech Startups", icon: Zap }
  ];

  const packages = [
    {
      name: "Starter Package",
      price: "€299",
      features: [
        "Half-day photography session",
        "20 edited high-res images",
        "Social media ready formats",
        "Basic retouching included"
      ]
    },
    {
      name: "Professional Package", 
      price: "€599",
      features: [
        "Full-day content creation",
        "Photography + short videos", 
        "50 edited images + 3 videos",
        "Advanced editing & color grading",
        "Multiple format deliverables"
      ],
      popular: true
    },
    {
      name: "Premium Package",
      price: "€999", 
      features: [
        "Multi-day campaign creation",
        "Complete brand story videos",
        "Unlimited edited content",
        "Creative direction included",
        "Marketing strategy consultation"
      ]
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="absolute top-6 left-6 z-20">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/")}
          className="glass-effect text-white border-white/30 hover:bg-white/20"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-900/90 to-orange-800/70"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto animate-fade-up">
            <Badge variant="secondary" className="mb-6 px-4 py-2 glass-effect text-white border-white/30">
              For Small Businesses
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Elevate Your Brand with
              <span className="text-gradient-gold block">Professional Content</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Stand out from the competition with high-quality photography and video content 
              that tells your brand story and drives customer engagement.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button className="glass-button">
                View Packages
              </Button>
              <Button variant="outline" className="glass-button">
                See Our Work
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 transparent-section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Content That <span className="text-gradient-gold">Converts</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Professional content creation services designed to elevate your business marketing
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card 
                  key={index}
                  className="card-luxury p-8 border-0"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Business Types */}
      <section className="py-20 transparent-section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Industries We <span className="text-gradient-gold">Serve</span>
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Specialized content creation for diverse business sectors
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
            {businessTypes.map((business, index) => {
              const Icon = business.icon;
              return (
                <div 
                  key={index}
                  className="text-center animate-fade-up glass-effect p-6 rounded-2xl"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon className="w-12 h-12 text-accent-gold mx-auto mb-4" />
                  <p className="text-white/90 font-medium">
                    {business.type}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section className="py-20 transparent-section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Choose Your <span className="text-gradient-gold">Package</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Flexible pricing options to suit businesses of all sizes
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, index) => (
              <Card 
                key={index}
                className={`card-luxury p-8 border-0 relative ${pkg.popular ? 'ring-2 ring-accent-gold' : ''}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {pkg.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-accent-gold text-primary">
                    Most Popular
                  </Badge>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    {pkg.name}
                  </h3>
                  <div className="text-4xl font-bold text-accent-gold mb-2">
                    {pkg.price}
                  </div>
                  <p className="text-muted-foreground">One-time payment</p>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, featIndex) => (
                    <li key={featIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-accent-gold rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full glass-button ${pkg.popular ? 'bg-white/30' : ''}`}
                >
                  Choose {pkg.name}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-b from-primary to-primary-dark text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to <span className="text-gradient-gold">Transform</span> Your Business?
            </h2>
            <p className="text-xl text-white/80 mb-8">
              Let's create content that showcases your business in the best light and drives real results
            </p>
            <Button className="btn-hero" onClick={() => navigate("/#contact")}>
              Start Your Project
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Eye, Video, Users, Lock, MapPin, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { useEffect, useState } from "react";
import heroImage from "@/assets/hero-costa-del-sol.jpg";

export default function Buyers() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const benefits = [
    {
      icon: Eye,
      title: "Private Previews",
      description: "See properties before they go public and get first access to exclusive listings"
    },
    {
      icon: Video,
      title: "Virtual Walkthroughs", 
      description: "High-quality video tours that save you time and help you shortlist effectively"
    },
    {
      icon: Users,
      title: "Trusted Agents",
      description: "Introductions to vetted local agents who specialize in your target area and price range"
    },
    {
      icon: Lock,
      title: "Insider Access",
      description: "Access to off-market properties and private seller networks before competition"
    }
  ];

  const process = [
    {
      step: "1",
      title: "Tell Us Your Needs",
      description: "Share your criteria, budget, and timeline with our team"
    },
    {
      step: "2", 
      title: "Get Exclusive Access",
      description: "Receive private previews and early notifications of matching properties"
    },
    {
      step: "3",
      title: "Expert Guidance",
      description: "Work with our trusted agents for viewings, negotiations, and closing"
    }
  ];

  return (
    <div className="min-h-screen relative">
      <ParallaxBackground speed={0.4} />
      
      {/* Navigation */}
      <nav className="absolute top-6 left-6 z-50">
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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden transparent-section">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-5"
          style={{ 
            backgroundImage: `url(${heroImage})`,
            transform: `translateY(${scrollY * 0.5}px)`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-emerald-800/70"></div>
        </div>
        
        <div 
          className="relative z-30 container mx-auto px-6 text-center section-content"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          <div className="max-w-4xl mx-auto animate-fade-up">
            <Badge variant="secondary" className="mb-6 px-4 py-2 glass-effect text-white border-white/30">
              For Home Buyers
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Find Your Dream Home
              <span className="text-gradient-gold block">Before Anyone Else</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Get exclusive access to Costa del Sol properties before they hit the market. 
              Private previews, video walkthroughs, and trusted agent introductions. No cost to you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button className="btn-hero">
                Get Insider Access
              </Button>
              <Button variant="outline" className="btn-hero-outline">
                Browse Properties
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-secondary/30 content-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Your <span className="text-gradient-gold">Competitive Edge</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access the hidden market where the best properties are found and sold
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card 
                  key={index}
                  className="card-luxury p-8 border-0"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {benefit.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-primary text-white transparent-section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How It <span className="text-gradient-gold">Works</span>
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Simple process to get you exclusive access to the best properties
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {process.map((item, index) => (
              <div 
                key={index}
                className="text-center animate-fade-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="w-16 h-16 bg-accent-gold rounded-full flex items-center justify-center text-2xl font-bold text-primary mx-auto mb-6">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-4">
                  {item.title}
                </h3>
                <p className="text-white/80 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Reality Section */}
      <section className="py-20 bg-secondary/30 content-background">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
                In today's market, <span className="text-gradient-gold">speed and positioning</span> are everything.
              </h2>
              <p className="text-xl text-muted-foreground">
                The properties that sell fastest don't just "get lucky" — they're discovered early.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  The Hidden Market
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Most buyers only ever see what's left on the public listings. But the best homes — 
                  the fastest-selling, most exclusive, and best-located — often never even make it online.
                </p>
                
                <h3 className="text-2xl font-semibold text-foreground mb-4">
                  Your Competitive Edge
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  We give you access to the hidden market — early introductions, private deals, 
                  and tailored property strategies so you can compete where others can't.
                </p>
              </div>
              
              <Card className="card-luxury p-8 border-0">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-accent-gold mx-auto mb-4" />
                  <h4 className="text-xl font-semibold text-foreground mb-4">
                    Costa del Sol Insider
                  </h4>
                  <p className="text-muted-foreground mb-6">
                    Get exclusive access to properties in Marbella, Estepona, Fuengirola, 
                    and surrounding areas before they go public.
                  </p>
                  <Button className="btn-hero w-full">
                    Join Insider Network
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-gradient-to-b from-primary to-primary-dark text-white transparent-section">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <blockquote className="text-2xl md:text-3xl font-light mb-8 leading-relaxed">
              "We saw the villa before it went public and moved fast. 
              Smoothest experience we've had buying property in Spain."
            </blockquote>
            
            <div className="text-accent-gold font-semibold">
              — James & Sarah Mitchell, Marbella
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary/30 content-background">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Find <span className="text-gradient-gold">Your Dream Home?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join our exclusive buyer network and get first access to the best properties on Costa del Sol
            </p>
            <Button className="btn-hero" onClick={() => navigate("/#contact")}>
              Get Exclusive Access
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
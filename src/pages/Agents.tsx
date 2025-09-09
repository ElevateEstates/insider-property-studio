import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Users, Camera, TrendingUp, Handshake, Target, Award } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { useEffect, useState } from "react";
import heroImage from "@/assets/hero-costa-del-sol.jpg";

export default function Agents() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const partnerships = [
    {
      icon: Camera,
      title: "Professional Content Creation",
      description: "High-quality photos and videos that make your listings stand out and attract serious buyers"
    },
    {
      icon: Users,
      title: "Qualified Buyer Network", 
      description: "Access to our network of pre-qualified buyers actively searching for properties"
    },
    {
      icon: TrendingUp,
      title: "Marketing Amplification",
      description: "Strategic promotion through private networks and targeted campaigns"
    },
    {
      icon: Target,
      title: "Lead Generation",
      description: "Consistent flow of qualified leads and buyer introductions for your listings"
    }
  ];

  const benefits = [
    { title: "No Upfront Costs", description: "We invest in the marketing, you focus on closing" },
    { title: "Shared Success", description: "Revenue sharing model - we succeed when you succeed" },
    { title: "Professional Materials", description: "High-end marketing materials for all your listings" },
    { title: "Buyer Network Access", description: "Connect with our qualified buyer database" }
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
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 to-purple-800/70"></div>
        </div>
        
        <div 
          className="relative z-30 container mx-auto px-6 text-center section-content"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          <div className="max-w-4xl mx-auto animate-fade-up">
            <Badge variant="secondary" className="mb-6 px-4 py-2 glass-effect text-white border-white/30">
              For Real Estate Agents
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Partnership That
              <span className="text-gradient-gold block">Drives Results</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              We bring the attention and qualified buyers. You close the deals. 
              Let's share success with zero upfront costs and professional marketing materials.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button className="btn-hero">
                Partner With Us
              </Button>
              <Button variant="outline" className="btn-hero-outline">
                View Success Stories
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Benefits */}
      <section className="py-20 bg-secondary/30 content-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Why <span className="text-gradient-gold">Partner</span> With Us?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We handle the marketing and lead generation, you handle what you do best - closing deals
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {partnerships.map((partnership, index) => {
              const Icon = partnership.icon;
              return (
                <Card 
                  key={index}
                  className="card-luxury p-8 border-0"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-foreground mb-4">
                    {partnership.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {partnership.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-primary text-white transparent-section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How Our <span className="text-gradient-gold">Partnership</span> Works
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              A simple, proven process that benefits both parties
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center animate-fade-up">
              <div className="w-16 h-16 bg-accent-gold rounded-full flex items-center justify-center text-2xl font-bold text-primary mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold mb-4">
                List Your Properties
              </h3>
              <p className="text-white/80 leading-relaxed">
                Share your listings with us and we'll create professional marketing materials
              </p>
            </div>
            
            <div className="text-center animate-fade-up" style={{ animationDelay: "200ms" }}>
              <div className="w-16 h-16 bg-accent-gold rounded-full flex items-center justify-center text-2xl font-bold text-primary mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold mb-4">
                We Market & Generate Leads
              </h3>
              <p className="text-white/80 leading-relaxed">
                Professional content creation and targeted marketing to qualified buyer networks
              </p>
            </div>
            
            <div className="text-center animate-fade-up" style={{ animationDelay: "400ms" }}>
              <div className="w-16 h-16 bg-accent-gold rounded-full flex items-center justify-center text-2xl font-bold text-primary mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold mb-4">
                You Close & We Share Success
              </h3>
              <p className="text-white/80 leading-relaxed">
                Handle the qualified leads we generate and close deals with shared commission structure
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-secondary/30 content-background">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Partnership <span className="text-gradient-gold">Benefits</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => (
              <Card 
                key={index}
                className="card-luxury p-6 text-center border-0"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Handshake className="w-12 h-12 text-accent-gold mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {benefit.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-gradient-to-b from-primary to-primary-dark text-white transparent-section">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <Award className="w-16 h-16 text-accent-gold mx-auto mb-8" />
            
            <blockquote className="text-2xl md:text-3xl font-light mb-8 leading-relaxed">
              "Zero upfront cost, qualified buyers, and beautiful media. 
              Our partnership increased our listing success rate by 40%. It's a complete win-win."
            </blockquote>
            
            <div className="text-accent-gold font-semibold">
              — Carmen Ruiz, Top Agent, Fuengirola
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary/30 content-background">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to <span className="text-gradient-gold">Partner</span> With Us?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join our network of successful agents and start benefiting from our marketing expertise
            </p>
            <Button className="btn-hero" onClick={() => navigate("/#contact")}>
              Start Partnership
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
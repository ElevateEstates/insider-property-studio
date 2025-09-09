import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Camera, Video, TrendingUp, Users, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { useEffect, useState } from "react";
import heroImage from "@/assets/hero-costa-del-sol.jpg";

export default function Sellers() {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: Camera,
      title: "Professional Photography",
      description: "High-end interior and exterior photography that showcases your property's best features"
    },
    {
      icon: Video,
      title: "Cinematic Video Tours", 
      description: "Aerial drone footage and walkthrough videos that captivate potential buyers"
    },
    {
      icon: TrendingUp,
      title: "Strategic Marketing",
      description: "Targeted campaigns that reach the right buyers through private networks and public channels"
    },
    {
      icon: Users,
      title: "Agent Network",
      description: "Access to our curated network of top-performing local agents"
    }
  ];

  const stats = [
    { number: "3x", label: "More Viewing Requests" },
    { number: "15%", label: "Higher Sale Price" },
    { number: "21", label: "Days Average to Sale" },
    { number: "98%", label: "Client Satisfaction" }
  ];

  return (
    <div className="min-h-screen relative">
      <ParallaxBackground speed={0.8} />
      
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
            transform: `translateY(${scrollY * 0.9}px)`
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary-dark/70"></div>
        </div>
        
        <div 
          className="relative z-30 container mx-auto px-6 text-center section-content"
          style={{ transform: `translateY(${scrollY * 0.2}px)` }}
        >
          <div className="max-w-4xl mx-auto animate-fade-up">
            <Badge variant="secondary" className="mb-6 px-4 py-2 glass-effect text-white border-white/30">
              For Home Sellers
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Sell Faster with
              <span className="text-gradient-gold block">Cinematic Marketing</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your property into a compelling story that attracts serious buyers 
              and commands premium prices through professional content and strategic marketing.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button className="glass-button">
                Get My Marketing Plan
              </Button>
              <Button variant="outline" className="glass-button">
                View Portfolio
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 transparent-section">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-up glass-card p-6 rounded-2xl" style={{ animationDelay: `${index * 100}ms` }}>
                <div className="text-4xl md:text-5xl font-bold text-accent-gold mb-2">
                  {stat.number}
                </div>
                <div className="text-white/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 transparent-section">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Complete <span className="text-gradient-gold">Marketing Solution</span>
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Everything you need to showcase your property and attract qualified buyers
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index}
                  className="glass-card p-8 border-0"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-accent-gold to-accent-gold-dark rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 bg-gradient-to-b from-primary to-primary-dark text-white transparent-section">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 text-accent-gold fill-current" />
              ))}
            </div>
            
            <blockquote className="text-2xl md:text-3xl font-light mb-8 leading-relaxed">
              "The video tour tripled our viewing requests in a week. Sold above asking price 
              with multiple offers. Best investment we made in the selling process."
            </blockquote>
            
            <div className="text-accent-gold font-semibold">
              — Maria & Carlos Rodriguez, Estepona
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 transparent-section">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto glass-card p-12 rounded-3xl">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to <span className="text-gradient-gold">Sell Faster?</span>
            </h2>
            <p className="text-xl text-white/70 mb-8">
              Get your free marketing consultation and see how we can help you achieve a premium sale
            </p>
            <Button className="glass-button" onClick={() => navigate("/#contact")}>
              Get Free Consultation
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
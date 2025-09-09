import { Navigation } from "@/components/Navigation";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Camera, Video, Award, Users } from "lucide-react";
import { Link } from "react-router-dom";
import geirPortrait from "@/assets/eddie-portrait.jpg";

const About = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      icon: Camera,
      title: "Real Estate Photography",
      description: "Professional photography that showcases properties in their best light, capturing every detail that matters to potential buyers."
    },
    {
      icon: Video,
      title: "Luxury Video Tours",
      description: "Cinematic video tours that create emotional connections with properties, featuring drone footage and professional editing."
    },
    {
      icon: Award,
      title: "Marketing Content",
      description: "Complete marketing packages including social media content, virtual staging, and branded materials for real estate professionals."
    },
    {
      icon: Users,
      title: "Business Photography",
      description: "Professional headshots and business photography for real estate agents, personal trainers, and Costa del Sol businesses."
    }
  ];

  const stats = [
    { number: "500+", label: "Properties Captured" },
    { number: "50+", label: "Happy Clients" },
    { number: "5M+", label: "Views Generated" },
    { number: "95%", label: "Client Retention" }
  ];

  return (
    <div className="min-h-screen text-white relative">
      <ParallaxBackground speed={8} />
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center transparent-section">
        <div 
          className="container mx-auto max-w-6xl px-4 md:px-8 relative z-20 py-32"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
                About Geir Costa
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-light">
                Capturing the
                <span className="block text-gradient-gold">Essence</span>
                of Luxury Living
              </h1>
              <p className="text-xl text-white/80 leading-relaxed">
                With over 5 years of experience in luxury real estate media, we specialize in creating 
                visual content that doesn't just showcase properties—it sells dreams and lifestyles.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/portfolio">
                  <Button className="bg-transparent backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300">
                    View Portfolio
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="bg-transparent backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300">
                    Get In Touch
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden">
                <img 
                  src={geirPortrait} 
                  alt="Geir Costa - Professional Real Estate Photographer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6">
                <div className="text-2xl font-light text-white">5+ Years</div>
                <div className="text-sm text-white/70">Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 content-background">
        <div 
          className="container mx-auto max-w-6xl px-4 md:px-8"
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-transparent backdrop-blur-md border border-white/20 rounded-xl p-6">
                <div className="text-3xl md:text-4xl lg:text-5xl font-light text-accent-gold mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-32 transparent-section">
        <div 
          className="container mx-auto max-w-6xl px-4 md:px-8 relative z-20"
          style={{ transform: `translateY(${scrollY * 0.03}px)` }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-light mb-8 text-white">
              Our Expertise
            </h2>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              We combine technical excellence with creative vision to deliver 
              media that elevates your real estate business.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="p-8 bg-transparent backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 bg-accent-gold/20 rounded-xl flex items-center justify-center">
                    <service.icon className="w-6 h-6 text-accent-gold" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-medium text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 content-background">
        <div 
          className="container mx-auto max-w-4xl px-4 md:px-8"
          style={{ transform: `translateY(${scrollY * 0.02}px)` }}
        >
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-light mb-8">
              Our Philosophy
            </h2>
          </div>
          
          <div className="space-y-8 text-lg leading-relaxed text-muted-foreground">
            <p>
              At Geir Costa, we believe that every property has a unique story to tell. 
              Our mission is to capture not just the physical spaces, but the emotions 
              and lifestyle that each property represents.
            </p>
            
            <p>
              We understand that in today's competitive real estate market, exceptional 
              visual content isn't a luxury—it's essential. Our work helps agents sell 
              faster, buyers connect emotionally, and properties achieve their maximum value.
            </p>
            
            <p>
              From intimate residential spaces to grand luxury estates, we approach each 
              project with meticulous attention to detail, creative vision, and a deep 
              understanding of what makes properties irresistible to potential buyers.
            </p>
          </div>

          <div className="text-center mt-16">
              <Link to="/contact">
                <Button size="lg" className="bg-transparent backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:border-white/50 transition-all duration-300">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
import { Navigation } from "@/components/Navigation";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { useEffect, useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, ExternalLink, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import portfolio1 from "@/assets/portfolio-1.jpg";
import portfolio2 from "@/assets/portfolio-2.jpg";
import portfolio3 from "@/assets/portfolio-3.jpg";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";
import property4 from "@/assets/property-4.jpg";
import property5 from "@/assets/property-5.jpg";
import property6 from "@/assets/property-6.jpg";

interface PortfolioItem {
  id: string;
  type: 'photo' | 'video';
  title: string;
  location: string;
  category: 'residential' | 'commercial' | 'luxury';
  image: string;
  vimeoId?: string;
  date: string;
  description: string;
}

const Portfolio = () => {
  const [scrollY, setScrollY] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const portfolioItems: PortfolioItem[] = [
    {
      id: '1',
      type: 'photo',
      title: 'Mediterranean Villa',
      location: 'Marbella, Spain',
      category: 'luxury',
      image: portfolio1,
      date: '2024',
      description: 'Stunning coastal villa with panoramic sea views'
    },
    {
      id: '2',
      type: 'video',
      title: 'Modern Penthouse Tour',
      location: 'Puerto Banus',
      category: 'luxury',
      image: portfolio2,
      vimeoId: '123456789',
      date: '2024',
      description: 'Cinematic tour of luxury penthouse apartment'
    },
    {
      id: '3',
      type: 'photo',
      title: 'Contemporary Interior',
      location: 'Estepona',
      category: 'residential',
      image: portfolio3,
      date: '2024',
      description: 'Modern interior design photography'
    },
    {
      id: '4',
      type: 'photo',
      title: 'Garden Paradise',
      location: 'Nueva Andalucia',
      category: 'residential',
      image: property1,
      date: '2024',
      description: 'Beautiful garden and outdoor living spaces'
    },
    {
      id: '5',
      type: 'video',
      title: 'Commercial Space',
      location: 'Malaga Center',
      category: 'commercial',
      image: property2,
      vimeoId: '987654321',
      date: '2024',
      description: 'Professional commercial property showcase'
    },
    {
      id: '6',
      type: 'photo',
      title: 'Luxury Bathroom',
      location: 'La Zagaleta',
      category: 'luxury',
      image: property3,
      date: '2024',
      description: 'High-end bathroom interior photography'
    },
    {
      id: '7',
      type: 'photo',
      title: 'Terrace Views',
      location: 'Benahavis',
      category: 'residential',
      image: property4,
      date: '2024',
      description: 'Stunning terrace with mountain views'
    },
    {
      id: '8',
      type: 'video',
      title: 'Aerial Estate Tour',
      location: 'Sotogrande',
      category: 'luxury',
      image: property5,
      vimeoId: '456789123',
      date: '2024',
      description: 'Drone footage of luxury estate'
    },
    {
      id: '9',
      type: 'photo',
      title: 'Modern Kitchen',
      location: 'Fuengirola',
      category: 'residential',
      image: property6,
      date: '2024',
      description: 'Contemporary kitchen design photography'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Work' },
    { id: 'luxury', label: 'Luxury' },
    { id: 'residential', label: 'Residential' },
    { id: 'commercial', label: 'Commercial' }
  ];

  const filteredItems = selectedCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === selectedCategory);

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
  }, [filteredItems]);

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
          <div className="text-center space-y-8">
            <Badge className="bg-white/10 text-white border-white/20 backdrop-blur-sm">
              Our Portfolio
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light">
              Visual Stories That
              <span className="block text-gradient-gold">Sell Dreams</span>
            </h1>
            <p className="text-xl text-white/80 leading-relaxed max-w-3xl mx-auto">
              Every property has a unique story. Through our lens, we capture the essence 
              of luxury living and create compelling visual narratives that connect with buyers.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-16 content-background">
        <div className="container mx-auto max-w-6xl px-4 md:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id 
                  ? "btn-hero" 
                  : "btn-hero-outline"
                }
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-32 transparent-section">
        <div 
          className="container mx-auto max-w-7xl px-4 md:px-8 relative z-20"
          style={{ transform: `translateY(${scrollY * 0.03}px)` }}
        >
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <div
                key={item.id}
                ref={el => itemRefs.current[index] = el}
                className={`group transition-all duration-700 ${
                  visibleItems.includes(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <Card className="overflow-hidden bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    
                    {/* Video Overlay */}
                    {item.type === 'video' && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Play className="w-8 h-8 text-white ml-1" fill="white" />
                        </div>
                      </div>
                    )}

                    {/* Type Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className={`${
                        item.type === 'video' 
                          ? 'bg-red-500/80 text-white' 
                          : 'bg-blue-500/80 text-white'
                      } backdrop-blur-sm`}>
                        {item.type === 'video' ? 'Video' : 'Photo'}
                      </Badge>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-white/20 text-white backdrop-blur-sm capitalize">
                        {item.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-2 text-sm text-white/60 mb-2">
                      <Calendar className="w-4 h-4" />
                      {item.date}
                    </div>
                    <h3 className="text-xl font-medium text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/70 text-sm mb-3">
                      {item.location}
                    </p>
                    <p className="text-white/60 text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-accent-gold hover:text-accent-gold-light hover:bg-accent-gold/10"
                    >
                      View Details
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-32 content-background">
        <div 
          className="container mx-auto max-w-4xl px-4 md:px-8 text-center"
          style={{ transform: `translateY(${scrollY * 0.02}px)` }}
        >
          <h2 className="text-3xl md:text-5xl font-light mb-8">
            Ready to Create Your Visual Story?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Let's work together to create stunning visual content that showcases 
            your property and captures the attention of potential buyers.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/contact">
              <Button size="lg" className="btn-hero">
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg" className="btn-hero-outline">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
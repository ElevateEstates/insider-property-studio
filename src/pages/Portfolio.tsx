import { Navigation } from "@/components/Navigation";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PortfolioNavigation from "@/components/portfolio/PortfolioNavigation";
import PropertyListings from "@/components/portfolio/PropertyListings";
import PropertyVideos from "@/components/portfolio/PropertyVideos";
import LifestyleVideos from "@/components/portfolio/LifestyleVideos";
import LifestylePhotos from "@/components/portfolio/LifestylePhotos";

const Portfolio = () => {
  const [scrollY, setScrollY] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeView, setActiveView] = useState<'property-listings' | 'property-videos' | 'lifestyle-videos' | 'lifestyle-photos'>('property-listings');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  const categories = [
    { id: 'all', label: 'All Listings' },
    { id: 'luxury', label: 'Luxury' },
    { id: 'residential', label: 'Residential' },
    { id: 'airbnb', label: 'Airbnb' },
    { id: 'commercial', label: 'Commercial' }
  ];

  const renderActiveView = () => {
    switch (activeView) {
      case 'property-listings':
        return <PropertyListings selectedCategory={selectedCategory} scrollY={scrollY} />;
      case 'property-videos':
        return <PropertyVideos selectedCategory={selectedCategory} scrollY={scrollY} />;
      case 'lifestyle-videos':
        return <LifestyleVideos scrollY={scrollY} />;
      case 'lifestyle-photos':
        return <LifestylePhotos scrollY={scrollY} />;
      default:
        return <PropertyListings selectedCategory={selectedCategory} scrollY={scrollY} />;
    }
  };

  return (
    <div className="min-h-screen text-white relative">
      <ParallaxBackground speed={8} reduced={true} />
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

      {/* Portfolio Navigation */}
      <PortfolioNavigation 
        activeView={activeView} 
        onViewChange={setActiveView} 
      />

      {/* Category Filter - only show for property views */}
      {(activeView === 'property-listings' || activeView === 'property-videos') && (
        <section className="py-16 transparent-section">
          <div className="container mx-auto max-w-6xl px-4 md:px-8">
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className={selectedCategory === category.id 
                    ? "glass-button bg-white/20" 
                    : "glass-button"
                  }
                >
                  {category.label}
                </Button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Dynamic Content Based on Active View */}
      {renderActiveView()}

      {/* Call to Action */}
      <section className="py-32 transparent-section">
        <div 
          className="container mx-auto max-w-4xl px-4 md:px-8 text-center"
          style={{ transform: `translateY(${scrollY * 0.02}px)` }}
        >
          <div className="glass-card p-12 rounded-3xl">
            <h2 className="text-3xl md:text-5xl font-light mb-8 text-white">
              Ready to Create Your Visual Story?
            </h2>
            <p className="text-xl text-white/70 mb-12 max-w-2xl mx-auto">
              Let's work together to create stunning visual content that showcases 
              your property and captures the attention of potential buyers.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="glass-button">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="glass-button">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Portfolio;
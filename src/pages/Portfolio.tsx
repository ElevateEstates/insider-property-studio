import { Navigation } from "@/components/Navigation";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import PortfolioNavigation from "@/components/portfolio/PortfolioNavigation";
import PropertyListings from "@/components/portfolio/PropertyListings";
import PropertyVideos from "@/components/portfolio/PropertyVideos";
import LifestyleVideos from "@/components/portfolio/LifestyleVideos";
import LifestylePhotos from "@/components/portfolio/LifestylePhotos";
import PortfolioModal from "@/components/portfolio/PortfolioModal";

const Portfolio = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeView, setActiveView] = useState<'property-listings' | 'property-videos' | 'lifestyle-videos' | 'lifestyle-photos'>('property-listings');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalItems, setModalItems] = useState<any[]>([]);
  const [currentModalIndex, setCurrentModalIndex] = useState(0);
  const [modalType, setModalType] = useState<'property-listings' | 'property-videos' | 'lifestyle-videos' | 'lifestyle-photos'>('property-listings');

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemClick = (items: any[], index: number, type: typeof modalType) => {
    setModalItems(items);
    setCurrentModalIndex(index);
    setModalType(type);
    setModalOpen(true);
  };

  const renderModalContent = (item: any, index: number) => {
    switch (modalType) {
      case 'property-listings':
        return (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 h-full">
            {item.images?.map((image: string, imgIndex: number) => (
              <div key={imgIndex} className="aspect-square overflow-hidden rounded">
                <img
                  src={image}
                  alt={`${item.title} ${imgIndex + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        );
      case 'property-videos':
      case 'lifestyle-videos':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <iframe
              src={item.videoUrl}
              title={item.title}
              className="w-full aspect-video rounded"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        );
      case 'lifestyle-photos':
        return (
          <div className="w-full h-full flex items-center justify-center">
            <img
              src={item.src}
              alt={item.alt}
              className="max-w-full max-h-full object-contain rounded"
            />
          </div>
        );
      default:
        return null;
    }
  };

  const renderActiveView = () => {
    switch (activeView) {
      case 'property-listings':
        return <PropertyListings scrollY={scrollY} onItemClick={handleItemClick} />;
      case 'property-videos':
        return <PropertyVideos scrollY={scrollY} onItemClick={handleItemClick} />;
      case 'lifestyle-videos':
        return <LifestyleVideos scrollY={scrollY} onItemClick={handleItemClick} />;
      case 'lifestyle-photos':
        return <LifestylePhotos scrollY={scrollY} onItemClick={handleItemClick} />;
      default:
        return <PropertyListings scrollY={scrollY} onItemClick={handleItemClick} />;
    }
  };

  return (
    <div className="min-h-screen text-white relative">
      <ParallaxBackground speed={8} reduced={true} />
      <Navigation />

      {/* Portfolio Navigation */}
      <PortfolioNavigation 
        activeView={activeView} 
        onViewChange={setActiveView} 
      />

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

      {/* Portfolio Modal */}
      <PortfolioModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        items={modalItems}
        currentIndex={currentModalIndex}
        onNavigate={setCurrentModalIndex}
        type={modalType}
        renderContent={renderModalContent}
      />
    </div>
  );
};

export default Portfolio;
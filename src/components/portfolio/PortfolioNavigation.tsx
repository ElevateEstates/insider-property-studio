import { Button } from "@/components/ui/button";

interface PortfolioNavigationProps {
  activeView: 'property-listings' | 'property-videos' | 'lifestyle-videos' | 'lifestyle-photos';
  onViewChange: (view: 'property-listings' | 'property-videos' | 'lifestyle-videos' | 'lifestyle-photos') => void;
}

const PortfolioNavigation = ({ activeView, onViewChange }: PortfolioNavigationProps) => {
  const navigationItems = [
    { id: 'property-listings', label: 'Property Listings' },
    { id: 'property-videos', label: 'Property Videos' },
    { id: 'lifestyle-videos', label: 'Lifestyle Videos' },
    { id: 'lifestyle-photos', label: 'Lifestyle Photos' }
  ] as const;

  return (
    <section className="py-16 transparent-section">
      <div className="container mx-auto max-w-6xl px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {navigationItems.map((item) => (
            <Button
              key={item.id}
              variant={activeView === item.id ? "default" : "outline"}
              size="lg"
              onClick={() => onViewChange(item.id)}
              className={`h-20 text-lg font-medium transition-all duration-300 ${
                activeView === item.id 
                  ? "glass-button bg-white/20 scale-105" 
                  : "glass-button hover:scale-105"
              }`}
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PortfolioNavigation;
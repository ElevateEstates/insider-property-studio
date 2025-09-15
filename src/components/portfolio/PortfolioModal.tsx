import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useRef, useEffect } from "react";

interface ModalItem {
  id: string;
  title: string;
  location: string;
  date: string;
  description: string;
  clientNotes: string;
  shootDetails: string;
  clientType?: 'luxury' | 'residential' | 'airbnb' | 'commercial';
  packageType?: string;
  category?: string;
  images?: string[];
  src?: string;
  videoUrl?: string;
}

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: ModalItem[];
  currentIndex: number;
  onNavigate: (index: number) => void;
  type: 'property-listings' | 'property-videos' | 'lifestyle-videos' | 'lifestyle-photos';
  renderContent: (item: ModalItem, index: number) => React.ReactNode;
}

const PortfolioModal = ({
  isOpen,
  onClose,
  items,
  currentIndex,
  onNavigate,
  type,
  renderContent,
}: PortfolioModalProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // Always call hooks at the same depth
  const currentItem = items[currentIndex] || null;
  
  const getImageArray = () => {
    if (!currentItem) return [];
    if (type === 'property-listings') {
      return currentItem.images || [];
    }
    if (type === 'lifestyle-photos') {
      return items.map((item: any) => item.src).filter(Boolean);
    }
    return [];
  };

  const images = getImageArray();
  const hasMultipleImages = images.length > 1;

  // Auto-scroll active thumbnail to center - always call this hook
  useEffect(() => {
    if (currentItem && thumbnailContainerRef.current && thumbnailRefs.current[selectedImageIndex]) {
      const container = thumbnailContainerRef.current;
      const thumbnail = thumbnailRefs.current[selectedImageIndex];
      
      if (thumbnail) {
        const containerRect = container.getBoundingClientRect();
        const thumbnailRect = thumbnail.getBoundingClientRect();
        
        // Calculate the center position
        const containerCenter = containerRect.width / 2;
        const thumbnailCenter = thumbnailRect.left - containerRect.left + thumbnailRect.width / 2;
        const scrollOffset = thumbnailCenter - containerCenter;
        
        container.scrollTo({
          left: container.scrollLeft + scrollOffset,
          behavior: 'smooth'
        });
      }
    }
  }, [selectedImageIndex, currentItem]);

  // Reset thumbnail refs array when images change - always call this hook
  useEffect(() => {
    thumbnailRefs.current = thumbnailRefs.current.slice(0, images.length);
  }, [images.length]);

  // Early return after all hooks
  if (!currentItem) return null;


  // Auto-scroll active thumbnail to center
  useEffect(() => {
    if (thumbnailContainerRef.current && thumbnailRefs.current[selectedImageIndex]) {
      const container = thumbnailContainerRef.current;
      const thumbnail = thumbnailRefs.current[selectedImageIndex];
      
      if (thumbnail) {
        const containerRect = container.getBoundingClientRect();
        const thumbnailRect = thumbnail.getBoundingClientRect();
        
        // Calculate the center position
        const containerCenter = containerRect.width / 2;
        const thumbnailCenter = thumbnailRect.left - containerRect.left + thumbnailRect.width / 2;
        const scrollOffset = thumbnailCenter - containerCenter;
        
        container.scrollTo({
          left: container.scrollLeft + scrollOffset,
          behavior: 'smooth'
        });
      }
    }
  }, [selectedImageIndex]);

  // Reset thumbnail refs array when images change
  useEffect(() => {
    thumbnailRefs.current = thumbnailRefs.current.slice(0, images.length);
  }, [images.length]);

  const renderImageModal = () => {
    if (type === 'property-videos' || type === 'lifestyle-videos') {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-full max-w-4xl aspect-video">
            <iframe
              src={currentItem.videoUrl}
              title={currentItem.title}
              className="w-full h-full rounded-lg"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      );
    }

    return (
      <div className="w-full h-full flex flex-col overflow-hidden">
        {/* Main Image Container - Scrollable */}
        <div className="flex-1 overflow-auto">
          <div className="min-h-full flex items-center justify-center relative p-2 sm:p-4 lg:p-8">
            {/* Left Navigation Arrow */}
            {hasMultipleImages && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedImageIndex(selectedImageIndex > 0 ? selectedImageIndex - 1 : images.length - 1)}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/10 p-3 rounded-full"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
            )}

            {/* Right Navigation Arrow */}
            {hasMultipleImages && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedImageIndex(selectedImageIndex < images.length - 1 ? selectedImageIndex + 1 : 0)}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/10 p-3 rounded-full"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            )}

            {/* Main Image - Responsive sizing */}
            <div className="flex flex-col items-center gap-4 sm:gap-8 max-w-full">
              <img
                src={images[selectedImageIndex] || currentItem.src}
                alt={`${currentItem.title} ${selectedImageIndex + 1}`}
                className="max-w-full max-h-[50vh] sm:max-h-[60vh] lg:max-h-[70vh] min-h-0 object-contain"
              />
              
              {/* Thumbnails directly below main image */}
              {hasMultipleImages && (
                <div className="flex flex-col items-center gap-3 w-full">
                  <div 
                    ref={thumbnailContainerRef}
                    className="flex gap-1 sm:gap-2 max-w-4xl w-full overflow-x-auto pb-2 px-4 sm:px-16 scroll-smooth"
                    style={{
                      scrollbarWidth: 'thin',
                      scrollbarColor: 'rgba(255,255,255,0.3) transparent'
                    }}
                  >
                    {/* Left safe zone */}
                    <div className="flex-shrink-0 w-4 sm:w-12" />
                    
                    {images.map((image: string, index: number) => (
                      <button
                        key={index}
                        ref={el => thumbnailRefs.current[index] = el}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-10 sm:w-20 sm:h-12 rounded overflow-hidden border-2 transition-all ${
                          selectedImageIndex === index 
                            ? 'border-white shadow-lg scale-105' 
                            : 'border-white/20 hover:border-white/50'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${currentItem.title} thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                    
                    {/* Right safe zone */}
                    <div className="flex-shrink-0 w-4 sm:w-12" />
                  </div>

                  {/* Image Counter */}
                  <div className="text-white/70 text-sm">
                    {selectedImageIndex + 1} of {images.length}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const shouldShowSidebar = type !== 'lifestyle-photos';

  const getDynamicSize = () => {
    // Mobile-first responsive sizing that fills the screen properly
    return 'w-full h-full max-w-none max-h-none sm:w-[95vw] sm:h-[95vh] sm:max-w-7xl sm:max-h-[95vh]';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`bg-black/95 backdrop-blur-xl border-white/10 p-0 overflow-hidden ${getDynamicSize()}`}>
        <div className="flex h-full flex-col sm:flex-row">
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0 order-1">
            {/* Header */}
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-white/10 bg-black/50">
              <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                <h2 className="text-lg sm:text-xl font-light text-white truncate">
                  {currentItem.title}
                </h2>
                <div className="hidden sm:flex gap-2 flex-wrap">
                  {currentItem.clientType && (
                    <Badge variant="secondary" className="bg-white/10 text-white border-white/20 text-xs">
                      {currentItem.clientType}
                    </Badge>
                  )}
                  {currentItem.packageType && (
                    <Badge variant="secondary" className="bg-white/10 text-white border-white/20 text-xs">
                      {currentItem.packageType}
                    </Badge>
                  )}
                  {currentItem.category && (
                    <Badge variant="secondary" className="bg-white/10 text-white border-white/20 text-xs">
                      {currentItem.category}
                    </Badge>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2 flex-shrink-0">
                {items.length > 1 && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onNavigate(currentIndex > 0 ? currentIndex - 1 : items.length - 1)}
                      className="text-white hover:bg-white/10 p-2"
                      disabled={items.length <= 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-white/70 text-sm px-2">
                      {currentIndex + 1} / {items.length}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onNavigate(currentIndex < items.length - 1 ? currentIndex + 1 : 0)}
                      className="text-white hover:bg-white/10 p-2"
                      disabled={items.length <= 1}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </>
                )}
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-white hover:bg-white/10 p-2 ml-2"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Content Area - Top Aligned with Padding */}
            <div className="flex-1 flex flex-col justify-start overflow-auto">
              {renderImageModal()}
            </div>
          </div>

          {/* Conditional Sidebar */}
          {shouldShowSidebar && (
            <div className="w-full sm:w-80 border-t sm:border-t-0 sm:border-l border-white/10 bg-black/30 flex flex-col overflow-auto order-2 sm:order-2 max-h-[40vh] sm:max-h-none">
              {/* Safe zone padding to align with image top */}
              <div className="pt-4 sm:pt-20 px-4 pb-4 flex flex-col gap-4">
                <div>
                  <div className="flex items-center gap-2 text-white/70 text-sm mb-4">
                    <span>{currentItem.date}</span>
                    {currentItem.location && (
                      <>
                        <span>•</span>
                        <span>{currentItem.location}</span>
                      </>
                    )}
                  </div>
                </div>

                {currentItem.description && (
                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Project Details</h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {currentItem.description}
                    </p>
                  </div>
                )}

                {currentItem.clientNotes && (
                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Client Requirements</h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {currentItem.clientNotes}
                    </p>
                  </div>
                )}

                {currentItem.shootDetails && (
                  <div>
                    <h3 className="text-lg font-medium text-white mb-3">Shoot Details</h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {currentItem.shootDetails}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioModal;
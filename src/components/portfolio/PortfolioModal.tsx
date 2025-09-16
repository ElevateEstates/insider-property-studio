import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState, useRef, useEffect } from "react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

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
            <div className="flex flex-col items-center gap-2 sm:gap-4 md:gap-8 max-w-full">
              <img
                src={images[selectedImageIndex] || currentItem.src}
                alt={`${currentItem.title} ${selectedImageIndex + 1}`}
                className="max-w-full max-h-[40vh] sm:max-h-[50vh] md:max-h-[60vh] lg:max-h-[70vh] min-h-0 object-contain"
              />
              
              {/* Thumbnails directly below main image */}
              {hasMultipleImages && (
                <div className="flex flex-col items-center gap-2 sm:gap-3 w-full">
                  <div 
                    ref={thumbnailContainerRef}
                    className="flex gap-1 sm:gap-2 max-w-4xl w-full overflow-x-auto pb-2 px-2 sm:px-4 md:px-16 scroll-smooth snap-x snap-mandatory"
                    style={{
                      scrollbarWidth: 'thin',
                      scrollbarColor: 'rgba(255,255,255,0.3) transparent'
                    }}
                  >
                    {/* Left safe zone */}
                    <div className="flex-shrink-0 w-2 sm:w-4 md:w-12" />
                    
                    {images.map((image: string, index: number) => (
                      <button
                        key={index}
                        ref={el => thumbnailRefs.current[index] = el}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-12 h-8 sm:w-16 sm:h-10 md:w-20 md:h-12 rounded overflow-hidden border-2 transition-all snap-center ${
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
                    <div className="flex-shrink-0 w-2 sm:w-4 md:w-12" />
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[100vw] h-[100vh] max-w-none bg-black/95 backdrop-blur-xl border-0 p-0 overflow-hidden rounded-none sm:w-[95vw] sm:h-[90vh] sm:max-w-6xl sm:rounded-xl sm:border sm:border-white/20">
        <VisuallyHidden>
          <DialogTitle>{currentItem.title}</DialogTitle>
          <DialogDescription>{currentItem.description || 'Portfolio item details'}</DialogDescription>
        </VisuallyHidden>
        <div className="flex h-full flex-col bg-black/90">
          {/* Fixed Header - Apple-style */}
          <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/95 backdrop-blur-xl flex-shrink-0">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <h2 className="text-lg font-medium text-white truncate">
                {currentItem.title}
              </h2>
              {items.length > 1 && (
                <span className="text-white/50 text-sm">
                  {currentIndex + 1} of {items.length}
                </span>
              )}
            </div>
            
            <div className="flex items-center gap-2 flex-shrink-0">
              {items.length > 1 && (
                <>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onNavigate(currentIndex > 0 ? currentIndex - 1 : items.length - 1)}
                    className="text-white hover:bg-white/10 w-10 h-10 p-0 rounded-full"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onNavigate(currentIndex < items.length - 1 ? currentIndex + 1 : 0)}
                    className="text-white hover:bg-white/10 w-10 h-10 p-0 rounded-full"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </>
              )}
              
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:bg-white/10 w-10 h-10 p-0 rounded-full ml-2"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Main Content Area - Scrollable */}
          <div className="flex-1 overflow-y-auto overscroll-contain" style={{ WebkitOverflowScrolling: 'touch' }}>
            {type === 'property-videos' || type === 'lifestyle-videos' ? (
              // Video Content
              <div className="flex items-center justify-center min-h-full p-4">
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
            ) : (
              // Image Content
              <div className="p-4 space-y-4">
                {/* Main Image Display */}
                <div className="flex justify-center">
                  <img
                    src={images[selectedImageIndex] || currentItem.src}
                    alt={`${currentItem.title} ${selectedImageIndex + 1}`}
                    className="max-w-full max-h-[60vh] object-contain rounded-lg"
                  />
                </div>

                {/* Image Navigation for multiple images */}
                {hasMultipleImages && (
                  <div className="space-y-4">
                    {/* Navigation Arrows */}
                    <div className="flex justify-center gap-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedImageIndex(selectedImageIndex > 0 ? selectedImageIndex - 1 : images.length - 1)}
                        className="text-white hover:bg-white/10 w-12 h-12 p-0 rounded-full"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedImageIndex(selectedImageIndex < images.length - 1 ? selectedImageIndex + 1 : 0)}
                        className="text-white hover:bg-white/10 w-12 h-12 p-0 rounded-full"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </Button>
                    </div>

                    {/* Thumbnail Strip */}
                    <div className="flex justify-center">
                      <div 
                        ref={thumbnailContainerRef}
                        className="flex gap-2 max-w-full overflow-x-auto pb-2 px-4 scroll-smooth"
                        style={{
                          scrollbarWidth: 'thin',
                          scrollbarColor: 'rgba(255,255,255,0.3) transparent'
                        }}
                      >
                        {images.map((image: string, index: number) => (
                          <button
                            key={index}
                            ref={el => thumbnailRefs.current[index] = el}
                            onClick={() => setSelectedImageIndex(index)}
                            className={`flex-shrink-0 w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                              selectedImageIndex === index 
                                ? 'border-white shadow-lg scale-110' 
                                : 'border-white/30 hover:border-white/60'
                            }`}
                          >
                            <img
                              src={image}
                              alt={`${currentItem.title} thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Image Counter */}
                    <div className="text-center text-white/70 text-sm">
                      {selectedImageIndex + 1} of {images.length}
                    </div>
                  </div>
                )}

                {/* Project Details - Conditional */}
                {shouldShowSidebar && (
                  <div className="border-t border-white/10 pt-6 mt-6 space-y-4">
                    <div className="flex items-center gap-3 text-white/70 text-sm mb-4">
                      <span>{currentItem.date}</span>
                      {currentItem.location && (
                        <>
                          <span>•</span>
                          <span>{currentItem.location}</span>
                        </>
                      )}
                    </div>

                    {/* Badges */}
                    <div className="flex gap-2 flex-wrap mb-4">
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

                    {currentItem.description && (
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium text-white">Project Details</h3>
                        <p className="text-white/80 text-sm leading-relaxed">
                          {currentItem.description}
                        </p>
                      </div>
                    )}

                    {currentItem.clientNotes && (
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium text-white">Client Requirements</h3>
                        <p className="text-white/80 text-sm leading-relaxed">
                          {currentItem.clientNotes}
                        </p>
                      </div>
                    )}

                    {currentItem.shootDetails && (
                      <div className="space-y-2">
                        <h3 className="text-lg font-medium text-white">Shoot Details</h3>
                        <p className="text-white/80 text-sm leading-relaxed">
                          {currentItem.shootDetails}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Safe bottom padding */}
                <div className="h-8"></div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioModal;
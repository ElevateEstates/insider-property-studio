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
  
  const getCurrentImage = () => {
    if (type === 'lifestyle-photos') {
      return currentItem?.src;
    }
    // For property listings, get the current selected image or fallback to first image
    if (currentItem?.images && currentItem.images.length > 0) {
      return currentItem.images[selectedImageIndex] || currentItem.images[0];
    }
    return null;
  };

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

  // Reset selected image index when switching between items
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [currentIndex]);
  
  // Add touch event handling for mobile swipe gestures
  useEffect(() => {
    let startX = 0;
    let startY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      if (!e.changedTouches[0]) return;
      
      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const deltaX = startX - endX;
      const deltaY = startY - endY;
      
      // Only trigger if horizontal swipe is dominant and significant
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (hasMultipleImages) {
          if (deltaX > 0) {
            // Swipe left - next image
            setSelectedImageIndex(selectedImageIndex < images.length - 1 ? selectedImageIndex + 1 : 0);
          } else {
            // Swipe right - previous image
            setSelectedImageIndex(selectedImageIndex > 0 ? selectedImageIndex - 1 : images.length - 1);
          }
        }
      }
    };
    
    if (isOpen && hasMultipleImages) {
      document.addEventListener('touchstart', handleTouchStart, { passive: true });
      document.addEventListener('touchend', handleTouchEnd, { passive: true });
      
      return () => {
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [isOpen, hasMultipleImages, selectedImageIndex, images.length]);

  // Early return after all hooks
  if (!currentItem) return null;

  const shouldShowSidebar = type !== 'lifestyle-photos';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full h-full max-w-none max-h-none bg-black/95 border-0 p-0 overflow-hidden m-0 sm:w-[95vw] sm:h-[90vh] sm:max-w-6xl sm:rounded-xl sm:border sm:border-white/20 sm:m-4">
        <VisuallyHidden>
          <DialogTitle>{currentItem.title}</DialogTitle>
          <DialogDescription>{currentItem.description || 'Portfolio item details'}</DialogDescription>
        </VisuallyHidden>
        
        {/* Mobile-First Layout */}
        <div className="w-full h-full flex flex-col bg-black">
          {/* Header */}
          <div className="flex-shrink-0 flex items-center justify-between p-4 bg-black/95 border-b border-white/20">
            <h2 className="text-white font-medium text-lg truncate flex-1 mr-4">
              {currentItem.title}
            </h2>
            <button
              onClick={onClose}
              className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            <div className="min-h-full">
              {/* Main Image */}
              <div className="w-full bg-black/50 min-h-[50vh] flex items-center justify-center relative">
                {getCurrentImage() ? (
                  <>
                    <img
                      src={getCurrentImage()}
                      alt={currentItem.title}
                      className="w-full h-auto max-w-full max-h-[50vh] object-contain"
                      style={{ display: 'block' }}
                    />
                    
                    {/* Navigation arrows if multiple images */}
                    {hasMultipleImages && (
                      <>
                        <button
                          onClick={() => setSelectedImageIndex(selectedImageIndex > 0 ? selectedImageIndex - 1 : images.length - 1)}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white"
                        >
                          <ChevronLeft size={20} />
                        </button>
                        <button
                          onClick={() => setSelectedImageIndex(selectedImageIndex < images.length - 1 ? selectedImageIndex + 1 : 0)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <div className="text-white/60 p-8 text-center">
                    <p>Image not available</p>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {hasMultipleImages && (
                <div className="p-4 bg-black/30">
                  <div className="text-center text-white/70 text-sm mb-3">
                    {selectedImageIndex + 1} of {images.length}
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {images.map((image: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-12 rounded border-2 overflow-hidden transition-all ${
                          selectedImageIndex === index 
                            ? 'border-white scale-105' 
                            : 'border-white/30'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Content Details */}
              <div className="p-4 space-y-4 bg-black/20">
                {/* Date and Location */}
                <div className="text-white/70 text-sm">
                  {currentItem.date} • {currentItem.location}
                </div>

                {/* Badges */}
                <div className="flex gap-2 flex-wrap">
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
                </div>

                {/* Project Description */}
                {currentItem.description && (
                  <div>
                    <h3 className="text-white font-medium text-base mb-2">Project Details</h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {currentItem.description}
                    </p>
                  </div>
                )}

                {/* Client Requirements */}
                {currentItem.clientNotes && (
                  <div>
                    <h3 className="text-white font-medium text-base mb-2">Client Requirements</h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {currentItem.clientNotes}
                    </p>
                  </div>
                )}

                {/* Shoot Details */}
                {currentItem.shootDetails && (
                  <div>
                    <h3 className="text-white font-medium text-base mb-2">Shoot Details</h3>
                    <p className="text-white/80 text-sm leading-relaxed">
                      {currentItem.shootDetails}
                    </p>
                  </div>
                )}

                {/* Navigation between properties */}
                {items.length > 1 && (
                  <div className="flex justify-between items-center pt-4 border-t border-white/20">
                    <button
                      onClick={() => onNavigate(currentIndex > 0 ? currentIndex - 1 : items.length - 1)}
                      className="flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <ChevronLeft size={16} />
                      Previous
                    </button>
                    <span className="text-white/50 text-sm">
                      {currentIndex + 1} of {items.length}
                    </span>
                    <button
                      onClick={() => onNavigate(currentIndex < items.length - 1 ? currentIndex + 1 : 0)}
                      className="flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                    >
                      Next
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}

                {/* Extra bottom padding for mobile */}
                <div className="h-8"></div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioModal;
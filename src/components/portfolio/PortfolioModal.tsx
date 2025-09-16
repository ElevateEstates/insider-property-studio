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
      <DialogContent className="w-[100vw] h-[100vh] max-w-none bg-black/95 backdrop-blur-xl border-0 p-0 overflow-hidden rounded-none sm:w-[95vw] sm:h-[90vh] sm:max-w-6xl sm:rounded-xl sm:border sm:border-white/20">
        <VisuallyHidden>
          <DialogTitle>{currentItem.title}</DialogTitle>
          <DialogDescription>{currentItem.description || 'Portfolio item details'}</DialogDescription>
        </VisuallyHidden>
        <div className="flex h-full flex-col bg-black/95">
          {/* Fixed Header with Close Button */}
          <div className="flex items-center justify-between p-3 border-b border-white/20 bg-black/95 backdrop-blur-xl flex-shrink-0 safe-area-top">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              <h2 className="text-base sm:text-lg font-medium text-white truncate">
                {currentItem.title}
              </h2>
              {items.length > 1 && (
                <span className="text-white/50 text-xs sm:text-sm">
                  {currentIndex + 1} of {items.length}
                </span>
              )}
            </div>
            
            {/* Close Button - Larger for mobile */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/10 w-12 h-12 p-0 rounded-full ml-2 flex-shrink-0 touch-manipulation"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>

          {/* Main Scrollable Content */}
          <div 
            className="flex-1 overflow-y-auto overscroll-contain" 
            style={{ 
              WebkitOverflowScrolling: 'touch',
              scrollBehavior: 'smooth'
            }}
          >
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
              // Image Content - Mobile Optimized
              <div className="space-y-4">
                {/* Main Image Container */}
                <div className="px-4 pt-4">
                  <div className="relative bg-black/30 rounded-lg overflow-hidden">
                    {getCurrentImage() ? (
                      <img
                        src={getCurrentImage()}
                        alt={`${currentItem.title}`}
                        className="w-full h-auto max-h-[50vh] sm:max-h-[60vh] object-contain"
                        style={{ minHeight: '200px' }}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-48 text-white/60">
                        <p>Loading image...</p>
                      </div>
                    )}
                    
                    {/* Image Navigation Arrows Overlay */}
                    {hasMultipleImages && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedImageIndex(selectedImageIndex > 0 ? selectedImageIndex - 1 : images.length - 1)}
                          className="absolute left-2 top-1/2 -translate-y-1/2 text-white hover:bg-black/50 w-10 h-10 p-0 rounded-full backdrop-blur-sm touch-manipulation"
                        >
                          <ChevronLeft className="h-5 w-5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedImageIndex(selectedImageIndex < images.length - 1 ? selectedImageIndex + 1 : 0)}
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:bg-black/50 w-10 h-10 p-0 rounded-full backdrop-blur-sm touch-manipulation"
                        >
                          <ChevronRight className="h-5 w-5" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                {/* Thumbnail Navigation */}
                {hasMultipleImages && (
                  <div className="px-4 space-y-2">
                    <div className="text-center text-white/70 text-sm">
                      {selectedImageIndex + 1} of {images.length}
                    </div>
                    <div className="overflow-x-auto">
                      <div 
                        ref={thumbnailContainerRef}
                        className="flex gap-3 pb-2 px-2"
                        style={{ minWidth: 'max-content' }}
                      >
                        {images.map((image: string, index: number) => (
                          <button
                            key={index}
                            ref={el => thumbnailRefs.current[index] = el}
                            onClick={() => setSelectedImageIndex(index)}
                            className={`flex-shrink-0 w-16 h-12 sm:w-20 sm:h-14 rounded-lg overflow-hidden border-2 transition-all touch-manipulation ${
                              selectedImageIndex === index 
                                ? 'border-white shadow-lg scale-105' 
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
                  </div>
                )}

                {/* Project Details - Always Show for Property Listings */}
                {type === 'property-listings' && (
                  <div className="px-4 pb-6 space-y-4 border-t border-white/10 pt-4 mt-2">
                    {/* Date and Location */}
                    <div className="flex items-center gap-2 text-white/70 text-sm">
                      <span>{currentItem.date}</span>
                      {currentItem.location && (
                        <>
                          <span>•</span>
                          <span className="truncate">{currentItem.location}</span>
                        </>
                      )}
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
                      {currentItem.category && (
                        <Badge variant="secondary" className="bg-white/10 text-white border-white/20 text-xs">
                          {currentItem.category}
                        </Badge>
                      )}
                    </div>

                    {/* Project Description */}
                    {currentItem.description && (
                      <div className="space-y-2">
                        <h3 className="text-base font-medium text-white">Project Details</h3>
                        <p className="text-white/80 text-sm leading-relaxed">
                          {currentItem.description}
                        </p>
                      </div>
                    )}

                    {/* Client Requirements */}
                    {currentItem.clientNotes && (
                      <div className="space-y-2">
                        <h3 className="text-base font-medium text-white">Client Requirements</h3>
                        <p className="text-white/80 text-sm leading-relaxed">
                          {currentItem.clientNotes}
                        </p>
                      </div>
                    )}

                    {/* Shoot Details */}
                    {currentItem.shootDetails && (
                      <div className="space-y-2">
                        <h3 className="text-base font-medium text-white">Shoot Details</h3>
                        <p className="text-white/80 text-sm leading-relaxed">
                          {currentItem.shootDetails}
                        </p>
                      </div>
                    )}

                    {/* Navigation between properties */}
                    {items.length > 1 && (
                      <div className="flex justify-between items-center pt-4 border-t border-white/10">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onNavigate(currentIndex > 0 ? currentIndex - 1 : items.length - 1)}
                          className="text-white hover:bg-white/10 flex items-center gap-2 touch-manipulation"
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Previous
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onNavigate(currentIndex < items.length - 1 ? currentIndex + 1 : 0)}
                          className="text-white hover:bg-white/10 flex items-center gap-2 touch-manipulation"
                        >
                          Next
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {/* Safe bottom padding for mobile */}
                <div className="h-16"></div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioModal;
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
  const [showDetails, setShowDetails] = useState(false);

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
    if (currentItem?.images && currentItem.images.length > 0) {
      return currentItem.images[selectedImageIndex] || currentItem.images[0];
    }
    return null;
  };

  // Reset selected image index when switching between items
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          if (hasMultipleImages) {
            setSelectedImageIndex(prev => prev > 0 ? prev - 1 : images.length - 1);
          }
          break;
        case 'ArrowRight':
          e.preventDefault();
          if (hasMultipleImages) {
            setSelectedImageIndex(prev => prev < images.length - 1 ? prev + 1 : 0);
          }
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, hasMultipleImages, images.length, onClose]);

  if (!currentItem) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[100vw] h-[100vh] p-0 border-0 bg-black/95 z-[101]
                                fixed left-[50%] top-[50%] transform -translate-x-1/2 -translate-y-1/2
                                max-w-none max-h-none 
                                md:w-[85vw] md:h-[80vh] md:max-w-[900px] md:max-h-[700px] md:rounded-lg md:border md:border-white/20">
        <VisuallyHidden>
          <DialogTitle>{currentItem.title}</DialogTitle>
          <DialogDescription>{currentItem.description || 'Portfolio item details'}</DialogDescription>
        </VisuallyHidden>
        
        {/* Single Column Layout with Image Priority */}
        <div className="w-full h-full bg-black text-white flex flex-col overflow-hidden">
          
          {/* Header with Close Button - Compact mobile */}
          <div className="flex-shrink-0 flex items-center justify-between px-2 py-1 md:p-4 lg:p-4 border-b border-white/20 bg-black/90">
            <div className="flex-1 min-w-0 pr-1">
              <h2 className="text-sm lg:text-xl xl:text-2xl font-semibold leading-tight">
                {currentItem.title}
              </h2>
              <div className="text-white/70 text-xs lg:text-sm mt-0.5">
                {currentItem.date} • {currentItem.location}
              </div>
            </div>
            <div className="flex items-center gap-1 lg:gap-2 flex-shrink-0">
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="px-2.5 py-1.5 lg:px-4 lg:py-2 text-xs lg:text-sm font-medium bg-[hsl(var(--accent-gold))] hover:bg-[hsl(var(--accent-gold-dark))] 
                           rounded-md lg:rounded-lg transition-colors text-black border border-[hsl(var(--accent-gold-light))]"
              >
                {showDetails ? 'Hide' : 'Details'}
              </button>
              <button
                onClick={onClose}
                className="flex-shrink-0 w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/10 hover:bg-white/20 
                           flex items-center justify-center text-white transition-colors"
              >
                <X size={16} className="lg:w-5 lg:h-5" />
              </button>
            </div>
          </div>

          {/* Main Content Area - Zero padding mobile */}
          <div className="flex-1 flex flex-col min-h-0 p-0 md:p-3 lg:p-2">
            
            {/* Main Image Display - Fill available space */}
            <div className={`flex items-center justify-center relative bg-black/30 min-h-0 transition-all duration-300 ${
              showDetails 
                ? 'flex-[2]' // When details shown, still prioritize image
                : 'flex-1' // When hidden, maximize image space
            }`}>
              {getCurrentImage() ? (
                <div className="relative w-full h-full flex items-center justify-center p-1 md:p-1 lg:p-2">
                  <img
                    src={getCurrentImage()}
                    alt={currentItem.title}
                    className="max-w-full max-h-full w-auto h-auto object-contain rounded transition-all duration-300"
                  />
                  
                  {/* Navigation Arrows */}
                  {hasMultipleImages && (
                    <>
                      <button
                        onClick={() => setSelectedImageIndex(selectedImageIndex > 0 ? selectedImageIndex - 1 : images.length - 1)}
                        className="absolute left-1 top-1/2 -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 bg-black/70 hover:bg-black/90 
                                   rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                      >
                        <ChevronLeft size={16} className="lg:w-5 lg:h-5" />
                      </button>
                      <button
                        onClick={() => setSelectedImageIndex(selectedImageIndex < images.length - 1 ? selectedImageIndex + 1 : 0)}
                        className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 lg:w-10 lg:h-10 bg-black/70 hover:bg-black/90 
                                   rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                      >
                        <ChevronRight size={16} className="lg:w-5 lg:h-5" />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  {hasMultipleImages && (
                    <div className="absolute top-1 right-1 bg-black/70 px-1.5 py-0.5 rounded-full border border-white/20">
                      <span className="text-white/90 text-xs font-medium">
                        {selectedImageIndex + 1} / {images.length}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-white/50 text-center p-2">
                  <p>Image not available</p>
                </div>
              )}
            </div>

            {/* Thumbnail Strip - No gap from image */}
            {hasMultipleImages && (
              <div className="flex-shrink-0">
                <div className="flex gap-1 overflow-x-auto px-2 py-1 md:px-3 md:py-1 lg:px-2 lg:py-1">
                  {images.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-8 h-6 lg:w-10 lg:h-8 rounded border overflow-hidden 
                                 transition-all hover:scale-105 ${
                                   selectedImageIndex === index 
                                     ? 'border-white shadow-lg scale-105' 
                                     : 'border-white/30 hover:border-white/60'
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

            {/* Project Details - Maximized space */}
            {showDetails && (
               <div className="flex-1 min-h-0 overflow-y-auto bg-black/20 px-2 py-1 md:p-3 md:mt-2 lg:p-3 lg:mt-2
                              scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent
                              animate-fade-in transition-all duration-300">
                <div className="space-y-1.5">
                  
                  {/* Badges */}
                  {(currentItem.clientType || currentItem.packageType) && (
                    <div className="flex gap-1 flex-wrap">
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
                  )}

                  {/* Project Description */}
                  {currentItem.description && (
                    <div>
                      <h3 className="text-white font-medium text-sm mb-1">Project Details</h3>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {currentItem.description}
                      </p>
                    </div>
                  )}

                  {/* Client Requirements */}
                  {currentItem.clientNotes && (
                    <div>
                      <h3 className="text-white font-medium text-sm mb-1">Client Requirements</h3>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {currentItem.clientNotes}
                      </p>
                    </div>
                  )}

                  {/* Shoot Details */}
                  {currentItem.shootDetails && (
                    <div>
                      <h3 className="text-white font-medium text-sm mb-1">Shoot Details</h3>
                      <p className="text-white/80 text-sm leading-relaxed">
                        {currentItem.shootDetails}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation between properties - Minimal spacing */}
            {items.length > 1 && (
              <div className="flex-shrink-0 flex justify-between items-center px-2 py-1 md:pt-2 md:mt-1 lg:pt-2 lg:mt-1 border-t border-white/20">
                <button
                  onClick={() => onNavigate(currentIndex > 0 ? currentIndex - 1 : items.length - 1)}
                  className="flex items-center gap-1 px-1.5 py-1 text-white/80 hover:text-white 
                             hover:bg-white/10 rounded transition-colors text-xs"
                >
                  <ChevronLeft size={12} />
                  Previous
                </button>
                <span className="text-white/50 text-xs">
                  {currentIndex + 1} of {items.length}
                </span>
                <button
                  onClick={() => onNavigate(currentIndex < items.length - 1 ? currentIndex + 1 : 0)}
                  className="flex items-center gap-1 px-1.5 py-1 text-white/80 hover:text-white 
                             hover:bg-white/10 rounded transition-colors text-xs"
                >
                  Next
                  <ChevronRight size={12} />
                </button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioModal;
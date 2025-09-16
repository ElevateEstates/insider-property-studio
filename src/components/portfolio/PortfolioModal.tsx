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
      <DialogContent className="w-[100vw] h-[100vh] p-0 border-0 bg-transparent z-[101]
                                fixed left-0 top-0
                                max-w-none max-h-none 
                                md:w-[85vw] md:h-[80vh] md:max-w-[900px] md:max-h-[700px] md:rounded-lg md:border md:border-white/20 md:bg-black/95 md:left-[50%] md:top-[50%] md:-translate-x-1/2 md:-translate-y-1/2">
        <VisuallyHidden>
          <DialogTitle>{currentItem.title}</DialogTitle>
          <DialogDescription>{currentItem.description || 'Portfolio item details'}</DialogDescription>
        </VisuallyHidden>
        
        {/* Fullscreen overlay with top menu bar space */}
        <div 
          className="absolute inset-0 bg-black/60 cursor-pointer"
          onClick={onClose}
        />
        
        {/* Modal Content - Fullscreen with top safe zone and clear borders */}
        <div className="relative w-full h-full flex flex-col pointer-events-none">
          {/* Top safe zone for navigation */}
          <div className="h-16 flex-shrink-0"></div>
          
          {/* Content Container with clear borders */}
          <div className="flex-1 flex flex-col items-center justify-start p-4 pointer-events-auto">
            <div className="w-full max-w-lg bg-black/95 border-2 border-white/40 rounded-xl shadow-2xl p-4 max-h-[calc(100vh-80px)] overflow-y-auto">
              
              {/* Header with Close Button */}
              <div className="flex-shrink-0 flex items-center justify-between w-full mb-4 p-3 bg-black/90 rounded-lg border border-white/20">
                <div className="flex-1 min-w-0 pr-2">
                  <h2 className="text-sm font-semibold leading-tight text-white">
                    {currentItem.title}
                  </h2>
                  <div className="text-white/70 text-xs mt-1">
                    {currentItem.date} • {currentItem.location}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="px-3 py-1.5 text-xs font-medium bg-[hsl(var(--accent-gold))] hover:bg-[hsl(var(--accent-gold-dark))] 
                               rounded-md transition-colors text-black border border-[hsl(var(--accent-gold-light))]"
                  >
                    {showDetails ? 'Hide' : 'Details'}
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-shrink-0 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 
                               flex items-center justify-center text-white transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Main Image */}
              <div className="flex-shrink-0 relative mb-3">
                <div className="bg-black/30 rounded-lg overflow-hidden border border-white/20">
                  {getCurrentImage() ? (
                    <div className="relative">
                      <img
                        src={getCurrentImage()}
                        alt={currentItem.title}
                        className="w-full h-auto max-h-60 object-contain"
                      />
                      
                      {/* Navigation Arrows */}
                      {hasMultipleImages && (
                        <>
                          <button
                            onClick={() => setSelectedImageIndex(selectedImageIndex > 0 ? selectedImageIndex - 1 : images.length - 1)}
                            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/70 hover:bg-black/90 
                                       rounded-full flex items-center justify-center text-white transition-all hover:scale-110 border border-white/20"
                          >
                            <ChevronLeft size={14} />
                          </button>
                          <button
                            onClick={() => setSelectedImageIndex(selectedImageIndex < images.length - 1 ? selectedImageIndex + 1 : 0)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/70 hover:bg-black/90 
                                       rounded-full flex items-center justify-center text-white transition-all hover:scale-110 border border-white/20"
                          >
                            <ChevronRight size={14} />
                          </button>
                        </>
                      )}

                      {/* Image Counter */}
                      {hasMultipleImages && (
                        <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded-full border border-white/30">
                          <span className="text-white/90 text-xs font-medium">
                            {selectedImageIndex + 1} / {images.length}
                          </span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-white/50 text-center p-4">
                      <p>Image not available</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Thumbnail Strip */}
              {hasMultipleImages && (
                <div className="flex-shrink-0 mb-3 bg-black/30 rounded-lg p-2 border border-white/20">
                  <div className="flex gap-1 overflow-x-auto">
                    {images.map((image: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-12 h-8 rounded border-2 overflow-hidden 
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

              {/* Project Details */}
              {showDetails && (
                <div className="flex-shrink-0 w-full mb-3 bg-black/50 rounded-lg p-3 border border-white/20">
                  <div className="space-y-2 text-sm">
                    
                    {/* Badges */}
                    {(currentItem.clientType || currentItem.packageType) && (
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

              {/* Navigation between properties */}
              {items.length > 1 && (
                <div className="flex-shrink-0 flex justify-between items-center w-full p-2 border-t border-white/20 bg-black/30 rounded-lg border border-white/20">
                  <button
                    onClick={() => onNavigate(currentIndex > 0 ? currentIndex - 1 : items.length - 1)}
                    className="flex items-center gap-1 px-2 py-1 text-white/80 hover:text-white 
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
                    className="flex items-center gap-1 px-2 py-1 text-white/80 hover:text-white 
                               hover:bg-white/10 rounded transition-colors text-xs"
                  >
                    Next
                    <ChevronRight size={12} />
                  </button>
                </div>
              )}
              
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioModal;
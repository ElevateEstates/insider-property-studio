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
      <DialogContent className="w-[90vw] h-[80vh] p-0 border bg-black/95 rounded-lg border-white/20 z-[101]
                                fixed left-[50%] top-[55%] transform -translate-x-1/2 -translate-y-1/2
                                max-w-[1400px] max-h-[900px]">
        <VisuallyHidden>
          <DialogTitle>{currentItem.title}</DialogTitle>
          <DialogDescription>{currentItem.description || 'Portfolio item details'}</DialogDescription>
        </VisuallyHidden>
        
        {/* Single Column Layout with Image Priority */}
        <div className="w-full h-full bg-black text-white flex flex-col overflow-hidden">
          
          {/* Header with Close Button */}
          <div className="flex-shrink-0 flex items-center justify-between p-3 lg:p-4 border-b border-white/20 bg-black/90">
            <div className="flex-1 min-w-0">
              <h2 className="text-lg lg:text-xl xl:text-2xl font-semibold pr-4 truncate">
                {currentItem.title}
              </h2>
              <div className="text-white/70 text-sm mt-1">
                {currentItem.date} • {currentItem.location}
              </div>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 
                         flex items-center justify-center text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-h-0 p-3 lg:p-4">
            
            {/* Main Image Display */}
            <div className="flex-1 flex items-center justify-center relative bg-black/30 rounded-lg mb-3 min-h-0">
              {getCurrentImage() ? (
                <div className="relative w-full h-full flex items-center justify-center p-2">
                  <img
                    src={getCurrentImage()}
                    alt={currentItem.title}
                    className="max-w-full max-h-full w-auto h-auto object-contain rounded-lg shadow-xl"
                  />
                  
                  {/* Navigation Arrows */}
                  {hasMultipleImages && (
                    <>
                      <button
                        onClick={() => setSelectedImageIndex(selectedImageIndex > 0 ? selectedImageIndex - 1 : images.length - 1)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/70 hover:bg-black/90 
                                   rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button
                        onClick={() => setSelectedImageIndex(selectedImageIndex < images.length - 1 ? selectedImageIndex + 1 : 0)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/70 hover:bg-black/90 
                                   rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                      >
                        <ChevronRight size={20} />
                      </button>
                    </>
                  )}

                  {/* Image Counter */}
                  {hasMultipleImages && (
                    <div className="absolute top-3 right-3 bg-black/70 px-3 py-1 rounded-full border border-white/20">
                      <span className="text-white/90 text-sm font-medium">
                        {selectedImageIndex + 1} / {images.length}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-white/50 text-center p-8">
                  <p>Image not available</p>
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            {hasMultipleImages && (
              <div className="flex-shrink-0 mb-3">
                <div className="flex gap-2 overflow-x-auto pb-2 px-1">
                  {images.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-12 lg:w-20 lg:h-15 rounded-md border-2 overflow-hidden 
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

            {/* Project Details - Compact Layout */}
            <div className="flex-shrink-0 max-h-32 lg:max-h-40 overflow-y-auto bg-black/20 rounded-lg p-3 lg:p-4">
              <div className="space-y-2 lg:space-y-3">
                
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
                    <h3 className="text-white font-medium text-sm lg:text-base mb-1">Project Details</h3>
                    <p className="text-white/80 text-xs lg:text-sm leading-relaxed">
                      {currentItem.description}
                    </p>
                  </div>
                )}

                {/* Client Requirements */}
                {currentItem.clientNotes && (
                  <div>
                    <h3 className="text-white font-medium text-sm lg:text-base mb-1">Client Requirements</h3>
                    <p className="text-white/80 text-xs lg:text-sm leading-relaxed">
                      {currentItem.clientNotes}
                    </p>
                  </div>
                )}

                {/* Shoot Details */}
                {currentItem.shootDetails && (
                  <div>
                    <h3 className="text-white font-medium text-sm lg:text-base mb-1">Shoot Details</h3>
                    <p className="text-white/80 text-xs lg:text-sm leading-relaxed">
                      {currentItem.shootDetails}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Navigation between properties - Fixed at bottom */}
            {items.length > 1 && (
              <div className="flex-shrink-0 flex justify-between items-center pt-3 mt-3 border-t border-white/20">
                <button
                  onClick={() => onNavigate(currentIndex > 0 ? currentIndex - 1 : items.length - 1)}
                  className="flex items-center gap-2 px-3 py-2 text-white/80 hover:text-white 
                             hover:bg-white/10 rounded-lg transition-colors text-sm"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>
                <span className="text-white/50 text-sm">
                  {currentIndex + 1} of {items.length}
                </span>
                <button
                  onClick={() => onNavigate(currentIndex < items.length - 1 ? currentIndex + 1 : 0)}
                  className="flex items-center gap-2 px-3 py-2 text-white/80 hover:text-white 
                             hover:bg-white/10 rounded-lg transition-colors text-sm"
                >
                  Next
                  <ChevronRight size={16} />
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
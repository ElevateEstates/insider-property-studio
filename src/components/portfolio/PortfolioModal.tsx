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
      <DialogContent className="w-full h-full max-w-none max-h-none p-0 m-0 border-0 bg-black/95 
                                sm:w-[95vw] sm:h-[90vh] sm:max-w-7xl sm:rounded-xl sm:border sm:border-white/20 sm:m-4">
        <VisuallyHidden>
          <DialogTitle>{currentItem.title}</DialogTitle>
          <DialogDescription>{currentItem.description || 'Portfolio item details'}</DialogDescription>
        </VisuallyHidden>
        
        {/* Responsive Grid Layout */}
        <div className="w-full h-full bg-black text-white flex flex-col lg:grid lg:grid-cols-5 lg:gap-0">
          
          {/* Close Button - Fixed Position */}
          <button
            onClick={onClose}
            className="fixed top-4 right-4 z-50 w-10 h-10 rounded-full bg-black/80 hover:bg-black/90 
                       flex items-center justify-center text-white transition-colors border border-white/20
                       lg:absolute lg:top-6 lg:right-6 lg:w-12 lg:h-12"
          >
            <X size={20} />
          </button>

          {/* Details Panel - Left Side on Desktop, Top on Mobile */}
          <div className="lg:col-span-2 flex flex-col min-h-0 border-r border-white/10">
            {/* Header */}
            <div className="flex-shrink-0 p-4 lg:p-6 border-b border-white/20">
              <h2 className="text-xl lg:text-2xl font-semibold pr-12 lg:pr-16 leading-tight">
                {currentItem.title}
              </h2>
              <div className="text-white/70 text-sm mt-2">
                {currentItem.date} • {currentItem.location}
              </div>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-4 lg:p-6 space-y-6">
                
                {/* Badges */}
                {(currentItem.clientType || currentItem.packageType) && (
                  <div className="flex gap-2 flex-wrap">
                    {currentItem.clientType && (
                      <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                        {currentItem.clientType}
                      </Badge>
                    )}
                    {currentItem.packageType && (
                      <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
                        {currentItem.packageType}
                      </Badge>
                    )}
                  </div>
                )}

                {/* Project Description */}
                {currentItem.description && (
                  <div>
                    <h3 className="text-white font-medium text-lg mb-3">Project Details</h3>
                    <p className="text-white/80 leading-relaxed">
                      {currentItem.description}
                    </p>
                  </div>
                )}

                {/* Client Requirements */}
                {currentItem.clientNotes && (
                  <div>
                    <h3 className="text-white font-medium text-lg mb-3">Client Requirements</h3>
                    <p className="text-white/80 leading-relaxed">
                      {currentItem.clientNotes}
                    </p>
                  </div>
                )}

                {/* Shoot Details */}
                {currentItem.shootDetails && (
                  <div>
                    <h3 className="text-white font-medium text-lg mb-3">Shoot Details</h3>
                    <p className="text-white/80 leading-relaxed">
                      {currentItem.shootDetails}
                    </p>
                  </div>
                )}

                {/* Thumbnails - Desktop: Bottom of details, Mobile: Horizontal scroll */}
                {hasMultipleImages && (
                  <div className="lg:mt-8">
                    <h4 className="text-white/70 text-sm font-medium mb-3 hidden lg:block">
                      Images ({images.length})
                    </h4>
                    <div className="grid grid-cols-4 lg:grid-cols-3 gap-2 lg:gap-3">
                      {images.slice(0, 12).map((image: string, index: number) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImageIndex(index)}
                          className={`aspect-square rounded-lg overflow-hidden border-2 transition-all
                                     hover:scale-105 ${
                                       selectedImageIndex === index 
                                         ? 'border-white shadow-lg' 
                                         : 'border-white/20 hover:border-white/50'
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
                    {images.length > 12 && (
                      <p className="text-white/50 text-xs mt-2">
                        +{images.length - 12} more images
                      </p>
                    )}
                  </div>
                )}

                {/* Navigation between properties */}
                {items.length > 1 && (
                  <div className="flex justify-between items-center pt-6 border-t border-white/20">
                    <button
                      onClick={() => onNavigate(currentIndex > 0 ? currentIndex - 1 : items.length - 1)}
                      className="flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white 
                                 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      <ChevronLeft size={16} />
                      Previous
                    </button>
                    <span className="text-white/50 text-sm">
                      {currentIndex + 1} of {items.length}
                    </span>
                    <button
                      onClick={() => onNavigate(currentIndex < items.length - 1 ? currentIndex + 1 : 0)}
                      className="flex items-center gap-2 px-4 py-2 text-white/80 hover:text-white 
                                 hover:bg-white/10 rounded-lg transition-colors"
                    >
                      Next
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Main Image Panel - Right Side on Desktop, Below details on Mobile */}
          <div className="lg:col-span-3 flex flex-col min-h-0 bg-black/50">
            
            {/* Mobile Image Counter */}
            {hasMultipleImages && (
              <div className="lg:hidden flex-shrink-0 p-4 text-center">
                <span className="text-white/70 text-sm">
                  {selectedImageIndex + 1} of {images.length}
                </span>
              </div>
            )}

            {/* Main Image Display */}
            <div className="flex-1 flex items-center justify-center relative p-4 lg:p-8">
              {getCurrentImage() ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={getCurrentImage()}
                    alt={currentItem.title}
                    className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  />
                  
                  {/* Navigation Arrows */}
                  {hasMultipleImages && (
                    <>
                      <button
                        onClick={() => setSelectedImageIndex(selectedImageIndex > 0 ? selectedImageIndex - 1 : images.length - 1)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/70 hover:bg-black/90 
                                   rounded-full flex items-center justify-center text-white transition-all
                                   hover:scale-110 border border-white/20"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={() => setSelectedImageIndex(selectedImageIndex < images.length - 1 ? selectedImageIndex + 1 : 0)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/70 hover:bg-black/90 
                                   rounded-full flex items-center justify-center text-white transition-all
                                   hover:scale-110 border border-white/20"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}

                  {/* Desktop Image Counter */}
                  {hasMultipleImages && (
                    <div className="hidden lg:block absolute bottom-4 left-1/2 transform -translate-x-1/2 
                                    bg-black/70 px-4 py-2 rounded-full border border-white/20">
                      <span className="text-white/90 text-sm font-medium">
                        {selectedImageIndex + 1} / {images.length}
                      </span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-white/50 text-center p-8">
                  <p className="text-lg">Image not available</p>
                </div>
              )}
            </div>

            {/* Mobile Thumbnail Strip */}
            {hasMultipleImages && (
              <div className="lg:hidden flex-shrink-0 p-4 border-t border-white/20">
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {images.map((image: string, index: number) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`flex-shrink-0 w-16 h-12 rounded-lg border-2 overflow-hidden transition-all ${
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
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioModal;
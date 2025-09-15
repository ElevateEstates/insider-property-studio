import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

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
  const currentItem = items[currentIndex];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!currentItem) return null;

  const getImageArray = () => {
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
          <div className="min-h-full flex items-center justify-center relative p-8">
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
            <div className="flex flex-col items-center gap-8 max-w-full">
              <img
                src={images[selectedImageIndex] || currentItem.src}
                alt={`${currentItem.title} ${selectedImageIndex + 1}`}
                className="max-w-full max-h-[60vh] min-h-0 object-contain"
                style={{ 
                  maxHeight: window.innerHeight < 800 ? '50vh' : '60vh'
                }}
              />
              
              {/* Thumbnails directly below main image */}
              {hasMultipleImages && (
                <div className="flex flex-col items-center gap-3 w-full">
                  <div className="flex gap-2 max-w-4xl w-full justify-center overflow-x-auto pb-2">
                    {images.map((image: string, index: number) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-12 rounded overflow-hidden border-2 transition-all ${
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
    if (type === 'property-videos' || type === 'lifestyle-videos') {
      return shouldShowSidebar ? 'max-w-7xl h-[95vh]' : 'max-w-6xl h-[95vh]';
    }
    // For images, make size more dynamic
    return shouldShowSidebar ? 'max-w-6xl max-h-[90vh]' : 'max-w-5xl max-h-[85vh]';
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`w-full bg-black/95 backdrop-blur-xl border-white/10 p-0 overflow-hidden ${getDynamicSize()}`}>
        <div className="flex h-full">
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/50">
              <div className="flex items-center gap-4 min-w-0">
                <h2 className="text-xl font-light text-white truncate">
                  {currentItem.title}
                </h2>
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
            <div className="w-80 border-l border-white/10 bg-black/30 p-4 flex flex-col gap-4 overflow-auto">
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
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioModal;
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
      return [currentItem.src || ''];
    }
    return [];
  };

  const images = getImageArray().filter(Boolean);
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
      <div className="w-full h-full flex flex-col items-center justify-center gap-4">
        {/* Main Image Display - 16:9 Aspect Ratio */}
        <div className="w-full max-w-4xl aspect-video bg-black/20 rounded-lg overflow-hidden">
          <img
            src={images[selectedImageIndex] || currentItem.src}
            alt={`${currentItem.title} ${selectedImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Image Thumbnail Navigation */}
        {hasMultipleImages && (
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
        )}

        {/* Image Counter */}
        {hasMultipleImages && (
          <div className="text-white/70 text-sm">
            {selectedImageIndex + 1} of {images.length}
          </div>
        )}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl w-full h-[95vh] bg-black/95 backdrop-blur-xl border-white/10 p-0 overflow-hidden">
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

            {/* Content Area */}
            <div className="flex-1 p-4 flex items-center justify-center">
              {renderImageModal()}
            </div>
          </div>

          {/* Sidebar */}
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioModal;
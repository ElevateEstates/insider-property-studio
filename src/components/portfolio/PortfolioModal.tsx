import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, ChevronLeft, ChevronRight, Calendar } from "lucide-react";

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
  renderContent 
}: PortfolioModalProps) => {
  const currentItem = items[currentIndex];

  const handlePrevious = () => {
    onNavigate(currentIndex > 0 ? currentIndex - 1 : items.length - 1);
  };

  const handleNext = () => {
    onNavigate(currentIndex < items.length - 1 ? currentIndex + 1 : 0);
  };

  if (!currentItem) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-full h-[90vh] p-0 bg-black/98 border-white/20 backdrop-blur-md">
        <DialogHeader className="p-6 pb-0 text-white">
          <div className="flex items-start justify-between">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-3 flex-wrap">
                <DialogTitle className="text-2xl font-light">{currentItem.title}</DialogTitle>
                {currentItem.clientType && (
                  <Badge className={`backdrop-blur-sm text-white font-medium ${
                    currentItem.clientType === 'luxury' ? 'bg-yellow-600/80' :
                    currentItem.clientType === 'commercial' ? 'bg-blue-600/80' :
                    currentItem.clientType === 'airbnb' ? 'bg-green-600/80' :
                    'bg-purple-600/80'
                  }`}>
                    {currentItem.clientType.charAt(0).toUpperCase() + currentItem.clientType.slice(1)}
                  </Badge>
                )}
                {currentItem.packageType && (
                  <Badge className="backdrop-blur-sm text-white bg-red-500/80">
                    {currentItem.packageType}
                  </Badge>
                )}
                {currentItem.category && (
                  <Badge className={`backdrop-blur-sm text-white ${
                    currentItem.category === 'dining' ? 'bg-orange-600/80' :
                    currentItem.category === 'entertainment' ? 'bg-purple-600/80' :
                    currentItem.category === 'wellness' ? 'bg-green-600/80' :
                    'bg-blue-600/80'
                  }`}>
                    {currentItem.category.charAt(0).toUpperCase() + currentItem.category.slice(1)}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-white/70">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {currentItem.date}
                </div>
                <span>•</span>
                <span>{currentItem.location}</span>
                <span>•</span>
                <span>{currentIndex + 1} of {items.length}</span>
              </div>
              <p className="text-white/80 text-sm max-w-2xl">{currentItem.description}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white/60 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="flex-1 flex flex-col lg:flex-row gap-6 p-6 pt-0 overflow-hidden">
          {/* Content Area */}
          <div className="flex-1 relative overflow-y-auto max-h-[calc(90vh-200px)]">
            {renderContent(currentItem, currentIndex)}
            
            {/* Navigation Arrows */}
            {items.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm z-10"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 backdrop-blur-sm z-10"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </>
            )}
          </div>

          {/* Details Sidebar */}
          <div className="lg:w-80 space-y-6 text-white overflow-y-auto max-h-[calc(90vh-200px)]">
            <div>
              <h4 className="text-lg font-medium mb-3 text-white">Project Details</h4>
              <div className="space-y-4">
                <div>
                  <h5 className="text-sm font-medium text-white/80 mb-1">Production Details:</h5>
                  <p className="text-sm text-white/60 leading-relaxed">{currentItem.shootDetails}</p>
                </div>
                
                <div>
                  <h5 className="text-sm font-medium text-white/80 mb-1">Client Requirements:</h5>
                  <p className="text-sm text-white/60 leading-relaxed">{currentItem.clientNotes}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PortfolioModal;
import { useState, useEffect, useRef } from "react";

interface LifestylePhoto {
  id: string;
  src: string;
  alt: string;
  category: 'dining' | 'entertainment' | 'wellness' | 'outdoor';
  location: string;
}

interface LifestylePhotosProps {
  scrollY: number;
  onItemClick: (items: any[], index: number, type: 'lifestyle-photos') => void;
}

const LifestylePhotos = ({ scrollY, onItemClick }: LifestylePhotosProps) => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const lifestylePhotos: LifestylePhoto[] = [
    {
      id: '1',
      src: '/lovable-uploads/0425939a-50c2-4776-81ad-2721b48c4585.png',
      alt: 'Luxury terrace dining setup',
      category: 'dining',
      location: 'Marbella Villa'
    },
    {
      id: '2',
      src: '/lovable-uploads/111b5d7c-af39-4666-865d-874b4c80c29d.png',
      alt: 'Pool party entertainment area',
      category: 'entertainment',
      location: 'Puerto Banus Penthouse'
    },
    {
      id: '3',
      src: '/lovable-uploads/1b35db94-4dd0-4d9d-bd6a-95c0a645c0b9.png',
      alt: 'Luxury spa and wellness area',
      category: 'wellness',
      location: 'La Zagaleta Estate'
    },
    {
      id: '4',
      src: '/lovable-uploads/3883c264-9908-46ec-88d3-d7647feeb35b.png',
      alt: 'Beautiful garden landscape',
      category: 'outdoor',
      location: 'Estepona Villa'
    },
    {
      id: '5',
      src: '/lovable-uploads/4ea57a85-e502-45e4-8fd2-a1702b491f62.png',
      alt: 'Outdoor dining with sunset views',
      category: 'dining',
      location: 'Costa del Sol Villa'
    },
    {
      id: '6',
      src: '/lovable-uploads/688cf447-cf8b-4cd1-b791-83e7bf665470.png',
      alt: 'Entertainment lounge area',
      category: 'entertainment',
      location: 'Marbella Penthouse'
    },
    {
      id: '7',
      src: '/lovable-uploads/e4fc5374-2e03-4b03-bdea-1c9e31937aae.png',
      alt: 'Wellness meditation space',
      category: 'wellness',
      location: 'Luxury Spa Resort'
    },
    {
      id: '8',
      src: '/lovable-uploads/f663db8d-bf8c-4981-84b5-ecc1997427e3.png',
      alt: 'Outdoor pool and garden area',
      category: 'outdoor',
      location: 'Nueva Andalucia Villa'
    },
    {
      id: '9',
      src: '/lovable-uploads/0425939a-50c2-4776-81ad-2721b48c4585.png',
      alt: 'Fine dining experience',
      category: 'dining',
      location: 'Private Estate'
    }
  ];

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((item, index) => {
      if (item) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleItems(prev => [...prev, index]);
            }
          },
          { threshold: 0.2 }
        );
        observer.observe(item);
        observers.push(observer);
      }
    });

    return () => observers.forEach(observer => observer.disconnect());
  }, []);

  return (
    <section className="py-32 transparent-section">
      <div 
        className="container mx-auto max-w-7xl px-4 md:px-8 relative z-20"
        style={{ transform: `translateY(${scrollY * 0.03}px)` }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lifestylePhotos.map((photo, index) => (
            <div
              key={photo.id}
              ref={el => itemRefs.current[index] = el}
              className={`group transition-all duration-700 ${
                visibleItems.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div 
                className="relative overflow-hidden rounded-lg glass-card aspect-[4/3] hover:scale-105 transition-transform duration-300 cursor-pointer"
                onClick={() => onItemClick(lifestylePhotos, index, 'lifestyle-photos')}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay with info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`px-2 py-1 rounded text-xs font-medium text-white backdrop-blur-sm ${
                        photo.category === 'dining' ? 'bg-orange-600/80' :
                        photo.category === 'entertainment' ? 'bg-purple-600/80' :
                        photo.category === 'wellness' ? 'bg-green-600/80' :
                        'bg-blue-600/80'
                      }`}>
                        {photo.category.charAt(0).toUpperCase() + photo.category.slice(1)}
                      </span>
                    </div>
                    <h4 className="text-white font-medium text-sm mb-1">{photo.alt}</h4>
                    <p className="text-white/80 text-xs">{photo.location}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LifestylePhotos;
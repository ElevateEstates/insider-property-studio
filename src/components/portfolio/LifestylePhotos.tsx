import { useState, useEffect, useRef } from "react";
import lifestyleGym from "@/assets/lifestyle-gym.jpg";
import lifestyleGolfCart from "@/assets/lifestyle-golf-cart.jpg";
import lifestyleGolfPlayer from "@/assets/lifestyle-golf-player.jpg";
import lifestyleGolfCourse from "@/assets/lifestyle-golf-course.jpg";
import lifestylePadel from "@/assets/lifestyle-padel.jpg";
import lifestylePoolAerial from "@/assets/lifestyle-pool-aerial.jpg";
import lifestyleVillaCar from "@/assets/lifestyle-villa-car.jpg";
import lifestyleCarInterior from "@/assets/lifestyle-car-interior.jpg";

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
      src: lifestyleGym,
      alt: 'Fitness training session at modern gym',
      category: 'wellness',
      location: 'Private Fitness Studio'
    },
    {
      id: '2',
      src: lifestyleGolfCart,
      alt: 'Golf cart experience with friends',
      category: 'outdoor',
      location: 'Mila Golf Course'
    },
    {
      id: '3',
      src: lifestyleGolfPlayer,
      alt: 'Professional golf positioning and technique',
      category: 'outdoor',
      location: 'Championship Golf Course'
    },
    {
      id: '4',
      src: lifestyleGolfCourse,
      alt: 'Golf course lifestyle and equipment',
      category: 'outdoor',
      location: 'Mila Golf Resort'
    },
    {
      id: '5',
      src: lifestylePadel,
      alt: 'Padel tennis action and athleticism',
      category: 'entertainment',
      location: 'Premium Padel Club'
    },
    {
      id: '6',
      src: lifestylePoolAerial,
      alt: 'Aerial view of luxury pool lifestyle',
      category: 'outdoor',
      location: 'Private Villa Estate'
    },
    {
      id: '7',
      src: lifestyleVillaCar,
      alt: 'Luxury villa and classic car lifestyle',
      category: 'entertainment',
      location: 'Mediterranean Villa'
    },
    {
      id: '8',
      src: lifestyleCarInterior,
      alt: 'Classic convertible car interior experience',
      category: 'entertainment',
      location: 'Luxury Car Collection'
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
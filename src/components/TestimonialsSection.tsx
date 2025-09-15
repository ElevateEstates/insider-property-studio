import { useEffect, useState, useRef } from "react";
import scarlettPhoto from "../assets/scarlett-lancaster.jpg";

const testimonials = [
  {
    quote: "The best in the business! I highly recommend to everyone to use you. There is simply no one better than you! Your videos have grown my social media in a big way!",
    author: "Rob Thomson",
    company: "Waterfront Properties",
    image: null
  },
  {
    quote: "We've had the pleasure of working with Geir on a few luxury properties, and are always very impressed by his attention to detail, crispness of the photos, and other marks of a professional luxury photographer.",
    author: "Anne LoGiudice", 
    company: "Luxury Home Magazine",
    image: null
  },
  {
    quote: "I can't speak highly enough of this team. If you are looking to elevate your business, this is the team for you! This is a full service cinema grade production crew that will wow you with their results.",
    author: "Curtis Bennett",
    company: "Coldwell Banker",
    image: null
  },
  {
    quote: "Geir went above and beyond, turning the experience into an exceptional one. His meticulous approach sets him apart from other photographers, ensuring a level of quality and perfection that is truly outstanding.",
    author: "Melanie Barre",
    company: "Sothebys International Realty",
    image: null
  },
  {
    quote: "Geir is a very professional and reliable photographer. We have a working relationship dating back many years so I could talk all day about how amazing, detailed and creative he is. But more importantly for me is how he can always be relied on and his professionalism in every situation that may occur. We couldn't recommend anybody else more!",
    author: "Scarlett Lancaster",
    company: "Sales & Brand Director at Mila Homes",
    image: scarlettPhoto
  }
];

export const TestimonialsSection = () => {
  const [scrollY, setScrollY] = useState(0);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((card, index) => {
      if (card) {
        const cardObserver = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setVisibleCards(prev => [...prev, index]);
            }
          },
          { threshold: 0.1, rootMargin: '100px' } // Trigger earlier
        );
        cardObserver.observe(card);
        observers.push(cardObserver);
      }
    });

    return () => observers.forEach(observer => observer.disconnect());
  }, []);

  return (
    <section className="pt-64 pb-20 px-4 md:px-6 relative overflow-hidden z-5">
      <div 
        className="container mx-auto max-w-6xl relative z-20 section-content py-8 px-4 md:px-8"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 text-white">
            What our discerning clients are saying...
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              ref={el => cardRefs.current[index] = el}
              className={`glass-card rounded-lg p-8 transition-all duration-700 relative z-40 ${
                visibleCards.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ 
                transitionDelay: `${index * 200}ms`
              }}
            >
              <blockquote className="text-lg text-white/90 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
              <div className="border-t border-white/20 pt-4">
                <div className="flex items-center space-x-4">
                  {testimonial.image && (
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.author}
                        className="w-full h-full object-cover object-[50%_35%]"
                      />
                    </div>
                  )}
                  <div>
                    <div className="text-white font-medium">{testimonial.author}</div>
                    <div className="text-blue-400 text-sm">{testimonial.company}</div>
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
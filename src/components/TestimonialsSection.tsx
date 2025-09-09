import { useEffect, useState, useRef } from "react";

const testimonials = [
  {
    quote: "The best in the business! I highly recommend to everyone to use you. There is simply no one better than you! Your videos have grown my social media in a big way!",
    author: "Rob Thomson",
    company: "Waterfront Properties"
  },
  {
    quote: "We've had the pleasure of working with Geir on a few luxury properties, and are always very impressed by his attention to detail, crispness of the photos, and other marks of a professional luxury photographer.",
    author: "Anne LoGiudice", 
    company: "Luxury Home Magazine"
  },
  {
    quote: "I can't speak highly enough of this team. If you are looking to elevate your business, this is the team for you! This is a full service cinema grade production crew that will wow you with their results.",
    author: "Curtis Bennett",
    company: "Coldwell Banker"
  },
  {
    quote: "Geir went above and beyond, turning the experience into an exceptional one. His meticulous approach sets him apart from other photographers, ensuring a level of quality and perfection that is truly outstanding.",
    author: "Melanie Barre",
    company: "Sothebys International Realty"
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
          { threshold: 0.3 }
        );
        cardObserver.observe(card);
        observers.push(cardObserver);
      }
    });

    return () => observers.forEach(observer => observer.disconnect());
  }, []);

  return (
    <section className="py-32 px-4 md:px-6 bg-black-grainy relative overflow-hidden z-10">
      {/* Subtle Star Background */}
      <div className="absolute inset-0 opacity-8 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 35% 65%, rgba(255,255,255,0.02) 1px, transparent 1px),
                           radial-gradient(circle at 65% 35%, rgba(255,255,255,0.025) 1px, transparent 1px),
                           radial-gradient(circle at 10% 10%, rgba(255,255,255,0.015) 1px, transparent 1px)`,
          backgroundSize: '120px 120px, 160px 160px, 200px 200px'
        }}></div>
      </div>
      
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
                <div className="text-white font-medium">{testimonial.author}</div>
                <div className="text-blue-400 text-sm">{testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
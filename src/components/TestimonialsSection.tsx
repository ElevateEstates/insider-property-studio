import { useEffect, useState, useRef } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import scarlettPhoto from "../assets/scarlett-lancaster.jpg";
import eddiePhoto from "../assets/eddie-profile.jpg";
import yoniPhoto from "../assets/yoni-profile.jpg";

const testimonials = [
  {
    quote: "I cannot express enough how thrilled I am with the work of Geir Stint as our content creator. His unique ideas and innovative approach have truly set him apart in the industry. Geir's ability to consistently deliver high-quality content at an impressive pace is nothing short of remarkable. From the very beginning, it was clear that Geir is not just another content creator; he brings a fresh perspective that has transformed the way we communicate with our audience. His creativity knows no bounds, and it has played a pivotal role in elevating my business to new heights. I wholeheartedly give Geir a perfect five-star rating and cannot recommend him highly enough.",
    author: "Yoni Bernard",
    company: "Founder of Decogym and CEO of Mr Broker Estate",
    image: yoniPhoto
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
  },
  {
    quote: "Geir is a fantastic gentleman, who took my project onboard. His experience, and deep understanding of social media marketing, web design and video creation have helped me to get started with confidence and quickly receive interactions from clients. I should also highlight his sense of creativity is outstanding. Could not be happier to trust my project on his hands.",
    author: "Eddie Caires",
    company: "Irish National Champion RIBBF 2023 & Transformation Coach",
    image: eddiePhoto
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
                    <Dialog>
                      <DialogTrigger asChild>
                        <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all duration-200">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.author}
                            className="w-full h-full object-cover object-[50%_20%]"
                          />
                        </div>
                      </DialogTrigger>
                      <DialogContent className="max-w-md">
                        <div className="flex flex-col items-center space-y-4">
                          <div className="w-64 h-64 rounded-full overflow-hidden">
                            <img 
                              src={testimonial.image} 
                              alt={testimonial.author}
                              className="w-full h-full object-cover object-center"
                            />
                          </div>
                          <div className="text-center">
                            <h3 className="text-lg font-semibold">{testimonial.author}</h3>
                            <p className="text-sm text-muted-foreground">{testimonial.company}</p>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                  <div>
                    <div className="text-white font-medium">{testimonial.author}</div>
                    <div className="text-blue-400 text-xs md:text-sm truncate">{testimonial.company}</div>
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
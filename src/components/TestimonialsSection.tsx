import { useEffect, useState, useRef } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import scarlettPhoto from "../assets/scarlett-lancaster.jpg";
import eddiePhoto from "../assets/eddie-profile.jpg";
import yoniPhoto from "../assets/yoni-profile.jpg";
import wlcostaPhoto from "../assets/wlcosta-profile.jpg";

const testimonials = [
  {
    quote: "I cannot express enough how thrilled I am with the work of Geir Stint as our content creator. His unique ideas and innovative approach have truly set him apart in the industry. Geir's ability to consistently deliver high-quality content at an impressive pace is nothing short of remarkable. From the very beginning, it was clear that Geir is not just another content creator; he brings a fresh perspective that has transformed the way we communicate with our audience. His creativity knows no bounds, and it has played a pivotal role in elevating my business to new heights. I wholeheartedly give Geir a perfect five-star rating and cannot recommend him highly enough.",
    author: "Yoni Bernard",
    company: "Founder of Decogym and CEO of Mr Broker Estate",
    image: yoniPhoto,
    featured: true
  },
  {
    quote: "Geir has been working with us for the past two years and has become a huge part of our real estate journey. Not only does he help us present our exclusive listings in the best possible way, but he also brings fresh energy, creative ideas, and a new perspective to everything we do. He's a cool guy with a brilliant creative brain, always thinking outside the box and encouraging us to push beyond our comfort zone. Geir's support means a lot to us, he's a true team player and someone we're genuinely grateful to work with. His work speaks for itself, and our clients are always seriously impressed.",
    author: "Warner and Sandra Laurie",
    company: "Founders, Directors of WL Costa Properties",
    image: wlcostaPhoto,
    featured: true
  },
  {
    quote: "Geir is a very professional and reliable photographer. We have a working relationship dating back many years so I could talk all day about how amazing, detailed and creative he is. But more importantly for me is how he can always be relied on and his professionalism in every situation that may occur. We couldn't recommend anybody else more!",
    author: "Scarlett Lancaster",
    company: "Sales & Brand Director at Mila Homes",
    image: scarlettPhoto,
    featured: false
  },
  {
    quote: "Geir is a fantastic gentleman, who took my project onboard. His experience, and deep understanding of social media marketing, web design and video creation have helped me to get started with confidence and quickly receive interactions from clients. I should also highlight his sense of creativity is outstanding. Could not be happier to trust my project on his hands.",
    author: "Eddie Caires",
    company: "Irish National Champion RIBBF 2023 & Transformation Coach",
    image: eddiePhoto,
    featured: false
  }
];

export const TestimonialsSection = () => {
  const [currentFeatured, setCurrentFeatured] = useState(0);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const featuredTestimonials = testimonials.filter(t => t.featured);
  const regularTestimonials = testimonials.filter(t => !t.featured);

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
          { threshold: 0.1, rootMargin: '100px' }
        );
        cardObserver.observe(card);
        observers.push(cardObserver);
      }
    });

    return () => observers.forEach(observer => observer.disconnect());
  }, []);

  const nextFeatured = () => {
    setCurrentFeatured((prev) => (prev + 1) % featuredTestimonials.length);
  };

  const prevFeatured = () => {
    setCurrentFeatured((prev) => (prev - 1 + featuredTestimonials.length) % featuredTestimonials.length);
  };

  const ProfileImage = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
    if (!testimonial.image) return null;
    
    // Special positioning for different clients
    const getObjectPosition = (author: string) => {
      switch (author) {
        case "Scarlett Lancaster":
          return "object-[50%_20%]"; // Position from top for Scarlett
        case "Eddie Caires":
          return "object-[50%_20%]"; // Position from top for Eddie
        default:
          return "object-center";
      }
    };
    
    return (
      <Dialog>
        <DialogTrigger asChild>
          <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 cursor-pointer hover:ring-2 hover:ring-blue-400 transition-all duration-200 border-2 border-white/20">
            <img 
              src={testimonial.image} 
              alt={testimonial.author}
              className={`w-full h-full object-cover ${getObjectPosition(testimonial.author)}`}
            />
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-md bg-white/5 backdrop-blur-xl border border-white/20 text-white">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-64 h-64 rounded-full overflow-hidden">
              <img 
                src={testimonial.image} 
                alt={testimonial.author}
                className={`w-full h-full object-cover ${getObjectPosition(testimonial.author)}`}
              />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white">{testimonial.author}</h3>
              <p className="text-sm text-blue-400">{testimonial.company}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <section className="pt-64 pb-20 px-4 md:px-6 relative overflow-hidden z-5">
      <div className="container mx-auto max-w-7xl relative z-20 section-content py-8 px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-light mb-8 text-white">
            What our discerning clients are saying...
          </h2>
        </div>

        {/* Featured Testimonials Carousel */}
        <div className="mb-20">
          <div className="relative">
            <div className="glass-card rounded-2xl p-8 md:p-12 max-w-5xl mx-auto">
              <div className="flex items-center justify-center mb-8">
                <Quote className="text-blue-400 w-12 h-12" />
              </div>
              
              <div className="text-center mb-8">
                <blockquote className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed font-light">
                  "{featuredTestimonials[currentFeatured]?.quote}"
                </blockquote>
              </div>

              <div className="flex items-center justify-center space-x-6">
                <ProfileImage testimonial={featuredTestimonials[currentFeatured]} />
                <div className="text-center">
                  <div className="text-white font-medium text-lg">
                    {featuredTestimonials[currentFeatured]?.author}
                  </div>
                  <div className="text-blue-400 text-sm md:text-base">
                    {featuredTestimonials[currentFeatured]?.company}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Buttons */}
            {featuredTestimonials.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/10 rounded-full"
                  onClick={prevFeatured}
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/10 rounded-full"
                  onClick={nextFeatured}
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </>
            )}
          </div>

          {/* Carousel Indicators */}
          {featuredTestimonials.length > 1 && (
            <div className="flex justify-center space-x-2 mt-6">
              {featuredTestimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentFeatured 
                      ? 'bg-blue-400' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                  onClick={() => setCurrentFeatured(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Regular Testimonials - Masonry Style */}
        {regularTestimonials.length > 0 && (
          <div className="columns-1 md:columns-2 gap-8 space-y-8">
            {regularTestimonials.map((testimonial, index) => (
              <div
                key={index}
                ref={el => cardRefs.current[index] = el}
                className={`glass-card rounded-xl p-6 break-inside-avoid mb-8 transition-all duration-700 relative z-40 ${
                  visibleCards.includes(index) 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-8'
                }`}
                style={{ 
                  transitionDelay: `${index * 200}ms`
                }}
              >
                <div className="flex items-start space-x-4 mb-4">
                  <Quote className="text-blue-400 w-6 h-6 flex-shrink-0 mt-1" />
                  <blockquote className="text-base text-white/90 leading-relaxed">
                    "{testimonial.quote}"
                  </blockquote>
                </div>
                
                <div className="border-t border-white/20 pt-4">
                  <div className="flex items-center space-x-4">
                    <ProfileImage testimonial={testimonial} />
                    <div>
                      <div className="text-white font-medium">{testimonial.author}</div>
                      <div className="text-blue-400 text-xs md:text-sm truncate">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
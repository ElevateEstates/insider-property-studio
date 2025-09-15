import { useEffect, useState, useRef } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Quote } from "lucide-react";
import scarlettPhoto from "../assets/scarlett-lancaster.jpg";
import eddiePhoto from "../assets/eddie-profile.jpg";
import yoniPhoto from "../assets/yoni-profile.jpg";
import wlcostaPhoto from "../assets/wlcosta-profile.jpg";

const testimonials = [
  {
    quote: "Geir has been working with us for the past two years and has become a huge part of our real estate journey. Not only does he help us present our exclusive listings in the best possible way, but he also brings fresh energy, creative ideas, and a new perspective to everything we do. He's a cool guy with a brilliant creative brain, always thinking outside the box and encouraging us to push beyond our comfort zone. Geir's support means a lot to us, he's a true team player and someone we're genuinely grateful to work with. His work speaks for itself, and our clients are always seriously impressed.",
    author: "Warner and Sandra Laurie",
    company: "Founders, Directors of WL Costa Properties",
    image: wlcostaPhoto
  },
  {
    quote: "Geir is a fantastic gentleman, who took my project onboard. His experience, and deep understanding of social media marketing, web design and video creation have helped me to get started with confidence and quickly receive interactions from clients. I should also highlight his sense of creativity is outstanding. Could not be happier to trust my project on his hands.",
    author: "Eddie Caires",
    company: "Irish National Champion RIBBF 2023 & Transformation Coach",
    image: eddiePhoto
  },
  {
    quote: "Geir is a very professional and reliable photographer. We have a working relationship dating back many years so I could talk all day about how amazing, detailed and creative he is. But more importantly for me is how he can always be relied on and his professionalism in every situation that may occur. We couldn't recommend anybody else more!",
    author: "Scarlett",
    company: "Sales & Brand Director at Mila Homes",
    image: scarlettPhoto
  },
  {
    quote: "I cannot express enough how thrilled I am with the work of Geir Stint as our content creator. His unique ideas and innovative approach have truly set him apart in the industry. Geir's ability to consistently deliver high-quality content at an impressive pace is nothing short of remarkable. From the very beginning, it was clear that Geir is not just another content creator; he brings a fresh perspective that has transformed the way we communicate with our audience. His creativity knows no bounds, and it has played a pivotal role in elevating my business to new heights. I wholeheartedly give Geir a perfect five-star rating and cannot recommend him highly enough. If you're looking for someone who is dedicated, talented, and passionate about their craft, Geir is your go-to person. Working with him has been a game-changer for us, and I am confident he can do the same for anyone lucky enough to collaborate with him. Thank you, Geir, for your exceptional work and for being such an invaluable asset to our team!",
    author: "Yoni Bernard",
    company: "Founder of Decogym and CEO of Mr Broker Estate",
    image: yoniPhoto
  }
];

// Duplicate testimonials for seamless infinite scroll
const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials];

export const TestimonialsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [autoScroll, setAutoScroll] = useState(true);
  const [selectedTestimonial, setSelectedTestimonial] = useState<typeof testimonials[0] | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2, rootMargin: '50px' }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

// Auto-scroll functionality
  useEffect(() => {
    if (!isVisible || !autoScroll || isDragging) return;

    const scroll = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;
        
        if (container.scrollLeft >= maxScroll) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += 0.5; // Visible scroll speed
        }
      }
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible, autoScroll, isDragging]);

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setAutoScroll(false);
    setStartX(e.pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    e.preventDefault();
    const x = e.pageX - (scrollContainerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    // Resume auto-scroll after 3 seconds
    setTimeout(() => setAutoScroll(true), 3000);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setAutoScroll(false);
    setStartX(e.touches[0].pageX - (scrollContainerRef.current?.offsetLeft || 0));
    setScrollLeft(scrollContainerRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const x = e.touches[0].pageX - (scrollContainerRef.current.offsetLeft || 0);
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    // Resume auto-scroll after 3 seconds
    setTimeout(() => setAutoScroll(true), 3000);
  };

  const ProfileImage = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
    if (!testimonial.image) return null;
    
    const getObjectPosition = (author: string) => {
      switch (author) {
        case "Scarlett Lancaster":
          return "object-[50%_20%]";
        case "Eddie Caires":
          return "object-[50%_20%]";
        default:
          return "object-center";
      }
    };
    
    return (
      <Dialog>
        <DialogTrigger asChild>
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 cursor-pointer hover:ring-2 hover:ring-blue-400/50 transition-all duration-300 hover:scale-110 border border-white/20">
            <img 
              src={testimonial.image} 
              alt={testimonial.author}
              className={`w-full h-full object-cover ${getObjectPosition(testimonial.author)}`}
            />
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-md bg-white/5 backdrop-blur-xl border border-white/20 text-white">
          <div className="flex flex-col items-center space-y-4">
            <div className="w-48 h-48 rounded-full overflow-hidden">
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
    <section 
      ref={sectionRef}
      className="py-12 md:py-16 lg:py-20 px-4 md:px-6 relative overflow-hidden z-5"
    >
      <div className="container mx-auto max-w-6xl relative z-20">
        <div className={`text-center mb-8 md:mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light mb-4 text-white px-4">
            What our clients are saying
          </h2>
        </div>

        {/* Horizontal Scrolling Testimonials */}
        <div className={`transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-4 md:gap-6 lg:gap-8 pb-4 cursor-grab active:cursor-grabbing px-2"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none'
            }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {extendedTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-72 sm:w-80 md:w-96 px-2 md:px-4 select-none cursor-pointer hover:scale-105 transition-all duration-300"
                onClick={() => setSelectedTestimonial(testimonial)}
              >
                <div className="space-y-3 md:space-y-4">
                  {/* Blue Quote Icon */}
                  <div className="flex justify-start">
                    <Quote className="text-blue-400 w-6 h-6 md:w-8 md:h-8 opacity-80" />
                  </div>
                  
                  {/* Testimonial Text */}
                  <blockquote className="text-white/90 leading-relaxed font-light" style={{
                    fontSize: `clamp(0.875rem, ${Math.max(0.7, Math.min(1.1, 180 / testimonial.quote.length))}rem, 1.125rem)`
                  }}>
                    {testimonial.quote.length > 300 ? (
                      <>
                        "{testimonial.quote.substring(0, 300)}..."
                        <div className="mt-2 text-blue-400/80 text-xs md:text-sm italic cursor-pointer hover:text-blue-400 transition-colors">
                          Click to read more →
                        </div>
                      </>
                    ) : (
                      `"${testimonial.quote}"`
                    )}
                  </blockquote>
                  
                  {/* Author Info */}
                  <div className="flex items-center space-x-2 md:space-x-3 pt-3 md:pt-4">
                    <ProfileImage testimonial={testimonial} />
                    <div className="min-w-0 flex-1">
                      <div className="text-white font-medium truncate" style={{
                        fontSize: `clamp(0.75rem, ${Math.max(0.65, Math.min(1, 20 / testimonial.author.length))}rem, 1rem)`
                      }}>{testimonial.author}</div>
                      <div className="text-blue-400/80 text-xs md:text-sm truncate">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
        </div>

        {/* Dynamic Testimonial Modal */}
        {selectedTestimonial && (
          <Dialog open={!!selectedTestimonial} onOpenChange={(open) => !open && setSelectedTestimonial(null)}>
            <DialogContent className="max-w-4xl bg-white/5 backdrop-blur-xl border border-white/20 text-white p-0 overflow-hidden">
              <div className="p-8">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  {/* Profile Image Section */}
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-2 border-blue-400/30">
                      <img 
                        src={selectedTestimonial.image} 
                        alt={selectedTestimonial.author}
                        className={`w-full h-full object-cover ${
                          selectedTestimonial.author === "Scarlett Lancaster" || selectedTestimonial.author === "Eddie Caires"
                            ? "object-[50%_20%]" 
                            : "object-center"
                        }`}
                      />
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="flex-1 space-y-6">
                    {/* Quote Icon */}
                    <Quote className="text-blue-400 w-12 h-12 opacity-80" />
                    
                    {/* Full Testimonial Text */}
                    <blockquote className="text-white/95 text-lg md:text-xl leading-relaxed font-light">
                      "{selectedTestimonial.quote}"
                    </blockquote>
                    
                    {/* Author Information */}
                    <div className="border-t border-white/20 pt-6">
                      <div className="text-white font-semibold text-xl md:text-2xl mb-2">
                        {selectedTestimonial.author}
                      </div>
                      <div className="text-blue-400 text-base md:text-lg">
                        {selectedTestimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </section>
  );
};
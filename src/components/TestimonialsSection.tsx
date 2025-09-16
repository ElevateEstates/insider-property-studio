import { useEffect, useState, useRef } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Quote } from "lucide-react";
import scarlettPhoto from "../assets/scarlett-lancaster.jpg";
import eddiePhoto from "../assets/eddie-profile.jpg";
import yoniPhoto from "../assets/yoni-profile.jpg";
import wlcostaPhoto from "../assets/wlcosta-profile.jpg";

// Detect mobile device
const isMobileDevice = () => typeof window !== 'undefined' && window.innerWidth < 768;

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

// Double testimonials for seamless infinite scroll
const extendedTestimonials = [...testimonials, ...testimonials];

export const TestimonialsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  // Auto-scroll functionality - seamless infinite scroll
  useEffect(() => {
    if (!isVisible) return;
    
    const scroll = () => {
      if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        
        // Smooth continuous scrolling
        const scrollSpeed = 0.5; // Slightly slower for smoother experience
        
        // Get total width and calculate single set width (half of total since we have 2 copies)
        const totalWidth = container.scrollWidth;
        const containerWidth = container.clientWidth;
        const maxScrollLeft = totalWidth - containerWidth;
        const singleSetWidth = maxScrollLeft / 2;
        
        // Increment scroll position
        container.scrollLeft += scrollSpeed;
        
        // When we've scrolled through the first complete set, instantly jump back to start
        // This creates seamless infinite loop since both sets are identical
        if (container.scrollLeft >= singleSetWidth) {
          container.scrollLeft = 0;
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
  }, [isVisible]);


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
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 cursor-pointer border border-white/20 transition-all duration-300 hover:ring-2 hover:ring-blue-400/50 hover:scale-110">
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
      className="py-20 px-4 md:px-6 relative overflow-hidden z-5"
    >
      <div className="container mx-auto max-w-6xl relative z-20">
        <div className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light mb-4 text-white">
            What our clients are saying
          </h2>
        </div>

        {/* Horizontal Scrolling Testimonials */}
        <div className={`transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-hidden gap-4 md:gap-8 py-8"
            style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              pointerEvents: 'none'
            }}
          >
            {extendedTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-64 sm:w-72 md:w-80 px-2 md:px-4 select-none cursor-pointer transition-all duration-300 hover:scale-102 origin-center"
                style={{ pointerEvents: 'auto' }}
                onClick={() => setSelectedTestimonial(testimonial)}
              >
                <div className="space-y-4">
                  {/* Blue Quote Icon */}
                  <div className="flex justify-start">
                    <Quote className="text-blue-400 w-8 h-8 opacity-80" />
                  </div>
                  
                  {/* Testimonial Text */}
                  <blockquote className="text-white/90 leading-relaxed font-light" style={{
                    fontSize: `clamp(1rem, ${Math.max(0.8, Math.min(1.2, 200 / testimonial.quote.length))}rem, 1.25rem)`
                  }}>
                    {testimonial.quote.length > 350 ? (
                      <>
                        "{testimonial.quote.substring(0, 350)}..."
                        <div className="mt-2 text-blue-400/80 text-sm italic cursor-pointer hover:text-blue-400 transition-colors">
                          Click to read more →
                        </div>
                      </>
                    ) : (
                      `"${testimonial.quote}"`
                    )}
                  </blockquote>
                  
                  {/* Author Info */}
                  <div className="flex items-center space-x-3 pt-4">
                    <ProfileImage testimonial={testimonial} />
                    <div>
                      <div className="text-white font-medium" style={{
                        fontSize: `clamp(0.875rem, ${Math.max(0.75, Math.min(1.125, 25 / testimonial.author.length))}rem, 1.125rem)`
                      }}>{testimonial.author}</div>
                      <div className="text-blue-400/80 text-sm">
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
        <DialogContent className="w-[100vw] h-[100vh] sm:w-[95vw] sm:h-[90vh] max-w-none max-h-none sm:max-w-4xl sm:max-h-[90vh] bg-white/5 backdrop-blur-xl border border-white/20 text-white p-0 overflow-hidden sm:rounded-lg">
          {/* Enhanced Close Button */}
          <button
            onClick={() => setSelectedTestimonial(null)}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-50 w-10 h-10 sm:w-12 sm:h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center border-2 border-white/30 hover:border-white/50 transition-all duration-200 group"
            aria-label="Close testimonial"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="p-4 sm:p-6 md:p-8 h-full overflow-y-auto">
            <div className="flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-8 items-start min-h-full">
              {/* Profile Image Section */}
              <div className="flex-shrink-0 mx-auto md:mx-0 mb-4 md:mb-0">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-48 lg:h-48 rounded-full overflow-hidden border-2 border-blue-400/30">
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
              <div className="flex-1 space-y-3 sm:space-y-4 md:space-y-6 text-center md:text-left">
                {/* Quote Icon */}
                <Quote className="text-blue-400 w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 opacity-80 mx-auto md:mx-0" />
                
                {/* Full Testimonial Text */}
                <div className="max-h-[40vh] sm:max-h-[50vh] md:max-h-none overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
                  <blockquote className="text-white/95 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed font-light">
                    "{selectedTestimonial.quote}"
                  </blockquote>
                </div>
                
                {/* Author Information */}
                <div className="border-t border-white/20 pt-3 sm:pt-4 md:pt-6 mt-4 sm:mt-6">
                  <div className="text-white font-semibold text-base sm:text-lg md:text-xl lg:text-2xl mb-1 sm:mb-2">
                    {selectedTestimonial.author}
                  </div>
                  <div className="text-blue-400 text-xs sm:text-sm md:text-base lg:text-lg">
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
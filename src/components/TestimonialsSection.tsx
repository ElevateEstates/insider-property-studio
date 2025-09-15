import { useEffect, useState, useRef } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Quote } from "lucide-react";
import scarlettPhoto from "../assets/scarlett-lancaster.jpg";
import eddiePhoto from "../assets/eddie-profile.jpg";
import yoniPhoto from "../assets/yoni-profile.jpg";
import wlcostaPhoto from "../assets/wlcosta-profile.jpg";

const testimonials = [
  {
    quote: "I cannot express enough how thrilled I am with the work of Geir Stint as our content creator. His unique ideas and innovative approach have truly set him apart in the industry.",
    author: "Yoni Bernard",
    company: "Founder of Decogym and CEO of Mr Broker Estate",
    image: yoniPhoto
  },
  {
    quote: "Geir has been working with us for the past two years and has become a huge part of our real estate journey. His work speaks for itself, and our clients are always seriously impressed.",
    author: "Warner and Sandra Laurie",
    company: "Founders, Directors of WL Costa Properties",
    image: wlcostaPhoto
  },
  {
    quote: "Geir is a very professional and reliable photographer. We have a working relationship dating back many years so I could talk all day about how amazing, detailed and creative he is.",
    author: "Scarlett Lancaster",
    company: "Sales & Brand Director at Mila Homes",
    image: scarlettPhoto
  },
  {
    quote: "Geir is a fantastic gentleman, who took my project onboard. His experience, and deep understanding of social media marketing, web design and video creation have helped me to get started with confidence.",
    author: "Eddie Caires",
    company: "Irish National Champion RIBBF 2023 & Transformation Coach",
    image: eddiePhoto
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
          container.scrollLeft += 0.5; // Slow scroll speed
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
      className="py-20 px-4 md:px-6 relative overflow-hidden z-5"
    >
      <div className="container mx-auto max-w-6xl relative z-20">
        <div className={`text-center mb-12 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-light mb-4 text-white">
            What our clients are saying
          </h2>
          <p className="text-white/70 text-sm md:text-base">Real feedback from our satisfied clients</p>
        </div>

        {/* Horizontal Scrolling Testimonials */}
        <div className={`transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-8 pb-4 cursor-grab active:cursor-grabbing"
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
                className="flex-shrink-0 w-80 md:w-96 px-4 select-none"
              >
                <div className="space-y-4">
                  {/* Blue Quote Icon */}
                  <div className="flex justify-start">
                    <Quote className="text-blue-400 w-8 h-8 opacity-80" />
                  </div>
                  
                  {/* Testimonial Text */}
                  <blockquote className="text-white/90 text-lg md:text-xl leading-relaxed font-light">
                    "{testimonial.quote}"
                  </blockquote>
                  
                  {/* Author Info */}
                  <div className="flex items-center space-x-3 pt-4">
                    <ProfileImage testimonial={testimonial} />
                    <div>
                      <div className="text-white font-medium text-base">{testimonial.author}</div>
                      <div className="text-blue-400/80 text-sm">
                        {testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Scroll Hint */}
          <div className="text-center mt-6">
            <p className="text-white/50 text-sm">
              Drag to scroll manually • Auto-scrolling resumes after 3 seconds
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
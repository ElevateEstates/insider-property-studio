import { useEffect, useState, useRef } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Quote } from "lucide-react";
import scarlettPhoto from "../assets/scarlett-lancaster.jpg";
import eddiePhoto from "../assets/eddie-profile.jpg";
import yoniPhoto from "../assets/yoni-profile.jpg";
import wlcostaPhoto from "../assets/wlcosta-profile.jpg";
import janaPhoto from "../assets/jana-parker.jpg";

const testimonials = [
  {
    quote: "We have been working with Geir for the past couple of years and have always been impressed by his professionalism and exceptional quality of his work. His images perfectly showcase the character and atmosphere of our holiday rentals, making them stand out to potential guests. We couldn't recommend him more highly!",
    author: "Jana Parker",
    company: "Sales and Office Manager at SUNCOASTER SL",
    image: janaPhoto
  },
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

export const TestimonialsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState<typeof testimonials[0] | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const animationRef = useRef<number>();
  const translateXRef = useRef(0);

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

  // No animation effect needed - using pure CSS animation now
  useEffect(() => {
    // Just track visibility for entrance animations
  }, [isVisible]);

  const ProfileImage = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
    if (!testimonial.image) return null;
    
    const getObjectPosition = (author: string) => {
      switch (author) {
        case "Scarlett":
          return "object-[50%_0%]"; // Position to very top to show face
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

  // Render testimonials - original set only for SEO, CSS handles infinite scroll
  const renderTestimonials = () => {
    return testimonials.map((testimonial, index) => (
      <div
        key={`testimonial-${index}`}
        className="flex-shrink-0 w-80 px-4 select-none cursor-pointer transition-all duration-300 hover:scale-102 origin-center"
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
    ));
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

        {/* Horizontal Scrolling Testimonials with Gradient Fade */}
        <div className={`relative transition-all duration-1000 delay-300 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          {/* Gradient fade overlays */}
          <div className="absolute left-0 top-0 w-20 md:w-32 h-full bg-gradient-to-r from-black via-black/50 to-transparent z-30 pointer-events-none" />
          <div className="absolute right-0 top-0 w-20 md:w-32 h-full bg-gradient-to-l from-black via-black/50 to-transparent z-30 pointer-events-none" />
          
          <div className="overflow-hidden py-8">
            <div 
              className="testimonials-scroll-container flex gap-8 animate-marquee"
              style={{ 
                transition: 'none',
                pointerEvents: 'auto',
                willChange: 'transform'
              }}
            >
              {/* First complete set */}
              {renderTestimonials()}
              {/* Second identical set for seamless loop */}
              {renderTestimonials()}
              {/* Third set to ensure smooth transitions */}
              {renderTestimonials()}
            </div>
          </div>
        </div>

        {/* Dynamic Testimonial Modal */}
        {selectedTestimonial && (
          <Dialog open={!!selectedTestimonial} onOpenChange={(open) => !open && setSelectedTestimonial(null)}>
            <DialogContent className="w-[90vw] h-[80vh] p-0 border bg-black/95 rounded-lg border-white/20 z-[101]
                              fixed left-[50%] top-[55%] transform -translate-x-1/2 -translate-y-1/2
                              max-w-[800px] max-h-[900px] backdrop-blur-xl text-white overflow-hidden">
              <div className="h-full flex flex-col bg-black/90">
                {/* Fixed Header with Close Button */}
                <div className="flex items-center justify-between p-4 border-b border-white/20 bg-black/95 backdrop-blur-xl flex-shrink-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden border border-white/30">
                      <img 
                        src={selectedTestimonial.image} 
                        alt={selectedTestimonial.author}
                        className={`w-full h-full object-cover ${
                          selectedTestimonial.author === "Scarlett" 
                            ? "object-[50%_0%]" 
                            : selectedTestimonial.author === "Eddie Caires"
                            ? "object-[50%_20%]" 
                            : "object-center"
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="text-white font-medium text-sm">{selectedTestimonial.author}</h3>
                      <p className="text-blue-400/80 text-xs">{selectedTestimonial.company}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedTestimonial(null)}
                    className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Scrollable Content Area - Enhanced */}
                <div 
                  className="flex-1 overflow-y-auto overscroll-contain scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent"
                  style={{ 
                    WebkitOverflowScrolling: 'touch'
                  }}
                >
                  <div className="p-4 lg:p-6 space-y-4 lg:space-y-6">
                    {/* Large Profile Image */}
                    <div className="flex justify-center">
                      <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden border-2 border-blue-400/30">
                        <img 
                          src={selectedTestimonial.image} 
                          alt={selectedTestimonial.author}
                          className={`w-full h-full object-cover ${
                            selectedTestimonial.author === "Scarlett" 
                              ? "object-[50%_0%]" 
                              : selectedTestimonial.author === "Eddie Caires"
                              ? "object-[50%_20%]" 
                              : "object-center"
                          }`}
                        />
                      </div>
                    </div>
                    
                    {/* Quote Icon */}
                    <div className="flex justify-center">
                      <Quote className="text-blue-400 w-6 h-6 lg:w-8 lg:h-8 opacity-80" />
                    </div>
                    
                    {/* Testimonial Text - Enhanced for readability */}
                    <blockquote className="text-white/95 text-sm lg:text-base leading-relaxed font-light text-center px-2 lg:px-4 max-h-none">
                      "{selectedTestimonial.quote}"
                    </blockquote>
                    
                    {/* Author Information */}
                    <div className="text-center pt-4 border-t border-white/20">
                      <div className="text-white font-semibold text-base lg:text-lg mb-1">
                        {selectedTestimonial.author}
                      </div>
                      <div className="text-blue-400 text-sm mb-4 lg:mb-6">
                        {selectedTestimonial.company}
                      </div>
                    </div>
                    
                    {/* Extra bottom padding for safe scrolling */}
                    <div className="h-8 lg:h-12"></div>
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
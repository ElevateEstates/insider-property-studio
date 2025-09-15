import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

export const WorkWithUs = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="py-20 px-4 md:px-6 relative overflow-hidden z-10">
      <div 
        className="container mx-auto max-w-4xl relative z-20 section-content py-8 px-4 md:px-8"
      >
        <div className="mb-16 animate-fade-up">
          <div className="flex items-center gap-4 mb-8">
            <h2 className="text-5xl md:text-6xl font-light border-b border-white/20 pb-4 text-white">
              Work with us
            </h2>
            <div className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium transform rotate-12 hover-scale">
              We're creating!
            </div>
          </div>
        </div>
        
        <div className="space-y-8 text-lg md:text-xl leading-relaxed text-white/80 font-light mb-12 animate-slide-in">
          <p className="transition-colors hover:text-white/90">
            We specialize in high-end photography and video content for real estate in Costa del Sol. View our portfolio of stunning property showcases on our dedicated portfolio page.
          </p>
          
          <p className="transition-colors hover:text-white/90">
            We offer a variety of options tailored to all budgets and goals, from simple listing photos to comprehensive marketing packages. Our services include HDR wide-angle shots, detailed close-ups, drone photography, 360 virtual tours, floorplans, simple reels, cinematic videos, drone videos and tours, and even custom landing pages designed for refined presentation and higher conversion rates.
          </p>
          
          <p className="transition-colors hover:text-white/90">
            For exclusive properties, we also offer a commission-based model, aligning our production with our combined marketing and ad efforts. We share the risk of selling the property, earning only when you do. This reflects our confidence in delivering exceptional results and opens opportunities for clients with high-value listings but limited upfront funds for content and marketing.
          </p>
        </div>

        <Button 
          variant="outline" 
          size="lg"
          className="glass-button hover-scale relative z-50"
          onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Let's Talk
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};
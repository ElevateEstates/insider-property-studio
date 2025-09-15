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
  return <section className="py-20 px-4 md:px-6 relative overflow-hidden z-10">
      <div className="container mx-auto max-w-4xl relative z-20 section-content py-8 px-4 md:px-8">
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
            We specialize in photo and video content for Costa del Sol businesses. You can see our work and results below.
          </p>
          
          <p className="transition-colors hover:text-white/90">
            We offer competitive rates based on your project needs, not your budget constraints. We work with diverse clients with a focus on delivering measurable results.
          </p>
          
          <p className="transition-colors hover:text-white/90">For select exclusive listings we also work with commission-based model that ties our production, marketing, and advertising directly to performance. We only succeed when you do. This structure minimizes your upfront costs, allows for higher advertising budget, maximizes accountability, and ensures every effort is focused on achieving a successful sale.</p>
        </div>

        <Button variant="outline" size="lg" className="glass-button hover-scale relative z-50" onClick={() => document.getElementById('contact-form')?.scrollIntoView({
        behavior: 'smooth'
      })}>
          Start Your Project
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>;
};
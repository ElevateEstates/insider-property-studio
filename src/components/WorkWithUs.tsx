import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const WorkWithUs = () => {
  return (
    <section className="py-32 px-6 bg-black">
      <div className="container mx-auto max-w-4xl">
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
          
          <p className="transition-colors hover:text-white/90">
            Learn more about our services and see why you should choose us below.
          </p>
        </div>

        <Button 
          variant="outline" 
          size="lg"
          className="bg-transparent border-white/80 text-white hover:bg-white hover:text-black transition-all duration-300 hover-scale"
          onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Start Your Project
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};
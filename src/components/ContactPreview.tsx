import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { useEffect, useState } from "react";

export const ContactPreview = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="py-12 md:py-16 lg:py-20 px-4 md:px-6 relative overflow-hidden z-10">
      <div 
        className="container mx-auto max-w-4xl text-center relative z-20 section-content py-6 md:py-8"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6 md:mb-8 text-white">
          Get In Touch
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8 md:mb-12 px-4">
          Ready to start your next project? Let's connect.
        </p>
        <Button 
          variant="outline" 
          size="lg"
          className="glass-button relative z-50 w-full sm:w-auto px-6 md:px-8 py-3 md:py-4"
          onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Contact Us
          <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
        </Button>
      </div>
    </section>
  );
};
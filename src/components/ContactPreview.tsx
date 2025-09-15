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
    <section className="py-20 px-6 relative overflow-hidden z-10">
      <div 
        className="container mx-auto max-w-4xl text-center relative z-20 section-content py-8"
      >
        <h2 className="text-5xl md:text-6xl font-light mb-8 text-white">
          Get In Touch
        </h2>
        <p className="text-xl text-white/80 mb-12">
          Ready to start your next project? Let's connect.
        </p>
        <Button 
          variant="outline" 
          size="lg"
          className="glass-button relative z-50"
          onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Contact Us
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};
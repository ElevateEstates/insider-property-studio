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
    <section className="py-32 px-6 bg-black relative overflow-hidden">
      {/* Subtle Star Background */}
      <div className="absolute inset-0 opacity-8">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 60% 20%, rgba(255,255,255,0.025) 1px, transparent 1px),
                           radial-gradient(circle at 20% 80%, rgba(255,255,255,0.02) 1px, transparent 1px),
                           radial-gradient(circle at 80% 60%, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '100px 100px, 140px 140px, 180px 180px'
        }}></div>
      </div>
      
      <div 
        className="container mx-auto max-w-4xl text-center relative z-10"
        style={{ transform: `translateY(${scrollY * 0.03}px)` }}
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
          className="bg-transparent border-white/80 text-white hover:bg-white hover:text-black transition-all duration-300"
          onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
        >
          Contact Us
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </section>
  );
};
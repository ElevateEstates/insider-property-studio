import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
export const ContactPreview = () => {
  return (
    <section className="py-32 px-6 bg-black">
      <div className="container mx-auto max-w-4xl text-center">
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
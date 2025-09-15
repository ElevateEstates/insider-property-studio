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
    <div className="py-20 px-4 md:px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Contact us today to discuss your property needs and discover how we can help you achieve your goals.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-sm">
            <Mail className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Email Us</h3>
            <p className="text-gray-300">info@elevateproperties.com</p>
          </Card>
          
          <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-sm">
            <Phone className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Call Us</h3>
            <p className="text-gray-300">+34 123 456 789</p>
          </Card>
          
          <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-sm">
            <MapPin className="h-8 w-8 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
            <p className="text-gray-300">Costa del Sol, Spain</p>
          </Card>
        </div>
        
        <div className="text-center">
          <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg">
            Get In Touch <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
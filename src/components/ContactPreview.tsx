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
    <section className="py-20 px-4">
      <div className="container mx-auto text-center">
        <div 
          className="transform transition-transform duration-300"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        >
          <h2 className="text-4xl font-bold mb-8 text-white">Ready to Elevate Your Property?</h2>
          <p className="text-xl mb-8 text-white/80 max-w-2xl mx-auto">
            Get in touch today and discover how our professional photography and marketing can transform your property listings.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-8">
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <div className="flex items-center gap-3 text-white">
                <Phone className="w-5 h-5" />
                <span>+34 123 456 789</span>
              </div>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <div className="flex items-center gap-3 text-white">
                <Mail className="w-5 h-5" />
                <span>hello@elevatestates.com</span>
              </div>
            </Card>
            <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
              <div className="flex items-center gap-3 text-white">
                <MapPin className="w-5 h-5" />
                <span>Costa del Sol, Spain</span>
              </div>
            </Card>
          </div>
          <Button className="bg-white text-black hover:bg-white/90 text-lg px-8 py-3">
            Get Started Today
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};
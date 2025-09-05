import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

export const ContactPreview = () => {
  return (
    <section className="py-32 px-6 bg-black">
      <div className="container mx-auto max-w-4xl">
        <div className="mb-16 animate-fade-up">
          <h2 className="text-5xl md:text-6xl font-light mb-8 border-b border-white/20 pb-4 text-white">
            Transform Your Business Today
          </h2>
          <p className="text-lg md:text-xl leading-relaxed text-white/80 font-light">
            Ready to elevate your brand with professional content that converts?
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center animate-slide-in">
          {/* Contact Info */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 text-white/80 transition-colors hover:text-white/90">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-medium">Email</p>
                <p>contact@costaestateservices.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white/80 transition-colors hover:text-white/90">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-medium">Phone</p>
                <p>+34 123 456 789</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-white/80 transition-colors hover:text-white/90">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-medium">Location</p>
                <p>Costa del Sol, Spain</p>
              </div>
            </div>
          </div>
          
          {/* CTA Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover-scale">
            <h3 className="text-2xl font-semibold text-white mb-4">
              Let's Get Started
            </h3>
            <p className="text-white/80 mb-6">
              Tell us about your project and we'll create a strategy tailored for your success.
            </p>
            <Button 
              variant="outline"
              className="w-full bg-transparent border-white/80 text-white hover:bg-white hover:text-black transition-all duration-300"
              onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Start Your Project
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
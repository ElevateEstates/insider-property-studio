import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";

export const ContactPreview = () => {
  return (
    <section className="py-16 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-up">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to <span className="text-gradient-gold">Transform</span> Your Business?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Let's discuss how we can elevate your brand and drive results
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Contact Info */}
            <div className="space-y-6 animate-slide-in">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent-gold/10 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-accent-gold" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Email</p>
                  <p className="text-muted-foreground">hello@costadelsolservices.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent-gold/10 rounded-xl flex items-center justify-center">
                  <Phone className="w-6 h-6 text-accent-gold" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Phone</p>
                  <p className="text-muted-foreground">+34 123 456 789</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-accent-gold/10 rounded-xl flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-accent-gold" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Location</p>
                  <p className="text-muted-foreground">Costa del Sol, Spain</p>
                </div>
              </div>
            </div>

            {/* CTA Card */}
            <Card className="card-luxury p-8 text-center border-0 animate-fade-up">
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Start Your Project Today
              </h3>
              <p className="text-muted-foreground mb-6">
                Get a free consultation and see how we can help grow your business
              </p>
              <Button 
                className="btn-hero group w-full"
                onClick={() => document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};
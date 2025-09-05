import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
export const ContactPreview = () => {
  return (
    <section className="py-24 bg-background relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gradient-gold">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Contact us today and let's discuss how we can help you achieve your real estate goals on the Costa del Sol.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="card-luxury p-8">
              <Mail className="w-8 h-8 text-primary mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Email Us</h3>
              <p className="text-muted-foreground">info@wlcosta.com</p>
            </Card>
            <Card className="card-luxury p-8">
              <Phone className="w-8 h-8 text-primary mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Call Us</h3>
              <p className="text-muted-foreground">+34 123 456 789</p>
            </Card>
            <Card className="card-luxury p-8">
              <MapPin className="w-8 h-8 text-primary mb-4 mx-auto" />
              <h3 className="text-xl font-semibold mb-2">Visit Us</h3>
              <p className="text-muted-foreground">Costa del Sol, Spain</p>
            </Card>
          </div>
          <Button className="btn-hero group">
            Get In Touch
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  );
};
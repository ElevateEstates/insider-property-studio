import { Navigation } from "@/components/Navigation";
import { ParallaxBackground } from "@/components/ParallaxBackground";
import { PricingCalculator } from "@/components/PricingCalculator";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Send, Mail, MapPin, Clock, MessageCircle, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Footer } from "@/components/Footer";

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
  onComplete?: () => void;
}

const TypewriterText = ({ text, className = "", delay = 0, speed = 100, onComplete }: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (hasStarted) return; // Prevent multiple starts
    
    const timer = setTimeout(() => {
      setHasStarted(true);
      setIsVisible(true);
      let currentIndex = 0;
      const typeInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeInterval);
          setIsComplete(true);
          onComplete?.();
        }
      }, speed);

      return () => clearInterval(typeInterval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay, speed, onComplete, hasStarted]);

  // Reset when text changes
  useEffect(() => {
    setHasStarted(false);
    setDisplayText("");
    setIsVisible(false);
    setIsComplete(false);
  }, [text]);

  return (
    <span className={`${className} ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {displayText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </span>
  );
};

const Contact = () => {
  const [scrollY, setScrollY] = useState(0);
  const [selectedType, setSelectedType] = useState("");
  const [otherSpecification, setOtherSpecification] = useState("");
  const [isOtherDialogOpen, setIsOtherDialogOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Start animation on mount
  useEffect(() => {
    if (!isVisible && !hasCompleted) {
      setIsVisible(true);
      setCurrentStep(0);
      // Start the animation sequence
      setTimeout(() => setCurrentStep(1), 300);
    }
  }, [isVisible, hasCompleted]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent Successfully!",
      description: "Thank you for your inquiry. We'll get back to you within 24 hours.",
    });
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    if (value === "other") {
      setIsOtherDialogOpen(true);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: "geir@elevateproperties.es",
      description: "Send us an email anytime"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      details: "+34 685 243 192",
      description: "Quick response via WhatsApp",
      link: "https://wa.me/34685243192"
    },
    {
      icon: Instagram,
      title: "Instagram", 
      details: "@elevateproperties.es",
      description: "Follow our latest work",
      link: "https://www.instagram.com/elevateproperties.es"
    },
    {
      icon: MapPin,
      title: "Location",
      details: "Costa del Sol, Spain",
      description: "Serving the entire coast"
    },
    {
      icon: Clock,
      title: "Response Time",
      details: "Within 24 hours",
      description: "Fast professional service"
    }
  ];

  const services = [
    {
      title: "Real Estate Photography",
      features: [
        "Professional High Dynamic Range photos",
        "Showcase your property in it's best light",
        "Attract more viewings to meet interested buyers",
        "24-hour editing available"
      ]
    },
    {
      title: "Video Tours",
      features: [
        "Simple social media reels",
        "High level property showcase videos",
        "Drone videos, including FPV drone",
        "Professional editing with animations"
      ]
    },
    {
      title: "Marketing Package",
      subtitle: "retainer and commission-based partnership available",
      features: [
        "Post consistently",
        "Build your brand and audience",
        "Run ads to boost visibility",
        "Generate real leads that lead to results"
      ]
    }
  ];

  return (
    <div className="min-h-screen text-white relative">
      <ParallaxBackground speed={8} reduced={true} />
      <Navigation />
      

      {/* Our Services Section - moved from bottom */}
      <section className="py-32 transparent-section">
        <div 
          className="container mx-auto max-w-5xl px-4 md:px-8"
          style={{ transform: `translateY(${scrollY * 0.02}px)` }}
        >
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-light mb-4 text-white">
              Services
            </h2>
            <div className="w-20 h-0.5 bg-accent-gold mx-auto"></div>
          </div>
          
          <div className="relative">
            <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-accent-gold to-transparent opacity-60"></div>
            <div className="pl-12 space-y-8">
              <div className="space-y-6 text-lg leading-relaxed text-white/80 max-w-4xl">
                <p>
                  Professional real estate media services tailored to your needs.
                </p>
                
                <p>
                  Use our pricing calculator below to build your custom package and see live pricing for your specific requirements.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6 mt-20">
            {services.map((service, index) => (
              <Card key={index} className="glass-card p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-medium text-white mb-2">
                    {service.title}
                  </h3>
                  {service.subtitle && (
                    <p className="text-accent-gold text-sm">
                      {service.subtitle}
                    </p>
                  )}
                </div>
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="text-white/70 text-sm flex items-center">
                      <span className="w-1.5 h-1.5 bg-accent-gold rounded-full mr-3 flex-shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Pricing Calculator */}
      <section className="py-32 transparent-section">
        <div 
          className="container mx-auto max-w-7xl px-4 md:px-8"
          style={{ transform: `translateY(${scrollY * 0.02}px)` }}
        >
          <PricingCalculator />
        </div>
      </section>

      {/* Contact Form & Services */}
      <section className="py-32 transparent-section">
        <div 
          className="container mx-auto max-w-7xl px-4 md:px-8 relative z-20"
          style={{ transform: `translateY(${scrollY * 0.03}px)` }}
        >
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-light mb-4 text-white">
                  Send Us a Message
                </h2>
                <p className="text-white/70">
                  Tell us about your project and we'll get back to you with a custom proposal.
                </p>
              </div>

              <Card className="glass-card p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-white mb-2 block">
                        First Name *
                      </Label>
                      <Input 
                        id="firstName" 
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 hover:bg-white/15 transition-colors" 
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-white mb-2 block">
                        Last Name *
                      </Label>
                      <Input 
                        id="lastName" 
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50 hover:bg-white/15 transition-colors" 
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email" className="text-white mb-2 block">
                      Email Address *
                    </Label>
                    <Input 
                      id="email" 
                      type="email" 
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 hover:bg-white/15 transition-colors" 
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-white mb-2 block">
                      Phone Number
                    </Label>
                    <Input 
                      id="phone" 
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 hover:bg-white/15 transition-colors" 
                      placeholder="+34 123 456 789"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="clientType" className="text-white mb-2 block">
                      I am a... *
                    </Label>
                    <Select onValueChange={handleTypeChange} required>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white hover:bg-white/15 transition-colors">
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="real-estate-agent">Real Estate Agent</SelectItem>
                        <SelectItem value="property-owner">Property Owner</SelectItem>
                        <SelectItem value="developer">Property Developer</SelectItem>
                        <SelectItem value="business-owner">Business Owner</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="service" className="text-white mb-2 block">
                      Service Needed *
                    </Label>
                    <Select required>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white hover:bg-white/15 transition-colors">
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="photography">Photography Only</SelectItem>
                        <SelectItem value="video">Video Tour Only</SelectItem>
                        <SelectItem value="both">Photography + Video</SelectItem>
                        <SelectItem value="marketing">Full Marketing Package</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message" className="text-white mb-2 block">
                      Project Details *
                    </Label>
                    <Textarea 
                      id="message" 
                      rows={5}
                      required
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 hover:bg-white/15 transition-colors"
                      placeholder="Tell us about your property, timeline, budget, and any specific requirements..."
                    />
                  </div>
                  
                    <Button 
                      type="submit" 
                      size="lg"
                      className="w-full glass-button group"
                    >
                    Send Message
                    <Send className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </form>
              </Card>
            </div>

            {/* Spacer for full width layout */}
            <div></div>
          </div>
        </div>
      </section>

      {/* Other Specification Dialog */}
      <Dialog open={isOtherDialogOpen} onOpenChange={setIsOtherDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Please Specify Your Role</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Label htmlFor="otherSpec">How would you describe yourself?</Label>
            <Textarea
              id="otherSpec"
              value={otherSpecification}
              onChange={(e) => setOtherSpecification(e.target.value)}
              placeholder="Please specify your role or business type..."
              rows={3}
            />
            <div className="flex gap-2">
              <Button 
                onClick={() => {
                  setIsOtherDialogOpen(false);
                  setSelectedType(`other: ${otherSpecification}`);
                }}
                className="flex-1"
                disabled={!otherSpecification.trim()}
              >
                Save
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  setIsOtherDialogOpen(false);
                  setSelectedType("");
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Footer />
    </div>
  );
};

export default Contact;

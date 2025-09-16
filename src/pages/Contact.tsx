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
      title: "Thanks! You're on the insider list.",
      description: "We'll send you exclusive property previews soon."
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

      {/* Ready to Work Together Section - imported from home page */}
      <section id="contact-form" className="py-32 transparent-section relative overflow-hidden z-10">
        <div 
          className="container mx-auto max-w-6xl relative z-20 px-4 md:px-8"
          style={{ transform: `translateY(${scrollY * 0.03}px)` }}
        >
          <div className="text-center mb-12 md:mb-16 animate-fade-up">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6 md:mb-8 border-b border-white/20 pb-3 md:pb-4 text-white">
              Ready to Work Together?
            </h2>
            <p className="text-base md:text-lg lg:text-xl leading-relaxed text-white/80 font-light max-w-2xl mx-auto">Let's discuss collaboration ideas. No obligations.</p>
          </div>
            
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Contact Info */}
            <div className="space-y-6 md:space-y-8 animate-slide-in">
              <div>
                <h3 className="text-xl md:text-2xl font-light text-white mb-4 md:mb-6">Get In Touch</h3>
                <div className="space-y-4 md:space-y-6">
                  <a href="mailto:geir@elevateproperties.es" className="flex items-center gap-3 md:gap-4 text-white/80 transition-colors hover:text-white/90 hover:scale-105 transition-transform duration-300">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-xl flex items-center justify-center">
                      <Mail className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-sm md:text-base">Email</p>
                      <p className="text-sm md:text-base">geir@elevateproperties.es</p>
                    </div>
                  </a>
                  <a href="https://wa.me/34685243192" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 md:gap-4 text-white/80 transition-colors hover:text-white/90 hover:scale-105 transition-transform duration-300">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium text-sm md:text-base">WhatsApp</p>
                      <p className="text-sm md:text-base">+34 685 243 192</p>
                    </div>
                  </a>
                  <a href="https://www.instagram.com/elevateproperties.es" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 md:gap-4 text-white/80 transition-colors hover:text-white/90 hover:scale-105 transition-transform duration-300">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-pink-500/20 rounded-xl flex items-center justify-center">
                      <Instagram className="w-5 h-5 md:w-6 md:h-6 text-pink-400" />
                    </div>
                    <div>
                      <p className="font-medium text-sm md:text-base">Instagram</p>
                      <p className="text-sm md:text-base">@elevateproperties.es</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-3 md:gap-4 text-white/80 transition-colors hover:text-white/90">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-xl flex items-center justify-center">
                      <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-sm md:text-base">Location</p>
                      <p className="text-sm md:text-base">Costa del Sol, Spain</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <Card className="p-4 md:p-8 bg-transparent backdrop-blur-md border border-white/10">
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-white mb-1 md:mb-2 block text-sm md:text-base">First Name</Label>
                    <Input id="firstName" className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-10 md:h-12" />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-white mb-1 md:mb-2 block text-sm md:text-base">Last Name</Label>
                    <Input id="lastName" className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-10 md:h-12" />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-white mb-1 md:mb-2 block text-sm md:text-base">Email</Label>
                  <Input id="email" type="email" className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-10 md:h-12" />
                </div>
                
                <div>
                  <Label htmlFor="phone" className="text-white mb-1 md:mb-2 block text-sm md:text-base">Phone</Label>
                  <Input id="phone" className="bg-white/10 border-white/20 text-white placeholder:text-white/50 h-10 md:h-12" />
                </div>
                
                <div>
                  <Label htmlFor="clientType" className="text-white mb-1 md:mb-2 block text-sm md:text-base">I am a...</Label>
                  <Select onValueChange={handleTypeChange}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white h-10 md:h-12">
                      <SelectValue placeholder="Select your type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="home-seller">Home Seller</SelectItem>
                      <SelectItem value="home-buyer">Home Buyer</SelectItem>
                      <SelectItem value="real-estate-agent">Real Estate Agent</SelectItem>
                      <SelectItem value="small-business">Small Business</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="message" className="text-white mb-1 md:mb-2 block text-sm md:text-base">Message</Label>
                  <Textarea id="message" rows={3} className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[80px] md:min-h-[100px]" placeholder="Tell us about your project..." />
                </div>
                
                <Button type="submit" variant="outline" className="w-full bg-white/10 backdrop-blur-sm border-white/80 text-white hover:bg-white hover:text-black transition-all duration-300 hover-scale group relative z-50 h-12 md:h-14 text-sm md:text-base">
                  Send Message
                  <Send className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
            </Card>
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

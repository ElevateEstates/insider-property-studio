import { Navigation } from "@/components/Navigation";
import { ParallaxBackground } from "@/components/ParallaxBackground";
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
      price: "From €299",
      features: [
        "Professional HDR photography",
        "Interior and exterior shots",
        "Same-day delivery available",
        "High-resolution images"
      ]
    },
    {
      title: "Video Tours",
      price: "From €599",
      features: [
        "Cinematic property tours",
        "Drone footage included",
        "Professional editing",
        "Multiple format delivery"
      ]
    },
    {
      title: "Marketing Package",
      price: "From €899",
      features: [
        "Photography + Video",
        "Social media content",
        "Virtual staging options",
        "Branded materials"
      ]
    }
  ];

  return (
    <div className="min-h-screen text-white relative">
      <ParallaxBackground speed={8} reduced={true} />
      <Navigation />
      

      {/* Our Packages Section */}
      <section className="py-32 transparent-section">
        <div 
          className="container mx-auto max-w-6xl px-4 md:px-8"
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        >
          <div className="text-center mb-16 glass-card rounded-2xl p-8">
            <h2 className="text-3xl md:text-5xl font-light mb-8">
              Our Packages
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              We offer fixed-price packages for clients who need specific deliverables.
              <br /><br />
              For more comprehensive collaborations, we evaluate your project to create a custom plan to achieve the results you're looking for.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card key={index} className="glass-card p-6 hover:border-white/20 transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-medium text-white">
                    {service.title}
                  </h3>
                  <Badge className="bg-accent-gold text-primary">
                    {service.price}
                  </Badge>
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

      {/* Contact Info Section */}
      <section className="py-32 transparent-section">
        <div 
          className="container mx-auto max-w-6xl px-4 md:px-8"
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        >
          <div className="text-center mb-16 glass-card rounded-2xl p-8">
            <h2 className="text-3xl md:text-5xl font-light mb-8">
              How to Reach Us
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              We're here to help with all your real estate media needs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
            {contactInfo.map((info, index) => {
              const CardContent = (
                <Card className="glass-card p-8 text-center hover:border-white/20 transition-all duration-300">
                  <div className="w-16 h-16 bg-accent-gold/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <info.icon className="w-8 h-8 text-accent-gold" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-2">
                    {info.title}
                  </h3>
                  <p className="text-accent-gold font-medium mb-2">
                    {info.details}
                  </p>
                  <p className="text-white/60 text-sm">
                    {info.description}
                  </p>
                </Card>
              );

              return info.link ? (
                <a key={index} href={info.link} target="_blank" rel="noopener noreferrer" className="hover:scale-105 transition-transform duration-300">
                  {CardContent}
                </a>
              ) : (
                <div key={index}>
                  {CardContent}
                </div>
              );
            })}
          </div>
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
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50" 
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
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/50" 
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
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50" 
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="phone" className="text-white mb-2 block">
                      Phone Number
                    </Label>
                    <Input 
                      id="phone" 
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50" 
                      placeholder="+34 123 456 789"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="clientType" className="text-white mb-2 block">
                      I am a... *
                    </Label>
                    <Select onValueChange={handleTypeChange} required>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
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
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
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
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
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

            {/* Services & Pricing */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl md:text-4xl font-light mb-4 text-white">
                  Our Services
                </h2>
                <p className="text-white/70">
                  Professional real estate media services tailored to your needs.
                </p>
              </div>

              <div className="space-y-6">
                {services.map((service, index) => (
                  <Card key={index} className="glass-card p-6 hover:border-white/20 transition-all duration-300">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-medium text-white">
                        {service.title}
                      </h3>
                      <Badge className="bg-accent-gold text-primary">
                        {service.price}
                      </Badge>
                    </div>
                    <ul className="space-y-2">
                      {service.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-white/70 text-sm flex items-center">
                          <div className="w-1.5 h-1.5 bg-accent-gold rounded-full mr-3"></div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </Card>
                ))}
              </div>

              <div className="mt-8 p-6 glass-card rounded-2xl">
                <div className="flex items-start gap-4">
                  <MessageCircle className="w-6 h-6 text-accent-gold mt-1" />
                  <div>
                    <h4 className="text-white font-medium mb-2">
                      Need a Custom Quote?
                    </h4>
                    <p className="text-white/70 text-sm">
                      Every project is unique. Contact us to discuss your specific 
                      requirements and get a personalized quote that fits your budget.
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
    </div>
  );
};

export default Contact;

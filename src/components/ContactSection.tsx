import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Send, Mail, MapPin, MessageCircle, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const ContactSection = () => {
  const [selectedType, setSelectedType] = useState("");
  const [otherSpecification, setOtherSpecification] = useState("");
  const [isOtherDialogOpen, setIsOtherDialogOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thanks! You're on the insider list.",
      description: "We'll send you exclusive property previews soon.",
    });
  };

  const handleTypeChange = (value: string) => {
    setSelectedType(value);
    if (value === "other") {
      setIsOtherDialogOpen(true);
    }
  };

  return (
    <section id="contact-form" className="py-12 md:py-20 px-4 md:px-6 relative overflow-hidden z-10">
      <div 
        className="container mx-auto max-w-6xl relative z-20 section-content py-4 md:py-8 px-4 md:px-8"
      >
        <div className="text-center mb-12 md:mb-16 animate-fade-up">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light mb-6 md:mb-8 border-b border-white/20 pb-3 md:pb-4 text-white">
            Ready to Work Together?
          </h2>
          <p className="text-base md:text-lg lg:text-xl leading-relaxed text-white/80 font-light max-w-2xl mx-auto">
            Tell us about your project and we'll create a tailored strategy for your success
          </p>
        </div>
          
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start">
            {/* Contact Info */}
            <div className="space-y-6 md:space-y-8 animate-slide-in">
              <div>
                <h3 className="text-xl md:text-2xl font-light text-white mb-4 md:mb-6">Get In Touch</h3>
                <div className="space-y-4 md:space-y-6">
                  <div className="flex items-center gap-3 md:gap-4 text-white/80 transition-colors hover:text-white/90">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-white/10 rounded-xl flex items-center justify-center">
                      <Mail className="w-5 h-5 md:w-6 md:h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-sm md:text-base">Email</p>
                      <p className="text-sm md:text-base">geir@elevateproperties.es</p>
                    </div>
                  </div>
                  <a 
                    href="https://wa.me/34685243192" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 md:gap-4 text-white/80 transition-colors hover:text-white/90 hover:scale-105 transition-transform duration-300"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium text-sm md:text-base">WhatsApp</p>
                      <p className="text-sm md:text-base">+34 685 243 192</p>
                    </div>
                  </a>
                  <a 
                    href="https://www.instagram.com/elevateproperties.es" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 md:gap-4 text-white/80 transition-colors hover:text-white/90 hover:scale-105 transition-transform duration-300"
                  >
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
                  <Textarea 
                    id="message" 
                    rows={3}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[80px] md:min-h-[100px]"
                    placeholder="Tell us about your project..."
                  />
                </div>
                
                <Button 
                  type="submit" 
                  variant="outline"
                  className="w-full bg-white/10 backdrop-blur-sm border-white/80 text-white hover:bg-white hover:text-black transition-all duration-300 hover-scale group relative z-50 h-12 md:h-14 text-sm md:text-base"
                >
                  Send Message
                  <Send className="ml-2 h-4 w-4 md:h-5 md:w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </form>
            </Card>
          </div>
        </div>
      
      {/* Other Specification Dialog */}
      <Dialog open={isOtherDialogOpen} onOpenChange={setIsOtherDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Please Specify</DialogTitle>
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
    </section>
  );
};
